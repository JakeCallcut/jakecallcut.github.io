export const SITE_TITLE = 'Jake Callcut - Software Engineer';
export const SITE_URL = 'https://jakecallcut.dev';
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export type JsonLd = Record<string, unknown>;

export function personJSONLD(data: { name: string; url?: string; email?: string; jobTitle?: string; sameAs?: string[] }): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    url: data.url ?? SITE_URL,
    email: data.email,
    jobTitle: data.jobTitle,
    sameAs: data.sameAs,
  };
}

export function websiteJSONLD(data: { name: string; url?: string; description?: string }): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    url: data.url ?? SITE_URL,
    description: data.description,
  };
}

export function articleJSONLD(data: { title: string; description: string; date: string; slug: string; author: string }): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    datePublished: data.date,
    url: `${SITE_URL}/writing/${data.slug}`,
    author: { '@type': 'Person', name: data.author, url: SITE_URL },
  };
}
