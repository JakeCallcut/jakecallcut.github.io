import { motion } from 'framer-motion';
import content from '../data/content.json';
import ProjectCard from '../components/ProjectCard';
import SEO from '../lib/seo';

export default function Projects() {
  const { projects } = content;
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
    </motion.section>
  );
}
