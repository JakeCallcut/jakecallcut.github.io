import { Link } from 'react-router-dom';
import SEO from '../lib/seo';
import Statue from '../components/Statue';

export default function NotFound() {
  return (
    <div className="frame pt-24 md:pt-28">
      <SEO title="Page not found" description="The page you requested could not be found." canonical="https://jakecallcut.dev/" />

      <div className="grid grid-cols-1 items-end gap-x-6 gap-y-10 border-t border-line-strong pt-4 lg:grid-cols-12">
        <section aria-labelledby="not-found-title" className="lg:col-span-7">
          <p className="label text-muted">(404) Page not found</p>
          <p aria-hidden="true" className="mt-6 font-serif text-[clamp(7rem,26vw,22rem)] leading-[0.75] tracking-[-0.04em]">
            404
          </p>
          <h1 id="not-found-title" className="mt-8 font-serif text-4xl leading-tight tracking-[-0.01em] md:text-5xl">
            There was a problem.
          </h1>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink-2">The page you asked for could not be found.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            <Link to="/" className="pill pill-solid">Home</Link>
            <Link to={{ pathname: '/', hash: '#contact' }} className="pill pill-ghost">Contact</Link>
          </div>
        </section>
        <div className="pointer-events-none mx-auto h-[50svh] max-h-[680px] min-h-[300px] lg:col-span-5 lg:mr-0 lg:h-[68svh]">
          <Statue reveal className="h-full w-auto max-w-none opacity-80" />
        </div>
      </div>
    </div>
  );
}
