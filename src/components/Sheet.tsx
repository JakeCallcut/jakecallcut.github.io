import type { ReactNode } from 'react';

export default function Sheet({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: ReactNode }) {
  // Simple sheet for mobile nav
  return open ? (
    <div className="fixed inset-0 z-50 bg-black/40 flex">
      <div className="bg-background w-64 p-6 shadow-2xl">
        {children}
        <button className="mt-4 btn btn-outline" onClick={() => onOpenChange(false)}>Close</button>
      </div>
      <div className="flex-1" onClick={() => onOpenChange(false)} />
    </div>
  ) : null;
}
