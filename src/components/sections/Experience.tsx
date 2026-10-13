import SectionHeader from '../SectionHeader';
import Reveal from '../Reveal';
import content from '../../data/content.json';

const { experience, hackathons } = content;

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="frame scroll-mt-16 pt-32 md:pt-48">
      <SectionHeader
        index="02"
        label="Experience"
        title={<span id="experience-title">Experience</span>}
      />

      <ol className="mt-14 border-b border-line">
        {experience.map((item, i) => (
          <Reveal
            as="li"
            key={`${item.company}-${item.role}`}
            delay={Math.min(i, 3) * 0.04}
            className="grid grid-cols-1 gap-x-6 gap-y-4 border-t border-line py-8 lg:grid-cols-12"
          >
            <div className="label flex justify-between gap-4 text-muted lg:col-span-3 lg:block">
              <p className="text-ink-2">{item.period}</p>
              <p className="lg:mt-1">{item.location}</p>
            </div>
            <div className="flex items-start gap-5 lg:col-span-4">
              <img
                src={item.logo}
                alt=""
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
                className="size-16 shrink-0"
              />
              <div>
                <h3 className="font-serif text-[32px] leading-[1.05] tracking-[-0.01em] md:text-4xl">{item.company}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{item.role}</p>
              </div>
            </div>
            <ul className="space-y-3 text-[15px] leading-relaxed text-ink-2 lg:col-span-5">
              {item.bullets.map(bullet => (
                <li key={bullet} className="grid grid-cols-[1.25rem_1fr]">
                  <span aria-hidden="true" className="text-muted">—</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>

      <div className="mt-20 grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-12">
        <p className="label text-muted lg:col-span-3 lg:pt-6">Hackathons</p>
        <ul className="grid grid-cols-1 border-b border-line sm:grid-cols-2 sm:border-b-0 lg:col-span-9">
          {hackathons.map((event, i) => (
            <Reveal
              as="li"
              key={event.name}
              delay={(i % 2) * 0.08}
              className={`border-t border-line sm:border-b ${i % 2 ? 'sm:border-l' : ''}`}
            >
              <div className={`flex items-start gap-5 py-6 ${i % 2 ? 'sm:pl-6' : 'sm:pr-6'}`}>
                <img
                  src={event.logo}
                  alt=""
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="size-16 shrink-0"
                />
                <div>
                  <h3 className="font-serif text-[26px] leading-[1.1] md:text-[28px]">{event.name}</h3>
                  <p className="label mt-2 text-muted">
                    <span className="whitespace-nowrap text-ink-2">{event.date}</span> ·{' '}
                    <span className="whitespace-nowrap">{event.status}</span>
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
