import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig((/* mode */) => {
  // Allow overriding the base path at build time (useful for GitHub Pages)
  const base = process.env.VITE_BASE ?? '/';

  return {
    base,
    plugins: [react()],
  };
});
