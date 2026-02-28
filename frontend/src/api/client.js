const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function fetchLeads(tenantId) {
    const res = await fetch(`${BASE_URL}/leads/${tenantId}`);
    if (!res.ok) throw new Error(`fetchLeads: ${res.status}`);
    return res.json();
}

export async function fetchStats(tenantId) {
    const res = await fetch(`${BASE_URL}/stats/${tenantId}`);
    if (!res.ok) throw new Error(`fetchStats: ${res.status}`);
    return res.json();
}

export async function fetchSettings(tenantId) {
    const res = await fetch(`${BASE_URL}/settings/${tenantId}`);
    if (!res.ok) throw new Error(`fetchSettings: ${res.status}`);
    return res.json();
}

export async function saveSettings(tenantId, data) {
    const res = await fetch(`${BASE_URL}/settings/${tenantId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const json = await res.json();
    return { ok: res.ok, data: json };
}

export async function sendManualMessage(leadId, message) {
    const res = await fetch(`${BASE_URL}/manual-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead_id: leadId, message })
    });
    if (!res.ok) throw new Error(`sendManualMessage: ${res.status}`);
    return res.json();
}

export async function restartLead(leadId) {
    const res = await fetch(`${BASE_URL}/leads/${leadId}/restart`, { method: "POST" });
    if (!res.ok) throw new Error(`restartLead: ${res.status}`);
    return res.json();
}
