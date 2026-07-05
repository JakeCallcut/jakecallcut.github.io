// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it, beforeAll, beforeEach } from 'vitest';
import App from '../App';
import { restoreGithubPagesRedirect } from '../lib/githubPagesRedirect';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
});

beforeEach(() => {
  window.history.pushState({}, '', '/');
});

describe('Portfolio Smoke Test', () => {
  it('renders header and main routes', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /Jake Callcut/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Experience/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Writing/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();
  });

  it('renders the writing index route', () => {
    window.history.pushState({}, '', '/writing');

    render(<App />);

    expect(screen.getByRole('heading', { name: /Writing/i })).toBeInTheDocument();
    expect(screen.getByText(/Why Does Tech Have Taste\?/i)).toBeInTheDocument();
  });

  it('renders an individual writing post route', () => {
    window.history.pushState({}, '', '/writing/why-does-tech-have-taste');

    render(<App />);

    expect(screen.getByRole('heading', { name: /Why Does Tech Have Taste\?/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Broadsheet style, warm-beige, serif fonts/i)).toBeInTheDocument();
  });

  it('restores a GitHub Pages redirect target into the browser path', () => {
    window.history.pushState({}, '', '/?p=%2Fwriting%2Fwhy-does-tech-have-taste');

    const restored = restoreGithubPagesRedirect();

    expect(restored).toBe(true);
    expect(window.location.pathname).toBe('/writing/why-does-tech-have-taste');
  });
});
