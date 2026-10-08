import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import useActiveSection from '../hooks/useActiveSection';
import { SECTIONS } from '../lib/sections';
import content from '../data/content.json';

const SECTION_IDS = SECTIONS.map(section => section.id);

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const onHome = location.pathname === '/';
  const activeSection = useActiveSection(SECTION_IDS, onHome);

  const isActive = (id: string) =>
    onHome ? activeSection === id : id === 'writing' && location.pathname.startsWith('/writing');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash, location.key]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="label fixed left-4 top-3 z-[60] -translate-y-20 bg-ink px-3 py-2 text-paper transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
          scrolled || open ? 'border-b border-line bg-paper/85 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <nav aria-label="Primary" className="frame flex h-16 items-center justify-between gap-6">
          <Link to="/" className="flex items-baseline gap-2 whitespace-nowrap text-[15px] font-medium tracking-tight">
            Jake Callcut
            <span className="label hidden text-muted lg:inline">/ Software Engineer</span>
          </Link>

          <ul className="hidden items-center gap-7 md:flex">
            {SECTIONS.map(section => (
              <li key={section.id}>
                <Link
                  to={{ pathname: '/', hash: `#${section.id}` }}
                  aria-current={isActive(section.id) ? 'true' : undefined}
                  className={`group flex items-baseline gap-1.5 text-sm transition-colors hover:text-ink ${
                    isActive(section.id) ? 'text-ink' : 'text-muted'
                  }`}
                >
                  <span className="font-mono text-[10px] tracking-wider opacity-70">{section.index}</span>
                  <span className="link-draw">{section.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to={{ pathname: '/', hash: '#contact' }} className="pill pill-solid hidden lg:inline-flex">
              {content.hero.cta}
            </Link>
            <button
              type="button"
              className="pill pill-ghost h-10 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(value => !value)}
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col bg-paper pt-16 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile" className="frame flex flex-1 flex-col justify-between pb-8 pt-6">
              <ul>
                {SECTIONS.map((section, i) => (
                  <motion.li
                    key={section.id}
                    className="border-b border-line"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={{ pathname: '/', hash: `#${section.id}` }}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-3"
                    >
                      <span className="font-serif text-5xl leading-none tracking-tight">{section.label}</span>
                      <span className="label text-muted">{section.index}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-4 pt-10">
                <div>
                  <p className="label mb-2 text-muted">Elsewhere</p>
                  <ul className="space-y-1 text-[15px]">
                    <li><a href={content.social.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
                    <li><a href={content.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    <li><a href={content.social.kaggle} target="_blank" rel="noopener noreferrer">Kaggle</a></li>
                  </ul>
                </div>
                <div>
                  <p className="label mb-2 text-muted">Email</p>
                  <a href={`mailto:${content.contact.email}`} className="break-all text-[15px]">
                    {content.contact.email}
                  </a>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
