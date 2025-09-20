import Badge from './Badge';

interface Project {
  name: string;
  description: string;
  tech: string[];
  links: { demo?: string; source?: string };
  image: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl shadow-soft p-8 bg-card flex flex-col items-center">
      <img src={project.image} alt={project.name} className="w-full h-48 object-cover rounded-xl mb-6 border-2 border-primary" />
      <h3 className="text-2xl font-bold mb-2 text-center">{project.name}</h3>
      <p className="text-muted-foreground mb-4 text-center">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {project.tech.map(tech => (
          <Badge key={tech} variant="outline">{tech}</Badge>
        ))}
      </div>
      <div className="flex gap-4 justify-center mt-auto">
        {project.links.demo && <a href={project.links.demo} className="btn btn-sm btn-secondary" target="_blank" rel="noopener">Demo</a>}
        {project.links.source && <a href={project.links.source} className="btn btn-sm btn-outline" target="_blank" rel="noopener">Source</a>}
      </div>
    </div>
  );
}
