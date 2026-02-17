import { useState, useEffect } from 'react';

/**
 * Detect the user's `prefers-reduced-motion` setting.
 *
 * Listens for changes so the value stays in sync if the user toggles the
 * OS-level preference while the page is open.
 *
 * @returns `{ reducedMotion: boolean }` — `true` when the user prefers reduced motion.
 */
export function useReducedMotion(): { reducedMotion: boolean } {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return { reducedMotion };
}
