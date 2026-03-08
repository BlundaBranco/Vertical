const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");

export async function register(email, password) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Error al registrarse");
    }
    return res.json(); // { access_token, token_type }
}

export async function login(email, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Credenciales incorrectas");
    }
    return res.json(); // { access_token, token_type }
}

export async function fetchMe(token) {
    const res = await fetch(`${BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Token inválido");
    return res.json(); // { id, email, tenant_id }
}

export function getToken() {
    return localStorage.getItem("token");
}

export function saveToken(token) {
    localStorage.setItem("token", token);
}

export function clearToken() {
    localStorage.removeItem("token");
}

// ─── Facebook Login ──────────────────────────────────────────────────────────

export function loadFacebookSDK() {
    return new Promise((resolve) => {
        if (window.FB) { resolve(); return; }
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: import.meta.env.VITE_FACEBOOK_APP_ID,
                cookie: true,
                xfbml: false,
                version: "v25.0",
            });
            resolve();
        };
        const script = document.createElement("script");
        script.src = "https://connect.facebook.net/en_US/sdk.js";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    });
}

export async function loginWithFacebook() {
    await loadFacebookSDK();
    return new Promise((resolve, reject) => {
        window.FB.login(
            (response) => {
                if (response.authResponse) {
                    resolve(response.authResponse.accessToken);
                } else {
                    reject(new Error("Login cancelado"));
                }
            },
            { scope: "email,public_profile" }
        );
    });
}

export function loadGoogleSDK() {
    return new Promise((resolve) => {
        if (window.google?.accounts?.id) { resolve(); return; }
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        document.head.appendChild(script);
    });
}

export async function loginWithGoogle() {
    await loadGoogleSDK();
    return new Promise((resolve, reject) => {
        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: (response) => {
                if (response.credential) resolve(response.credential);
                else reject(new Error('Login cancelado'));
            },
            auto_select: false,
            cancel_on_tap_outside: true,
            use_fedcm_for_prompt: false,
        });
        window.google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                reject(new Error('El diálogo de Google no se pudo mostrar. Intentá con otro navegador o desactivá el bloqueador de popups.'));
            }
        });
    });
}

export async function googleAuth(credential) {
    const res = await fetch(`${BASE_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Error al iniciar sesión con Google');
    }
    return res.json();
}

export async function facebookAuth(accessToken) {
    const res = await fetch(`${BASE_URL}/auth/facebook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken }),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Error al iniciar sesión con Facebook");
    }
    return res.json(); // { access_token, token_type, is_new }
}
