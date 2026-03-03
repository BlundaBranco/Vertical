import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Building2, Bot, Zap, FileText, Link2, Phone, CheckCircle2, ChevronRight, ChevronLeft, Home, ArrowRight } from 'lucide-react';
import { fetchMe, getToken } from '../api/auth';
import { saveSettings } from '../api/client';

const TOTAL_STEPS = 8;

const TONES = [
    { value: 'cercano', label: 'Cercano', desc: 'Amigable, genera confianza rápida' },
    { value: 'formal', label: 'Formal', desc: 'Profesional, transmite solidez' },
    { value: 'agresivo', label: 'Directo', desc: 'Orientado al cierre, sin vueltas' },
];

function ProgressBar({ step }) {
    return (
        <div className="w-full mb-8">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Paso {step} de {TOTAL_STEPS}</span>
                <span className="text-xs text-gray-600">{Math.round((step / TOTAL_STEPS) * 100)}%</span>
            </div>
            <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                    className="h-full bg-violet-500 rounded-full transition-all duration-500"
                    style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                />
            </div>
        </div>
    );
}

function StepWrapper({ step, title, subtitle, children, onNext, onBack, nextLabel = 'Continuar', nextDisabled = false, saving = false, skipLabel, onSkip }) {
    return (
        <div className="w-full max-w-lg mx-auto">
            <ProgressBar step={step} />
            <div className="mb-7">
                <h2 className="text-2xl font-semibold text-white tracking-tight">{title}</h2>
                {subtitle && <p className="text-sm text-gray-400 mt-1.5">{subtitle}</p>}
            </div>
            <div className="mb-8">{children}</div>
            <div className="flex items-center justify-between gap-3">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Atrás
                </button>
                <div className="flex items-center gap-3">
                    {skipLabel && onSkip && (
                        <button
                            onClick={onSkip}
                            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            {skipLabel}
                        </button>
                    )}
                    <button
                        onClick={onNext}
                        disabled={nextDisabled || saving}
                        className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
                    >
                        {saving ? 'Guardando...' : nextLabel}
                        {!saving && <ChevronRight className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
}

const inputClass = "w-full bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500/50 transition-all";

export default function Onboarding() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [tenantId, setTenantId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [answers, setAnswers] = useState({
        business_name: '',
        assistant_name: 'Ana',
        tone: 'cercano',
        specialty: '',
        knowledge_base_url: '',
        knowledge_base: '',
        whatsapp_phone: '',
    });
    const [kbMode, setKbMode] = useState(null); // 'sheets' | 'manual' | 'later'

    useEffect(() => {
        fetchMe(getToken())
            .then(me => setTenantId(me.tenant_id))
            .catch(() => navigate('/login'));
    }, [navigate]);

    const set = (key, val) => setAnswers(prev => ({ ...prev, [key]: val }));

    const saveAll = async (extraAnswers = {}) => {
        const data = { ...answers, ...extraAnswers };
        setSaving(true);
        try {
            await saveSettings(tenantId, {
                business_name: data.business_name || 'Mi Inmobiliaria',
                assistant_name: data.assistant_name || 'Ana',
                agent_name: 'Equipo',
                tone: data.tone || 'cercano',
                specialty: data.specialty || '',
                catalog_url: '',
                knowledge_base: data.knowledge_base || '',
                knowledge_base_url: data.knowledge_base_url || '',
                whatsapp_phone: data.whatsapp_phone || '',
            });
        } finally {
            setSaving(false);
        }
    };

    const next = () => setStep(s => s + 1);
    const back = () => setStep(s => Math.max(0, s - 1));

    const handleFinish = async () => {
        await saveAll();
        setStep(TOTAL_STEPS + 1); // success screen
    };

    // Success screen
    if (step === TOTAL_STEPS + 1) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 relative">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-grid" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-3xl" />
                </div>
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/10">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">¡Todo listo!</h2>
                    <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                        Tu agente está configurado. En breve nuestro equipo vinculará tu WhatsApp.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 mx-auto px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-colors shadow-lg shadow-violet-600/25"
                    >
                        Ir al Dashboard
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col relative">
            {/* Fondo — absolute para evitar stacking context */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/18 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/12 rounded-full blur-3xl" />
            </div>

            {/* Top logo */}
            <div className="p-6">
                <div className="flex items-center gap-2.5">
                    <img src="/vertical.png" alt="Vertical" className="h-8 w-auto" />
                    <span className="text-base font-semibold text-white tracking-tight">Vertical</span>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-lg">

                    {/* Step 0: Bienvenida */}
                    {step === 0 && (
                        <div className="text-center max-w-lg mx-auto">
                            <div className="w-14 h-14 bg-violet-500/15 border border-violet-500/25 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/10">
                                <Sparkles className="w-7 h-7 text-violet-400" />
                            </div>
                            <h1 className="text-3xl font-semibold text-white tracking-tight mb-3">
                                Bienvenido a Vertical
                            </h1>
                            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                Vamos a configurar tu agente en 8 pasos. Tomá 3 minutos ahora y tu asistente estará listo para calificar leads.
                            </p>
                            <button
                                onClick={next}
                                className="flex items-center gap-2 mx-auto px-7 py-3 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-colors"
                            >
                                Empezar
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Step 1: Rubro */}
                    {step === 1 && (
                        <StepWrapper
                            step={1} title="¿Cuál es el rubro de tu negocio?"
                            subtitle="Elegí la industria de tu agente especializado."
                            onNext={next} onBack={back}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { id: 'real_estate', label: 'Inmobiliaria', desc: 'Alquiler y venta de propiedades', icon: Home, active: true },
                                    { id: 'clinic', label: 'Clínica / Salud', desc: 'Turnos y consultas médicas', icon: Bot, active: false },
                                    { id: 'dealership', label: 'Concesionaria', desc: 'Venta de vehículos', icon: Building2, active: false },
                                    { id: 'other', label: 'Otro rubro', desc: 'Próximamente', icon: Zap, active: false },
                                ].map(({ id, label, desc, icon: Icon, active }) => (
                                    <button
                                        key={id}
                                        disabled={!active}
                                        onClick={active ? next : undefined}
                                        className={`p-4 rounded-xl border text-left transition-all ${
                                            active
                                                ? 'bg-violet-500/10 border-violet-500/40 text-white hover:bg-violet-500/15 cursor-pointer'
                                                : 'bg-white/[0.02] border-white/[0.06] text-gray-600 cursor-not-allowed'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <Icon className={`w-4 h-4 ${active ? 'text-violet-400' : 'text-gray-600'}`} />
                                            <span className="text-sm font-medium">{label}</span>
                                            {!active && <span className="text-xs bg-white/5 text-gray-600 px-1.5 py-0.5 rounded-full ml-auto">Próximo</span>}
                                        </div>
                                        <p className={`text-xs leading-tight ${active ? 'text-gray-400' : 'text-gray-700'}`}>{desc}</p>
                                    </button>
                                ))}
                            </div>
                        </StepWrapper>
                    )}

                    {/* Step 2: Nombre negocio */}
                    {step === 2 && (
                        <StepWrapper
                            step={2} title="¿Cuál es el nombre de tu inmobiliaria?"
                            onNext={next} onBack={back}
                            nextDisabled={!answers.business_name.trim()}
                        >
                            <input
                                type="text"
                                value={answers.business_name}
                                onChange={e => set('business_name', e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && answers.business_name.trim() && next()}
                                autoFocus
                                className={inputClass}
                                placeholder="Ej: Inmobiliaria del Sur"
                            />
                        </StepWrapper>
                    )}

                    {/* Step 3: Nombre asistente */}
                    {step === 3 && (
                        <StepWrapper
                            step={3} title="¿Cómo se llamará tu asistente de IA?"
                            subtitle='Sugerencia: "Ana" — nombre cercano, ideal para inmobiliarias.'
                            onNext={next} onBack={back}
                        >
                            <input
                                type="text"
                                value={answers.assistant_name}
                                onChange={e => set('assistant_name', e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && next()}
                                autoFocus
                                className={inputClass}
                                placeholder="Ej: Ana"
                            />
                            <div className="flex flex-wrap gap-2 mt-3">
                                {['Ana', 'Sofía', 'Valentina', 'Laura'].map(name => (
                                    <button
                                        key={name}
                                        onClick={() => set('assistant_name', name)}
                                        className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                                            answers.assistant_name === name
                                                ? 'bg-violet-500/20 border-violet-500/40 text-violet-300'
                                                : 'bg-white/[0.03] border-white/[0.07] text-gray-400 hover:border-white/20 hover:text-gray-200'
                                        }`}
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </StepWrapper>
                    )}

                    {/* Step 4: Tono */}
                    {step === 4 && (
                        <StepWrapper
                            step={4} title="¿Con qué tono habla tu asistente?"
                            onNext={next} onBack={back}
                        >
                            <div className="grid grid-cols-1 gap-3">
                                {TONES.map(t => (
                                    <button
                                        key={t.value}
                                        onClick={() => set('tone', t.value)}
                                        className={`p-4 rounded-xl border text-left transition-all ${
                                            answers.tone === t.value
                                                ? 'bg-violet-500/10 border-violet-500/40 text-white'
                                                : 'bg-white/[0.02] border-white/[0.07] text-gray-300 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            {answers.tone === t.value && <Zap className="w-3.5 h-3.5 text-violet-400" />}
                                            <span className="text-sm font-medium">{t.label}</span>
                                        </div>
                                        <p className="text-xs text-gray-500">{t.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </StepWrapper>
                    )}

                    {/* Step 5: Especialidad / Zonas */}
                    {step === 5 && (
                        <StepWrapper
                            step={5} title="¿En qué zonas o tipo de propiedades trabajás?"
                            subtitle="Esto limita al bot para que no prometa lo que no tenés."
                            onNext={next} onBack={back}
                        >
                            <textarea
                                value={answers.specialty}
                                onChange={e => set('specialty', e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && e.ctrlKey && next()}
                                autoFocus
                                rows={4}
                                className={`${inputClass} resize-none leading-relaxed`}
                                placeholder="Ej: Solo trabajamos en Zona Norte (Tigre, San Isidro, San Fernando). Mínimo 2 ambientes. No hacemos alquileres temporarios."
                            />
                            <p className="text-xs text-gray-600 mt-2">Ctrl+Enter para continuar</p>
                        </StepWrapper>
                    )}

                    {/* Step 6: Inventario */}
                    {step === 6 && (
                        <StepWrapper
                            step={6} title="¿Cómo cargás tu inventario?"
                            subtitle="El bot usa esta info para responder consultas sobre propiedades."
                            onNext={() => {
                                if (kbMode === 'later') { set('knowledge_base_url', ''); set('knowledge_base', ''); }
                                next();
                            }}
                            onBack={back}
                            nextDisabled={kbMode === null}
                            nextLabel={kbMode === 'later' ? 'Configurar después' : 'Continuar'}
                        >
                            <div className="space-y-3">
                                {/* Opción 1: Google Sheets */}
                                <button
                                    type="button"
                                    onClick={() => { setKbMode('sheets'); set('knowledge_base', ''); }}
                                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                                        kbMode === 'sheets'
                                            ? 'bg-violet-500/10 border-violet-500/40'
                                            : 'bg-white/[0.02] border-white/[0.07] hover:border-white/20'
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5 mb-1">
                                        <Link2 className={`w-4 h-4 ${kbMode === 'sheets' ? 'text-violet-400' : 'text-gray-500'}`} />
                                        <span className="text-sm font-medium text-white">Google Sheets</span>
                                        <span className="ml-auto text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-1.5 py-0.5 rounded-full">Recomendado</span>
                                    </div>
                                    <p className="text-xs text-gray-500 ml-6.5">URL pública del sheet — el bot se actualiza solo cada 30 min</p>
                                </button>

                                {kbMode === 'sheets' && (
                                    <div className="px-1">
                                        <input
                                            type="url"
                                            value={answers.knowledge_base_url}
                                            onChange={e => set('knowledge_base_url', e.target.value)}
                                            autoFocus
                                            className={inputClass}
                                            placeholder="https://docs.google.com/spreadsheets/d/..."
                                        />
                                        <p className="text-xs text-gray-600 mt-1.5">El Sheet debe estar compartido como "Cualquiera con el link puede ver"</p>
                                    </div>
                                )}

                                {/* Opción 2: Texto manual */}
                                <button
                                    type="button"
                                    onClick={() => { setKbMode('manual'); set('knowledge_base_url', ''); }}
                                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                                        kbMode === 'manual'
                                            ? 'bg-violet-500/10 border-violet-500/40'
                                            : 'bg-white/[0.02] border-white/[0.07] hover:border-white/20'
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5 mb-1">
                                        <FileText className={`w-4 h-4 ${kbMode === 'manual' ? 'text-violet-400' : 'text-gray-500'}`} />
                                        <span className="text-sm font-medium text-white">Pegar texto</span>
                                    </div>
                                    <p className="text-xs text-gray-500 ml-6.5">Copiá y pegá tu inventario directamente</p>
                                </button>

                                {kbMode === 'manual' && (
                                    <div className="px-1">
                                        <textarea
                                            value={answers.knowledge_base}
                                            onChange={e => set('knowledge_base', e.target.value)}
                                            autoFocus
                                            rows={6}
                                            className={`${inputClass} resize-none font-mono text-xs leading-relaxed`}
                                            placeholder={`PROPIEDAD 1 — Depto 2 ambientes\n- Precio: USD 95.000\n- Zona: Palermo\n- Características: balcón, cocina integrada\n\nPROPIEDAD 2...`}
                                        />
                                    </div>
                                )}

                                {/* Opción 3: Configurar después */}
                                <button
                                    type="button"
                                    onClick={() => { setKbMode('later'); set('knowledge_base_url', ''); set('knowledge_base', ''); }}
                                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                                        kbMode === 'later'
                                            ? 'bg-white/[0.05] border-white/20'
                                            : 'bg-white/[0.02] border-white/[0.07] hover:border-white/20'
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <ChevronRight className={`w-4 h-4 ${kbMode === 'later' ? 'text-gray-300' : 'text-gray-600'}`} />
                                        <div>
                                            <span className="text-sm font-medium text-gray-300">Configurar después</span>
                                            <p className="text-xs text-gray-600 mt-0.5">Lo podés cargar desde Configuración cuando quieras</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </StepWrapper>
                    )}

                    {/* Step 7: WhatsApp */}
                    {step === 7 && (
                        <StepWrapper
                            step={7} title="Vinculá tu WhatsApp Business"
                            subtitle="Necesitamos el número de tu cuenta de WhatsApp Business para conectar el bot."
                            onNext={handleFinish} onBack={back}
                            nextLabel="Finalizar"
                            saving={saving}
                        >
                            <div>
                                <label className="block text-xs text-gray-400 mb-2 flex items-center gap-1.5">
                                    <Phone className="w-3.5 h-3.5" />
                                    Número de WhatsApp Business
                                </label>
                                <input
                                    type="tel"
                                    value={answers.whatsapp_phone}
                                    onChange={e => set('whatsapp_phone', e.target.value)}
                                    autoFocus
                                    className={inputClass}
                                    placeholder="+54 9 11 XXXX XXXX"
                                />
                                <div className="mt-4 p-3.5 bg-violet-500/8 border border-violet-500/20 rounded-xl">
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Nuestro equipo vincula tu número en <strong className="text-white">menos de 24 horas</strong>. Te avisamos por email cuando esté activo.
                                        Podés contactarnos en <a href="mailto:info@somosvertical.ar" className="text-violet-400 hover:underline">info@somosvertical.ar</a>
                                    </p>
                                </div>
                            </div>
                        </StepWrapper>
                    )}
                </div>
            </div>
        </div>
    );
}
