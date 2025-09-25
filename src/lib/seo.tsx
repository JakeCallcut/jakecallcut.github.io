import { useEffect } from 'react';

const SITE_TITLE = 'Jake Callcut - Designer & Developer';
const SITE_URL = 'https://jakecallcut.dev';
const DEFAULT_IMAGE = '/og-image.png';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  jsonLD?: any | any[]; // structured data to inject
}

function upsertMeta(name: string, attr: 'name' | 'property', content: string) {
  const selector = `${attr}="${name}"`;
  let el = document.head.querySelector(`meta[${selector}]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function SEO({ title, description, canonical, jsonLD }: SEOProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
    document.title = fullTitle;

    upsertMeta('description', 'name', description ?? "I'm a software engineer blending design and engineering.");

    // canonical
    if (canonical) {
      let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // Open Graph / Twitter
    upsertMeta('og:image', 'property', DEFAULT_IMAGE);
    upsertMeta('og:title', 'property', fullTitle);
    upsertMeta('og:description', 'property', description ?? '');
    upsertMeta('og:type', 'property', 'website');
    upsertMeta('og:url', 'property', canonical ?? SITE_URL);

    upsertMeta('twitter:card', 'name', 'summary_large_image');
    upsertMeta('twitter:title', 'name', fullTitle);
    upsertMeta('twitter:description', 'name', description ?? '');
    upsertMeta('twitter:image', 'name', DEFAULT_IMAGE);

    // JSON-LD injection
    const addedScripts: HTMLScriptElement[] = [];
    if (jsonLD) {
      const items = Array.isArray(jsonLD) ? jsonLD : [jsonLD];
      for (const item of items) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(item);
        document.head.appendChild(script);
        addedScripts.push(script);
      }
    }

    return () => {
      // cleanup JSON-LD scripts
      for (const s of addedScripts) s.remove();
    };
  }, [title, description, canonical, jsonLD]);

  return null;
}

export function personJSONLD(data: { name: string; url?: string; email?: string; sameAs?: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    url: data.url ?? SITE_URL,
    email: data.email,
    sameAs: data.sameAs,
  };
}

export function websiteJSONLD(data: { name: string; url?: string; description?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    url: data.url ?? SITE_URL,
    description: data.description,
  };
}
