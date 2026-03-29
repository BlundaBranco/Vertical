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
    if (!res.ok) {
        let detail = `Error ${res.status}`;
        try {
            const body = await res.json();
            if (body.detail) detail = body.detail;
        } catch {}
        throw new Error(detail);
    }
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


export async function fetchTemplates(tenantId) {
    const res = await fetch(`${BASE_URL}/templates/${tenantId}`, { headers: authHeaders() });
    return handleResponse(res);
}

export async function createTemplate(tenantId, data) {
    const res = await fetch(`${BASE_URL}/templates/${tenantId}`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    return handleResponse(res);
}

export async function sendTemplate(tenantId, templateName, toNumber, components = []) {
    const res = await fetch(`${BASE_URL}/templates/${tenantId}/${encodeURIComponent(templateName)}/send`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ to_number: toNumber, components })
    });
    return handleResponse(res);
}

export async function deleteTemplate(tenantId, templateName) {
    const res = await fetch(`${BASE_URL}/templates/${tenantId}/${encodeURIComponent(templateName)}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    return handleResponse(res);
}

export async function updateWhatsAppProfile(tenantId, data) {
    const res = await fetch(`${BASE_URL}/settings/${tenantId}/whatsapp-profile`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    return handleResponse(res);
}

export async function toggleBot(tenantId) {
    const res = await fetch(`${BASE_URL}/settings/${tenantId}/bot-toggle`, {
        method: "PATCH",
        headers: authHeaders()
    });
    return handleResponse(res);
}

export async function changePassword(currentPassword, newPassword) {
    const res = await fetch(`${BASE_URL}/auth/change-password`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword })
    });
    return handleResponse(res);
}

export async function fetchBillingStatus(tenantId) {
    const res = await fetch(`${BASE_URL}/billing/status/${tenantId}`, { headers: authHeaders() });
    return handleResponse(res);
}

export async function createSubscription(tenantId, plan, payerEmail) {
    const res = await fetch(`${BASE_URL}/billing/create-subscription/${tenantId}`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ plan, payer_email: payerEmail })
    });
    return handleResponse(res);
}

export function logout() {
    clearToken();
    window.location.href = '/login';
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export async function fetchAdminDashboard() {
    const res = await fetch(`${BASE_URL}/admin/dashboard`, { headers: authHeaders() });
    return handleResponse(res);
}

export async function fetchAdminTenants() {
    const res = await fetch(`${BASE_URL}/admin/tenants`, { headers: authHeaders() });
    return handleResponse(res);
}

export async function fetchAdminUsers() {
    const res = await fetch(`${BASE_URL}/admin/users`, { headers: authHeaders() });
    return handleResponse(res);
}

export async function fetchAdminTemplates() {
    const res = await fetch(`${BASE_URL}/admin/templates`, { headers: authHeaders() });
    return handleResponse(res);
}

export async function adminUpdateTenant(tenantId, data) {
    const res = await fetch(`${BASE_URL}/admin/tenants/${tenantId}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(res);
}

export async function adminRequestOTP(phoneNumber, countryCode, wabaId) {
    const res = await fetch(`${BASE_URL}/admin/whatsapp/request-otp`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ phone_number: phoneNumber, country_code: countryCode, waba_id: wabaId }),
    });
    return handleResponse(res);
}

export async function adminVerifyOTP(phoneNumberId, code) {
    const res = await fetch(`${BASE_URL}/admin/whatsapp/verify-otp`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ phone_number_id: phoneNumberId, code }),
    });
    return handleResponse(res);
}

export async function adminRegisterNumber(phoneNumberId, wabaId, tenantId, pin) {
    const res = await fetch(`${BASE_URL}/admin/whatsapp/register`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ phone_number_id: phoneNumberId, waba_id: wabaId, tenant_id: tenantId, pin }),
    });
    return handleResponse(res);
}
