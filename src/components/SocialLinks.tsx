import content from '../data/content.json';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
}

export default function SocialLinks({ className }: SocialLinksProps) {
  const { social } = content;
  return (
    <div className={`flex gap-4 ${className ?? ''}`}>
      <a href={social.github} target="_blank" rel="noopener" aria-label="GitHub">
        <Github className="w-6 h-6" />
      </a>
      <a href={social.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
        <Linkedin className="w-6 h-6" />
      </a>
      <a href={`mailto:${social.email}`} aria-label="Email">
        <Mail className="w-6 h-6" />
      </a>
      <a href={social.website} target="_blank" rel="noopener" aria-label="Website">
        <Globe className="w-6 h-6" />
      </a>
    </div>
  );
}
