import React, { useState, useEffect, useRef } from 'react';
import { Save, Bot, Building, BookOpen, Loader2, CheckCircle2, XCircle, Zap, Link2, Phone, Lock, Camera } from 'lucide-react';
import { fetchSettings, saveSettings, changePassword, updateWhatsAppProfile, uploadWhatsAppPhoto } from '../api/client';
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
    { value: 'cercano',  label: 'Cercano',  desc: 'Amigable y conversacional' },
    { value: 'formal',   label: 'Formal',   desc: 'Profesional y ejecutivo' },
    { value: 'empatico', label: 'Empático', desc: 'Paciente y comprensivo' },
];

const NATIONALITIES = [
    { value: 'argentino', label: 'Argentina', flag: '🇦🇷' },
    { value: 'español',   label: 'España',    flag: '🇪🇸' },
];

const COMM_STYLES = [
    { value: 'estandar', label: 'Estándar', desc: 'Profesional y claro' },
    { value: 'natural',  label: 'Natural',  desc: 'Como una persona real' },
];

const WA_CATEGORIES = [
    { value: '', label: 'Sin categoría' },
    { value: 'REAL_ESTATE', label: 'Inmobiliaria' },
    { value: 'AUTOMOTIVE', label: 'Automotriz' },
    { value: 'BEAUTY_SPA_AND_SALON', label: 'Belleza, Spa y Salón' },
    { value: 'CLOTHING_AND_APPAREL', label: 'Ropa y Vestimenta' },
    { value: 'EDUCATION', label: 'Educación' },
    { value: 'ENTERTAINMENT', label: 'Entretenimiento' },
    { value: 'EVENT_PLANNING_AND_SERVICE', label: 'Eventos' },
    { value: 'FINANCE_AND_BANKING', label: 'Finanzas y Banca' },
    { value: 'FOOD_AND_GROCERY', label: 'Alimentos y Supermercado' },
    { value: 'HOTEL_AND_LODGING', label: 'Hotel y Alojamiento' },
    { value: 'MEDICAL_AND_HEALTH', label: 'Salud y Medicina' },
    { value: 'NON_PROFIT', label: 'Sin fines de lucro' },
    { value: 'PROFESSIONAL_SERVICES', label: 'Servicios Profesionales' },
    { value: 'RETAIL', label: 'Comercio / Retail' },
    { value: 'TRAVEL_AND_TRANSPORTATION', label: 'Viajes y Transporte' },
    { value: 'OTHER', label: 'Otro' },
];

