import { motion } from 'framer-motion';
import Section from '../components/Section';
import SocialLinks from '../components/SocialLinks';
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
        <a href="#contact" className="mt-6 btn text-lg px-6 py-3 bg-sand-peach text-sand-dark rounded-2xl shadow-soft hover:bg-sand-tan">{hero.cta}</a>
        <span className="text-base text-sand-dark mt-2">{hero.location}</span>
      </div>
      <Section title="Featured Projects">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.filter(p => p.featured).map(project => (
            <div key={project.name} className="rounded-2xl shadow-soft p-8 bg-card flex flex-col items-center">
              <img src={project.image} alt={project.name} className="w-full h-48 object-cover rounded-xl mb-6 border-2 border-primary" />
              <h3 className="text-2xl font-bold mb-2 text-center">{project.name}</h3>
              <p className="text-muted-foreground mb-4 text-center">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {project.tech.map((tech: string) => (
                  <span key={tech} className="badge badge-outline">{tech}</span>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                {project.links.demo && <a href={project.links.demo} className="btn btn-sm btn-secondary" target="_blank" rel="noopener">Demo</a>}
                {project.links.source && <a href={project.links.source} className="btn btn-sm btn-outline" target="_blank" rel="noopener">Source</a>}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Now">
        <p className="text-lg">Currently building at Squircle & GI Healthcare, based in Edinburgh.</p>
      </Section>
    </motion.section>
  );
}
