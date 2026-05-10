import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../lib/seo';
import { formatDate, formatReadingTime, getWritingPost } from '../lib/writing';

export default function WritingPost() {
  const { slug } = useParams();
  const post = slug ? getWritingPost(slug) : undefined;

  if (!post) {
    return (
      <motion.section className="mx-auto max-w-5xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <SEO title="Writing not found" description="The requested writing could not be found." canonical="https://jakecallcut.dev/writing" />
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <h1 className="text-3xl font-bold tracking-tight">Writing not found</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            The writing you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/writing"
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to writing
          </Link>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section className="mx-auto max-w-5xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SEO
        title={post.title}
        description={post.description}
        canonical={`https://jakecallcut.dev/writing/${post.slug}`}
      />

      <Link to="/writing" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        <span aria-hidden="true">←</span>
        Back to writing
      </Link>

      <article className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
        <div className="mb-8">
          <div className="text-xs text-muted-foreground space-x-2">
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{formatReadingTime(post.readingMinutes)}</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">{post.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">{post.description}</p>
        </div>

        <div
          className="writing-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </motion.section>
  );
}
