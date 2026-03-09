import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, RefreshCw, FileText, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Clock, PauseCircle, XCircle, Send } from 'lucide-react';
import { fetchMe, getToken } from '../api/auth';
import { fetchTemplates, createTemplate, deleteTemplate, sendTemplate } from '../api/client';

const STATUS_CONFIG = {
    APPROVED: { label: 'Aprobado', color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30', icon: CheckCircle2 },
    PENDING:  { label: 'En revisión', color: 'text-yellow-400 bg-yellow-500/15 border-yellow-500/30', icon: Clock },
    REJECTED: { label: 'Rechazado', color: 'text-red-400 bg-red-500/15 border-red-500/30', icon: XCircle },
    PAUSED:   { label: 'Pausado', color: 'text-orange-400 bg-orange-500/15 border-orange-500/30', icon: PauseCircle },
    DISABLED: { label: 'Deshabilitado', color: 'text-zinc-400 bg-zinc-500/15 border-zinc-500/30', icon: XCircle },
};

const CATEGORY_CONFIG = {
    UTILITY:        { label: 'Utilidad', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    MARKETING:      { label: 'Marketing', color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
    AUTHENTICATION: { label: 'Autenticación', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
};

const LANGUAGES = [
    { code: 'es', label: 'Español' },
    { code: 'es_AR', label: 'Español (Argentina)' },
    { code: 'es_MX', label: 'Español (México)' },
    { code: 'en_US', label: 'Inglés (EE.UU.)' },
    { code: 'pt_BR', label: 'Portugués (Brasil)' },
];

const EMPTY_FORM = {
    name: '',
    category: 'UTILITY',
    language: 'es',
    body_text: '',
    body_example: [],
    header_text: '',
    footer_text: '',
};

function StatusBadge({ status }) {
    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
    const Icon = cfg.icon;
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}>
            <Icon className="w-3 h-3" />
            {cfg.label}
        </span>
    );
}

function CategoryBadge({ category }) {
    const cfg = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.UTILITY;
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}>
            {cfg.label}
        </span>
    );
}

