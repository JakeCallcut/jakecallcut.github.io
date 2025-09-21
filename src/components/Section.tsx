import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ title, children, className = '' }: SectionProps) {
  return (
    <section className={`${className} mb-12`}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
