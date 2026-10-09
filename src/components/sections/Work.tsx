import SectionHeader from '../SectionHeader';
import Reveal from '../Reveal';
import content from '../../data/content.json';

type Project = (typeof content.projects)[number];

const { projects, social } = content;
const featured = projects.filter(project => project.featured);
const archive = projects.filter(project => !project.featured);

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const source = project.links.source;
  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden border border-line bg-paper-2">
        <img
          src={project.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="develop size-full object-cover"
        />
        <span aria-hidden="true" className="tint" />
        <span aria-hidden="true" className="tint-cast" />
      </div>
      <div className="label mt-4 flex items-baseline justify-between gap-4 text-muted">
        <span>{pad(index + 1)}</span>
        {source && (
          <span className="flex items-center gap-1 text-ink transition-transform duration-300 group-hover:translate-x-0.5">
            Source <span aria-hidden="true">↗</span>
          </span>
        )}
      </div>
      <h3 className="mt-2 text-xl font-medium leading-snug tracking-tight md:text-[22px]">{project.name}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{project.description}</p>
      <p className="label mt-4 text-muted">{project.tech.join(' · ')}</p>
    </>
  );

  return (
    <Reveal as="article" delay={(index % 2) * 0.08}>
      {source ? (
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} — view source on GitHub`}
          className="group block"
        >
          {body}
        </a>
      ) : (
        <div className="group">{body}</div>
      )}
    </Reveal>
  );
}

function ArchiveRow({ project, index }: { project: Project; index: number }) {
  const source = project.links.source;
  const Row = source ? 'a' : 'div';
  return (
    <li className="border-t border-line">
      <Row
        {...(source ? { href: source, target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-5 md:grid-cols-[3rem_minmax(0,1.2fr)_minmax(0,1fr)_2rem]"
      >
        <span className="label text-muted">{pad(index)}</span>
        <span>
          <span className="block text-[17px] font-medium tracking-tight transition-colors">{project.name}</span>
          <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-muted">{project.description}</span>
        </span>
        <span className="label col-start-2 text-muted md:col-start-auto">{project.tech.join(' · ')}</span>
        <span
          aria-hidden="true"
          className="col-start-3 row-start-1 text-right text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink md:col-start-4"
        >
          {source ? '↗' : '—'}
        </span>
      </Row>
    </li>
  );
}

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="frame scroll-mt-16 pt-24 md:pt-36">
      <SectionHeader
        index="01"
        label="Selected work"
        title={<span id="work-title">Selected Work</span>}
        intro="Machine learning, reliable applications, AI pipelines, data analysis, and more..."
      />

      <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 lg:ml-[calc(25%+0.375rem)]">
        {featured.map((project, i) => (
          <FeaturedProject key={project.name} project={project} index={i} />
        ))}
      </div>

      <div className="mt-24 grid grid-cols-1 gap-y-4 lg:grid-cols-12 lg:gap-x-6">
        <p className="label pt-5 text-muted lg:col-span-3">Archive</p>
        <ul className="border-b border-line lg:col-span-9">
          {archive.map((project, i) => (
            <ArchiveRow key={project.name} project={project} index={featured.length + i + 1} />
          ))}
          <li className="border-t border-line">
            <a
              href={social.kaggle}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-5 md:grid-cols-[3rem_minmax(0,1.2fr)_minmax(0,1fr)_2rem]"
            >
              <span className="label text-muted">+</span>
              <span>
                <span className="block text-[17px] font-medium tracking-tight">More ML projects &amp; notebooks</span>
                <span className="mt-1 block text-sm text-muted">Further machine learning work on Kaggle.</span>
              </span>
              <span className="label col-start-2 text-muted md:col-start-auto">Kaggle</span>
              <span
                aria-hidden="true"
                className="col-start-3 row-start-1 text-right text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink md:col-start-4"
              >
                ↗
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
