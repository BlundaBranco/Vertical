"""
WhatsApp Business Platform Documentation Crawler
Uses Playwright headless Chromium + DOM manipulation to extract real content.

Usage (from project root, venv activated):
    python scripts/crawl_whatsapp_docs.py
"""
import os
import re
import sys
import time
from urllib.parse import urljoin, urlparse

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

import html2text as h2t
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

# ── Config ────────────────────────────────────────────────────────────────────

SEED_URL = "https://developers.facebook.com/documentation/business-messaging/whatsapp/overview"

ALLOWED_PREFIXES = [
    "https://developers.facebook.com/documentation/business-messaging/whatsapp",
    "https://developers.facebook.com/docs/whatsapp",
]

IGNORE_PATTERNS = [
    r"/blog", r"/marketing", r"/support", r"/videos",
    r"/community", r"/news", r"/case-studies",
    r"/login", r"/ads/", r"/instagram", r"/messenger",
    r"/gaming", r"/changelog", r"loginpage",
    r"authentication-international-rates",  # pricing subpages (too granular)
]

MAX_PAGES = 200
OUTPUT_DIR = os.path.join("docs", "Documentacion API Whatsapp Business")

# JS to inject into every page — cleans DOM and returns content HTML
EXTRACT_JS = """
() => {
    // 1. Collect ALL links FIRST (before any DOM changes)
    const links = Array.from(document.querySelectorAll('a[href]'))
        .map(a => a.getAttribute('href'))
        .filter(h => h && !h.startsWith('#') && !h.startsWith('javascript') && !h.startsWith('mailto'));

    // 2. Remove noise tags
    ['script','style','noscript','svg','iframe','nav','header','footer','aside'].forEach(tag => {
        document.querySelectorAll(tag).forEach(el => el.remove());
    });

    // 3. Remove by role
    ['navigation','banner','complementary'].forEach(role => {
        document.querySelectorAll('[role="' + role + '"]').forEach(el => el.remove());
    });

    // 4. Find first h1 — marks start of real content
    const h1 = document.querySelector('h1');
    if (!h1) return { title: '', html: document.body.innerHTML, links };

    const title = h1.innerText.trim();

    // 5. Remove all DOM nodes that come BEFORE the h1 (sidebar/nav content)
    function removeBefore(node) {
        while (node.previousSibling) {
            node.parentNode.removeChild(node.previousSibling);
        }
        if (node.parentNode && node.parentNode.tagName !== 'BODY') {
            removeBefore(node.parentNode);
        }
    }
    removeBefore(h1);

    return { title, html: document.body.innerHTML, links };
}
"""

CATEGORIES = {
    "Overview":           ["overview", "about-the-platform", "get-started", "introduction"],
    "Cloud API":          ["cloud-api", "cloud_api", "api-overview"],
    "Messages":           ["messages", "send-messages", "receiving", "interactive", "message-types"],
    "Media":              ["media", "audio", "video", "image", "document", "sticker"],
    "Webhooks":           ["webhook", "notification", "status"],
    "Templates":          ["template", "hsm"],
    "Embedded Signup":    ["embedded-signup", "embedded_signup", "onboard"],
    "Coexistence":        ["coexistence", "coexist", "migration"],
    "Phone Numbers":      ["phone-number", "registration", "two-step", "business-phone"],
    "Authentication":     ["access-token", "auth", "token", "oauth", "permissions"],
    "Pricing":            ["pric", "billing", "conversation-based", "conversation-model"],
    "Error Codes":        ["error-code", "error-codes"],
    "Rate Limits":        ["rate-limit", "rate_limit", "throttl"],
    "Business Accounts":  ["whatsapp-business-account", "waba", "business-profile", "display-name"],
}

# ── Helpers ───────────────────────────────────────────────────────────────────

def url_to_slug(url: str) -> str:
    path = urlparse(url).path.strip("/")
    parts = [p for p in path.split("/") if p]
    slug = "-".join(parts[-3:]) if parts else "index"
    slug = re.sub(r"[^a-z0-9-]", "-", slug.lower())
    slug = re.sub(r"-+", "-", slug).strip("-")
    return slug or "index"


def is_allowed(url: str) -> bool:
    url = url.split("#")[0].split("?")[0].rstrip("/")
    if not any(url.startswith(p) for p in ALLOWED_PREFIXES):
        return False
    for pat in IGNORE_PATTERNS:
        if re.search(pat, url):
            return False
    return True


def html_to_markdown(html_str: str) -> str:
    converter = h2t.HTML2Text()
    converter.ignore_links = False
    converter.ignore_images = True
    converter.body_width = 0
    converter.unicode_snob = True
    converter.protect_links = False
    converter.wrap_links = False
    md = converter.handle(html_str)
    md = re.sub(r"<[^>]{1,300}>", "", md)   # remove residual tags
    md = re.sub(r"\n{3,}", "\n\n", md)
    return md.strip()


def ensure_unique(slug: str, used: set) -> str:
    if slug not in used:
        return slug
    i = 2
    while f"{slug}-{i}" in used:
        i += 1
    return f"{slug}-{i}"


