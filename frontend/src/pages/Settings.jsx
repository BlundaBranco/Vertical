import React, { useState, useEffect } from 'react';
import { Save, Bot, Building, BookOpen, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { fetchSettings, saveSettings } from '../api/client';
import { fetchMe, getToken } from '../api/auth';

function Toast({ toast }) {
    if (!toast) return null;
    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-xl transition-all ${
            toast.type === 'success'
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-red-500/20 border-red-500/40 text-red-300'
        }`}>
            {toast.type === 'success'
                ? <CheckCircle2 className="w-4 h-4 shrink-0" />
                : <XCircle className="w-4 h-4 shrink-0" />
            }
            <span className="text-sm font-medium">{toast.message}</span>
        </div>
    );
}

export default function Settings() {
    const [tenantId, setTenantId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);
    const [config, setConfig] = useState({
        business_name: '',
        agent_name: '',
        assistant_name: '',
        tone: 'cercano',
        specialty: '',
        catalog_url: '',
        knowledge_base: ''
    });

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    useEffect(() => {
        fetchMe(getToken())
            .then(me => {
                setTenantId(me.tenant_id);
                return fetchSettings(me.tenant_id);
            })
            .then(data => {
                setConfig({
                    business_name: data.business_name || '',
                    agent_name: data.agent_name || '',
                    assistant_name: data.assistant_name || '',
                    tone: data.tone || 'cercano',
                    specialty: data.specialty || '',
                    catalog_url: data.catalog_url || '',
                    knowledge_base: data.knowledge_base || ''
                });
                setLoading(false);
            })
            .catch(() => {
                showToast('No se pudo conectar con el backend.', 'error');
                setLoading(false);
            });
    }, []);

    const handleChange = e => setConfig({ ...config, [e.target.name]: e.target.value });

    const handleSave = async () => {
        setSaving(true);
        try {
            const { ok, data } = await saveSettings(tenantId, config);
            if (ok) {
                showToast('Configuración guardada. El bot ya usa los nuevos datos.');
            } else {
                showToast(data.message || 'Error al guardar. Intentá de nuevo.', 'error');
            }
        } catch {
            showToast('Error de conexión. Verificá que el backend esté corriendo.', 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center bg-black">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3 text-indigo-400" />
                    <p className="text-gray-400 text-sm">Cargando configuración...</p>
                </div>
            </div>
        );
    }

    const inputBase = "w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 transition-all placeholder-gray-600 text-sm";

    return (
        <div className="min-h-full bg-black text-white p-6 overflow-y-auto">
            <Toast toast={toast} />
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white">Configuración del Agente</h2>
                    <p className="text-gray-400 text-sm mt-1">Personalizá tu asistente de IA para que represente tu negocio</p>
                </div>

                <div className="space-y-5">
                    {/* Identidad del negocio */}
                    <section className="bg-white/[0.03] p-5 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2.5 mb-5 text-indigo-400">
                            <Building className="w-5 h-5" />
                            <h3 className="font-semibold">Identidad del Negocio</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-400 mb-1.5 font-medium">Nombre del Negocio</label>
                                <input
                                    name="business_name"
                                    value={config.business_name}
                                    onChange={handleChange}
                                    className={`${inputBase} focus:ring-indigo-500/30 focus:border-indigo-500`}
                                    placeholder="Ej: Inmobiliaria Branc"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1.5 font-medium">Link del Catálogo / Web</label>
                                <input
                                    name="catalog_url"
                                    value={config.catalog_url}
                                    onChange={handleChange}
                                    className={`${inputBase} focus:ring-indigo-500/30 focus:border-indigo-500`}
                                    placeholder="https://tu-catalogo.com"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Personalidad de la IA */}
                    <section className="bg-white/[0.03] p-5 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2.5 mb-5 text-emerald-400">
                            <Bot className="w-5 h-5" />
                            <h3 className="font-semibold">Personalidad de la IA</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-400 mb-1.5 font-medium">Nombre del Asistente</label>
                                <input
                                    name="assistant_name"
                                    value={config.assistant_name}
                                    onChange={handleChange}
                                    className={`${inputBase} focus:ring-emerald-500/30 focus:border-emerald-500`}
                                    placeholder="Ej: Ana"
                                />
                                <p className="text-xs text-gray-600 mt-1">Nombre que usa el bot al presentarse</p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1.5 font-medium">Tono de Voz</label>
                                <select
                                    name="tone"
                                    value={config.tone}
                                    onChange={handleChange}
                                    className={`${inputBase} focus:ring-emerald-500/30 focus:border-emerald-500`}
                                >
                                    <option value="cercano">Cercano y Amable (Recomendado)</option>
                                    <option value="formal">Formal y Ejecutivo</option>
                                    <option value="agresivo">Venta Directa / Rápida</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1.5 font-medium">Nombre del Agente / Equipo</label>
                                <input
                                    name="agent_name"
                                    value={config.agent_name}
                                    onChange={handleChange}
                                    className={`${inputBase} focus:ring-emerald-500/30 focus:border-emerald-500`}
                                    placeholder="Ej: Equipo, Juan, María..."
                                />
                                <p className="text-xs text-gray-600 mt-1">El bot menciona este nombre al hacer handoff</p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1.5 font-medium">Especialidad / Regla de Oro</label>
                                <textarea
                                    name="specialty"
                                    value={config.specialty}
                                    onChange={handleChange}
                                    rows={3}
                                    className={`${inputBase} focus:ring-emerald-500/30 focus:border-emerald-500 resize-none`}
                                    placeholder="Ej: Solo vendemos en Zona Norte. Especializados en deptos de 2 y 3 ambientes."
                                />
                            </div>
                        </div>
                    </section>

                    {/* Base de conocimiento */}
                    <section className="bg-white/[0.03] p-5 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2.5 mb-5 text-purple-400">
                            <BookOpen className="w-5 h-5" />
                            <h3 className="font-semibold">Base de Conocimiento</h3>
                        </div>
                        <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                            Inventario, precios y características
                        </label>
                        <textarea
                            name="knowledge_base"
                            value={config.knowledge_base}
                            onChange={handleChange}
                            rows={12}
                            maxLength={10000}
                            className={`${inputBase} focus:ring-purple-500/30 focus:border-purple-500 resize-none font-mono`}
                            placeholder={`DEPARTAMENTO 2 AMBIENTES - PALERMO
- Precio: $180.000/mes
- Superficie: 65 m²
- Características: Balcón, cocina integrada
- Disponible: inmediato

DEPARTAMENTO 3 AMBIENTES - BELGRANO
- Precio: $250.000/mes
- Superficie: 95 m²
- Características: Terraza, 2 baños, garage`}
                        />
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-purple-400/70">
                                El bot usa esta info para responder preguntas específicas. Si no sabe algo, no inventa.
                            </p>
                            <p className="text-xs text-gray-600">
                                {config.knowledge_base.length}/10000
                            </p>
                        </div>
                    </section>

                    {/* Guardar */}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-500/20"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Guardar Cambios
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
