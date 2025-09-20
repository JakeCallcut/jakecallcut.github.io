// Plausible analytics integration (optional)
export function enableAnalytics(domain: string) {
  if (!domain) return;
  const script = document.createElement('script');
  script.setAttribute('defer', 'true');
  script.setAttribute('data-domain', domain);
  script.src = 'https://plausible.io/js/script.js';
  document.body.appendChild(script);
}
