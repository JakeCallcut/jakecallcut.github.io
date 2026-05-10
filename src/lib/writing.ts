import { marked } from 'marked';

export interface WritingPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  html: string;
  readingMinutes: number;
}

interface BlogFrontmatter {
  title?: string;
  date?: string;
  description?: string;
}

function parseFrontmatter(raw: string): { frontmatter: BlogFrontmatter; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, content: raw };
  }

  const frontmatterStr = match[1];
  const content = match[2];
  const frontmatter: BlogFrontmatter = {};

  // Simple YAML parser for our frontmatter fields
  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      const cleanValue = value.replace(/^["']|["']$/g, '');
      if (key.trim() === 'title') frontmatter.title = cleanValue;
      if (key.trim() === 'date') frontmatter.date = cleanValue;
      if (key.trim() === 'description') frontmatter.description = cleanValue;
    }
  });

  return { frontmatter, content };
}

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

const writingFiles = import.meta.glob('../content/writing/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const posts = Object.entries(writingFiles)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? '';
    const { frontmatter, content } = parseFrontmatter(raw);
    const readingMinutes = estimateReadingTime(content);

    return {
      slug,
      title: frontmatter.title ?? slug,
      date: frontmatter.date ?? '',
      description: frontmatter.description ?? '',
      html: marked.parse(content, { breaks: true }) as string,
      readingMinutes,
    } satisfies WritingPost;
  })
  .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime());

export function getWritingPosts() {
  return posts;
}

export function getWritingPost(slug: string) {
  return posts.find(post => post.slug === slug);
}

export function formatDate(date: string) {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatReadingTime(minutes: number) {
  return `${minutes} min read`;
}
