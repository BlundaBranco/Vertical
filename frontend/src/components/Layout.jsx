import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, BarChart2, LogOut, Bot, Menu, X } from 'lucide-react';
import { logout } from '../api/client';

export default function Layout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { id: 'analytics', label: 'Analytics', icon: BarChart2, path: '/analytics' },
        { id: 'settings', label: 'Configuración', icon: Settings, path: '/settings' },
    ];

    const isActive = (path) => location.pathname === path;

    const handleNav = (path) => {
        navigate(path);
        setSidebarOpen(false);
    };

    return (
        <div className="h-screen text-white flex overflow-hidden relative">

            {/* Fondo global de la app — absolute para evitar stacking context */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid-sm" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/12 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-64 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-3xl" />
            </div>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/70 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed h-full z-50 w-64 flex flex-col
                bg-[#060612]/97 border-r border-violet-500/15 backdrop-blur-xl
                transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="p-5 border-b border-violet-500/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/vertical.png" alt="Vertical" className="h-9 w-auto" />
                        <div>
                            <span className="text-base font-bold text-white tracking-tight">Vertical</span>
                            <p className="text-xs text-zinc-500">Agentes IA</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-zinc-400 hover:text-white transition-colors p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-0.5">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNav(item.path)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                                isActive(item.path)
                                    ? 'bg-violet-500/15 text-violet-300 border border-violet-500/25'
                                    : 'text-zinc-300 hover:bg-violet-500/10 hover:text-white'
                            }`}
                        >
                            <item.icon className={`w-4 h-4 ${isActive(item.path) ? 'text-violet-400' : ''}`} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Plan badge */}
                <div className="px-3 pb-2">
                    <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl px-3 py-2.5">
                        <p className="text-xs text-violet-300 font-semibold">Plan Inmobiliaria</p>
                        <p className="text-xs text-zinc-500 mt-0.5">Agente Ana activo</p>
                    </div>
                </div>

                {/* Status Bot */}
                <div className="px-3 pb-3">
                    <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-3 flex items-center gap-2.5">
                        <div className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                        <Bot className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-xs text-emerald-400 font-medium">Bot Activo</span>
                    </div>
                </div>

                {/* Logout */}
                <div className="p-3 border-t border-violet-500/10">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-500 hover:bg-white/5 hover:text-zinc-300 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium text-sm">Salir</span>
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col lg:ml-64 min-w-0 h-screen overflow-hidden">
                {/* Mobile top bar */}
                <div className="lg:hidden flex items-center px-4 py-3 bg-[#060612]/80 border-b border-violet-500/10 shrink-0 backdrop-blur-xl">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-zinc-400 hover:text-white transition-colors p-1 mr-3"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2">
                        <img src="/vertical.png" alt="Vertical" className="h-7 w-auto" />
                        <span className="font-bold text-white text-sm">Vertical</span>
                    </div>
                </div>

                <main className="flex-1 flex flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
