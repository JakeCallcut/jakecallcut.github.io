import { motion } from 'framer-motion';
import content from '../data/content.json';
import SEO from '../lib/seo';
// SocialLinks removed from contact page; icons are in the footer

export default function Contact() {
  const { contact } = content;
  const handleMailto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLInputElement).value;
    const subject = encodeURIComponent(`Portfolio Contact: ${name}`);
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`);
  };

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SEO title="Contact" description="Get in touch with me for opportunities, collaborations, or projects" />
      <h1 className="text-3xl font-bold mb-8">Contact</h1>
      <form className="max-w-lg mx-auto flex flex-col gap-4" onSubmit={handleMailto}>
        <input
          name="name"
          type="text"
          required
          placeholder="Your Name"
          className="w-full px-4 py-3 border border-border rounded-2xl bg-card text-card-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Your Email"
          className="w-full px-4 py-3 border border-border rounded-2xl bg-card text-card-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
        <textarea
          name="message"
          required
          placeholder="Message"
          className="w-full px-4 py-3 border border-border rounded-2xl bg-card text-card-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          rows={5}
        />
        <button type="submit" className="inline-flex items-center justify-center font-medium rounded-2xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-3 text-base">Send</button>
      </form>
      <div className="mt-8 text-center">
        <div className="mb-2">Or email directly: <a href={`mailto:${contact.email}`} className="text-primary underline">{contact.email}</a></div>
        <div className="mb-6">{contact.note}</div>
        <a 
          href="/Jake Callcut.pdf" 
          download="Jake_Callcut_CV.pdf"
          className="mt-8 inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-5 py-3 text-base rounded-2xl shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary transition-transform transform-gpu hover:-translate-y-0.5"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="opacity-90">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Download CV</span>
        </a>
      </div>
    </motion.section>
  );
}
