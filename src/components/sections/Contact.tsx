import { useEffect, useState, type ComponentType } from 'react';
import SectionHeader from '../SectionHeader';
import Reveal from '../Reveal';
import { GitHubIcon, KaggleIcon, LinkedInIcon } from '../BrandIcons';
import { CV_PATH } from '../../lib/sections';
import content from '../../data/content.json';

const { contact, social } = content;

// The profile handle is the last segment of each profile URL.
function handleFrom(url: string) {
  return new URL(url).pathname.split('/').filter(Boolean).pop() ?? url;
}

const PROFILES: { label: string; href: string; Icon: ComponentType<{ className?: string }> }[] = [
  { label: 'GitHub', href: social.github, Icon: GitHubIcon },
  { label: 'LinkedIn', href: social.linkedin, Icon: LinkedInIcon },
  { label: 'Kaggle', href: social.kaggle, Icon: KaggleIcon },
];

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <button type="button" onClick={copy} className="pill pill-solid cursor-pointer" aria-live="polite">
      {copied ? 'Copied' : 'Copy email'}
    </button>
  );
}

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="frame scroll-mt-16 pt-32 md:pt-48">
      <SectionHeader
        index="05"
        label="Contact"
        title={<span id="contact-title">Get in touch</span>}
        intro={contact.note}
      />

      <div className="mt-14 grid grid-cols-1 gap-x-6 lg:grid-cols-12">
        {/* Details: profiles, email and actions */}
        <div className="lg:col-span-9 lg:col-start-4">
          <Reveal>
            <ul className="grid grid-cols-1 border-b border-line sm:grid-cols-3 sm:border-b-0">
              {PROFILES.map(({ label, href, Icon }, i) => (
                <li key={label} className={`border-t border-line sm:border-b ${i > 0 ? 'sm:border-l' : ''}`}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} — ${handleFrom(href)} (opens in a new tab)`}
                    className="group flex h-full items-center gap-4 px-1 py-5 transition-colors duration-300 hover:bg-ink hover:text-paper sm:min-h-44 sm:flex-col sm:items-stretch sm:justify-between sm:p-5"
                  >
                    <span className="flex items-start justify-between">
                      <Icon className="size-7 sm:size-8" />
                      <span
                        aria-hidden="true"
                        className="hidden text-lg text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper sm:inline"
                      >
                        ↗
                      </span>
                    </span>
                    <span className="flex flex-1 items-baseline justify-between gap-3 sm:flex-none sm:flex-col sm:gap-1">
                      <span className="text-lg font-medium tracking-tight">{label}</span>
                      <span className="font-mono text-xs text-muted transition-colors duration-300 group-hover:text-paper/70">
                        {handleFrom(href)}
                      </span>
                    </span>
                    <span aria-hidden="true" className="text-muted group-hover:text-paper sm:hidden">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="@container mt-16">
            <p className="label mb-3 text-muted">Email</p>
            <a
              href={`mailto:${contact.email}`}
              className="link-draw inline-block whitespace-nowrap font-serif text-[min(calc(100cqw/10.9),5.5rem)] leading-none tracking-[-0.02em]"
            >
              {contact.email}
            </a>
          </Reveal>

          <Reveal className="mt-8 flex flex-wrap gap-2">
            <CopyEmailButton />
            <a href={CV_PATH} download="Jake_Callcut_CV.pdf" className="pill pill-ghost">
              Download CV <span aria-hidden="true">↓</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
