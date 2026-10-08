import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const THEME_COLORS: Record<Theme, string> = { light: '#efefed', dark: '#0b0b0b' };
const listeners = new Set<() => void>();

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

function getTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  listeners.forEach(listener => listener());
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
  applyTheme(theme);
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // Follow the system setting until the visitor picks a theme themselves.
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const onSystemChange = (event: MediaQueryListEvent) => {
    if (!readStoredTheme()) applyTheme(event.matches ? 'dark' : 'light');
  };
  media.addEventListener?.('change', onSystemChange);

  return () => {
    listeners.delete(listener);
    media.removeEventListener?.('change', onSystemChange);
  };
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, () => 'light' as Theme);
}
