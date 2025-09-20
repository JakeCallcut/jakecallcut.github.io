import { motion } from 'framer-motion';
import content from '../data/content.json';
import SEO from '../lib/seo';

export default function About() {
  const { about, education } = content;
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SEO title="About" description={about.bio} />
      <h1 className="text-4xl font-extrabold mb-12 text-center tracking-tight">About</h1>
      <div className="max-w-2xl mx-auto">
        <p className="mb-8 text-lg text-center">{about.bio}</p>
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-card shadow-soft p-6">
            <h2 className="text-xl font-semibold mb-4 text-primary">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {about.skills.map((skill: string) => (
                <span key={skill} className="badge badge-outline">{skill}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-card shadow-soft p-6">
            <h2 className="text-xl font-semibold mb-4 text-primary">Toolbox</h2>
            <div className="flex flex-wrap gap-2">
              {about.toolbox.map((tool: string) => (
                <span key={tool} className="badge badge-secondary">{tool}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          <div className="grid gap-4">
            {education.map((edu, idx) => (
              <div key={idx} className="rounded-2xl bg-card shadow-soft p-4 flex flex-col gap-1">
                <div className="font-bold text-lg text-primary">{edu.University}</div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="badge badge-outline">{edu.Programme}</span>
                  <span className="badge badge-secondary">{edu.period}</span>
                </div>
                <div className="text-sm text-muted-foreground">{edu.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
