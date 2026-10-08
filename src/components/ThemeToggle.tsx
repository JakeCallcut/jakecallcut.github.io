import { setTheme, useTheme } from '../lib/theme';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      onClick={() => setTheme(next)}
      className={`group inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-line-strong ${className}`}
    >
      <svg
        viewBox="0 0 20 20"
        className="size-[18px] transition-transform duration-500 ease-out group-hover:rotate-180 dark:rotate-180 dark:group-hover:rotate-0"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 1.75a8.25 8.25 0 0 1 0 16.5Z" fill="currentColor" />
      </svg>
    </button>
  );
}
