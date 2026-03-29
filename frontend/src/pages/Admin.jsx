import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    fetchAdminDashboard, fetchAdminTenants, fetchAdminUsers,
    fetchAdminTemplates, adminUpdateTenant, adminDeleteTenant, adminDeleteUser,
    adminRequestOTP, adminVerifyOTP, adminRegisterNumber
} from '../api/client';
import { fetchMe, getToken } from '../api/auth';
import { Users, Building2, BarChart3, Wifi, CheckCircle, AlertCircle, Loader2, Bot, Phone } from 'lucide-react';

const MAIN_WABA_ID = '2412689112513021';

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'tenants', label: 'Clientes', icon: Building2 },
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'whatsapp', label: 'Vincular WhatsApp', icon: Wifi },
];

// ─── Dashboard Tab ────────────────────────────────────────────────────────────
function DashboardTab() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminDashboard().then(setData).catch(() => {}).finally(() => setLoading(false));
    }, []);

    if (loading) return <Spinner />;
    if (!data) return <ErrorMsg text="No se pudo cargar el dashboard." />;

    const cards = [
        { label: 'Clientes activos', value: data.total_tenants, color: 'violet' },
        { label: 'Total leads', value: data.total_leads, color: 'indigo' },
        { label: 'Conversión', value: `${data.conversion_rate}%`, color: 'emerald' },
        { label: 'Bots activos', value: data.active_bots, color: 'amber' },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map(c => (
                    <div key={c.label} className="bg-white/3 border border-white/8 rounded-xl p-4">
                        <p className="text-xs text-zinc-500 mb-1">{c.label}</p>
                        <p className="text-2xl font-bold text-white">{c.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-white/8">
                    <h3 className="text-sm font-semibold text-white">Últimos leads</h3>
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-zinc-500 text-xs border-b border-white/5">
                            <th className="text-left px-4 py-2">Nombre</th>
                            <th className="text-left px-4 py-2">Cliente</th>
                            <th className="text-left px-4 py-2">Estado</th>
                            <th className="text-left px-4 py-2">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.recent_leads.map(l => (
                            <tr key={l.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                <td className="px-4 py-2.5 text-white">{l.nombre}</td>
                                <td className="px-4 py-2.5 text-zinc-400">{l.tenant_name}</td>
                                <td className="px-4 py-2.5"><StatusBadge status={l.status} /></td>
                                <td className="px-4 py-2.5 text-zinc-500 text-xs">
                                    {l.created_at ? new Date(l.created_at).toLocaleDateString('es-AR') : '—'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── Tenants Tab ──────────────────────────────────────────────────────────────
function TenantsTab() {
    const [tenants, setTenants] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        Promise.all([fetchAdminTenants(), fetchAdminTemplates()])
            .then(([t, tmpl]) => { setTenants(t); setTemplates(tmpl); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const startEdit = (t) => {
        setEditing(t.id);
        setEditForm({ name: t.name, bot_active: t.bot_active, template_name: t.template });
    };

    const saveEdit = async (tenantId) => {
        setSaving(true);
        try {
            await adminUpdateTenant(tenantId, editForm);
            setTenants(prev => prev.map(t => t.id === tenantId ? { ...t, ...editForm } : t));
            setEditing(null);
        } catch (e) {
            alert(e.message);
        } finally {
            setSaving(false);
        }
    };

    const deleteTenant = async (t) => {
        if (!confirm(`¿Eliminar a "${t.name}" y todos sus datos? Esta acción no se puede deshacer.`)) return;
        try {
            await adminDeleteTenant(t.id);
            setTenants(prev => prev.filter(x => x.id !== t.id));
        } catch (e) {
            alert(e.message);
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="bg-white/3 border border-white/8 rounded-xl overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
                <thead>
                    <tr className="text-zinc-500 text-xs border-b border-white/5">
                        <th className="text-left px-4 py-3">Cliente</th>
                        <th className="text-left px-4 py-3">Vertical</th>
                        <th className="text-left px-4 py-3">Teléfono</th>
                        <th className="text-left px-4 py-3">Leads</th>
                        <th className="text-left px-4 py-3">Calif.</th>
                        <th className="text-left px-4 py-3">Bot</th>
                        <th className="text-left px-4 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {tenants.map(t => (
                        <tr key={t.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                            {editing === t.id ? (
                                <>
                                    <td className="px-4 py-2">
                                        <input
                                            className="bg-zinc-800 border border-zinc-600 rounded-lg px-2 py-1 text-white text-xs w-full"
                                            value={editForm.name}
                                            onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <select
                                            className="bg-zinc-800 border border-zinc-600 rounded-lg px-2 py-1 text-white text-xs"
                                            value={editForm.template_name}
                                            onChange={e => setEditForm(f => ({ ...f, template_name: e.target.value }))}
                                        >
                                            {templates.map(tmpl => (
                                                <option key={tmpl.id} value={tmpl.name}>{tmpl.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-4 py-2 text-zinc-400">{t.phone || '—'}</td>
                                    <td className="px-4 py-2 text-zinc-400">{t.leads}</td>
                                    <td className="px-4 py-2 text-zinc-400">{t.qualified}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => setEditForm(f => ({ ...f, bot_active: !f.bot_active }))}
                                            className={`text-xs px-2 py-0.5 rounded-full border ${editForm.bot_active ? 'border-emerald-500/40 text-emerald-400' : 'border-zinc-600 text-zinc-500'}`}
                                        >
                                            {editForm.bot_active ? 'Activo' : 'Pausado'}
                                        </button>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex gap-2">
                                            <button onClick={() => saveEdit(t.id)} disabled={saving}
                                                className="text-xs px-2 py-1 bg-violet-600 hover:bg-violet-700 text-white rounded-lg disabled:opacity-50">
                                                {saving ? '...' : 'Guardar'}
                                            </button>
                                            <button onClick={() => setEditing(null)} className="text-xs px-2 py-1 text-zinc-400 hover:text-white">
                                                Cancelar
                                            </button>
                                        </div>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="px-4 py-3 text-white font-medium">{t.name}</td>
                                    <td className="px-4 py-3 text-zinc-400 text-xs">{t.template}</td>
                                    <td className="px-4 py-3 text-zinc-400 text-xs font-mono">{t.phone || '—'}</td>
                                    <td className="px-4 py-3 text-zinc-300">{t.leads}</td>
                                    <td className="px-4 py-3 text-emerald-400">{t.qualified}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs px-2 py-0.5 rounded-full border ${t.bot_active ? 'border-emerald-500/40 text-emerald-400' : 'border-zinc-600/40 text-zinc-500'}`}>
                                            {t.bot_active ? 'Activo' : 'Pausado'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button onClick={() => startEdit(t)}
                                                className="text-xs px-2 py-1 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors">
                                                Editar
                                            </button>
                                            <button onClick={() => deleteTenant(t)}
                                                className="text-xs px-2 py-1 text-red-400/60 hover:text-red-400 border border-red-500/10 hover:border-red-500/30 rounded-lg transition-colors">
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ─── Users Tab ────────────────────────────────────────────────────────────────
function UsersTab() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminUsers().then(setUsers).catch(() => {}).finally(() => setLoading(false));
    }, []);

    const deleteUser = async (u) => {
        if (!confirm(`¿Eliminar al usuario "${u.email}"?`)) return;
        try {
            await adminDeleteUser(u.id);
            setUsers(prev => prev.filter(x => x.id !== u.id));
        } catch (e) {
            alert(e.message);
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-zinc-500 text-xs border-b border-white/5">
                        <th className="text-left px-4 py-3">Email</th>
                        <th className="text-left px-4 py-3">Tenant</th>
                        <th className="text-left px-4 py-3">Rol</th>
                        <th className="text-left px-4 py-3">Creado</th>
                        <th className="text-left px-4 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                            <td className="px-4 py-3 text-white">{u.email}</td>
                            <td className="px-4 py-3 text-zinc-400">{u.tenant_name}</td>
                            <td className="px-4 py-3">
                                {u.is_admin
                                    ? <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400">Admin</span>
                                    : <span className="text-xs text-zinc-500">Usuario</span>
                                }
                            </td>
                            <td className="px-4 py-3 text-zinc-500 text-xs">
                                {u.created_at ? new Date(u.created_at).toLocaleDateString('es-AR') : '—'}
                            </td>
                            <td className="px-4 py-3">
                                {!u.is_admin && (
                                    <button onClick={() => deleteUser(u)}
                                        className="text-xs px-2 py-1 text-red-400/60 hover:text-red-400 border border-red-500/10 hover:border-red-500/30 rounded-lg transition-colors">
                                        Eliminar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ─── WhatsApp Linking Wizard ──────────────────────────────────────────────────
function WhatsAppTab() {
    const [tenants, setTenants] = useState([]);
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Step 1 fields
    const [selectedTenant, setSelectedTenant] = useState('');
    const [countryCode, setCountryCode] = useState('54');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [wabaId, setWabaId] = useState(MAIN_WABA_ID);

    // Step 2
    const [phoneNumberId, setPhoneNumberId] = useState('');
    const [wabaIdConfirmed, setWabaIdConfirmed] = useState('');
    const [otp, setOtp] = useState('');

    // Step 3
    const [pin, setPin] = useState('000000');

    useEffect(() => {
        fetchAdminTenants().then(setTenants).catch(() => {});
    }, []);

    const handleRequestOTP = async () => {
        if (!selectedTenant || !phoneNumber) { setError('Completá todos los campos.'); return; }
        setError(''); setLoading(true);
        try {
            const res = await adminRequestOTP(phoneNumber, countryCode, wabaId);
            setPhoneNumberId(res.phone_number_id);
            setWabaIdConfirmed(res.waba_id);
            setStep(2);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp) { setError('Ingresá el código OTP.'); return; }
        setError(''); setLoading(true);
        try {
            await adminVerifyOTP(phoneNumberId, otp);
            setStep(3);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        setError(''); setLoading(true);
        try {
            await adminRegisterNumber(phoneNumberId, wabaIdConfirmed, parseInt(selectedTenant), pin);
            setSuccess(true);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setStep(1); setError(''); setSuccess(false);
        setSelectedTenant(''); setPhoneNumber(''); setOtp(''); setPin('000000');
        setPhoneNumberId(''); setWabaIdConfirmed('');
    };

    if (success) {
        const tenant = tenants.find(t => t.id === parseInt(selectedTenant));
        return (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <CheckCircle className="w-14 h-14 text-emerald-400" />
                <p className="text-lg font-semibold text-white">Número vinculado correctamente</p>
                <p className="text-zinc-400 text-sm">{tenant?.name} ya tiene su bot activo en WhatsApp.</p>
                <button onClick={reset} className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm">
                    Vincular otro número
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-lg">
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map(n => (
                    <React.Fragment key={n}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border ${
                            step === n ? 'bg-violet-600 border-violet-500 text-white'
                            : step > n ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                            : 'bg-white/5 border-white/10 text-zinc-500'
                        }`}>{step > n ? '✓' : n}</div>
                        {n < 3 && <div className={`flex-1 h-px ${step > n ? 'bg-emerald-500/40' : 'bg-white/10'}`} />}
                    </React.Fragment>
                ))}
            </div>

            {step === 1 && (
                <div className="space-y-4">
                    <h3 className="text-base font-semibold text-white">Configurar número</h3>
                    <div>
                        <label className="text-xs text-zinc-400 mb-1 block">Cliente (tenant)</label>
                        <select
                            className="w-full bg-zinc-800 border border-zinc-600 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500/50"
                            value={selectedTenant}
                            onChange={e => setSelectedTenant(e.target.value)}
                        >
                            <option value="" className="bg-zinc-800">Seleccionar cliente...</option>
                            {tenants.map(t => <option key={t.id} value={t.id} className="bg-zinc-800">{t.name} (ID {t.id})</option>)}
                        </select>
                    </div>
                    <div className="flex gap-3">
                        <div className="w-24">
                            <label className="text-xs text-zinc-400 mb-1 block">Cód. país</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500/50"
                                value={countryCode}
                                onChange={e => setCountryCode(e.target.value.replace(/\D/g, ''))}
                                placeholder="54"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-zinc-400 mb-1 block">Número (sin cód. país, sin espacios)</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500/50"
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                                placeholder="9341343628"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-zinc-400 mb-1 block">WABA ID</label>
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-violet-500/50"
                            value={wabaId}
                            onChange={e => setWabaId(e.target.value)}
                        />
                    </div>
                    {error && <ErrorMsg text={error} />}
                    <button
                        onClick={handleRequestOTP}
                        disabled={loading}
                        className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4" />}
                        Enviar OTP por SMS
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4">
                    <h3 className="text-base font-semibold text-white">Verificar OTP</h3>
                    <p className="text-sm text-zinc-400">Meta envió un SMS con el código al número <span className="text-white font-mono">+{countryCode}{phoneNumber}</span>. Pedíselo al cliente.</p>
                    <div>
                        <label className="text-xs text-zinc-400 mb-1 block">Código de 6 dígitos</label>
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm font-mono text-center text-2xl tracking-widest focus:outline-none focus:border-violet-500/50"
                            value={otp}
                            onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="000000"
                            maxLength={6}
                        />
                    </div>
                    {error && <ErrorMsg text={error} />}
                    <button
                        onClick={handleVerifyOTP}
                        disabled={loading || otp.length < 6}
                        className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        Verificar código
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-4">
                    <h3 className="text-base font-semibold text-white">Activar número</h3>
                    <div className="bg-white/3 border border-white/8 rounded-xl p-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-zinc-500">Phone Number ID</span>
                            <span className="text-white font-mono text-xs">{phoneNumberId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-500">WABA ID</span>
                            <span className="text-white font-mono text-xs">{wabaIdConfirmed}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-500">Tenant</span>
                            <span className="text-white">{tenants.find(t => t.id === parseInt(selectedTenant))?.name}</span>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-zinc-400 mb-1 block">PIN de 6 dígitos (para Cloud API)</label>
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-violet-500/50"
                            value={pin}
                            onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="000000"
                        />
                        <p className="text-xs text-zinc-600 mt-1">El PIN puede ser cualquier número de 6 dígitos. Guardalo si necesitás recuperar el número en el futuro.</p>
                    </div>
                    {error && <ErrorMsg text={error} />}
                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                        Activar bot
                    </button>
                </div>
            )}
        </div>
    );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
    const map = {
        QUALIFIED: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        QUALIFYING: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
        LOST: 'text-red-400 bg-red-500/10 border-red-500/30',
        ZOMBIE: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        NEW: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/30',
    };
    return (
        <span className={`text-xs px-2 py-0.5 rounded-full border ${map[status] || map.NEW}`}>
            {status}
        </span>
    );
}

function Spinner() {
    return (
        <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-violet-400" />
        </div>
    );
}

function ErrorMsg({ text }) {
    return (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {text}
        </div>
    );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function Admin() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        fetchMe(getToken()).then(user => {
            if (!user.is_admin) navigate('/dashboard', { replace: true });
            else setAuthorized(true);
        }).catch(() => navigate('/login', { replace: true }));
    }, []);

    if (!authorized) return null;

    const tabContent = {
        dashboard: <DashboardTab />,
        tenants: <TenantsTab />,
        users: <UsersTab />,
        whatsapp: <WhatsAppTab />,
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/8 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                        <span className="text-amber-400 text-sm">⚙</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-white">Panel de Administración</h1>
                        <p className="text-xs text-zinc-500">Solo visible para administradores</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-6 pt-4 pb-0 border-b border-white/8 shrink-0 overflow-x-auto">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-all whitespace-nowrap ${
                            activeTab === tab.id
                                ? 'text-amber-300 border-amber-400'
                                : 'text-zinc-500 border-transparent hover:text-zinc-300'
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
                {tabContent[activeTab]}
            </div>
        </div>
    );
}
