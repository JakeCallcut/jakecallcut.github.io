import Badge from './Badge';

interface Project {
  name: string;
  description: string;
  tech: string[];
  links: { source?: string };
  image: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
  <div className="rounded-2xl shadow-soft p-8 bg-card flex flex-col items-center">
  <img src={project.image} alt={project.name} className="w-full h-80 object-cover rounded-xl mb-6 border-2 border-primary" />
      <h3 className="text-2xl font-bold mb-2 text-center">{project.name}</h3>
      <p className="text-muted-foreground mb-4 text-center">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {project.tech.map(tech => (
          <Badge key={tech} variant="outline">{tech}</Badge>
        ))}
      </div>
      <div className="w-full flex gap-4 justify-center mt-auto">
        {project.links.source && (
          <a
            href={project.links.source}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name} source in a new tab`}
            className="inline-flex items-center justify-center font-medium rounded-2xl transition-transform transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-primary text-white hover:bg-primary/90 px-5 py-3 text-base shadow-md hover:shadow-lg transform-gpu hover:-translate-y-0.5 w-full md:w-auto gap-2"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 3h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 21H3V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Source</span>
          </a>
        )}
      </div>
    </div>
  );
}
