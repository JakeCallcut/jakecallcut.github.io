import type { ReactNode } from 'react';

export default function Badge({ children, variant = 'outline' }: { children: ReactNode; variant?: 'outline' | 'secondary' }) {
  const base = 'inline-block px-3 py-1 rounded-full text-xs font-medium';
  const variants = {
    outline: `${base} border border-primary text-primary bg-transparent`,
    secondary: `${base} bg-primary text-white`,
  };
  return <span className={variants[variant]}>{children}</span>;
}
