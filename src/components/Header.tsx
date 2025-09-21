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
  <header className={`sticky top-0 z-50 bg-sand-tan/80 backdrop-blur border-b border-sand-tan ${open ? 'shadow-xl' : ''}`}>
  <nav className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="font-bold text-2xl tracking-tight">Jake Callcut</Link>
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className={`hover:text-primary transition-colors ${location.pathname === link.to ? 'text-primary font-semibold' : ''}`}>{link.name}</Link>
          ))}
          <ThemeToggle />
        </div>
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            className="btn btn-outline btn-sm rounded-full"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(s => !s)}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <Sheet open={open} onOpenChange={setOpen}>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-lg hover:bg-primary/5 transition-colors ${location.pathname === link.to ? 'text-primary font-semibold' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
