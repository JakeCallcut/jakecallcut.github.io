import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../lib/seo';
import { articleJSONLD } from '../lib/structuredData';
import { formatDate, formatReadingTime, getWritingPost, getWritingPosts } from '../lib/writing';
import content from '../data/content.json';

const ease = [0.16, 1, 0.3, 1] as const;

export default function WritingPost() {
  const { slug } = useParams();
  const post = slug ? getWritingPost(slug) : undefined;

  const jsonLD = useMemo(
    () =>
      post &&
      articleJSONLD({ title: post.title, description: post.description, date: post.date, slug: post.slug, author: content.hero.name }),
    [post],
  );

  if (!post) {
    return (
      <div className="frame pt-28 md:pt-36">
        <SEO title="Writing not found" description="The requested writing could not be found." canonical="https://jakecallcut.dev/writing" />
        <div className="border-t border-line-strong pt-4">
          <p className="label text-muted">(404) Writing</p>
          <h1 className="mt-6 font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.02em]">Writing not found</h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-2">
            The writing you are looking for does not exist or has been moved.
          </p>
          <Link to="/writing" className="pill pill-solid mt-8">
            Back to writing
          </Link>
        </div>
      </div>
    );
  }

  const posts = getWritingPosts();
  const index = posts.findIndex(p => p.slug === post.slug);
  const next = posts[index + 1] ?? (posts.length > 1 ? posts[0] : undefined);

  return (
    <article className="frame pt-28 md:pt-36">
      <SEO
        title={post.title}
        description={post.description}
        canonical={`https://jakecallcut.dev/writing/${post.slug}`}
        type="article"
        jsonLD={jsonLD}
      />

      <Link to="/writing" className="label mb-10 inline-flex items-center gap-2 text-muted transition-colors hover:text-ink">
        <span aria-hidden="true">←</span> All writing
      </Link>

      <header className="grid grid-cols-1 gap-x-6 gap-y-6 border-t border-line-strong pt-4 lg:grid-cols-12">
        <div className="label flex flex-wrap gap-x-3 gap-y-1 text-muted lg:col-span-3 lg:flex-col">
          <time dateTime={post.date} className="text-ink-2">{formatDate(post.date)}</time>
          <span>{formatReadingTime(post.readingMinutes)}</span>
          <span>By {content.hero.name}</span>
        </div>
        <motion.div
          className="lg:col-span-9"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
        >
          <h1 className="font-serif text-[clamp(3rem,7.5vw,7rem)] leading-[0.92] tracking-[-0.025em]">{post.title}</h1>
          <p className="mt-6 max-w-2xl text-xl font-light leading-snug text-ink-2 md:text-2xl">{post.description}</p>
        </motion.div>
      </header>

      <div className="mt-16 grid grid-cols-1 gap-x-6 border-t border-line pt-12 lg:grid-cols-12 md:mt-24">
        <motion.div
          className="prose-editorial lg:col-span-7 lg:col-start-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>

      {next && (
        <nav aria-label="More writing" className="mt-24 md:mt-32">
          <Link to={`/writing/${next.slug}`} className="group grid grid-cols-1 gap-x-6 gap-y-3 border-y border-line py-10 lg:grid-cols-12">
            <p className="label text-muted lg:col-span-3">Read next</p>
            <div className="lg:col-span-7">
              <p className="font-serif text-[34px] leading-[1.02] tracking-[-0.01em] md:text-5xl">{next.title}</p>
              <p className="mt-3 text-[15px] text-ink-2">{next.description}</p>
            </div>
            <div className="hidden justify-end lg:col-span-2 lg:flex">
              <span
                aria-hidden="true"
                className="flex size-12 items-center justify-center rounded-full border border-line text-lg transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper"
              >
                →
              </span>
            </div>
          </Link>
        </nav>
      )}
    </article>
  );
}