function TemplateCard({ template, onDelete, tenantId }) {
    const [expanded, setExpanded] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [sending, setSending] = useState(false);
    const [sendPhone, setSendPhone] = useState('');
    const [showSend, setShowSend] = useState(false);
    const [sendResult, setSendResult] = useState('');
    const [varValues, setVarValues] = useState([]);

    const bodyComp = template.components?.find(c => c.type === 'BODY');
    const headerComp = template.components?.find(c => c.type === 'HEADER' && c.format === 'TEXT');
    const footerComp = template.components?.find(c => c.type === 'FOOTER');
    const bodyVars = [...new Set((bodyComp?.text?.match(/\{\{\d+\}\}/g) || []))];

    const [deleteError, setDeleteError] = useState('');

    const handleDelete = async () => {
        if (!confirm(`¿Eliminar la plantilla "${template.name}"? Esta acción no se puede deshacer.`)) return;
        setDeleting(true);
        setDeleteError('');
        try {
            await onDelete(template.name);
        } catch (err) {
            setDeleteError(err.message || 'Error al eliminar');
        } finally {
            setDeleting(false);
        }
    };

    const handleSend = async () => {
        if (!sendPhone.trim()) return;
        setSending(true);
        setSendResult('');
        try {
            const components = bodyVars.length > 0 ? [{
                type: 'body',
                parameters: varValues.map(v => ({ type: 'text', text: v || ' ' }))
            }] : [];
            await sendTemplate(tenantId, template.name, sendPhone.trim(), components);
            setSendResult('ok');
            setSendPhone('');
        } catch (err) {
            setSendResult(err.message || 'Error al enviar');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="bg-white/[0.04] border border-violet-500/15 rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 p-4">
                <FileText className="w-4 h-4 text-zinc-500 shrink-0" />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-sm text-white">{template.name}</span>
                        <span className="text-xs text-zinc-600">{template.language}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <StatusBadge status={template.status} />
                        <CategoryBadge category={template.category} />
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    {template.status === 'APPROVED' && (
                        <button
                            onClick={() => { setShowSend(p => !p); setSendResult(''); }}
                            className="p-1.5 rounded-lg text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                            title="Enviar mensaje de prueba"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    )}
                    <button
                        onClick={() => setExpanded(p => !p)}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all"
                    >
                        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {deleteError && (
                <div className="px-4 pb-3">
                    <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{deleteError}</p>
                </div>
            )}

            {showSend && (
                <div className="border-t border-emerald-500/15 px-4 py-3 bg-emerald-500/5">
                    <p className="text-xs text-emerald-400 font-medium mb-2">Enviar mensaje de prueba</p>
                    <div className="space-y-2">
                        {bodyVars.map((v, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="text-xs text-zinc-500 font-mono w-8">{v}</span>
                                <input
                                    value={varValues[i] || ''}
                                    onChange={e => {
                                        const next = [...varValues];
                                        next[i] = e.target.value;
                                        setVarValues(next);
                                    }}
                                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                                    placeholder={`Valor para ${v}`}
                                    className="flex-1 bg-white/[0.04] border border-emerald-500/20 rounded-lg px-3 py-1.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50"
                                />
                            </div>
                        ))}
                        <div className="flex gap-2">
                            <input
                                value={sendPhone}
                                onChange={e => setSendPhone(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                                placeholder="Número con código de país (ej: 5491112345678)"
                                className="flex-1 bg-white/[0.04] border border-emerald-500/20 rounded-lg px-3 py-1.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50"
                            />
                            <button
                                onClick={handleSend}
                                disabled={sending || !sendPhone.trim()}
                                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors"
                            >
                                {sending ? 'Enviando...' : 'Enviar'}
                            </button>
                        </div>
                    </div>
                    {sendResult === 'ok' && (
                        <p className="text-xs text-emerald-400 mt-2">✓ Mensaje enviado correctamente</p>
                    )}
                    {sendResult && sendResult !== 'ok' && (
                        <p className="text-xs text-red-400 mt-2">{sendResult}</p>
                    )}
                </div>
            )}

            {expanded && (
                <div className="border-t border-violet-500/10 px-4 pb-4 pt-3 space-y-2">
                    {headerComp && (
                        <div>
                            <p className="text-xs text-zinc-500 mb-1">Encabezado</p>
                            <p className="text-sm text-zinc-300 bg-white/[0.03] rounded-lg px-3 py-2">{headerComp.text}</p>
                        </div>
                    )}
                    {bodyComp && (
                        <div>
                            <p className="text-xs text-zinc-500 mb-1">Cuerpo</p>
                            <p className="text-sm text-zinc-300 bg-white/[0.03] rounded-lg px-3 py-2 whitespace-pre-wrap">{bodyComp.text}</p>
                        </div>
                    )}
                    {footerComp && (
                        <div>
                            <p className="text-xs text-zinc-500 mb-1">Pie</p>
                            <p className="text-sm text-zinc-400 bg-white/[0.03] rounded-lg px-3 py-2">{footerComp.text}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function CreatePanel({ tenantId, onCreated, onClose }) {
    const [form, setForm] = useState(EMPTY_FORM);
    const [examples, setExamples] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Detect {{1}}, {{2}} in body_text
    useEffect(() => {
        const vars = [...new Set((form.body_text.match(/\{\{\d+\}\}/g) || []).map(v => v))];
        setExamples(prev => {
            const next = vars.map((_, i) => prev[i] || '');
            return next;
        });
    }, [form.body_text]);

    const set = (field, value) => setForm(p => ({ ...p, [field]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.body_text) {
            setError('El nombre y el cuerpo del mensaje son obligatorios.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            await createTemplate(tenantId, {
                name: form.name,
                category: form.category,
                language: form.language,
                body_text: form.body_text,
                body_example: examples.length > 0 ? examples : undefined,
                header_text: form.header_text || undefined,
                footer_text: form.footer_text || undefined,
            });
            onCreated();
        } catch (err) {
            setError(err.message || 'Error al crear la plantilla.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white/[0.04] border border-violet-500/20 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Nueva plantilla</h3>
                <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 text-xs">Cancelar</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                        <label className="text-xs text-zinc-500 mb-1 block">Nombre</label>
                        <input
                            value={form.name}
                            onChange={e => set('name', e.target.value)}
                            placeholder="ej. bienvenida_cliente"
                            className="w-full bg-white/[0.04] border border-violet-500/20 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50"
                        />
                        <p className="text-xs text-zinc-600 mt-1">minúsculas y guiones bajos</p>
                    </div>
                    <div>
                        <label className="text-xs text-zinc-500 mb-1 block">Categoría</label>
                        <select
                            value={form.category}
                            onChange={e => set('category', e.target.value)}
                            className="w-full bg-[#060612] border border-violet-500/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50"
                        >
                            <option value="UTILITY">Utilidad</option>
                            <option value="MARKETING">Marketing</option>
                            <option value="AUTHENTICATION">Autenticación</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs text-zinc-500 mb-1 block">Idioma</label>
                        <select
                            value={form.language}
                            onChange={e => set('language', e.target.value)}
                            className="w-full bg-[#060612] border border-violet-500/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50"
                        >
                            {LANGUAGES.map(l => (
                                <option key={l.code} value={l.code}>{l.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="text-xs text-zinc-500 mb-1 block">Encabezado <span className="text-zinc-600">(opcional)</span></label>
                    <input
                        value={form.header_text}
                        onChange={e => set('header_text', e.target.value)}
                        placeholder="Texto del encabezado"
                        className="w-full bg-white/[0.04] border border-violet-500/20 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50"
                    />
                </div>

                <div>
                    <label className="text-xs text-zinc-500 mb-1 block">Cuerpo del mensaje</label>
                    <textarea
                        value={form.body_text}
                        onChange={e => set('body_text', e.target.value)}
                        rows={4}
                        placeholder={"Hola {{1}}, te contactamos de parte de {{2}}.\n\nUsá {{1}} para variables de posición."}
                        className="w-full bg-white/[0.04] border border-violet-500/20 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 resize-none"
                    />
                    <p className="text-xs text-zinc-600 mt-1">Usá {`{{1}}`}, {`{{2}}`}... para variables. Meta requiere un ejemplo por cada una.</p>
                </div>

                {examples.length > 0 && (
                    <div>
                        <label className="text-xs text-zinc-500 mb-2 block">Ejemplos para las variables</label>
                        <div className="space-y-2">
                            {examples.map((ex, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="text-xs text-zinc-500 font-mono w-8">{`{{${i + 1}}}`}</span>
                                    <input
                                        value={ex}
                                        onChange={e => {
                                            const next = [...examples];
                                            next[i] = e.target.value;
                                            setExamples(next);
                                        }}
                                        placeholder={`Ejemplo para variable ${i + 1}`}
                                        className="flex-1 bg-white/[0.04] border border-violet-500/20 rounded-lg px-3 py-1.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <label className="text-xs text-zinc-500 mb-1 block">Pie <span className="text-zinc-600">(opcional)</span></label>
                    <input
                        value={form.footer_text}
                        onChange={e => set('footer_text', e.target.value)}
                        placeholder="Pie del mensaje"
                        className="w-full bg-white/[0.04] border border-violet-500/20 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50"
                    />
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <p className="text-xs">{error}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors"
                >
                    {loading ? 'Creando...' : 'Crear plantilla'}
                </button>
            </form>
        </div>
    );
}

export default function Templates() {
    const [tenantId, setTenantId] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showCreate, setShowCreate] = useState(false);
    const [filter, setFilter] = useState('ALL');

    const load = useCallback(async (tid) => {
        setLoading(true);
        setError('');
        try {
            const data = await fetchTemplates(tid);
            setTemplates(data.data || []);
        } catch (err) {
            setError(err.message || 'No se pudieron cargar las plantillas.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMe(getToken()).then(me => {
            setTenantId(me.tenant_id);
            load(me.tenant_id);
        }).catch(() => {
            setError('No se pudo obtener la sesión. Recargá la página.');
            setLoading(false);
        });
    }, [load]);

    const handleDelete = async (name) => {
        await deleteTemplate(tenantId, name); // throws si Meta falla
        setTemplates(prev => prev.filter(t => t.name !== name));
    };

    const handleCreated = () => {
        setShowCreate(false);
        if (tenantId) load(tenantId);
    };

    const filtered = filter === 'ALL' ? templates : templates.filter(t => t.status === filter);

    const counts = templates.reduce((acc, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
    }, {});

    const filterOptions = [
        { key: 'ALL', label: 'Todos', count: templates.length },
        { key: 'APPROVED', label: 'Aprobados', count: counts.APPROVED || 0 },
        { key: 'PENDING', label: 'En revisión', count: counts.PENDING || 0 },
        { key: 'REJECTED', label: 'Rechazados', count: counts.REJECTED || 0 },
    ];

    return (
        <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-bold text-white">Plantillas de WhatsApp</h1>
                        <p className="text-sm text-zinc-500 mt-0.5">Mensajes predefinidos para contacto proactivo</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => tenantId && load(tenantId)}
                            disabled={loading}
                            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={() => setShowCreate(p => !p)}
                            className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Nueva plantilla
                        </button>
                    </div>
                </div>

                {/* Create panel */}
                {showCreate && (
                    <div className="mb-6">
                        <CreatePanel
                            tenantId={tenantId}
                            onCreated={handleCreated}
                            onClose={() => setShowCreate(false)}
                        />
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* Filter tabs */}
                {!loading && !error && templates.length > 0 && (
                    <div className="flex gap-1 mb-4 flex-wrap">
                        {filterOptions.map(opt => (
                            <button
                                key={opt.key}
                                onClick={() => setFilter(opt.key)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    filter === opt.key
                                        ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                                }`}
                            >
                                {opt.label}
                                {opt.count > 0 && (
                                    <span className="ml-1.5 text-zinc-600">{opt.count}</span>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {/* List */}
                {loading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-16 bg-white/[0.03] rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : error ? null : filtered.length === 0 ? (
                    <div className="text-center py-16">
                        <FileText className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-500 text-sm">
                            {templates.length === 0
                                ? 'Todavía no tenés plantillas creadas.'
                                : 'No hay plantillas con este filtro.'}
                        </p>
                        {templates.length === 0 && (
                            <button
                                onClick={() => setShowCreate(true)}
                                className="mt-4 px-4 py-2 text-sm text-violet-400 hover:text-violet-300 border border-violet-500/20 hover:border-violet-500/40 rounded-xl transition-all"
                            >
                                Crear tu primera plantilla
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {filtered.map(t => (
                            <TemplateCard key={t.id || t.name} template={t} onDelete={handleDelete} tenantId={tenantId} />
                        ))}
                    </div>
                )}

                {/* Info box */}
                {!loading && !error && (
                    <div className="mt-6 bg-blue-500/5 border border-blue-500/15 rounded-xl px-4 py-3">
                        <p className="text-xs text-zinc-500 leading-relaxed">
                            Las plantillas deben ser aprobadas por Meta antes de poder usarlas. El proceso tarda hasta 24 horas.
                            Solo las plantillas <span className="text-emerald-400">Aprobadas</span> pueden enviarse a usuarios fuera de la ventana de 24 horas.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
