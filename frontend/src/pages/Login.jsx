import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { login, saveToken } from '../api/auth';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await login(email, password);
            saveToken(data.access_token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Credenciales incorrectas');
        } finally {
            setLoading(false);
        }
    };

    const input = "w-full bg-violet-950/20 border border-violet-500/15 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500/50 transition-all";

    return (
        <div className="min-h-screen bg-[#060612] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Fondo */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute inset-0 bg-grid" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-3xl" />
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-600/6 rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-sm">
                <div className="flex items-center justify-center gap-2.5 mb-8">
                    <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-600/30">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight">Ventra AI</span>
                </div>

                <form onSubmit={handleSubmit} className="bg-violet-950/20 border border-violet-500/12 rounded-2xl p-7 space-y-4 backdrop-blur-sm shadow-2xl shadow-violet-900/20">
                    <div className="mb-1">
                        <h1 className="text-base font-semibold text-white">Iniciar sesión</h1>
                        <p className="text-xs text-zinc-500 mt-0.5">Accedé a tu panel de control</p>
                    </div>

                    <div>
                        <label className="block text-xs text-zinc-400 mb-1.5">Email</label>
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
                        <label className="block text-xs text-zinc-400 mb-1.5">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className={input}
                            placeholder="••••••••"
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
                        className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-600/20"
                    >
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>

                <p className="text-center text-xs text-zinc-500 mt-5">
                    ¿No tenés cuenta?{' '}
                    <Link to="/register" className="text-violet-400 hover:text-violet-300 transition-colors font-medium">
                        Crear una
                    </Link>
                </p>
            </div>
        </div>
    );
}
