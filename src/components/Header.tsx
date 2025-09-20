import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Sheet from './Sheet';
import { useState } from 'react';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Projects', to: '/projects' },
  { name: 'Experience', to: '/experience' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' },
];

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  return (
  <header className="sticky top-0 z-30 bg-sand-tan/80 backdrop-blur border-b border-sand-tan">
  <nav className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="font-bold text-2xl tracking-tight">Jake Callcut</Link>
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className={`hover:text-primary transition-colors ${location.pathname === link.to ? 'text-primary font-semibold' : ''}`}>{link.name}</Link>
          ))}
          <ThemeToggle />
        </div>
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button className="btn btn-outline btn-sm" aria-label="Open menu" onClick={() => setOpen(true)}>
            <span className="icon-menu" />
          </button>
          <Sheet open={open} onOpenChange={setOpen}>
            <nav className="flex flex-col gap-4">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className={`hover:text-primary transition-colors ${location.pathname === link.to ? 'text-primary font-semibold' : ''}`}>{link.name}</Link>
              ))}
            </nav>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
