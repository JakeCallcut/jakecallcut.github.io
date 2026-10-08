import { Link } from 'react-router-dom';
import SectionHeader from '../SectionHeader';
import WritingList from '../WritingList';
import { getWritingPosts } from '../../lib/writing';

const HOME_LIMIT = 4;

export default function Writing() {
  const posts = getWritingPosts();

  return (
    <section id="writing" aria-labelledby="writing-title" className="frame scroll-mt-16 pt-32 md:pt-48">
      <SectionHeader
        index="04"
        label="Writing"
        title={<span id="writing-title">Writing</span>}
        intro="Comments, opinion, and analysis on matters of technology and the world."
      />
      <div className="mt-14">
        <WritingList posts={posts.slice(0, HOME_LIMIT)} />
      </div>
      {posts.length > HOME_LIMIT && (
        <div className="mt-8 flex justify-end">
          <Link to="/writing" className="pill pill-ghost">
            All writing ({posts.length})
          </Link>
        </div>
      )}
    </section>
  );
}
