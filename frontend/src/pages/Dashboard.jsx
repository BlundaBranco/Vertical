import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    MessageSquare, CheckCircle2, AlertCircle, Clock,
    Send, MapPin, DollarSign, Home, User, Bot,
    TrendingUp, XCircle, RefreshCw, RotateCcw, Sparkles, Search, ChevronLeft
} from 'lucide-react';
import { fetchLeads, fetchStats, sendManualMessage, restartLead } from '../api/client';
import { fetchMe, getToken } from '../api/auth';

const REFRESH_INTERVAL = 10000;

const STATUS_CONFIG = {
    new: {
        label: 'Nuevo',
        color: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
        iconColor: 'text-gray-400',
        icon: Sparkles
    },
    qualifying: {
        label: 'Conversando',
        color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        iconColor: 'text-blue-400',
        icon: Clock
    },
    qualified: {
        label: 'Calificado',
        color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        iconColor: 'text-emerald-400',
        icon: CheckCircle2
    },
    human_handoff: {
        label: 'En Atención',
        color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        iconColor: 'text-amber-400',
        icon: AlertCircle
    },
    lost: {
        label: 'Perdido',
        color: 'bg-red-500/20 text-red-400 border-red-500/30',
        iconColor: 'text-red-400',
        icon: XCircle
    }
};

const FALLBACK_STATUS = STATUS_CONFIG.qualifying;

const FILTERS = [
    { key: 'all', label: 'Todos' },
    { key: 'qualifying', label: 'Conversando' },
    { key: 'qualified', label: 'Calificados' },
    { key: 'human_handoff', label: 'En Atención' },
    { key: 'lost', label: 'Perdidos' },
];

