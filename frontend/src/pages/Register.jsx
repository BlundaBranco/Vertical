import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register, saveToken, loginWithFacebook, facebookAuth, loginWithGoogle, googleAuth } from '../api/auth';

function FacebookIcon() {
    return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );
}

function GoogleIcon() {
    return (
        <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
    );
}

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fbLoading, setFbLoading] = useState(false);
    const [gLoading, setGLoading] = useState(false);

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

    const handleGoogle = async () => {
        setError('');
        setGLoading(true);
        try {
            const credential = await loginWithGoogle();
            const data = await googleAuth(credential);
            saveToken(data.access_token);
            navigate(data.is_new ? '/onboarding' : '/dashboard');
        } catch (err) {
            if (err.message !== 'Login cancelado') {
                setError(err.message || 'Error al registrarse con Google');
            }
        } finally {
            setGLoading(false);
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
                setError(err.message || 'Error al registrarse con Facebook');
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
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/12 rounded-full blur-3xl" />
                <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-violet-500/8 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-sm animate-fade-in">
                <div className="flex items-center justify-center gap-2.5 mb-8">
                    <img src="/vertical.png" alt="Vertical" className="h-9 w-auto" />
                    <span className="text-lg font-bold text-white tracking-tight">Vertical</span>
                </div>

                <div className="bg-violet-950/25 border border-violet-500/15 rounded-2xl p-7 space-y-4 backdrop-blur-sm shadow-2xl shadow-violet-900/25">
                    <div className="mb-1">
                        <h1 className="text-base font-semibold text-white">Crear cuenta</h1>
                        <p className="text-xs text-zinc-400 mt-0.5">Tu empleado digital listo en minutos</p>
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
                                placeholder="Mínimo 8 caracteres"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-zinc-400 mb-1.5">Confirmá la contraseña</label>
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
                            disabled={loading || fbLoading || gLoading}
                            className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-600/20"
                        >
                            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                        </button>
                    </form>

                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-violet-500/15" />
                        <span className="text-xs text-zinc-600">o registrate con</span>
                        <div className="flex-1 h-px bg-violet-500/15" />
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogle}
                        disabled={gLoading || loading}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-white hover:bg-zinc-100 text-zinc-800 text-xs font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <GoogleIcon />
                        {gLoading ? '...' : 'Continuar con Google'}
                    </button>
                </div>

                <p className="text-center text-xs text-zinc-500 mt-5">
                    ¿Ya tenés cuenta?{' '}
                    <Link to="/login" className="text-violet-400 hover:text-violet-300 transition-colors font-medium">
                        Iniciá sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}
