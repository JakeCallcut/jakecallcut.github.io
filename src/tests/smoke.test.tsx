// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import App from '../App';
import { STATUES } from '../lib/artworks';
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

  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  Object.defineProperty(window, 'IntersectionObserver', { writable: true, value: MockIntersectionObserver });
  window.scrollTo = () => undefined;
  // jsdom has no canvas; the hero statue falls back to its <img>, which these tests assert on.
  HTMLCanvasElement.prototype.getContext = (() => null) as typeof HTMLCanvasElement.prototype.getContext;
});

beforeEach(() => {
  window.history.pushState({}, '', '/');
});

afterEach(() => {
  cleanup();
  document.documentElement.classList.remove('dark');
  localStorage.clear();
});

describe('Portfolio Smoke Test', () => {
  it('renders the header with links to every section', () => {
    render(<App />);
    const nav = screen.getByRole('navigation', { name: 'Primary' });
    expect(within(nav).getByRole('link', { name: /Jake Callcut/i })).toHaveAttribute('href', '/');
    for (const [label, hash] of [
      ['Work', '#work'],
      ['Experience', '#experience'],
      ['About', '#about'],
      ['Writing', '#writing'],
      ['Contact', '#contact'],
    ]) {
      expect(within(nav).getByRole('link', { name: new RegExp(label) })).toHaveAttribute('href', `/${hash}`);
    }
  });

  it('renders the one-page home with the hero and every section', () => {
    const { container } = render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: 'Jake Callcut' })).toBeInTheDocument();
    const statue = screen.getByRole('button', { name: /Show another statue/i });
    expect(STATUES.map(s => s.sources.light)).toContain(statue.querySelector('img')?.getAttribute('src'));
    for (const id of ['work', 'experience', 'about', 'writing', 'contact']) {
      expect(container.querySelector(`section#${id}`)).not.toBeNull();
    }
    expect(screen.getByText(/STMicroelectronics/, { selector: 'h3' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Why Does Tech Have Taste\?/i })).toBeInTheDocument();
  });

  it('toggles between light and dark themes', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Switch to dark theme/i }));
    expect(document.documentElement).toHaveClass('dark');
    const statueImage = screen.getByRole('button', { name: /Show another statue/i }).querySelector('img');
    expect(statueImage?.getAttribute('src')).toMatch(/-dark\.svg$/);
    fireEvent.click(screen.getByRole('button', { name: /Switch to light theme/i }));
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('switches the hero statue and its caption when the statue is clicked', async () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /Show another statue/i });
    const titleOf = (label: string | null) => STATUES.find(s => label?.startsWith(s.title))!;
    const first = titleOf(button.getAttribute('aria-label'));
    const caption = button.closest('figure')!.querySelector('figcaption')!;
    expect(within(caption).getByText(first.title)).toBeInTheDocument();

    fireEvent.click(button);

    await waitFor(() => expect(titleOf(button.getAttribute('aria-label')).id).not.toBe(first.id));
    const next = titleOf(button.getAttribute('aria-label'));
    expect(button.querySelector('img')).toHaveAttribute('src', next.sources.light);
    await waitFor(() => expect(within(caption).getByText(next.title)).toBeInTheDocument());
  });

  it('renders the writing index route', () => {
    window.history.pushState({}, '', '/writing');

    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: /Writing/i })).toBeInTheDocument();
    expect(screen.getByText(/Why Does Tech Have Taste\?/i)).toBeInTheDocument();
  });

  it('renders an individual writing post route', () => {
    window.history.pushState({}, '', '/writing/why-does-tech-have-taste');

    render(<App />);

    expect(screen.getByRole('heading', { name: /Why Does Tech Have Taste\?/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Broadsheet style, warm-beige, serif fonts/i)).toBeInTheDocument();
  });

  it('redirects the old section pages to their place on the home page', async () => {
    window.history.pushState({}, '', '/projects');

    render(<App />);

    await waitFor(() => expect(window.location.pathname + window.location.hash).toBe('/#work'));
    expect(screen.getByRole('heading', { level: 1, name: 'Jake Callcut' })).toBeInTheDocument();
  });

  it('restores a GitHub Pages redirect target into the browser path', () => {
    window.history.pushState({}, '', '/?p=%2Fwriting%2Fwhy-does-tech-have-taste');

    const restored = restoreGithubPagesRedirect();

    expect(restored).toBe(true);
    expect(window.location.pathname).toBe('/writing/why-does-tech-have-taste');
  });

  it('renders the in-app 404 route for unknown paths', () => {
    window.history.pushState({}, '', '/does-not-exist');

    render(<App />);

    const problemHeading = screen.getByRole('heading', { name: /There was a problem\./i });
    const notFoundSection = problemHeading.closest('section');

    expect(problemHeading).toBeInTheDocument();
    expect(notFoundSection).not.toBeNull();

    if (!notFoundSection) {
      return;
    }

    expect(within(notFoundSection).getByRole('link', { name: /^Home$/i })).toBeInTheDocument();
    expect(within(notFoundSection).getByRole('link', { name: /^Contact$/i })).toBeInTheDocument();
  });
});
