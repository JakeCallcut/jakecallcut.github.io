import type { ReactNode } from 'react';
import { X } from 'lucide-react';

export default function Sheet({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: ReactNode }) {
  // Polished right-side panel for mobile nav
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      {/* Slight overlay but keep header visible; clicking overlay closes sheet */}
      <div className="absolute inset-0 bg-black/10" onClick={() => onOpenChange(false)} />
      <aside className="fixed right-4 top-6 w-72 p-6 shadow-2xl bg-card text-card-foreground rounded-2xl transform transition-transform duration-200 translate-x-0">
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold">Jake Callcut</div>
          <button aria-label="Close menu" className="p-2 rounded-full hover:bg-primary/5" onClick={() => onOpenChange(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4 text-lg">
          {children}
        </div>

      </aside>
    </div>
  );
}
