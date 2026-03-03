import React from 'react';
import { ArrowRight, CheckCircle2, Zap, Shield, MessageSquare, TrendingUp, Clock, Users, Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#09090b] text-white">

            {/* Nav sticky */}
            <nav className="border-b border-white/[0.07] bg-[#09090b]/90 backdrop-blur-xl fixed w-full z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-14">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-base font-semibold text-white tracking-tight">Ventra AI</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => navigate('/login')}
                                className="px-4 py-1.5 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                            >
                                Iniciar sesión
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                Crear cuenta
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1.5 rounded-full text-xs font-medium mb-8">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
                        </span>
                        Para inmobiliarias
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] mb-6">
                        Tu inmobiliaria<br />
                        <span className="text-indigo-400">califica sola.</span>
                    </h1>

                    <p className="text-lg text-gray-400 mb-10 max-w-2xl leading-relaxed">
                        Un agente de IA entrenado para inmobiliarias que opera en WhatsApp 24/7, separa curiosos de compradores reales y te avisa cuando hay una oportunidad.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 items-start">
                        <button
                            onClick={() => navigate('/register')}
                            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-sm transition-colors"
                        >
                            Crear cuenta gratis
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <a
                            href="#como-funciona"
                            className="flex items-center gap-2 px-6 py-3 border border-white/[0.1] text-gray-300 hover:text-white hover:border-white/20 rounded-xl font-medium text-sm transition-all"
                        >
                            Ver cómo funciona
                        </a>
                    </div>

                    {/* Mock chat */}
                    <div className="mt-16 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 max-w-md">
                        <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-white/[0.06]">
                            <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-emerald-400">A</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">Ana</p>
                                <p className="text-xs text-emerald-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" />
                                    Activa ahora
                                </p>
                            </div>
                        </div>
                        <div className="space-y-2.5 text-sm">
                            <div className="max-w-[85%] bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5">
                                <p className="text-gray-400 text-xs mb-1">Cliente · 10:23</p>
                                <p className="text-gray-200">Hola, busco depto 2 amb en Palermo, hasta $200k</p>
                            </div>
                            <div className="max-w-[85%] ml-auto bg-indigo-500/12 border border-indigo-500/20 rounded-xl px-3 py-2.5">
                                <p className="text-indigo-400 text-xs mb-1">Ana · 10:23</p>
                                <p className="text-gray-200">Perfecto, tengo opciones en ese rango. ¿Es para inversión o para vivir?</p>
                            </div>
                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.06]">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <p className="text-xs text-emerald-400 font-medium">Lead calificado — notificación enviada</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats bar */}
            <section className="py-10 border-y border-white/[0.06] bg-white/[0.01]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-3 gap-8 text-center">
                        {[
                            { value: '24/7', label: 'Siempre activo' },
                            { value: '< 30 seg', label: 'Tiempo de respuesta' },
                            { value: '0', label: 'Configuración técnica' },
                        ].map(({ value, label }) => (
                            <div key={label}>
                                <p className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">{value}</p>
                                <p className="text-xs text-gray-500 mt-1">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Problema */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">El problema</p>
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-12">
                        Los leads llegan pero se enfrían.<br />
                        <span className="text-gray-500">No hay tiempo para atender a todos.</span>
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            { title: 'Horas sin responder', desc: 'Mientras atendés una consulta, otros tres leads se van a la competencia.' },
                            { title: 'Curiosos que no compran', desc: 'Tu equipo pierde tiempo con leads sin presupuesto ni intención real.' },
                            { title: 'Inventario desactualizado', desc: 'Clientes preguntan por propiedades que ya no están disponibles.' },
                        ].map(({ title, desc }) => (
                            <div key={title} className="p-5 bg-red-500/[0.04] border border-red-500/[0.12] rounded-xl">
                                <div className="w-6 h-6 bg-red-500/15 rounded-lg flex items-center justify-center mb-3">
                                    <X className="w-3.5 h-3.5 text-red-400" />
                                </div>
                                <h3 className="text-sm font-semibold text-white mb-1.5">{title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cómo funciona */}
            <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Cómo funciona</p>
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-12">
                        Tres pasos y tu agente está operando.
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-8">
                        {[
                            { n: '1', title: 'Creás tu cuenta', desc: 'En 3 minutos configurás el nombre del agente, el tono y las zonas donde trabajás.' },
                            { n: '2', title: 'Vinculamos tu WhatsApp', desc: 'Nuestro equipo conecta tu número de WhatsApp Business en menos de 24 horas.' },
                            { n: '3', title: 'Recibís leads calificados', desc: 'El agente conversa, filtra y te notifica solo cuando hay una oportunidad real.' },
                        ].map(({ n, title, desc }) => (
                            <div key={n} className="flex gap-4">
                                <div className="w-7 h-7 shrink-0 bg-indigo-600 rounded-full flex items-center justify-center mt-0.5">
                                    <span className="text-xs font-bold text-white">{n}</span>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white mb-1.5">{title}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Features</p>
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-12">
                        Construido para inmobiliarias,<br />no para experimentar.
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            { icon: Sparkles, title: 'Entrenado para inmobiliarias', desc: 'El agente entiende términos, objeciones y patrones de compra del rubro. Sin setup inicial.', accent: 'indigo' },
                            { icon: Users, title: 'Handoff inteligente', desc: 'Cuando el lead califica, el bot te avisa y tu equipo toma el control. Sin fricción.', accent: 'emerald' },
                            { icon: MessageSquare, title: 'WhatsApp nativo', desc: 'API oficial de Meta. Tus clientes hablan donde ya están, sin apps nuevas.', accent: 'emerald' },
                            { icon: Shield, title: 'Nunca inventa datos', desc: 'Solo responde con información de tu base de conocimiento. Sin alucinaciones de precios.', accent: 'indigo' },
                        ].map(({ icon: Icon, title, desc, accent }) => (
                            <div key={title} className="p-5 bg-white/[0.02] border border-white/[0.07] rounded-xl hover:border-white/[0.12] transition-colors">
                                <div className={`w-8 h-8 bg-${accent}-500/12 rounded-lg flex items-center justify-center mb-3`}>
                                    <Icon className={`w-4 h-4 text-${accent}-400`} />
                                </div>
                                <h3 className="text-sm font-semibold text-white mb-1.5">{title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA final */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
                        Empezá hoy.
                    </h2>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                        Configuración en 3 minutos. Sin contratos largos. Tu agente listo para calificar desde el día uno.
                    </p>
                    <button
                        onClick={() => navigate('/register')}
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-sm transition-colors"
                    >
                        Crear cuenta gratis
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/[0.06] py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-sm font-medium text-white">Ventra AI</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="/privacy" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Privacidad</a>
                        <p className="text-xs text-gray-700">© 2026 Ventra AI</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
