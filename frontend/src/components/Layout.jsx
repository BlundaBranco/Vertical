import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, BarChart2, LogOut, Sparkles, Bot, Menu, X } from 'lucide-react';
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
        <div className="h-screen bg-[#0c0c0e] text-white flex overflow-hidden">

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed h-full z-50 w-64 bg-gray-900/95 border-r border-white/10 flex flex-col backdrop-blur-xl
                transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-emerald-500 rounded-xl flex items-center justify-center relative">
                            <Sparkles className="w-6 h-6 text-white relative z-10" />
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-xl blur-lg opacity-50"></div>
                        </div>
                        <div>
                            <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Ventra AI</span>
                            <p className="text-xs text-gray-500">Agentes IA</p>
                        </div>
                    </div>
                    {/* Mobile close */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-400 hover:text-white transition-colors p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNav(item.path)}
                            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all ${
                                isActive(item.path)
                                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium text-sm">{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Status Bot */}
                <div className="px-4 pb-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 flex items-center space-x-2">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                        <Bot className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-emerald-400 font-medium">Bot Activo</span>
                    </div>
                </div>

                {/* Logout */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={logout}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-sm">Salir</span>
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col lg:ml-64 min-w-0 h-screen overflow-hidden">
                {/* Mobile top bar */}
                <div className="lg:hidden flex items-center px-4 py-3 bg-gray-900/50 border-b border-white/10 shrink-0">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-400 hover:text-white transition-colors p-1 mr-3"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-white">Ventra AI</span>
                    </div>
                </div>

                <main className="flex-1 flex flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
