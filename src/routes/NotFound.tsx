import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../lib/seo';

export default function NotFound() {
  return (
    <motion.section className="mx-auto max-w-5xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SEO title="Page not found" description="The page you requested could not be found." canonical="https://jakecallcut.dev/" />

      <div className="rounded-3xl border border-border bg-card p-8 shadow-soft md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">404</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">There was a problem.</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
          The page you asked for could not be found.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-2xl border border-border bg-background px-5 py-3 font-medium text-foreground transition-colors hover:bg-muted"
          >
            Contact
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
