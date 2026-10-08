# Jake Callcut — Personal Portfolio

Live: https://jakecallcut.dev

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Frontend](https://img.shields.io/badge/frontend-React%2BTypeScript-blue)
![Deployment](https://img.shields.io/badge/deploy-GitHub%20Pages-blueviolet)
![Hosting](https://img.shields.io/badge/hosting-GitHub%20Pages-lightgrey)
![Tests](https://img.shields.io/badge/tests-vitest-yellow)

This repository contains a minimal, fast personal portfolio built with React, TypeScript, Vite and Tailwind CSS.

## Branches
- `main` — primary development branch. Pushing here builds and deploys the site.
- `gh-pages` — build output served by GitHub Pages (written by the deploy workflow).

## Editing content
- Hero, projects, experience, education, skills and contact details live in `src/data/content.json`.
- Writing posts are markdown files in `src/content/writing/` with `title`, `date` and `description` frontmatter. Add new posts to `public/sitemap.xml` too.
- The hero artwork is `public/images/winged-victory-light.svg` / `-dark.svg`, swapped with the theme.

## Screenshots

Desktop

![Desktop screenshot](/scs/desktop_sc.png)

Mobile

![Mobile screenshot](/scs/mobile_sc.png)