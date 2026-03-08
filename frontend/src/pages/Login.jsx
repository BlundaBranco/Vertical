import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, saveToken, loginWithFacebook, facebookAuth } from '../api/auth';

function FacebookIcon() {
    return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );
}

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fbLoading, setFbLoading] = useState(false);

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

    const handleFacebook = async () => {
        setError('');
        setFbLoading(true);
        try {
            const accessToken = await loginWithFacebook();
            const data = await facebookAuth(accessToken);
            saveToken(data.access_token);
            navigate(data.is_new ? '/onboarding' : '/dashboard');
        } catch (err) {
            if (err.message !== 'Login cancelado') {
                setError(err.message || 'Error al iniciar sesión con Facebook');
            }
        } finally {
            setFbLoading(false);
        }
    };

    const input = "w-full bg-violet-950/20 border border-violet-500/15 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500/50 transition-all";

    return (
        <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-3xl" />
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-600/12 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-violet-500/8 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-sm animate-fade-in">
                <div className="flex items-center justify-center gap-2.5 mb-8">
                    <img src="/vertical.png" alt="Vertical" className="h-9 w-auto" />
                    <span className="text-lg font-bold text-white tracking-tight">Vertical</span>
                </div>

                <div className="bg-violet-950/25 border border-violet-500/15 rounded-2xl p-7 space-y-4 backdrop-blur-sm shadow-2xl shadow-violet-900/25">
                    <div className="mb-1">
                        <h1 className="text-base font-semibold text-white">Iniciar sesión</h1>
                        <p className="text-xs text-zinc-400 mt-0.5">Accedé a tu panel de control</p>
                    </div>

                    {/* Facebook Login */}
                    <button
                        type="button"
                        onClick={handleFacebook}
                        disabled={fbLoading || loading}
                        className="w-full flex items-center justify-center gap-2.5 py-2.5 bg-[#1877F2] hover:bg-[#1565D8] text-white text-sm font-medium rounded-lg transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FacebookIcon />
                        {fbLoading ? 'Conectando...' : 'Continuar con Facebook'}
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-violet-500/15" />
                        <span className="text-xs text-zinc-600">o</span>
                        <div className="flex-1 h-px bg-violet-500/15" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs text-zinc-400 mb-1.5">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                autoFocus
                                className={input}
                                placeholder="vos@tunegocio.com"
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
                            disabled={loading || fbLoading}
                            className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-600/20"
                        >
                            {loading ? 'Ingresando...' : 'Ingresar'}
                        </button>
                    </form>
                </div>

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
