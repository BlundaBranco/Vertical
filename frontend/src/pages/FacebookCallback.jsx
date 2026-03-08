import { useEffect } from 'react';

export default function FacebookCallback() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const error = params.get('error');

        if (window.opener) {
            window.opener.postMessage(
                { type: 'facebook_auth', code: code || null, error: error || null },
                window.location.origin
            );
            window.close();
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#060612]">
            <p className="text-zinc-400 text-sm">Autenticando...</p>
        </div>
    );
}
