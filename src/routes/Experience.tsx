import { motion } from 'framer-motion';
import content from '../data/content.json';
import TimelineItem from '../components/TimelineItem';

export default function Experience() {
  const { experience } = content;
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h1 className="text-4xl font-extrabold mb-12 text-center tracking-tight">Experience</h1>
      <div className="flex flex-col gap-10 border-l-2 border-primary pl-6">
        {experience.map((item, idx) => (
          <TimelineItem key={idx} item={item} />
        ))}
      </div>
    </motion.section>
  );
}
