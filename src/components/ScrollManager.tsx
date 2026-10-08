import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to the top on page changes, or to the anchored section when the URL has a hash.
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target) {
          const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          target.scrollIntoView?.({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
          return;
        }
      }
      window.scrollTo?.({ top: 0, left: 0, behavior: 'auto' });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}
