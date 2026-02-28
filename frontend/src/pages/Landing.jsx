import React from 'react';
import { ArrowRight, CheckCircle2, Zap, Shield, MessageSquare, TrendingUp, Clock, Users, Sparkles, ChevronRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
            </div>

            {/* Nav */}
            <nav className="border-b border-white/10 bg-black/80 backdrop-blur-xl fixed w-full z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 via-purple-500 to-emerald-500 rounded-xl flex items-center justify-center relative">
                                <Sparkles className="w-5 h-5 text-white" />
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-xl blur-lg opacity-40" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Ventra AI</span>
                        </div>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl hover:from-indigo-500 hover:to-indigo-400 transition-all font-medium text-sm shadow-lg shadow-indigo-500/40"
                        >
                            Ver Demo
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span>Agentes de IA Especializados · WhatsApp Nativo</span>
                    </div>

                    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                            Califica leads 24/7
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                            sin configurar nada
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Conectá tu WhatsApp Business, elegí tu industria y desplegá un agente especialista entrenado para calificar compradores reales. Sin flujos, sin prompts, sin pérdida de tiempo.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl hover:from-indigo-500 hover:to-indigo-400 transition-all font-semibold text-lg shadow-2xl shadow-indigo-500/40 flex items-center space-x-2"
                        >
                            <span>Ver Demo en Vivo</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => navigate('/settings')}
                            className="px-8 py-4 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all font-semibold text-lg border border-white/10"
                        >
                            Configurar Agente
                        </button>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>API oficial de WhatsApp</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>Sin contratos largos</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                            <span>Especializado en tu industria</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problema */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Los chatbots genéricos</span>
                            <br />
                            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">no califican, espantan</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Configurarlos lleva semanas y terminan dando respuestas que alejan a tus mejores compradores.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-5">
                        {[
                            { icon: Clock, title: 'Semanas de configuración', desc: 'Flujos interminables, prompts que nunca funcionan, desarrolladores caros.', color: 'red' },
                            { icon: MessageSquare, title: 'Respuestas sin contexto', desc: 'Inventan precios, confunden servicios, y el cliente se va con la competencia.', color: 'red' },
                            { icon: TrendingUp, title: 'Leads que se enfrían', desc: 'Mientras ajustás el bot, tus leads ya hablaron con alguien más.', color: 'red' },
                        ].map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="bg-red-500/5 p-7 rounded-2xl border border-red-500/15 hover:border-red-500/30 transition-all">
                                <div className="w-10 h-10 bg-red-500/15 rounded-xl flex items-center justify-center mb-4">
                                    <Icon className="w-5 h-5 text-red-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                                <p className="text-gray-400 text-sm">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solución */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Un especialista de ventas,</span>
                            <br />
                            <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">no un bot genérico</span>
                        </h2>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-emerald-500/10 rounded-3xl p-8 md:p-10 border border-white/10">
                        <div className="grid md:grid-cols-2 gap-10 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-7">Elegís tu rubro → Activás → Recibís leads calificados</h3>
                                <div className="space-y-5">
                                    {[
                                        { n: '1', title: 'Seleccioná tu industria', desc: 'Inmobiliaria, clínica, concesionaria...', color: 'indigo' },
                                        { n: '2', title: 'Conectá tu WhatsApp Business', desc: 'Integración oficial con API de Meta. Setup en minutos.', color: 'indigo' },
                                        { n: '3', title: 'Recibís leads calificados', desc: 'El agente conversa, califica y te pasa solo oportunidades reales.', color: 'emerald' },
                                    ].map(({ n, title, desc, color }) => (
                                        <div key={n} className="flex items-start space-x-4">
                                            <div className={`w-7 h-7 bg-${color}-600 rounded-full flex items-center justify-center shrink-0 mt-0.5`}>
                                                <span className="text-white text-xs font-bold">{n}</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white">{title}</p>
                                                <p className="text-gray-400 text-sm">{desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Mock chat */}
                            <div className="bg-black/50 rounded-2xl p-5 border border-white/10">
                                <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-white/10">
                                    <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-white text-sm">Ana · Agente Inmobiliaria</p>
                                        <p className="text-xs text-emerald-400 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                            Activa ahora
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3 text-sm">
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                        <p className="text-gray-500 text-xs mb-1">Cliente · 10:23</p>
                                        <p className="text-gray-200">Hola, busco depto 2 ambientes en Palermo</p>
                                    </div>
                                    <div className="bg-indigo-500/15 rounded-xl p-3 ml-6 border border-indigo-500/20">
                                        <p className="text-indigo-400 text-xs mb-1">Ana · 10:23</p>
                                        <p className="text-gray-200">Perfecto, tengo varias opciones en Palermo. ¿Cuál es tu presupuesto aproximado?</p>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                        <p className="text-gray-500 text-xs mb-1">Cliente · 10:24</p>
                                        <p className="text-gray-200">Hasta $200.000, para marzo</p>
                                    </div>
                                    <div className="bg-emerald-500/15 border border-emerald-500/25 rounded-xl p-3">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                            <p className="text-emerald-300 font-medium text-xs">Lead calificado — notificación enviada a tu equipo</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto relative z-10">
                    <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Construido para cerrar ventas, no para experimentar
                    </h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        {[
                            { icon: Sparkles, title: 'Pre-entrenado por industria', desc: 'Scripts, objeciones y técnicas de cierre específicas de tu rubro. Sin empezar de cero.', accent: 'indigo' },
                            { icon: Users, title: 'Handoff inteligente', desc: 'El agente sabe cuándo transferir: interés real, objeciones complejas, solicitud de contacto.', accent: 'emerald' },
                            { icon: MessageSquare, title: 'WhatsApp nativo', desc: 'API oficial de Meta. Tus clientes hablan donde ya están, sin instalar nada.', accent: 'emerald' },
                            { icon: Shield, title: 'Nunca inventa datos', desc: 'Solo responde con información de tu base de conocimiento. Cero alucinaciones en precios.', accent: 'indigo' },
                        ].map(({ icon: Icon, title, desc, accent }) => (
                            <div key={title} className={`group bg-white/[0.03] p-7 rounded-2xl border border-white/10 hover:border-${accent}-500/40 transition-all`}>
                                <div className={`w-10 h-10 bg-${accent}-500/15 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <Icon className={`w-5 h-5 text-${accent}-400`} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                                <p className="text-gray-400 text-sm">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA final */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <div className="bg-gradient-to-br from-indigo-600/20 via-purple-600/15 to-emerald-600/20 rounded-3xl p-10 md:p-14 border border-white/10">
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Dejá de configurar. Empezá a cerrar.
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                            Sin contratos largos, sin sorpresas. Tu agente listo para calificar desde el día uno.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="group px-9 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl hover:from-indigo-500 hover:to-indigo-400 transition-all font-bold text-lg shadow-xl shadow-indigo-500/30 flex items-center justify-center space-x-2"
                            >
                                <span>Ver el Dashboard</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => navigate('/settings')}
                                className="px-9 py-4 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all font-bold text-lg border border-white/10"
                            >
                                Configurar Agente
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-10 px-4 sm:px-6 lg:px-8 mt-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-white">Ventra AI</span>
                            <span className="text-gray-600 text-sm">Agentes de IA para WhatsApp Business</span>
                        </div>
                        <p className="text-sm text-gray-600">© 2026 Ventra AI · Todos los derechos reservados</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
