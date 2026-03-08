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

// ─── Facebook SDK (solo para Embedded Signup de WhatsApp en Settings/Onboarding) ───

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

// ─── Facebook Login (JS SDK) ─────────────────────────────────────────────────

export async function loginWithFacebook() {
    await loadFacebookSDK();
    return new Promise((resolve, reject) => {
        window.FB.login(
            (response) => {
                if (response.authResponse) {
                    resolve(response.authResponse.accessToken);
                } else {
                    reject(new Error('Login cancelado'));
                }
            },
            { scope: 'public_profile' }
        );
    });
}

export async function loginWithGoogle() {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/google/callback`;
    const nonce = Math.random().toString(36).substring(2);

    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'id_token',
        scope: 'email profile openid',
        nonce,
        prompt: 'select_account',
    });

    const popup = window.open(
        `https://accounts.google.com/o/oauth2/v2/auth?${params}`,
        'google_login',
        'width=500,height=600,scrollbars=yes,resizable=yes'
    );

    if (!popup) {
        throw new Error('El navegador bloqueó el popup. Permitir popups para este sitio e intentar de nuevo.');
    }

    return new Promise((resolve, reject) => {
        const handler = (event) => {
            if (event.origin !== window.location.origin) return;
            if (event.data?.type !== 'google_auth') return;
            window.removeEventListener('message', handler);
            clearInterval(checkClosed);
            if (event.data.id_token) resolve(event.data.id_token);
            else reject(new Error(event.data.error || 'No se obtuvo token de Google'));
        };
        window.addEventListener('message', handler);

        const checkClosed = setInterval(() => {
            if (popup?.closed) {
                clearInterval(checkClosed);
                window.removeEventListener('message', handler);
                reject(new Error('Login cancelado'));
            }
        }, 500);
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
