import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { register, saveToken } from '../api/auth';

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres');
            return;
        }
        if (password !== confirm) {
            setError('Las contraseñas no coinciden');
            return;
        }
        setLoading(true);
        try {
            const data = await register(email, password);
            saveToken(data.access_token);
            navigate('/onboarding');
        } catch (err) {
            setError(err.message || 'Error al crear la cuenta');
        } finally {
            setLoading(false);
        }
    };

    const input = "w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all";

    return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-semibold text-white tracking-tight">Ventra AI</span>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 space-y-4">
                    <div className="mb-2">
                        <h1 className="text-base font-semibold text-white">Crear cuenta</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Configurá tu agente en minutos</p>
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 mb-1.5">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            autoFocus
                            className={input}
                            placeholder="vos@tuinmobiliaria.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 mb-1.5">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className={input}
                            placeholder="Mínimo 8 caracteres"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 mb-1.5">Confirmá la contraseña</label>
                        <input
                            type="password"
                            value={confirm}
                            onChange={e => setConfirm(e.target.value)}
                            required
                            className={input}
                            placeholder="Repetí tu contraseña"
                        />
                    </div>

                    {error && (
                        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-500 mt-5">
                    ¿Ya tenés cuenta?{' '}
                    <Link to="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                        Iniciá sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}
