import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Clock, Loader2, Zap, CreditCard, AlertTriangle } from 'lucide-react';
import { fetchBillingStatus, createSubscription } from '../api/client';
import { fetchMe, getToken } from '../api/auth';

const PLANS = [
    {
        value: 'essential',
        name: 'Essential',
        price: '$49 USD',
        period: '/mes',
        features: ['Agente IA en WhatsApp', '1 número conectado', 'Hasta 500 leads/mes', 'Dashboard + Analytics', 'Protocolo Zombie', 'Soporte por email'],
    },
    {
        value: 'pro',
        name: 'Pro',
        price: '$89 USD',
        period: '/mes',
        features: ['Todo lo de Essential', 'Leads ilimitados', 'Sincronización Google Sheets', 'Plantillas de WhatsApp', 'Notificaciones de calificación', 'Soporte prioritario'],
        highlighted: true,
    },
];

const STATUS_LABELS = {
    active:    { label: 'Activo',     classes: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' },
    pending:   { label: 'Pendiente',  classes: 'bg-amber-500/15 border-amber-500/30 text-amber-400' },
    expired:   { label: 'Vencido',    classes: 'bg-red-500/15 border-red-500/30 text-red-400' },
    cancelled: { label: 'Cancelado',  classes: 'bg-zinc-500/15 border-zinc-500/30 text-zinc-400' },
    none:      { label: 'Sin plan',   classes: 'bg-zinc-500/15 border-zinc-500/30 text-zinc-400' },
};

function StatusBanner({ status }) {
    if (status === 'success') {
        return (
            <div className="flex items-center gap-3 px-4 py-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-300 text-sm mb-6">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Pago recibido. Tu suscripción se activará en unos minutos.
            </div>
        );
    }
    if (status === 'pending') {
        return (
            <div className="flex items-center gap-3 px-4 py-3 bg-amber-500/15 border border-amber-500/30 rounded-xl text-amber-300 text-sm mb-6">
                <Clock className="w-4 h-4 shrink-0" />
                Pago en proceso. Te avisamos cuando se confirme.
            </div>
        );
    }
    if (status === 'failure') {
        return (
            <div className="flex items-center gap-3 px-4 py-3 bg-red-500/15 border border-red-500/30 rounded-xl text-red-300 text-sm mb-6">
                <XCircle className="w-4 h-4 shrink-0" />
                El pago no pudo procesarse. Podés intentarlo de nuevo.
            </div>
        );
    }
    return null;
}

export default function Billing() {
    const [searchParams] = useSearchParams();
    const paymentStatus = searchParams.get('status');

    const [tenantId, setTenantId] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [sub, setSub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paying, setPaying] = useState(null); // plan value being processed

    useEffect(() => {
        fetchMe(getToken())
            .then(me => {
                setTenantId(me.tenant_id);
                setUserEmail(me.email || '');
                return fetchBillingStatus(me.tenant_id);
            })
            .then(data => {
                setSub(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleSubscribe = async (plan) => {
        if (!tenantId || paying) return;
        setPaying(plan);
        try {
            const data = await createSubscription(tenantId, plan, userEmail);
            window.location.href = data.init_point;
        } catch (err) {
            alert(err.message || 'Error al iniciar el pago');
            setPaying(null);
        }
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-violet-400" />
            </div>
        );
    }

    const subStatus = sub?.status || 'none';
    const statusInfo = STATUS_LABELS[subStatus] || STATUS_LABELS.none;
    const hasActive = subStatus === 'active';

    const formatDate = (iso) => {
        if (!iso) return null;
        return new Date(iso).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <div className="flex-1 bg-transparent text-white overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#060612]/90 backdrop-blur-xl border-b border-violet-500/15 px-6 py-4">
                <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-violet-400" />
                    <div>
                        <h1 className="text-base font-bold text-white">Facturación</h1>
                        <p className="text-xs text-zinc-400 mt-0.5">Gestioná tu suscripción</p>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
                <StatusBanner status={paymentStatus} />

                {/* Estado actual */}
                {subStatus !== 'none' && (
                    <section className="bg-white/[0.04] rounded-2xl border border-violet-500/15 p-5">
                        <p className="text-xs text-zinc-400 mb-3 font-medium uppercase tracking-wide">Suscripción actual</p>
                        <div className="flex items-center gap-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-white font-semibold capitalize">{sub.plan}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full border ${statusInfo.classes}`}>
                                        {statusInfo.label}
                                    </span>
                                </div>
                                {sub.period_end && (
                                    <p className="text-xs text-zinc-500 mt-1">
                                        {hasActive ? 'Vence el' : 'Venció el'} {formatDate(sub.period_end)}
                                    </p>
                                )}
                            </div>
                            {!hasActive && (
                                <div className="ml-auto flex items-center gap-1.5 text-xs text-amber-400">
                                    <AlertTriangle className="w-3.5 h-3.5" />
                                    Renovar para continuar
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Planes */}
                <div>
                    <p className="text-xs text-zinc-400 mb-4 font-medium uppercase tracking-wide">
                        {hasActive ? 'Cambiar plan' : 'Elegí tu plan'}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {PLANS.map(plan => {
                            const isCurrentPlan = sub?.plan === plan.value && hasActive;
                            return (
                                <div
                                    key={plan.value}
                                    className={`rounded-2xl border p-5 flex flex-col gap-4 transition-all ${
                                        plan.highlighted
                                            ? 'bg-violet-500/10 border-violet-500/40'
                                            : 'bg-white/[0.04] border-violet-500/15'
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-white">{plan.name}</span>
                                            {plan.highlighted && (
                                                <span className="text-xs px-1.5 py-0.5 bg-violet-500/30 border border-violet-500/40 text-violet-300 rounded-full">Popular</span>
                                            )}
                                        </div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-bold text-white">{plan.price}</span>
                                            <span className="text-zinc-500 text-sm">{plan.period}</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-1.5 flex-1">
                                        {plan.features.map(f => (
                                            <li key={f} className="flex items-center gap-2 text-xs text-zinc-300">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => handleSubscribe(plan.value)}
                                        disabled={isCurrentPlan || !!paying}
                                        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                            isCurrentPlan
                                                ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 cursor-default'
                                                : plan.highlighted
                                                    ? 'bg-violet-600 hover:bg-violet-500 text-white disabled:opacity-50 disabled:cursor-not-allowed'
                                                    : 'bg-white/[0.08] hover:bg-white/[0.14] border border-violet-500/20 text-white disabled:opacity-50 disabled:cursor-not-allowed'
                                        }`}
                                    >
                                        {paying === plan.value ? (
                                            <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Redirigiendo...</>
                                        ) : isCurrentPlan ? (
                                            <><CheckCircle2 className="w-3.5 h-3.5" /> Plan activo</>
                                        ) : (
                                            <><Zap className="w-3.5 h-3.5" /> {hasActive ? 'Cambiar a ' + plan.name : 'Suscribirse'}</>
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <p className="text-xs text-zinc-600 text-center">
                    Los pagos se procesan de forma segura a través de MercadoPago.
                    Al suscribirte, aceptás los términos del servicio.
                </p>
            </div>
        </div>
    );
}
