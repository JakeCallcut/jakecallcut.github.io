import { motion } from 'framer-motion';
import Section from '../components/Section';
import SocialLinks from '../components/SocialLinks';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';
import content from '../data/content.json';
import SEO, { personJSONLD, websiteJSONLD } from '../lib/seo';

const { hero, projects } = content;

export default function Home() {
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SEO
        title="Home"
        description={content.hero.tagline}
        jsonLD={[
          personJSONLD({ name: content.hero.name, url: content.social.website, email: content.social.email, sameAs: [content.social.github, content.social.linkedin] }),
          websiteJSONLD({ name: content.hero.name, url: content.social.website, description: content.hero.tagline }),
        ]}
      />
      <div className="flex flex-col items-center gap-8 py-16 bg-sand-light rounded-2xl shadow-soft">
        <img src={hero.portrait} alt={hero.name} className="w-36 h-36 rounded-full shadow-soft border-4 border-sand-dark bg-sand-peach" />
        <h1 className="text-5xl font-extrabold tracking-tight text-center mb-2 text-sand-dark">{hero.name}</h1>
        <h2 className="text-2xl text-sand-dark font-semibold mb-2">{hero.title}</h2>
        <p className="max-w-2xl text-center text-lg text-sand-dark mb-4">{hero.tagline}</p>
        <SocialLinks className="mt-2 text-sand-dark" />
  <Link
          to="/contact"
          className="mt-6 inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-6 py-3 text-lg rounded-2xl shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary transition-transform transform-gpu hover:-translate-y-0.5"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="opacity-90"><path d="M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {hero.cta}
        </Link>
        <span className="text-base text-sand-dark mt-2">{hero.location}</span>
      </div>
      <Section title="Featured Projects" className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.filter(p => p.featured).map(project => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </Section>
      <Section title="Now">
        <p className="text-lg">Currently building at Squircle & GI Healthcare, based in Edinburgh.</p>
      </Section>
    </motion.section>
  );
}
