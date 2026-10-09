import { useEffect } from 'react';
import { DEFAULT_IMAGE, SITE_TITLE, SITE_URL, type JsonLd } from './structuredData';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: 'website' | 'article';
  jsonLD?: JsonLd | JsonLd[];
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

export default function SEO({ title, description, canonical, type = 'website', jsonLD }: SEOProps) {
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
    upsertMeta('og:type', 'property', type);
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
  }, [title, description, canonical, type, jsonLD]);

  return null;
}