function WhatsAppSection({ connected, phone, phoneNumberId, tenantId, initialAbout, initialDescription, initialEmail, initialWebsite, initialAddress, initialVertical, initialPhotoUrl }) {
    const inputCls = "w-full bg-white/[0.05] border border-violet-500/15 rounded-lg px-3 py-2.5 text-white text-sm placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500/50 transition-all disabled:opacity-40 disabled:cursor-not-allowed";

    const [profile, setProfile] = useState({
        about: initialAbout || '',
        description: initialDescription || '',
        email: initialEmail || '',
        website: initialWebsite || '',
        address: initialAddress || '',
        vertical: initialVertical || '',
    });
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState(null);

    // Foto de perfil
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(initialPhotoUrl || null);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const photoInputRef = useRef(null);

    const handleChange = (field, value) => setProfile(p => ({ ...p, [field]: value }));

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
        setMsg(null);
    };

    const handleUploadPhoto = async () => {
        if (!photoFile) return;
        setUploadingPhoto(true);
        setMsg(null);
        try {
            await uploadWhatsAppPhoto(tenantId, photoFile);
            setMsg({ ok: true, text: 'Foto de perfil actualizada en WhatsApp.' });
            setPhotoFile(null);
        } catch (err) {
            setMsg({ ok: false, text: err.message || 'Error al subir la foto.' });
        } finally {
            setUploadingPhoto(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMsg(null);
        try {
            await updateWhatsAppProfile(tenantId, profile);
            setMsg({ ok: true, text: 'Perfil actualizado en WhatsApp.' });
        } catch (err) {
            setMsg({ ok: false, text: err.message || 'Error al actualizar el perfil.' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="bg-white/[0.04] rounded-2xl border border-violet-500/15 overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-violet-500/15">
                <Phone className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-semibold text-white">WhatsApp</h2>
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full border ${
                    connected
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                        : 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                }`}>
                    {connected ? 'Conectado' : 'Sin conectar'}
                </span>
            </div>
            <div className="p-5 space-y-4">
                {/* Número vinculado */}
                {connected ? (
                    <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-white">{phone || 'Número conectado'}</p>
                            <p className="text-xs text-zinc-400 mt-0.5">Phone ID: {phoneNumberId}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-zinc-400">
                        Tu número está siendo activado. En breve el equipo de Vertical AI lo vinculará a tu cuenta.
                    </p>
                )}

                {connected && (
                    <div className="space-y-4 pt-1">
                        <p className="text-xs text-zinc-400">Información visible en el perfil de WhatsApp del número.</p>

                        {/* Foto de perfil */}
                        <div>
                            <label className="block text-xs text-zinc-300 font-medium mb-2">Foto de perfil</label>
                            <div className="flex items-center gap-4">
                                <div
                                    className="relative w-16 h-16 rounded-full cursor-pointer group shrink-0"
                                    onClick={() => photoInputRef.current?.click()}
                                >
                                    {photoPreview ? (
                                        <img src={photoPreview} alt="Foto de perfil" className="w-16 h-16 rounded-full object-cover border-2 border-violet-500/30" />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-600 flex items-center justify-center">
                                            <Camera className="w-5 h-5 text-zinc-500" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Camera className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <button
                                        type="button"
                                        onClick={() => photoInputRef.current?.click()}
                                        className="text-xs px-3 py-1.5 bg-white/[0.06] hover:bg-white/[0.10] text-zinc-300 rounded-lg border border-white/10 transition-colors"
                                    >
                                        Elegir imagen
                                    </button>
                                    {photoFile && (
                                        <button
                                            type="button"
                                            onClick={handleUploadPhoto}
                                            disabled={uploadingPhoto}
                                            className="block text-xs px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg transition-colors"
                                        >
                                            {uploadingPhoto ? <span className="flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" />Subiendo...</span> : 'Subir foto'}
                                        </button>
                                    )}
                                    <p className="text-xs text-zinc-600">JPG o PNG, máx. 5 MB</p>
                                </div>
                            </div>
                            <input
                                ref={photoInputRef}
                                type="file"
                                accept="image/jpeg,image/png"
                                className="hidden"
                                onChange={handlePhotoChange}
                            />
                        </div>

                        {/* Bio */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs text-zinc-300 font-medium">Bio</label>
                                <span className={`text-xs font-mono ${profile.about.length > 120 ? 'text-amber-400' : 'text-zinc-500'}`}>
                                    {profile.about.length}/139
                                </span>
                            </div>
                            <textarea
                                rows={2}
                                maxLength={139}
                                value={profile.about}
                                onChange={e => handleChange('about', e.target.value)}
                                className={`${inputCls} resize-none`}
                                placeholder="Texto corto visible cuando alguien abre el chat"
                            />
                        </div>

                        {/* Descripción */}
                        <div>
                            <label className="block text-xs text-zinc-300 font-medium mb-1.5">Descripción</label>
                            <textarea
                                rows={3}
                                value={profile.description}
                                onChange={e => handleChange('description', e.target.value)}
                                className={`${inputCls} resize-none`}
                                placeholder="Descripción del negocio en el perfil"
                            />
                        </div>

                        {/* Email + Web */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-zinc-300 font-medium mb-1.5">Email de contacto</label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={e => handleChange('email', e.target.value)}
                                    className={inputCls}
                                    placeholder="contacto@negocio.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-zinc-300 font-medium mb-1.5">Sitio web</label>
                                <input
                                    type="url"
                                    value={profile.website}
                                    onChange={e => handleChange('website', e.target.value)}
                                    className={inputCls}
                                    placeholder="https://tu-sitio.com"
                                />
                            </div>
                        </div>

                        {/* Dirección + Categoría */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-zinc-300 font-medium mb-1.5">Dirección</label>
                                <input
                                    type="text"
                                    value={profile.address}
                                    onChange={e => handleChange('address', e.target.value)}
                                    className={inputCls}
                                    placeholder="Av. Corrientes 1234, Buenos Aires"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-zinc-300 font-medium mb-1.5">Categoría del negocio</label>
                                <select
                                    value={profile.vertical}
                                    onChange={e => handleChange('vertical', e.target.value)}
                                    className={`${inputCls} bg-zinc-900`}
                                >
                                    {WA_CATEGORIES.map(c => (
                                        <option key={c.value} value={c.value} className="bg-zinc-900">{c.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {msg && (
                            <p className={`text-xs px-3 py-2 rounded-lg border ${msg.ok
                                ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                                : 'text-red-400 bg-red-500/10 border-red-500/20'}`}>
                                {msg.text}
                            </p>
                        )}

                        <div className="flex justify-end">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 px-4 py-2 bg-white/[0.06] hover:bg-white/[0.10] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg transition-colors border border-violet-500/15"
                            >
                                {saving ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Guardando...</> : <><Save className="w-3.5 h-3.5" /> Guardar perfil WhatsApp</>}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function PasswordSection({ input }) {
    const [current, setCurrent] = useState('');
    const [next, setNext] = useState('');
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState(null); // { text, ok }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (next.length < 8) { setMsg({ text: 'Mínimo 8 caracteres.', ok: false }); return; }
        setSaving(true);
        setMsg(null);
        try {
            await changePassword(current, next);
            setMsg({ text: 'Contraseña actualizada.', ok: true });
            setCurrent(''); setNext('');
        } catch (err) {
            setMsg({ text: err.message || 'Error al cambiar la contraseña.', ok: false });
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="bg-white/[0.04] rounded-2xl border border-violet-500/15 overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-violet-500/15">
                <Lock className="w-4 h-4 text-zinc-400" />
                <h2 className="text-sm font-semibold text-white">Cambiar contraseña</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-zinc-400 mb-1.5">Contraseña actual</label>
                        <input type="password" value={current} onChange={e => setCurrent(e.target.value)}
                            required className={input} placeholder="••••••••" />
                    </div>
                    <div>
                        <label className="block text-xs text-zinc-400 mb-1.5">Nueva contraseña</label>
                        <input type="password" value={next} onChange={e => setNext(e.target.value)}
                            required className={input} placeholder="Mínimo 8 caracteres" />
                    </div>
                </div>
                {msg && (
                    <p className={`text-xs px-3 py-2 rounded-lg border ${msg.ok
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                        : 'text-red-400 bg-red-500/10 border-red-500/20'}`}>
                        {msg.text}
                    </p>
                )}
                <button type="submit" disabled={saving || !current || !next}
                    className="flex items-center gap-2 px-4 py-2 bg-white/[0.06] hover:bg-white/[0.10] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg transition-colors border border-violet-500/15">
                    {saving ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Guardando...</> : 'Actualizar contraseña'}
                </button>
            </form>
        </section>
    );
}

function Field({ label, hint, children }) {
    return (
        <div>
            <label className="block text-xs text-zinc-300 font-medium mb-1.5">{label}</label>
            {children}
            {hint && <p className="text-xs text-zinc-500 mt-1">{hint}</p>}
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
        whatsapp_phone: '',
        nationality: 'argentino',
        communication_style: 'estandar',
        calendar_url: '',
        wa_about: '',
        wa_description: '',
        wa_email: '',
        wa_website: '',
        wa_address: '',
        wa_vertical: '',
        wa_profile_picture_url: '',
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
                    whatsapp_phone: data.whatsapp_phone || '',
                    nationality: data.nationality || 'argentino',
                    communication_style: data.communication_style || 'estandar',
                    calendar_url: data.calendar_url || '',
                    wa_about: data.wa_about || '',
                    wa_description: data.wa_description || '',
                    wa_email: data.wa_email || '',
                    wa_website: data.wa_website || '',
                    wa_address: data.wa_address || '',
                    wa_vertical: data.wa_vertical || '',
                    wa_profile_picture_url: data.wa_profile_picture_url || '',
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

    const input = "w-full bg-white/[0.05] border border-violet-500/15 rounded-lg px-3 py-2.5 text-white text-sm placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500/50 transition-all";

    return (
        <div className="flex-1 bg-transparent text-white overflow-y-auto">
            <Toast toast={toast} />

            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#060612]/90 backdrop-blur-xl border-b border-violet-500/15 px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-base font-bold text-white">Configuración del Agente</h1>
                    <p className="text-xs text-zinc-400 mt-0.5">Personalizá tu asistente de IA</p>
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

                {/* WhatsApp — Embedded Signup */}
                <WhatsAppSection
                    connected={!!config.phone_number_id}
                    phone={config.whatsapp_phone}
                    phoneNumberId={config.phone_number_id}
                    tenantId={tenantId}
                    initialAbout={config.wa_about}
                    initialDescription={config.wa_description}
                    initialEmail={config.wa_email}
                    initialWebsite={config.wa_website}
                    initialAddress={config.wa_address}
                    initialVertical={config.wa_vertical}
                    initialPhotoUrl={config.wa_profile_picture_url}
                />

                {/* Negocio */}
                <section className="bg-white/[0.04] rounded-2xl border border-violet-500/15 overflow-hidden">
                    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-violet-500/15">
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
                <section className="bg-white/[0.04] rounded-2xl border border-violet-500/15 overflow-hidden">
                    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-violet-500/15">
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
                                                ? 'bg-violet-500/22 border-violet-500/50 text-white'
                                                : 'bg-white/[0.04] border-violet-500/15 text-zinc-400 hover:border-white/25 hover:text-zinc-200'
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

                        {/* Nacionalidad — selector visual */}
                        <Field label="Nacionalidad del agente" hint="Afecta el modo de habla: vos/tú, vocabulario regional">
                            <div className="grid grid-cols-2 gap-2 mt-0.5">
                                {NATIONALITIES.map(n => (
                                    <button
                                        key={n.value}
                                        type="button"
                                        onClick={() => handleChange('nationality', n.value)}
                                        className={`p-3 rounded-xl border text-left transition-all ${
                                            config.nationality === n.value
                                                ? 'bg-violet-500/22 border-violet-500/50 text-white'
                                                : 'bg-white/[0.04] border-violet-500/15 text-zinc-400 hover:border-white/25 hover:text-zinc-200'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-base">{n.flag}</span>
                                            <span className="text-xs font-semibold">{n.label}</span>
                                            {config.nationality === n.value && <Zap className="w-3 h-3 text-violet-400 ml-auto" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </Field>

                        {/* Estilo de comunicación — selector visual */}
                        <Field label="Estilo de comunicación" hint="Natural: sin frases de asistente, más directo y humano">
                            <div className="grid grid-cols-2 gap-2 mt-0.5">
                                {COMM_STYLES.map(s => (
                                    <button
                                        key={s.value}
                                        type="button"
                                        onClick={() => handleChange('communication_style', s.value)}
                                        className={`p-3 rounded-xl border text-left transition-all ${
                                            config.communication_style === s.value
                                                ? 'bg-violet-500/22 border-violet-500/50 text-white'
                                                : 'bg-white/[0.04] border-violet-500/15 text-zinc-400 hover:border-white/25 hover:text-zinc-200'
                                        }`}
                                    >
                                        <div className="text-xs font-semibold mb-0.5">{s.label}</div>
                                        <div className="text-xs opacity-60 leading-tight">{s.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </Field>

                        <Field label="Especialidad / Regla de oro" hint="Restricciones del negocio que el bot debe respetar siempre">
                            <textarea name="specialty" value={config.specialty} onChange={handleInput}
                                rows={3} className={`${input} resize-none`}
                                placeholder="Ej: Solo trabajamos en Zona Norte. Mínimo 2 ambientes." />
                        </Field>

                        <Field label="Link de agenda" hint="Google Calendar, Calendly u otro. El bot lo comparte cuando el cliente acepta reunirse.">
                            <input name="calendar_url" value={config.calendar_url} onChange={handleInput}
                                className={input} placeholder="https://calendar.app.google/..." />
                        </Field>
                    </div>
                </section>

                {/* Base de conocimiento */}
                <section className="bg-white/[0.04] rounded-2xl border border-violet-500/15 overflow-hidden">
                    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-violet-500/15">
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
                            <p className="text-xs text-purple-400/70 mt-2">
                                El bot usa esta info para responder preguntas. Si no encuentra algo, no inventa.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Cambiar contraseña */}
                <PasswordSection input={input} />

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
