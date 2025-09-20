import { motion } from 'framer-motion';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

export default function TimelineItem({ item }: { item: ExperienceItem }) {
  return (
    <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="relative pl-8">
      <div className="absolute left-0 top-2 w-4 h-4 bg-primary rounded-full shadow-soft" />
      <div className="bg-card rounded-2xl p-6 shadow-soft">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-lg">{item.company}</span>
          <span className="text-sm text-muted-foreground">{item.period}</span>
        </div>
        <div className="text-primary font-medium mb-1">{item.role}</div>
        <div className="text-sm text-muted-foreground mb-2">{item.location}</div>
        <ul className="list-disc ml-4 text-base">
          {item.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
