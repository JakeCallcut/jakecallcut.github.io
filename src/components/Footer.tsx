import { Link } from 'react-router-dom';
import LocalTime from './LocalTime';
import { CV_PATH, SECTIONS } from '../lib/sections';
import content from '../data/content.json';

const { social, hero } = content;

export default function Footer() {
  return (
    <footer className="mt-32 overflow-hidden border-t border-invert-line bg-invert-paper text-invert-ink md:mt-48">
      <div className="frame pt-12 md:pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12">
          {/* A small, still Winged Victory, echoing the hero */}
          <div className="relative col-span-2 md:col-span-3 md:self-stretch">
            <div aria-hidden="true" className="footer-statue h-36 md:absolute md:inset-y-0 md:left-0 md:h-auto" />
          </div>

          <div className="md:col-span-3">
            <p className="label text-invert-muted">Index</p>
            <ul className="mt-3 space-y-1.5 text-[15px]">
              {SECTIONS.map(section => (
                <li key={section.id}>
                  <Link to={{ pathname: '/', hash: `#${section.id}` }} className="link-draw">
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label text-invert-muted">Links</p>
            <ul className="mt-3 space-y-1.5 text-[15px]">
              <li><a href={social.github} target="_blank" rel="noopener noreferrer" className="link-draw">GitHub ↗</a></li>
              <li><a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="link-draw">LinkedIn ↗</a></li>
              <li><a href={social.kaggle} target="_blank" rel="noopener noreferrer" className="link-draw">Kaggle ↗</a></li>
              <li><a href={CV_PATH} download="Jake_Callcut_CV.pdf" className="link-draw">Download CV ↓</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3 md:col-start-10">
            <p className="label text-invert-muted">Location</p>
            <p className="mt-3 text-[15px]">{hero.location}</p>
            <p className="label mt-1 text-invert-muted">
              55.95° N, 3.19° W — <LocalTime />
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-invert-line py-5 text-invert-muted md:mt-20">
          <p className="label">© {new Date().getFullYear()} Jake Callcut</p>
        </div>
      </div>
    </footer>
  );
}
