import { getToken, clearToken } from './auth';

const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");

function authHeaders(extra = {}) {
    const token = getToken();
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...extra
    };
}

async function handleResponse(res) {
    if (res.status === 401) {
        clearToken();
        window.location.href = '/login';
        throw new Error('Sesión expirada');
    }
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}

export async function fetchLeads(tenantId) {
    const res = await fetch(`${BASE_URL}/leads/${tenantId}`, { headers: authHeaders() });
    return handleResponse(res);
}

export async function fetchStats(tenantId) {
    const res = await fetch(`${BASE_URL}/stats/${tenantId}`, { headers: authHeaders() });
    return handleResponse(res);
}

export async function fetchSettings(tenantId) {
    const res = await fetch(`${BASE_URL}/settings/${tenantId}`, { headers: authHeaders() });
    return handleResponse(res);
}

export async function saveSettings(tenantId, data) {
    const res = await fetch(`${BASE_URL}/settings/${tenantId}`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    const json = await res.json();
    return { ok: res.ok, data: json };
}

export async function sendManualMessage(leadId, message) {
    const res = await fetch(`${BASE_URL}/manual-message`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ lead_id: leadId, message })
    });
    return handleResponse(res);
}

export async function restartLead(leadId) {
    const res = await fetch(`${BASE_URL}/leads/${leadId}/restart`, {
        method: "POST",
        headers: authHeaders()
    });
    return handleResponse(res);
}

export async function fetchAnalytics(tenantId) {
    const res = await fetch(`${BASE_URL}/analytics/${tenantId}`, { headers: authHeaders() });
    return handleResponse(res);
}

export function logout() {
    clearToken();
    window.location.href = '/login';
}
