import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Statue from '../Statue';
import LocalTime from '../LocalTime';
import { CV_PATH } from '../../lib/sections';
import content from '../../data/content.json';

const { hero } = content;
const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const statueY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '14%']);
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '-30%']);

  return (
    <section ref={ref} id="top" aria-label="Introduction" className="relative overflow-hidden pt-16">
      <div className="frame relative flex flex-col lg:min-h-[calc(100svh-4rem)]">
        {/* Masthead */}
        <div className="label order-0 flex items-center justify-between gap-6 border-b border-line py-3 text-muted">
          <p>{hero.location}</p>
          <LocalTime />
        </div>

        {/* Winged Victory */}
        <motion.div
          style={{ y: statueY }}
          className="pointer-events-none relative order-1 mx-auto mt-4 h-[min(64svh,620px)] min-h-[380px] lg:absolute lg:bottom-0 lg:left-1/2 lg:top-12 lg:mt-0 lg:h-auto lg:-translate-x-1/2"
        >
          <Statue reveal priority className="h-full w-auto max-w-none" />
        </motion.div>

        {/* Name */}
        <motion.div style={{ y: nameY }} className="@container relative z-10 order-2 -mt-[18vw] lg:order-3 lg:mt-0">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease }}
            className="fit-name whitespace-nowrap pb-[0.06em] font-serif lg:pb-[0.16em]"
          >
            Jake Callcut
          </motion.h1>
        </motion.div>

        {/* Statement + now */}
        <div className="relative z-10 order-3 mt-10 grid flex-1 grid-cols-1 gap-10 lg:order-2 lg:mt-0 lg:grid-cols-12 lg:items-center lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease }}
            className="lg:col-span-3"
          >
            <p className="max-w-[24ch] text-[22px] font-light leading-[1.25] tracking-tight lg:text-[26px]">
              {hero.tagline}.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease }}
            className="lg:col-span-3 lg:col-start-10"
          >
            <p className="label mb-3 text-muted">Now</p>
            <p className="max-w-[30ch] text-[15px] leading-relaxed text-ink-2">{hero.now}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to={{ pathname: '/', hash: '#contact' }} className="pill pill-solid">
                {hero.cta}
              </Link>
              <a href={CV_PATH} download="Jake_Callcut_CV.pdf" className="pill pill-ghost">
                Download CV
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
