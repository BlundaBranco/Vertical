import re
import requests
from sqlalchemy.orm import Session
from app.models import Tenant


def _to_csv_url(url: str) -> str:
    """Convierte cualquier URL de Google Sheets a URL de exportación CSV."""
    match = re.search(r'/spreadsheets/d/([a-zA-Z0-9-_]+)', url)
    if not match:
        return url  # Ya es una URL directa
    sheet_id = match.group(1)
    gid_match = re.search(r'gid=(\d+)', url)
    gid = gid_match.group(1) if gid_match else '0'
    return f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv&gid={gid}"


def sync_tenant_sheets(tenant: Tenant, db: Session) -> bool:
    """Sincroniza la knowledge base desde Google Sheets para un tenant."""
    config = dict(tenant.business_config or {})
    url = config.get("knowledge_base_url", "").strip()
    if not url:
        return False

    try:
        csv_url = _to_csv_url(url)
        r = requests.get(csv_url, timeout=15)
        if r.status_code != 200:
            print(f"[SHEETS] Error {r.status_code} para tenant {tenant.id}")
            return False

        content = r.text
        config["knowledge_base"] = content
        tenant.business_config = config
        db.commit()
        print(f"[SHEETS] Tenant {tenant.id} sincronizado ({len(content)} chars)")
        return True
    except Exception as e:
        print(f"[SHEETS] Error sincronizando tenant {tenant.id}: {e}")
        return False


def sync_all_tenants(db: Session):
    """Sincroniza todos los tenants que tienen knowledge_base_url configurada."""
    tenants = db.query(Tenant).all()
    count = 0
    for tenant in tenants:
        config = tenant.business_config or {}
        if config.get("knowledge_base_url"):
            if sync_tenant_sheets(tenant, db):
                count += 1
    if count:
        print(f"[SHEETS] Sincronización completada: {count} tenant(s) actualizados")
