// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it, beforeAll } from 'vitest';
import App from '../App';

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
    expect(screen.getByText(/Shipping a Markdown Blog/i)).toBeInTheDocument();
  });

  it('renders an individual writing post route', () => {
    window.history.pushState({}, '', '/writing/2026-05-07-markdown-blog');

    render(<App />);

    expect(screen.getByText(/Markdown files live in the repository/i)).toBeInTheDocument();
    expect(screen.getByText(/Routes stay static and predictable/i)).toBeInTheDocument();
  });
});
