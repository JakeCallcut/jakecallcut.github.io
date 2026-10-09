import SectionHeader from '../SectionHeader';
import Reveal from '../Reveal';
import content from '../../data/content.json';

const { about, education } = content;

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="label mb-3 text-muted">{title}</p>
      <ul className="grid grid-cols-2 gap-x-6">
        {items.filter(Boolean).map(item => (
          <li key={item} className="border-t border-line py-2 text-[15px]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="frame scroll-mt-16 pt-32 md:pt-48">
      <SectionHeader index="03" label="About" title={<span id="about-title">About</span>} />

      <div className="mt-14 grid grid-cols-1 gap-x-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-9 lg:col-start-4">
          <p className="text-[clamp(1.375rem,2.5vw,2.25rem)] font-light leading-[1.3] tracking-[-0.015em]">{about.bio}</p>
        </Reveal>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-12">
        <Reveal className="md:col-span-1 lg:col-span-4 lg:col-start-4">
          <List title="Skills" items={about.skills} />
        </Reveal>
        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.08}>
          <List title="Toolbox" items={about.toolbox} />
        </Reveal>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-12">
        <p className="label text-muted lg:col-span-3 lg:pt-6">Education</p>
        <ol className="border-b border-line lg:col-span-9">
          {education.map(edu => (
            <Reveal
              as="li"
              key={edu.University}
              className="grid grid-cols-1 gap-x-6 gap-y-2 border-t border-line py-6 md:grid-cols-9"
            >
              <div className="md:col-span-5">
                <h3 className="font-serif text-[28px] leading-[1.1] md:text-[32px]">{edu.University}</h3>
                <p className="mt-1.5 text-[15px] text-ink-2">{edu.Programme}</p>
              </div>
              <div className="label space-y-1 text-muted md:col-span-4 md:text-right">
                <p className="text-ink-2">{edu.period}</p>
                {edu.grade && <p>{edu.grade}</p>}
                <p>{edu.location}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