export default function Dashboard() {
    const [tenantId, setTenantId] = useState(null);
    const [leads, setLeads] = useState([]);
    const [stats, setStats] = useState({
        totalLeads: 0, qualified: 0, lost: 0,
        qualifying: 0, totalConversations: 0, conversionRate: 0
    });
    const [selectedLeadId, setSelectedLeadId] = useState(null);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [restarting, setRestarting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [lastRefresh, setLastRefresh] = useState(null);
    const messagesEndRef = useRef(null);
    const selectedLeadIdRef = useRef(selectedLeadId);
    const tenantIdRef = useRef(tenantId);

    useEffect(() => { selectedLeadIdRef.current = selectedLeadId; }, [selectedLeadId]);
    useEffect(() => { tenantIdRef.current = tenantId; }, [tenantId]);

    const selectedLead = leads.find(l => l.id === selectedLeadId) || null;

    const filteredLeads = leads
        .filter(l => filter === 'all' || l.status === filter)
        .filter(l => !search || l.name.toLowerCase().includes(search.toLowerCase())
            || l.whatsappId.includes(search));

    const counts = FILTERS.reduce((acc, f) => {
        acc[f.key] = f.key === 'all' ? leads.length : leads.filter(l => l.status === f.key).length;
        return acc;
    }, {});

    const loadData = useCallback(async () => {
        const tid = tenantIdRef.current;
        if (!tid) return;
        try {
            const [leadsData, statsData] = await Promise.all([
                fetchLeads(tid),
                fetchStats(tid)
            ]);
            setLeads(leadsData);
            setStats(statsData);
            setLastRefresh(new Date());
            if (leadsData.length > 0 && !selectedLeadIdRef.current) {
                setSelectedLeadId(leadsData[0].id);
            }
            setLoading(false);
        } catch {
            setLoading(false);
        }
    }, []);

    // On mount: resolve tenant_id from JWT, then load data
    useEffect(() => {
        fetchMe(getToken())
            .then(me => {
                setTenantId(me.tenant_id);
                tenantIdRef.current = me.tenant_id;
            })
            .catch(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!tenantId) return;
        loadData();
        const interval = setInterval(loadData, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, [tenantId, loadData]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedLead?.messages?.length]);

    const handleSend = async () => {
        if (!message.trim() || !selectedLead || sending) return;
        const text = message.trim();
        setMessage('');
        setSending(true);
        try {
            await sendManualMessage(selectedLead.id, text);
            await loadData();
        } catch {
            setMessage(text);
        } finally {
            setSending(false);
        }
    };

    const handleRestart = async () => {
        if (!selectedLead || restarting) return;
        setRestarting(true);
        try {
            await restartLead(selectedLead.id);
            await loadData();
        } finally {
            setRestarting(false);
        }
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center bg-transparent">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400 text-sm">Cargando datos...</p>
                </div>
            </div>
        );
    }

    const cfg = selectedLead ? (STATUS_CONFIG[selectedLead.status] || FALLBACK_STATUS) : null;

    return (
        <div className="flex-1 flex flex-col bg-transparent text-white overflow-hidden">

            {/* Header */}
            <header className="shrink-0 bg-white/[0.02] border-b border-violet-500/15 px-5 py-3 backdrop-blur-xl flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-bold text-white">Bandeja de Entrada</h1>
                    <p className="text-xs text-zinc-400">
                        {lastRefresh
                            ? `Actualizado ${lastRefresh.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}`
                            : 'Cargando...'}
                    </p>
                </div>
                <button
                    onClick={loadData}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    title="Refrescar"
                >
                    <RefreshCw className="w-4 h-4" />
                </button>
            </header>

            {/* KPI Cards */}
            <div className="shrink-0 px-4 pt-3 pb-2 grid grid-cols-2 lg:grid-cols-4 gap-2">
                {[
                    { label: 'Total Leads', value: stats.totalLeads, sub: 'conversaciones', color: 'text-white', border: 'border-violet-500/20', icon: MessageSquare, iconColor: 'text-violet-400' },
                    { label: 'Calificados', value: stats.qualified, sub: 'listos para contacto', color: 'text-emerald-400', border: 'border-emerald-500/25', icon: CheckCircle2, iconColor: 'text-emerald-400' },
                    { label: 'Conversando', value: stats.qualifying, sub: 'en proceso', color: 'text-blue-400', border: 'border-blue-500/25', icon: Clock, iconColor: 'text-blue-400' },
                    { label: 'Conversión', value: `${stats.conversionRate}%`, sub: 'de calificación', color: 'text-purple-400', border: 'border-purple-500/25', icon: TrendingUp, iconColor: 'text-purple-400' },
                ].map(({ label, value, sub, color, border, icon: Icon, iconColor }) => (
                    <div key={label} className={`bg-white/[0.04] rounded-xl p-4 border ${border}`}>
                        <div className="flex items-center justify-between mb-1">
                            <p className="text-zinc-400 text-xs font-medium">{label}</p>
                            <Icon className={`w-4 h-4 ${iconColor}`} />
                        </div>
                        <p className={`text-2xl font-bold ${color}`}>{value}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{sub}</p>
                    </div>
                ))}
            </div>

            {/* Split View */}
            <div className="flex-1 flex overflow-hidden px-4 pb-4 gap-3 min-h-0">

                {/* Leads list — oculto en mobile cuando hay lead seleccionado */}
                <div className={`${selectedLeadId ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-72 md:shrink-0 bg-white/[0.03] rounded-xl border border-violet-500/15 overflow-hidden`}>

                    {/* Search */}
                    <div className="shrink-0 p-3 border-b border-violet-500/15">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Buscar lead..."
                                className="w-full bg-white/[0.06] border border-violet-500/15 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                            />
                        </div>
                    </div>

                    {/* Filter tabs */}
                    <div className="shrink-0 flex overflow-x-auto border-b border-violet-500/10 px-2 py-1.5 gap-1">
                        {FILTERS.map(f => (
                            <button
                                key={f.key}
                                onClick={() => setFilter(f.key)}
                                className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-medium transition-all flex items-center gap-1 ${
                                    filter === f.key
                                        ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                }`}
                            >
                                {f.label}
                                {counts[f.key] > 0 && (
                                    <span className={`text-xs rounded-full px-1.5 py-0 min-w-[18px] text-center ${
                                        filter === f.key ? 'bg-violet-500/40 text-violet-200' : 'bg-white/10 text-gray-400'
                                    }`}>
                                        {counts[f.key]}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Lead items */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredLeads.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6">
                                <MessageSquare className="w-8 h-8 mb-2 opacity-20" />
                                <p className="text-xs text-center">
                                    {leads.length === 0
                                        ? 'Los leads aparecerán cuando lleguen mensajes de WhatsApp.'
                                        : 'Ningún lead en este filtro.'}
                                </p>
                            </div>
                        ) : (
                            filteredLeads.map(lead => {
                                const s = STATUS_CONFIG[lead.status] || FALLBACK_STATUS;
                                const StatusIcon = s.icon;
                                const isSelected = lead.id === selectedLeadId;
                                return (
                                    <button
                                        key={lead.id}
                                        onClick={() => setSelectedLeadId(lead.id)}
                                        className={`w-full p-3 border-b border-white/5 hover:bg-white/5 transition-all text-left ${
                                            isSelected ? 'bg-violet-500/10 border-l-2 border-l-violet-500' : ''
                                        }`}
                                    >
                                        <div className="flex items-start justify-between mb-1.5">
                                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                                <div className="w-8 h-8 bg-violet-500/15 border border-violet-500/20 rounded-full flex items-center justify-center shrink-0">
                                                    <span className="text-xs font-semibold text-violet-300">
                                                        {lead.name && lead.name !== 'Sin nombre'
                                                            ? lead.name.trim().slice(0, 2).toUpperCase()
                                                            : '?'}
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-white text-sm truncate">{lead.name}</p>
                                                    <p className="text-xs text-zinc-400 truncate">{lead.lastMessage}</p>
                                                </div>
                                            </div>
                                            <StatusIcon className={`w-3.5 h-3.5 shrink-0 mt-0.5 ml-1 ${s.iconColor}`} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-xs px-2 py-0.5 rounded-full border ${s.color}`}>
                                                {s.label}
                                            </span>
                                            <span className="text-xs text-zinc-500">{lead.time}</span>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Chat panel — oculto en mobile cuando no hay lead seleccionado */}
                <div className={`${selectedLeadId ? 'flex' : 'hidden md:flex'} flex-col flex-1 bg-white/[0.03] rounded-xl border border-violet-500/15 overflow-hidden min-w-0`}>
                    {selectedLead ? (
                        <>
                            {/* Chat header */}
                            <div className="shrink-0 p-4 border-b border-violet-500/10">
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-3">
                                        <button
                                            className="md:hidden p-1.5 text-zinc-400 hover:text-white transition-colors shrink-0"
                                            onClick={() => setSelectedLeadId(null)}
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <div className="w-10 h-10 bg-violet-500/15 border border-violet-500/20 rounded-full flex items-center justify-center shrink-0">
                                            <span className="text-sm font-semibold text-violet-300">
                                                {selectedLead.name && selectedLead.name !== 'Sin nombre'
                                                    ? selectedLead.name.trim().slice(0, 2).toUpperCase()
                                                    : '?'}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-sm">{selectedLead.name}</h3>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className={`text-xs px-2 py-0.5 rounded-full border ${cfg.color}`}>
                                                    {cfg.label}
                                                </span>
                                                <span className="text-xs text-zinc-400">
                                                    {selectedLead.whatsappId} · desde {selectedLead.createdAt}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Botón Retomar con IA */}
                                    {(selectedLead.status === 'human_handoff' || selectedLead.status === 'lost') && (
                                        <button
                                            onClick={handleRestart}
                                            disabled={restarting}
                                            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-400 rounded-lg text-xs font-medium hover:bg-violet-500/20 transition-all disabled:opacity-40"
                                        >
                                            <RotateCcw className={`w-3.5 h-3.5 ${restarting ? 'animate-spin' : ''}`} />
                                            {restarting ? 'Retomando...' : 'Retomar con IA'}
                                        </button>
                                    )}
                                </div>

                                {/* Datos extraídos */}
                                {(selectedLead.budget !== 'N/A' || selectedLead.zone !== 'N/A' || selectedLead.propertyType !== 'N/A' || selectedLead.rejectionReason) && (
                                    <div className="flex flex-wrap gap-2">
                                        {selectedLead.budget !== 'N/A' && (
                                            <div className="flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-lg">
                                                <DollarSign className="w-3.5 h-3.5 text-violet-400" />
                                                <span className="text-xs text-gray-300">Presupuesto: <span className="text-white font-medium">{selectedLead.budget}</span></span>
                                            </div>
                                        )}
                                        {selectedLead.zone !== 'N/A' && (
                                            <div className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-lg">
                                                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                                                <span className="text-xs text-gray-300">Zona: <span className="text-white font-medium">{selectedLead.zone}</span></span>
                                            </div>
                                        )}
                                        {selectedLead.propertyType !== 'N/A' && (
                                            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                                                <Home className="w-3.5 h-3.5 text-emerald-400" />
                                                <span className="text-xs text-gray-300">Tipo: <span className="text-white font-medium">{selectedLead.propertyType}</span></span>
                                            </div>
                                        )}
                                        {selectedLead.rejectionReason && (
                                            <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-lg">
                                                <XCircle className="w-3.5 h-3.5 text-red-400" />
                                                <span className="text-xs text-gray-300">Motivo: <span className="text-white font-medium">{selectedLead.rejectionReason}</span></span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Mensajes */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                {selectedLead.messages?.length > 0 ? (
                                    <>
                                        {selectedLead.messages.map((msg, idx) => (
                                            <div key={idx} className={`flex ${msg.sender === 'bot' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`flex items-end gap-2 max-w-[75%] ${msg.sender === 'bot' ? 'flex-row-reverse' : ''}`}>
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                                                        msg.sender === 'bot'
                                                            ? 'bg-gradient-to-br from-violet-500 to-purple-600'
                                                            : 'bg-gray-700'
                                                    }`}>
                                                        {msg.sender === 'bot'
                                                            ? <Bot className="w-3 h-3 text-white" />
                                                            : <User className="w-3 h-3 text-gray-300" />
                                                        }
                                                    </div>
                                                    <div>
                                                        <div className={`px-3 py-2 rounded-xl text-sm leading-relaxed ${
                                                            msg.sender === 'bot'
                                                                ? 'bg-violet-500/15 border border-violet-500/25 text-gray-100'
                                                                : 'bg-white/5 border border-violet-500/10 text-gray-200'
                                                        }`}>
                                                            {msg.text}
                                                        </div>
                                                        <p className="text-xs text-zinc-500 mt-1 px-1">{msg.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-sm text-gray-600">Sin mensajes todavía</p>
                                    </div>
                                )}
                            </div>

                            {/* Input */}
                            <div className="shrink-0 p-3 border-t border-violet-500/10 bg-transparent/20">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                                        disabled={sending}
                                        maxLength={1000}
                                        placeholder="Intervenir como humano... (Enter para enviar)"
                                        className="flex-1 bg-white/5 border border-violet-500/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-500 disabled:opacity-50"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!message.trim() || sending}
                                        className="px-4 py-2.5 bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition-colors font-medium text-sm flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                                    >
                                        <Send className="w-4 h-4" />
                                        <span className="hidden sm:inline">{sending ? 'Enviando...' : 'Enviar'}</span>
                                    </button>
                                </div>
                                <p className="text-xs text-zinc-500 mt-1.5 px-0.5">
                                    Al enviar, el bot se pausa para este lead. Usá "Retomar con IA" para volver al modo automático.
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-700" />
                                <p className="text-sm text-gray-500">Seleccioná un lead para ver la conversación</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
