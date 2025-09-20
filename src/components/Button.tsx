import type { ReactNode } from 'react';

export default function Button({ children, variant = 'primary', size = 'md', ...props }: { children: ReactNode; variant?: 'primary' | 'secondary' | 'outline'; size?: 'sm' | 'md'; [key: string]: any }) {
  const base = 'inline-flex items-center justify-center font-medium rounded-2xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary';
  const variants = {
    primary: `${base} bg-primary text-white hover:bg-primary/90`,
    secondary: `${base} bg-secondary text-white hover:bg-secondary/90`,
    outline: `${base} border border-primary text-primary bg-transparent hover:bg-primary/10`,
  };
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-5 py-2 text-base',
  };
  return <button className={`${variants[variant]} ${sizes[size]}`} {...props}>{children}</button>;
}
