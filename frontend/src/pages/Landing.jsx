import React from 'react';
import { ArrowRight, CheckCircle2, Zap, Shield, MessageSquare, Users, Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

function Reveal({ children, className = '', style = {} }) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            style={style}
            className={`transition-[opacity,transform] duration-700 ease-out ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            } ${className}`}
        >
            {children}
        </div>
    );
}

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen text-white relative overflow-x-hidden">

            {/* ── Fondo global ──────────────────────────────────────────── */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid" />
                {/* Orbs más brillantes */}
                <div className="absolute -top-40 right-0 w-[800px] h-[800px] bg-violet-600/28 rounded-full blur-3xl" />
                <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-indigo-600/18 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-3xl" />
                {/* Vignette reducida para que el fondo se vea */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,#060612_100%)]" />
            </div>

            {/* ── Nav ─────────────────────────────────────────────────── */}
            <nav className="fixed w-full z-50 border-b border-white/[0.06] bg-[#060612]/85 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-14">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <img src="/vertical.png" alt="Vertical" className="h-8 w-auto shrink-0" />
                            <span className="text-base font-semibold text-white tracking-tight">Vertical</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                onClick={() => navigate('/login')}
                                className="hidden sm:block px-4 py-1.5 text-sm text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                            >
                                Iniciar sesión
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="px-3 sm:px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-violet-600/25 whitespace-nowrap"
                            >
                                Crear cuenta
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ── Todo el contenido sobre el fondo ────────────────────── */}
            <div className="relative z-10">

                {/* ── Hero ─────────────────────────────────────────────── */}
                <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/12 rounded-full blur-3xl pointer-events-none" />

                    <div className="max-w-6xl mx-auto relative">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                            {/* Texto */}
                            <div className="text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 bg-violet-500/12 border border-violet-500/25 text-violet-300 px-3 py-1.5 rounded-full text-xs font-medium mb-7 animate-fade-in anim-d100">
                                    <Sparkles className="w-3 h-3" />
                                    Empleados Digitales Especializados
                                </div>

                                <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.08] mb-5 animate-fade-in-up anim-d200">
                                    El empleado que<br />
                                    <span className="text-violet-400">nunca para.</span>
                                </h1>

                                <p className="text-base text-zinc-300 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0 animate-fade-in-up anim-d300">
                                    Un agente de IA entrenado para tu negocio que opera en WhatsApp 24/7. Califica leads, responde clientes y te avisa cuando hay una oportunidad real.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-in-up anim-d400">
                                    <button
                                        onClick={() => navigate('/register')}
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-violet-600/30"
                                    >
                                        Crear cuenta gratis
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <a
                                        href="#como-funciona"
                                        className="flex items-center justify-center gap-2 px-6 py-3 border border-white/12 hover:border-violet-500/40 text-zinc-200 hover:text-white rounded-xl font-medium text-sm transition-all hover:scale-[1.02]"
                                    >
                                        Ver cómo funciona
                                    </a>
                                </div>

                                <div className="mt-8 flex flex-wrap gap-5 text-xs text-zinc-400 justify-center lg:justify-start animate-fade-in anim-d500">
                                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> API oficial de WhatsApp</span>
                                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Sin contratos</span>
                                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Activo en 24h</span>
                                </div>
                            </div>

                            {/* Chat mockup */}
                            <div className="relative animate-slide-in-right anim-d300">
                                <div className="relative animate-float">
                                    <div className="absolute -inset-8 bg-violet-600/10 rounded-3xl blur-3xl" />
                                    <div className="relative bg-[#0D0A1E]/90 backdrop-blur-sm border border-violet-500/25 rounded-2xl p-5 shadow-2xl shadow-violet-900/30">
                                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/[0.06]">
                                            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                                <span className="text-sm font-bold text-white">A</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-white">Ana · Agente Inmobiliaria</p>
                                                <p className="text-xs text-emerald-400 flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block" />
                                                    Activa ahora
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-3 text-sm">
                                            <div className="max-w-[85%] bg-white/[0.07] border border-white/[0.08] rounded-xl px-3.5 py-2.5">
                                                <p className="text-zinc-500 text-xs mb-1">Cliente · 10:23</p>
                                                <p className="text-zinc-100">Hola, busco depto 2 ambientes en Palermo, hasta USD 200k</p>
                                            </div>
                                            <div className="max-w-[85%] ml-auto bg-violet-500/18 border border-violet-500/30 rounded-xl px-3.5 py-2.5">
                                                <p className="text-violet-400 text-xs mb-1">Ana · 10:23</p>
                                                <p className="text-zinc-100">Perfecto, tengo varias opciones en ese rango. ¿Es para vivir o invertir?</p>
                                            </div>
                                            <div className="max-w-[85%] bg-white/[0.07] border border-white/[0.08] rounded-xl px-3.5 py-2.5">
                                                <p className="text-zinc-500 text-xs mb-1">Cliente · 10:24</p>
                                                <p className="text-zinc-100">Para vivir, necesito para marzo que viene</p>
                                            </div>
                                            <div className="flex items-center gap-2 bg-emerald-500/12 border border-emerald-500/25 rounded-xl px-3 py-2.5">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                                <div>
                                                    <p className="text-xs text-emerald-300 font-semibold">Lead calificado</p>
                                                    <p className="text-xs text-zinc-400">Notificación enviada · 10:24</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* ── Stats bar ─────────────────────────────────────────── */}
                <section className="py-10 border-y border-white/[0.07] bg-white/[0.025]">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Reveal>
                            <div className="grid grid-cols-3 gap-8 text-center">
                                {[
                                    { value: '24/7', label: 'Siempre activo', color: 'text-violet-400' },
                                    { value: '< 30 seg', label: 'Tiempo de respuesta', color: 'text-indigo-400' },
                                    { value: '0', label: 'Configuración técnica', color: 'text-emerald-400' },
                                ].map(({ value, label, color }) => (
                                    <div key={label}>
                                        <p className={`text-2xl sm:text-3xl font-bold ${color} tracking-tight`}>{value}</p>
                                        <p className="text-xs text-zinc-400 mt-1">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── Problema ──────────────────────────────────────────── */}
                <section className="py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <Reveal>
                            <p className="text-xs text-violet-400 uppercase tracking-widest mb-4 font-medium">El problema</p>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">
                                Los leads llegan, pero se enfrían.<br />
                                <span className="text-zinc-400">Tu equipo no da abasto.</span>
                            </h2>
                        </Reveal>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {[
                                { title: 'Horas sin responder', desc: 'Mientras atendés una consulta, otros tres leads se van a la competencia.' },
                                { title: 'Curiosos que no compran', desc: 'Tu equipo pierde tiempo con leads sin presupuesto ni intención real de compra.' },
                                { title: 'Información desactualizada', desc: 'Clientes preguntan por productos o servicios que ya no están disponibles. Mala experiencia.' },
                            ].map(({ title, desc }, i) => (
                                <Reveal key={title} style={{ transitionDelay: `${i * 100}ms` }}>
                                    <div className="p-5 bg-red-500/[0.07] border border-red-500/20 rounded-xl hover:-translate-y-0.5 transition-transform duration-200">
                                        <div className="w-7 h-7 bg-red-500/15 rounded-lg flex items-center justify-center mb-3">
                                            <X className="w-3.5 h-3.5 text-red-400" />
                                        </div>
                                        <h3 className="text-sm font-semibold text-white mb-1.5">{title}</h3>
                                        <p className="text-xs text-zinc-300 leading-relaxed">{desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Cómo funciona ─────────────────────────────────────── */}
                <section id="como-funciona" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                    {/* Luz ambiente de sección */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-violet-700/10 rounded-full blur-3xl" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
                    </div>

                    <div className="max-w-5xl mx-auto relative">
                        <Reveal className="text-center sm:text-left">
                            <p className="text-xs text-violet-400 uppercase tracking-widest mb-4 font-medium">Cómo funciona</p>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">
                                Tres pasos. Tu agente operando.
                            </h2>
                        </Reveal>

                        <div className="grid sm:grid-cols-3 gap-6">
                            {[
                                {
                                    n: '01',
                                    title: 'Configurás en 3 minutos',
                                    desc: 'Nombre del agente, tono, zonas. Sin código, sin técnicos.',
                                    glowClass: 'bg-violet-500/25',
                                    borderClass: 'border-violet-500/30',
                                    bgClass: 'bg-violet-950/55',
                                    numClass: 'text-violet-400',
                                },
                                {
                                    n: '02',
                                    title: 'Vinculamos tu WhatsApp',
                                    desc: 'Nuestro equipo conecta tu número Business en menos de 24 horas.',
                                    glowClass: 'bg-indigo-500/25',
                                    borderClass: 'border-indigo-500/30',
                                    bgClass: 'bg-indigo-950/55',
                                    numClass: 'text-indigo-400',
                                },
                                {
                                    n: '03',
                                    title: 'Recibís leads calificados',
                                    desc: 'El agente conversa, filtra y te notifica solo cuando hay una oportunidad real.',
                                    glowClass: 'bg-emerald-500/20',
                                    borderClass: 'border-emerald-500/30',
                                    bgClass: 'bg-emerald-950/50',
                                    numClass: 'text-emerald-400',
                                },
                            ].map(({ n, title, desc, glowClass, borderClass, bgClass, numClass }, i) => (
                                <Reveal key={n} style={{ transitionDelay: `${i * 150}ms` }} className="h-full">
                                    <div className="relative group h-full">
                                        {/* Bomba de luz — glow detrás de la card */}
                                        <div className={`absolute -inset-3 ${glowClass} rounded-2xl blur-2xl transition-opacity duration-500 opacity-75 group-hover:opacity-100`} />
                                        {/* Card */}
                                        <div className={`relative h-full p-6 ${bgClass} border ${borderClass} rounded-2xl hover:-translate-y-1 transition-transform duration-200 backdrop-blur-sm`}>
                                            <div className={`text-6xl font-black ${numClass} opacity-20 mb-5 leading-none tracking-tighter select-none`}>{n}</div>
                                            <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                                            <p className="text-sm text-zinc-300 leading-relaxed">{desc}</p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Features ──────────────────────────────────────────── */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent pointer-events-none" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="max-w-5xl mx-auto relative">
                        <Reveal>
                            <p className="text-xs text-violet-400 uppercase tracking-widest mb-4 font-medium">Features</p>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">
                                Construido para cerrar ventas,<br />
                                <span className="text-zinc-400">no para experimentar.</span>
                            </h2>
                        </Reveal>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { icon: Sparkles, title: 'Entrenado para tu rubro', desc: 'El agente entiende el vocabulario y las objeciones de tu industria. Sin configuración técnica inicial.', violet: true },
                                { icon: Users, title: 'Handoff inteligente', desc: 'Cuando el lead califica, el bot te avisa y tu equipo toma el control. Sin fricción.', violet: false },
                                { icon: MessageSquare, title: 'WhatsApp nativo', desc: 'API oficial de Meta. Tus clientes hablan donde ya están, sin instalar nada nuevo.', violet: false },
                                { icon: Shield, title: 'Nunca inventa datos', desc: 'Solo responde con información de tu knowledge base. Sin alucinaciones ni errores de precios.', violet: true },
                            ].map(({ icon: Icon, title, desc, violet }, i) => (
                                <Reveal key={title} style={{ transitionDelay: `${i * 100}ms` }}>
                                    <div className={`group p-5 rounded-xl border transition-all duration-200 cursor-default hover:-translate-y-0.5 ${
                                        violet
                                            ? 'bg-violet-950/35 border-violet-500/22 hover:border-violet-500/40 hover:bg-violet-950/50'
                                            : 'bg-white/[0.04] border-white/[0.10] hover:border-violet-500/30 hover:bg-violet-950/20'
                                    }`}>
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${violet ? 'bg-violet-500/25' : 'bg-white/[0.08]'}`}>
                                            <Icon className={`w-4 h-4 ${violet ? 'text-violet-300' : 'text-zinc-200'}`} />
                                        </div>
                                        <h3 className="text-sm font-semibold text-white mb-1.5">{title}</h3>
                                        <p className="text-xs text-zinc-300 leading-relaxed">{desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA final ─────────────────────────────────────────── */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.14)_0%,transparent_65%)] pointer-events-none" />
                    <div className="max-w-2xl mx-auto text-center relative">
                        <Reveal>
                            <div className="inline-flex items-center gap-2 bg-violet-500/12 border border-violet-500/25 text-violet-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
                                <Zap className="w-3.5 h-3.5" />
                                Empezá hoy
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                                Tu agente listo<br />en 24 horas.
                            </h2>
                            <p className="text-zinc-300 text-sm mb-8 leading-relaxed">
                                Sin contratos largos. Sin sorpresas. Calificando leads desde el día uno.
                            </p>
                            <button
                                onClick={() => navigate('/register')}
                                className="inline-flex items-center gap-2.5 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold text-sm transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xl shadow-violet-600/35"
                            >
                                Crear cuenta gratis
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Reveal>
                    </div>
                </section>

                {/* ── Footer ────────────────────────────────────────────── */}
                <footer className="border-t border-white/[0.06] py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5">
                            <img src="/vertical.png" alt="Vertical" className="h-6 w-auto" />
                            <span className="text-sm font-semibold text-white">Vertical</span>
                            <span className="text-zinc-500 text-xs">· Empleados Digitales Especializados</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <a href="/privacy" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Privacidad</a>
                            <a href="mailto:info@somosvertical.ar" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Contacto</a>
                            <p className="text-xs text-zinc-600">© 2026 Vertical</p>
                        </div>
                    </div>
                </footer>

            </div>{/* fin relative z-10 */}
        </div>
    );
}
