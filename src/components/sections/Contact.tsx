import type { FormEvent } from 'react';
import SectionHeader from '../SectionHeader';
import Reveal from '../Reveal';
import { CV_PATH } from '../../lib/sections';
import content from '../../data/content.json';

const { contact, social } = content;

const fieldClass =
  'peer w-full border-0 border-b border-line bg-transparent px-0 pb-3 pt-2 text-[17px] text-ink placeholder:text-muted/70 transition-colors focus:border-ink focus:outline-none focus-visible:outline-none';

export default function Contact() {
  const handleMailto = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
    const subject = encodeURIComponent(`Portfolio Contact: ${name}`);
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="frame scroll-mt-16 pt-32 md:pt-48">
      <SectionHeader
        index="05"
        label="Contact"
        title={<span id="contact-title">Get in touch</span>}
        intro={contact.note}
      />

      <div className="mt-14 grid grid-cols-1 gap-x-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-9 lg:col-start-4">
          <p className="label mb-3 text-muted">Email directly</p>
          <a
            href={`mailto:${contact.email}`}
            className="link-draw inline-block font-serif text-[clamp(1.75rem,6.4vw,5.5rem)] leading-none tracking-[-0.02em]"
          >
            {contact.email}
          </a>
        </Reveal>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-x-6 gap-y-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5 lg:col-start-4">
          <p className="label mb-6 text-muted">Or send a message</p>
          <form className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2" onSubmit={handleMailto}>
            <label className="block">
              <span className="label text-muted">Name</span>
              <input name="name" type="text" required autoComplete="name" placeholder="Your name" className={fieldClass} />
            </label>
            <label className="block">
              <span className="label text-muted">Email</span>
              <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={fieldClass} />
            </label>
            <label className="block sm:col-span-2">
              <span className="label text-muted">Message</span>
              <textarea name="message" required rows={4} placeholder="What are you working on?" className={`${fieldClass} resize-none`} />
            </label>
            <div className="sm:col-span-2">
              <button type="submit" className="pill pill-solid cursor-pointer">
                Send message <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </Reveal>

        <Reveal className="lg:col-span-3 lg:col-start-10" delay={0.08}>
          <p className="label mb-3 text-muted">Elsewhere</p>
          <ul className="border-b border-line text-[15px]">
            {[
              { label: 'GitHub', href: social.github },
              { label: 'LinkedIn', href: social.linkedin },
              { label: 'Kaggle', href: social.kaggle },
            ].map(link => (
              <li key={link.label} className="border-t border-line">
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="group flex justify-between py-3">
                  {link.label}
                  <span aria-hidden="true" className="text-muted transition-colors group-hover:text-ink">↗</span>
                </a>
              </li>
            ))}
            <li className="border-t border-line">
              <a href={CV_PATH} download="Jake_Callcut_CV.pdf" className="group flex justify-between py-3">
                Download CV
                <span aria-hidden="true" className="text-muted transition-colors group-hover:text-ink">↓</span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
