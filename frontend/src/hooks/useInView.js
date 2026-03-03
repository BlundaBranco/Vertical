import { useEffect, useRef, useState } from 'react';

export function useInView(opts = {}) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.unobserve(el); } },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px', ...opts }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return [ref, inView];
}
