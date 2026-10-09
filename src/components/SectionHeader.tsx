import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeaderProps {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: 'h1' | 'h2';
}

export default function SectionHeader({ index, label, title, intro, as: Heading = 'h2' }: SectionHeaderProps) {
  return (
    <div className="grid grid-cols-1 gap-y-6 border-t border-line-strong pt-4 lg:grid-cols-12 lg:gap-x-6">
      <p className="label text-muted lg:col-span-3">
        ({index}) {label}
      </p>
      <Reveal className="lg:col-span-9">
        <Heading className="font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.02em]">{title}</Heading>
        {intro && <div className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-2">{intro}</div>}
      </Reveal>
    </div>
  );
}
