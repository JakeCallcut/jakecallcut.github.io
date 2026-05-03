import { motion } from 'framer-motion';
import content from '../data/content.json';
import ProjectCard from '../components/ProjectCard';
import SEO from '../lib/seo';

export default function Projects() {
  const { projects, social } = content;
  // Example: filter by tech/tag (could be extended)
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SEO title="Projects" description="A selection of projects showcasing design and engineering." />
      <h1 className="text-4xl font-extrabold mb-12 text-center tracking-tight">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map(project => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      <div className="mt-10 rounded-2xl shadow-soft p-8 bg-card flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold mb-2">More ML Projects & Notebooks</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl">
          Explore additional machine learning work on Kaggle.
        </p>
        <a
          href={social.kaggle}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Jake Callcut's Kaggle profile in a new tab"
          className="inline-flex items-center justify-center font-medium rounded-2xl transition-transform transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-primary text-white hover:bg-primary/90 px-5 py-3 text-base shadow-md hover:shadow-lg transform-gpu hover:-translate-y-0.5 gap-2"
        >
          <span>View Kaggle</span>
        </a>
      </div>
    </motion.section>
  );
}
