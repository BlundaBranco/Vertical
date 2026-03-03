import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Users, CheckCircle2, BarChart2, Loader2, Minus } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { fetchAnalytics } from '../api/client';
import { fetchMe, getToken } from '../api/auth';

const STATUS_COLORS = {
    'Calificados': '#10b981',
    'Conversando': '#7C3AED',
    'Nuevos': '#6b7280',
    'Perdidos': '#ef4444',
    'En Atención': '#f59e0b',
};

function Delta({ value }) {
    if (value === null || value === undefined) return <span className="text-xs text-gray-600">sin datos prev.</span>;
    if (value === 0) return <span className="flex items-center gap-1 text-xs text-gray-500"><Minus className="w-3 h-3" /> igual</span>;
    const up = value > 0;
    return (
        <span className={`flex items-center gap-1 text-xs font-medium ${up ? 'text-emerald-400' : 'text-red-400'}`}>
            {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {up ? '+' : ''}{value}% vs sem. ant.
        </span>
    );
}

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-gray-900 border border-violet-500/10 rounded-xl px-3 py-2 text-xs shadow-xl">
            <p className="text-gray-400 mb-1">{label}</p>
            {payload.map(p => (
                <p key={p.name} style={{ color: p.fill || p.color }}>
                    {p.name}: <span className="font-bold text-white">{p.value}</span>
                </p>
            ))}
        </div>
    );
};

export default function Analytics() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMe(getToken())
            .then(me => fetchAnalytics(me.tenant_id))
            .then(d => { setData(d); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-transparent">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3 text-violet-400" />
                    <p className="text-gray-400 text-sm">Cargando datos...</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex-1 flex items-center justify-center bg-transparent">
                <p className="text-gray-500 text-sm">No se pudieron cargar los datos.</p>
            </div>
        );
    }

    const kpis = [
        {
            label: 'Leads esta semana',
            value: data.this_week,
            delta: data.leads_change,
            icon: Users,
            color: 'text-violet-400',
            border: 'border-violet-500/20'
        },
        {
            label: 'Calificados esta semana',
            value: data.this_week_qualified,
            delta: data.qualified_change,
            icon: CheckCircle2,
            color: 'text-emerald-400',
            border: 'border-emerald-500/20'
        },
        {
            label: 'Tasa de conversión',
            value: `${data.conversion_rate}%`,
            delta: null,
            icon: TrendingUp,
            color: 'text-purple-400',
            border: 'border-purple-500/20'
        },
        {
            label: 'Promedio diario',
            value: data.avg_per_day,
            delta: null,
            icon: BarChart2,
            color: 'text-blue-400',
            border: 'border-blue-500/20'
        },
    ];

    return (
        <div className="flex-1 bg-transparent text-white overflow-y-auto">
            {/* Header */}
            <div className="border-b border-violet-500/15 px-6 py-4">
                <h1 className="text-base font-bold text-white">Analytics</h1>
                <p className="text-xs text-zinc-400 mt-0.5">Últimos 14 días</p>
            </div>

            <div className="px-5 py-6 space-y-6 max-w-5xl mx-auto">

                {/* KPIs */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {kpis.map(({ label, value, delta, icon: Icon, color, border }) => (
                        <div key={label} className={`bg-white/[0.04] rounded-xl p-4 border ${border}`}>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-zinc-400 text-xs">{label}</p>
                                <Icon className={`w-4 h-4 ${color}`} />
                            </div>
                            <p className={`text-2xl font-bold ${color}`}>{value}</p>
                            <div className="mt-1"><Delta value={delta} /></div>
                        </div>
                    ))}
                </div>

                {/* Bar chart */}
                <div className="bg-white/[0.04] rounded-2xl border border-violet-500/15 p-5">
                    <h2 className="text-sm font-semibold text-white mb-1">Leads por día</h2>
                    <p className="text-xs text-zinc-400 mb-5">Últimos 14 días — total vs calificados</p>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={data.daily} barGap={2}>
                            <XAxis dataKey="fecha" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis allowDecimals={false} tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} width={24} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                            <Bar dataKey="leads" name="Total" fill="#7C3AED" radius={[4, 4, 0, 0]} maxBarSize={28} />
                            <Bar dataKey="calificados" name="Calificados" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={28} />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="flex items-center gap-5 mt-3 justify-end">
                        <span className="flex items-center gap-1.5 text-xs text-zinc-400"><span className="w-2.5 h-2.5 rounded bg-violet-500 inline-block" /> Total</span>
                        <span className="flex items-center gap-1.5 text-xs text-zinc-400"><span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" /> Calificados</span>
                    </div>
                </div>

                {/* Pie + semana */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Distribución actual */}
                    <div className="bg-white/[0.04] rounded-2xl border border-violet-500/15 p-5">
                        <h2 className="text-sm font-semibold text-white mb-1">Estado actual de leads</h2>
                        <p className="text-xs text-zinc-400 mb-4">Todos los leads históricos</p>
                        {data.distribution.length === 0 ? (
                            <p className="text-gray-600 text-sm text-center py-10">Sin datos</p>
                        ) : (
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={data.distribution}
                                        cx="50%" cy="50%"
                                        innerRadius={55} outerRadius={80}
                                        paddingAngle={3}
                                        dataKey="value"
                                    >
                                        {data.distribution.map((entry) => (
                                            <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || '#6b7280'} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend
                                        iconType="circle" iconSize={8}
                                        formatter={(v) => <span className="text-xs text-gray-400">{v}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    {/* Comparativa semanal */}
                    <div className="bg-white/[0.04] rounded-2xl border border-violet-500/15 p-5">
                        <h2 className="text-sm font-semibold text-white mb-1">Esta semana vs anterior</h2>
                        <p className="text-xs text-zinc-400 mb-5">Comparativa directa</p>
                        <div className="space-y-4">
                            {[
                                { label: 'Leads totales', current: data.this_week, prev: data.last_week, color: 'bg-violet-500' },
                                { label: 'Calificados', current: data.this_week_qualified, prev: data.last_week_qualified, color: 'bg-emerald-500' },
                            ].map(({ label, current, prev, color }) => {
                                const max = Math.max(current, prev, 1);
                                return (
                                    <div key={label}>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-xs text-zinc-300">{label}</span>
                                            <span className="text-xs text-zinc-400">{current} / {prev}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-zinc-500 w-16">Esta sem.</span>
                                                <div className="flex-1 bg-white/[0.07] rounded-full h-1.5">
                                                    <div className={`${color} h-1.5 rounded-full transition-all`} style={{ width: `${(current / max) * 100}%` }} />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-zinc-500 w-16">Sem. ant.</span>
                                                <div className="flex-1 bg-white/[0.07] rounded-full h-1.5">
                                                    <div className={`${color} opacity-35 h-1.5 rounded-full transition-all`} style={{ width: `${(prev / max) * 100}%` }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
