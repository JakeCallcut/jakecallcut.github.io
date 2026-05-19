import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../lib/seo';
import { formatDate, formatReadingTime, getWritingPosts } from '../lib/writing';

export default function Writing() {
  const posts = getWritingPosts();

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SEO
        title="Writing"
        description="Notes, experiments, and writing on software, design, and building things well."
        canonical="https://jakecallcut.dev/writing"
      />

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Writing</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Comments, opinion, and analysis on matters of technology and the world.
        </p>
      </div>

      <div className="mx-auto grid max-w-3xl gap-6">
        {posts.map(post => (
          <Link
            key={post.slug}
            to={`/writing/${post.slug}`}
            className="relative group rounded-3xl border border-border bg-card p-6 shadow-soft transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
              {post.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">{post.description}</p>
            <div className="mt-6 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 font-medium text-primary">
                <span>Read post</span>
                <span aria-hidden="true">→</span>
              </div>
              <div className="flex items-center text-[10px] sm:text-xs space-x-2 text-muted-foreground">
                <span>{formatDate(post.date)}</span>
                <span>•</span>
                <span>{formatReadingTime(post.readingMinutes)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}
