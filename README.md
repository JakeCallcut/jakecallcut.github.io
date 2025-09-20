# Jake Callcut — Portfolio

This repo contains a Vite + React + TypeScript portfolio site configured for GitHub Pages.

## Quick start

- Install dependencies: `npm ci`
- Run dev server: `npm run dev`
- Build production: `npm run build`

## Deployment (GitHub Pages)

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds the site and publishes to GitHub Pages. The workflow sets `VITE_BASE` to `/jakecallcut.github.io/` during the build so Vite emits assets with the correct base path when hosting under `https://<user>.github.io/<repo>/`.

If you change the repository name or host at a custom domain, update `VITE_BASE` in the workflow and the `index.html` canonical link.

## SEO

- Per-page meta tags are added with `src/lib/seo.tsx` using `react-helmet-async`.
- The Home page includes Person and WebSite JSON-LD structured data.

## Notes

- Tailwind CSS is configured with semantic tokens in `tailwind.config.ts` and CSS variables in `src/styles/globals.css`.
- If you run into PostCSS/Tailwind errors, confirm the installed Tailwind major version and the `postcss.config.cjs` plugin configuration.