def categorize(slug: str) -> str:
    for cat, keywords in CATEGORIES.items():
        if any(kw in slug for kw in keywords):
            return cat
    return "Other"


# ── Crawler ───────────────────────────────────────────────────────────────────

def crawl():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Clear old files
    for f in os.listdir(OUTPUT_DIR):
        if f.endswith(".md"):
            os.remove(os.path.join(OUTPUT_DIR, f))

    visited: set = set()
    queue: list = [(SEED_URL, 0)]
    used_slugs: set = set()
    results: list = []

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/122.0.0.0 Safari/537.36"
            ),
            locale="en-US",
        )
        page = context.new_page()
        page.set_default_timeout(30000)

        i = 0
        while queue and len(results) < MAX_PAGES:
            url, depth = queue.pop(0)
            url = url.split("?")[0].split("#")[0].rstrip("/")

            if url in visited:
                continue
            visited.add(url)

            i += 1
            print(f"[{i:>3}] {url[:90]}")

            try:
                resp = page.goto(url, wait_until="networkidle", timeout=30000)

                final_url = page.url.split("?")[0].split("#")[0].rstrip("/")
                if final_url in visited and final_url != url:
                    print(f"      -> redirect to visited, skip")
                    continue
                visited.add(final_url)

                if resp and resp.status >= 400:
                    print(f"      HTTP {resp.status} - skip")
                    continue

                # Extract via JS — handles obfuscated CSS, removes nav, returns real content
                result = page.evaluate(EXTRACT_JS)

                title = result.get("title", "") or url_to_slug(final_url)
                html_content = result.get("html", "")
                raw_links = result.get("links", [])

                # Enqueue new links
                for href in raw_links:
                    full = urljoin(final_url, href).rstrip("/").split("?")[0].split("#")[0]
                    if full not in visited and is_allowed(full):
                        queue.append((full, depth + 1))

                # Convert to Markdown
                markdown = html_to_markdown(html_content)
                chars = len(markdown)

                if chars < 200:
                    # Fallback: use inner_text after nav removal
                    try:
                        inner = page.inner_text("body")
                        lines = [l.strip() for l in inner.split("\n") if l.strip()]
                        # Find where real content starts (after nav)
                        h1_text = title
                        start = next((idx for idx, l in enumerate(lines) if h1_text and h1_text[:20] in l), 0)
                        markdown = "\n\n".join(lines[start:])
                        chars = len(markdown)
                        print(f"      fallback inner_text: {chars} chars")
                    except Exception as fe:
                        print(f"      fallback failed: {fe}")

                # Save file
                slug = url_to_slug(final_url)
                slug = ensure_unique(slug, used_slugs)
                used_slugs.add(slug)
                filename = f"{slug}.md"
                filepath = os.path.join(OUTPUT_DIR, filename)

                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(f"# {title}\n\n")
                    f.write(f"> Source: {final_url}\n\n")
                    f.write("---\n\n")
                    f.write(markdown)

                results.append((final_url, filename, title, chars))
                print(f"      -> {filename} ({chars:,} chars)")

            except PWTimeout:
                print(f"      TIMEOUT")
            except Exception as e:
                print(f"      ERROR: {e}")

            time.sleep(0.3)

        browser.close()

    return results


# ── Index ─────────────────────────────────────────────────────────────────────

def build_index(results: list):
    grouped: dict = {cat: [] for cat in CATEGORIES}
    grouped["Other"] = []

    for url, filename, title, chars in results:
        slug = filename.replace(".md", "")
        cat = categorize(slug)
        grouped.setdefault(cat, []).append((filename, title, chars))

    lines = [
        "# WhatsApp Business Platform — Documentation Index",
        "",
        f"> Crawled from official Meta documentation with Playwright.",
        f"> Total pages: {len(results)}",
        "",
        "---",
        "",
    ]

    for cat, items in grouped.items():
        if not items:
            continue
        lines.append(f"## {cat}")
        lines.append("")
        for filename, title, chars in sorted(items):
            lines.append(f"- [{title}]({filename}) ({chars:,} chars)")
        lines.append("")

    with open(os.path.join(OUTPUT_DIR, "index.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


# ── Main ──────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("=" * 70)
    print("WhatsApp Business Platform Docs Crawler")
    print(f"Seed: {SEED_URL}")
    print(f"Output: {OUTPUT_DIR}")
    print("=" * 70)
    print()

    results = crawl()

    print()
    print("=" * 70)
    print(f"Pages saved: {len(results)}")
    print("=" * 70)
    print()

    build_index(results)

    print("Directory tree:")
    files = sorted(os.listdir(OUTPUT_DIR))
    total_bytes = 0
    for fname in files:
        fpath = os.path.join(OUTPUT_DIR, fname)
        size = os.path.getsize(fpath)
        total_bytes += size
        print(f"  {fname:<60} {size:>9,} bytes")
    print(f"\n  TOTAL: {len(files)} files, {total_bytes:,} bytes")
