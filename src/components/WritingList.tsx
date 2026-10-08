import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { formatDate, formatReadingTime, type WritingPost } from '../lib/writing';

export default function WritingList({ posts, headingLevel = 'h3' }: { posts: WritingPost[]; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  return (
    <ol className="border-b border-line">
      {posts.map((post, i) => (
        <Reveal as="li" key={post.slug} delay={Math.min(i, 3) * 0.05} className="border-t border-line">
          <Link
            to={`/writing/${post.slug}`}
            className="group grid grid-cols-1 gap-x-6 gap-y-3 py-8 lg:grid-cols-12 lg:py-10"
          >
            <div className="label flex gap-3 text-muted lg:col-span-3 lg:flex-col lg:gap-1">
              <time dateTime={post.date} className="text-ink-2">{formatDate(post.date)}</time>
              <span>{formatReadingTime(post.readingMinutes)}</span>
            </div>
            <div className="lg:col-span-7">
              <Heading className="font-serif text-[34px] leading-[1.02] tracking-[-0.01em] transition-colors md:text-5xl">
                {post.title}
              </Heading>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-2">{post.description}</p>
            </div>
            <div className="hidden justify-end lg:col-span-2 lg:flex">
              <span
                aria-hidden="true"
                className="flex size-12 items-center justify-center rounded-full border border-line text-lg transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper"
              >
                ↗
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </ol>
  );
}
