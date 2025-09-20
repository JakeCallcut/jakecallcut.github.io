import { motion } from 'framer-motion';
import content from '../data/content.json';
import SocialLinks from '../components/SocialLinks';

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
      <h1 className="text-3xl font-bold mb-8">Contact</h1>
      <form className="max-w-lg mx-auto flex flex-col gap-4" onSubmit={handleMailto}>
        <input name="name" type="text" required placeholder="Your Name" className="input input-bordered" />
        <input name="email" type="email" required placeholder="Your Email" className="input input-bordered" />
        <textarea name="message" required placeholder="Message" className="textarea textarea-bordered" rows={5} />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
      <div className="mt-8 text-center">
        <div className="mb-2">Or email directly: <a href={`mailto:${contact.email}`} className="text-primary underline">{contact.email}</a></div>
        <div className="mb-2">{contact.note}</div>
        <SocialLinks className="justify-center" />
      </div>
    </motion.section>
  );
}
