import React, { useState, useEffect } from 'react';
import { Save, Bot, Building, BookOpen, Loader2, CheckCircle2, XCircle, Zap, Link2, Phone } from 'lucide-react';
import { fetchSettings, saveSettings } from '../api/client';
import { fetchMe, getToken } from '../api/auth';

function Toast({ toast }) {
    if (!toast) return null;
    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-xl transition-all ${
            toast.type === 'success'
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-red-500/20 border-red-500/40 text-red-300'
        }`}>
            {toast.type === 'success'
                ? <CheckCircle2 className="w-4 h-4 shrink-0" />
                : <XCircle className="w-4 h-4 shrink-0" />
            }
            <span className="text-sm font-medium">{toast.message}</span>
        </div>
    );
}

const TONES = [
    { value: 'cercano', label: 'Cercano', desc: 'Amigable y conversacional' },
    { value: 'formal', label: 'Formal', desc: 'Profesional y ejecutivo' },
    { value: 'agresivo', label: 'Directo', desc: 'Orientado al cierre rápido' },
];

function Field({ label, hint, children }) {
    return (
        <div>
            <label className="block text-xs text-gray-400 font-medium mb-1.5">{label}</label>
            {children}
            {hint && <p className="text-xs text-gray-600 mt-1">{hint}</p>}
        </div>
    );
}

export default function Settings() {
    const [tenantId, setTenantId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [toast, setToast] = useState(null);
    const [original, setOriginal] = useState(null);
    const [config, setConfig] = useState({
        business_name: '',
        agent_name: '',
        assistant_name: '',
        tone: 'cercano',
        specialty: '',
        catalog_url: '',
        knowledge_base: '',
        knowledge_base_url: '',
        phone_number_id: '',
        whatsapp_phone: ''
    });

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    useEffect(() => {
        fetchMe(getToken())
            .then(me => { setTenantId(me.tenant_id); return fetchSettings(me.tenant_id); })
            .then(data => {
                const loaded = {
                    business_name: data.business_name || '',
                    agent_name: data.agent_name || '',
                    assistant_name: data.assistant_name || '',
                    tone: data.tone || 'cercano',
                    specialty: data.specialty || '',
                    catalog_url: data.catalog_url || '',
                    knowledge_base: data.knowledge_base || '',
                    knowledge_base_url: data.knowledge_base_url || '',
                    phone_number_id: data.phone_number_id || '',
                    whatsapp_phone: data.whatsapp_phone || ''
                };
                setConfig(loaded);
                setOriginal(loaded);
                setLoading(false);
            })
            .catch(() => {
                showToast('No se pudo conectar con el backend.', 'error');
                setLoading(false);
            });
    }, []);

    const handleChange = (name, value) => {
        const updated = { ...config, [name]: value };
        setConfig(updated);
        setHasChanges(JSON.stringify(updated) !== JSON.stringify(original));
    };

    const handleInput = e => handleChange(e.target.name, e.target.value);

    const handleSave = async () => {
        setSaving(true);
        try {
            const { ok, data } = await saveSettings(tenantId, config);
            if (ok) {
                setOriginal(config);
                setHasChanges(false);
                showToast('Configuración guardada. El bot ya usa los nuevos datos.');
            } else {
                showToast(data.message || 'Error al guardar. Intentá de nuevo.', 'error');
            }
        } catch {
            showToast('Error de conexión.', 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center bg-transparent">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3 text-violet-400" />
                    <p className="text-gray-400 text-sm">Cargando configuración...</p>
                </div>
            </div>
        );
    }

    const input = "w-full bg-white/[0.04] border border-violet-500/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-all";

    return (
        <div className="flex-1 bg-transparent text-white overflow-y-auto">
            <Toast toast={toast} />

            {/* Header */}
            <div className="sticky top-0 z-10 bg-transparent/90 backdrop-blur-xl border-b border-violet-500/10 px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-base font-bold text-white">Configuración del Agente</h1>
                    <p className="text-xs text-gray-500 mt-0.5">Personalizá tu asistente de IA</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving || !hasChanges}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                >
                    {saving
                        ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Guardando...</>
                        : <><Save className="w-3.5 h-3.5" /> {hasChanges ? 'Guardar cambios' : 'Sin cambios'}</>
                    }
                </button>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">

                {/* Negocio */}
                <section className="bg-white/[0.03] rounded-2xl border border-violet-500/10 overflow-hidden">
                    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-violet-500/10">
                        <Building className="w-4 h-4 text-violet-400" />
                        <h2 className="text-sm font-semibold text-white">Negocio</h2>
                    </div>
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Nombre del negocio">
                            <input name="business_name" value={config.business_name} onChange={handleInput}
                                className={input} placeholder="Ej: Inmobiliaria Sur" />
                        </Field>
                        <Field label="Link del catálogo / web">
                            <input name="catalog_url" value={config.catalog_url} onChange={handleInput}
                                className={input} placeholder="https://tu-sitio.com" />
                        </Field>
                    </div>
                </section>

                {/* Agente */}
                <section className="bg-white/[0.03] rounded-2xl border border-violet-500/10 overflow-hidden">
                    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-violet-500/10">
                        <Bot className="w-4 h-4 text-emerald-400" />
                        <h2 className="text-sm font-semibold text-white">Agente de IA</h2>
                    </div>
                    <div className="p-5 space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Nombre del asistente" hint="Así se presenta el bot con los clientes">
                                <input name="assistant_name" value={config.assistant_name} onChange={handleInput}
                                    className={input} placeholder="Ej: Ana" />
                            </Field>
                            <Field label="Nombre del equipo humano" hint="Mencionado al hacer handoff">
                                <input name="agent_name" value={config.agent_name} onChange={handleInput}
                                    className={input} placeholder="Ej: Juan, el Equipo..." />
                            </Field>
                        </div>

                        {/* Tono — selector visual */}
                        <Field label="Tono de voz">
                            <div className="grid grid-cols-3 gap-2 mt-0.5">
                                {TONES.map(t => (
                                    <button
                                        key={t.value}
                                        type="button"
                                        onClick={() => handleChange('tone', t.value)}
                                        className={`p-3 rounded-xl border text-left transition-all ${
                                            config.tone === t.value
                                                ? 'bg-violet-500/20 border-violet-500/50 text-white'
                                                : 'bg-white/[0.02] border-violet-500/10 text-gray-400 hover:border-white/20 hover:text-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center gap-1.5 mb-1">
                                            {config.tone === t.value && <Zap className="w-3 h-3 text-violet-400" />}
                                            <span className="text-xs font-semibold">{t.label}</span>
                                        </div>
                                        <p className="text-xs opacity-60 leading-tight">{t.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </Field>

                        <Field label="Especialidad / Regla de oro" hint="Restricciones del negocio que el bot debe respetar siempre">
                            <textarea name="specialty" value={config.specialty} onChange={handleInput}
                                rows={3} className={`${input} resize-none`}
                                placeholder="Ej: Solo trabajamos en Zona Norte. Mínimo 2 ambientes." />
                        </Field>
                    </div>
                </section>

                {/* Base de conocimiento */}
                <section className="bg-white/[0.03] rounded-2xl border border-violet-500/10 overflow-hidden">
                    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-violet-500/10">
                        <BookOpen className="w-4 h-4 text-purple-400" />
                        <h2 className="text-sm font-semibold text-white">Base de Conocimiento</h2>
                    </div>
                    <div className="p-5 space-y-4">
                        {/* Google Sheets sync */}
                        <Field
                            label="Sincronizar desde Google Sheets"
                            hint="Pegá la URL de tu Google Sheet (pública). El bot se actualizará automáticamente cada 30 minutos."
                        >
                            <div className="relative">
                                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
                                <input
                                    name="knowledge_base_url"
                                    value={config.knowledge_base_url}
                                    onChange={handleInput}
                                    className={`${input} pl-8`}
                                    placeholder="https://docs.google.com/spreadsheets/d/..."
                                />
                            </div>
                            {config.knowledge_base_url && (
                                <p className="text-xs text-emerald-400/80 mt-1.5 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> Sincronización automática activa — el contenido manual queda deshabilitado
                                </p>
                            )}
                        </Field>

                        {/* Contenido manual */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-gray-500">
                                    {config.knowledge_base_url ? 'Contenido sincronizado (solo lectura)' : 'Productos, servicios, precios y características'}
                                </p>
                                <span className={`text-xs font-mono ${config.knowledge_base.length > 9000 ? 'text-red-400' : 'text-gray-600'}`}>
                                    {config.knowledge_base.length}/10000
                                </span>
                            </div>
                            <textarea
                                name="knowledge_base"
                                value={config.knowledge_base}
                                onChange={handleInput}
                                rows={14}
                                maxLength={10000}
                                readOnly={!!config.knowledge_base_url}
                                className={`${input} resize-none font-mono text-xs leading-relaxed ${config.knowledge_base_url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder={`PRODUCTO / SERVICIO A\n- Precio: ...\n- Características: ...\n\nPRODUCTO / SERVICIO B\n- Precio: ...\n- Características: ...`}
                            />
                            <p className="text-xs text-purple-400/60 mt-2">
                                El bot usa esta info para responder preguntas. Si no encuentra algo, no inventa.
                            </p>
                        </div>
                    </div>
                </section>

                {/* WhatsApp */}
                <section className="bg-white/[0.03] rounded-2xl border border-violet-500/10 overflow-hidden">
                    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-violet-500/10">
                        <Phone className="w-4 h-4 text-emerald-400" />
                        <h2 className="text-sm font-semibold text-white">WhatsApp</h2>
                        <span className={`ml-auto text-xs px-2 py-0.5 rounded-full border ${
                            config.phone_number_id
                                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                                : 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                        }`}>
                            {config.phone_number_id ? 'Conectado' : 'Pendiente'}
                        </span>
                    </div>
                    <div className="p-5 space-y-4">
                        <Field label="Phone Number ID (Meta)" hint="Número vinculado a tu app de Meta. Solo lectura — lo configura el equipo.">
                            <input
                                value={config.phone_number_id || 'Sin vincular'}
                                readOnly
                                className={`${input} opacity-50 cursor-not-allowed`}
                            />
                        </Field>
                        <Field label="Teléfono solicitado" hint="El número de WhatsApp Business que querés conectar.">
                            <input
                                name="whatsapp_phone"
                                value={config.whatsapp_phone}
                                onChange={handleInput}
                                className={input}
                                placeholder="+54 9 11 XXXX XXXX"
                            />
                        </Field>
                        <p className="text-xs text-gray-600">
                            Para vincular tu número escribinos a{' '}
                            <a href="mailto:info@somosvertical.ar" className="text-violet-400 hover:underline">info@somosvertical.ar</a>
                        </p>
                    </div>
                </section>

                {/* Guardar mobile */}
                <button
                    onClick={handleSave}
                    disabled={saving || !hasChanges}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors"
                >
                    {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Guardando...</> : <><Save className="w-4 h-4" /> Guardar cambios</>}
                </button>
            </div>
        </div>
    );
}
