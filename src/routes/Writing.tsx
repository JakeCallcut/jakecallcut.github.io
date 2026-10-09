import { Link } from 'react-router-dom';
import SEO from '../lib/seo';
import SectionHeader from '../components/SectionHeader';
import WritingList from '../components/WritingList';
import { getWritingPosts } from '../lib/writing';

export default function Writing() {
  const posts = getWritingPosts();

  return (
    <div className="frame pt-28 md:pt-36">
      <SEO
        title="Writing"
        description="Notes, experiments, and writing on software, design, and building things well."
        canonical="https://jakecallcut.dev/writing"
      />

      <Link to="/" className="label mb-10 inline-flex items-center gap-2 text-muted transition-colors hover:text-ink">
        <span aria-hidden="true">←</span> Index
      </Link>

      <SectionHeader
        as="h1"
        index="04"
        label="Writing"
        title="Writing"
        intro="Comments, opinion, and analysis on matters of technology and the world."
      />
      <div className="mt-14">
        <WritingList posts={posts} headingLevel="h2" />
      </div>
    </div>
  );
}
