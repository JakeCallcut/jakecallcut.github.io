import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import HalftoneArt from '../HalftoneArt';
import { WINGED_VICTORY } from '../../lib/artworks';
import LocalTime from '../LocalTime';
import { GitHubIcon, LinkedInIcon, MailIcon } from '../BrandIcons';
import content from '../../data/content.json';

const { hero, social, contact } = content;

const LINKS = [
  { label: 'LinkedIn', href: social.linkedin, Icon: LinkedInIcon, external: true },
  { label: 'GitHub', href: social.github, Icon: GitHubIcon, external: true },
  { label: `Email ${contact.email}`, href: `mailto:${contact.email}`, Icon: MailIcon, external: false },
];
const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const statueY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '8%']);

  return (
    <section ref={ref} id="top" aria-label="Introduction" className="relative overflow-hidden pt-16">
      <div className="frame flex flex-col lg:min-h-[calc(100svh-4rem)]">
        {/* Masthead */}
        <div className="label flex items-center justify-between gap-6 border-b border-line py-3 text-muted">
          <p>{hero.location}</p>
          <LocalTime />
        </div>

        <div className="grid flex-1 grid-cols-1 gap-x-6 lg:grid-cols-12">
          {/* Winged Victory — owns the left of the hero */}
          <motion.figure
            style={{ y: statueY }}
            className="mt-6 flex h-[min(66svh,640px)] min-h-[400px] flex-col lg:col-span-5 lg:my-6 lg:h-auto lg:min-h-0"
          >
            <div className="relative min-h-0 flex-1">
              <HalftoneArt art={WINGED_VICTORY} className="absolute inset-0 size-full" />
            </div>
            <motion.figcaption
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="mt-1 text-balance text-[13px] leading-snug text-muted"
            >
              <em>Winged Victory of Samothrace</em>, c.&nbsp;190&nbsp;BC. Parian marble. Louvre, Paris.
            </motion.figcaption>
          </motion.figure>

          {/* Name, statement and now */}
          <div className="flex flex-col lg:col-span-7 lg:py-6">
            {/* Headline: name with the tagline as its standfirst, level with the top of the statue */}
            <div className="@container mt-12 lg:mt-14 lg:w-[86%]">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease }}
                className="fit-name whitespace-nowrap pb-[0.16em] font-serif"
              >
                Jake Callcut
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease }}
              className="mt-6 max-w-[26ch] text-[22px] font-light leading-[1.25] tracking-tight lg:mt-8 lg:text-[28px]"
            >
              {hero.tagline.replace(/-/g, '\u2011')}.
            </motion.p>

            {/* Now + actions, sharing a baseline with the statue caption */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.05, ease }}
              className="mt-10 grid grid-cols-1 gap-6 border-t border-line pt-5 sm:grid-cols-2 sm:items-end lg:mt-auto"
            >
              <div>
                <p className="label mb-3 text-muted">Now</p>
                <p className="max-w-[32ch] text-[15px] leading-relaxed text-ink-2">{hero.now}</p>
              </div>
              <ul className="flex gap-2 sm:justify-end">
                {LINKS.map(({ label, href, Icon, external }) => (
                  <li key={href}>
                    <a
                      href={href}
                      aria-label={label}
                      title={label}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="flex size-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
                    >
                      <Icon className="size-[18px]" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
