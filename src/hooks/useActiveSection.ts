import { useEffect, useState } from 'react';

// Tracks which section currently sits in the middle band of the viewport.
export default function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') {
      setActive(null);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    const elements = ids.map(id => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [ids, enabled]);

  return active;
}
