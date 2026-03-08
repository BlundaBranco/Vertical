import { useEffect } from 'react';

export default function GoogleCallback() {
    useEffect(() => {
        const hash = new URLSearchParams(window.location.hash.substring(1));
        const id_token = hash.get('id_token');
        const error = hash.get('error');

        if (window.opener) {
            window.opener.postMessage(
                { type: 'google_auth', id_token: id_token || null, error: error || null },
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
