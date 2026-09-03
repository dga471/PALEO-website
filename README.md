# PALEO collaboration website

Public website of PALEO, the Passive Asynchronous Lattice Exposure Observatory.

Static site built with [Astro](https://astro.build) and deployed to GitHub Pages
by the workflow in `.github/workflows/deploy.yml`.

- **Editing content (members, news, publications, photos, ...):** see [EDITING.md](EDITING.md).

## Where the site is published

Pushing to `main` builds the site and publishes it to GitHub Pages. This needs
one setting on the repository, once: **Settings > Pages > Source: GitHub Actions**.

Two things to change when the site moves to its permanent home:

1. `base` in `astro.config.mjs` is the sub-folder the site is served from.
   GitHub Pages serves a repository called `<name>` at
   `https://<account>.github.io/<name>/`, so `base` is the repository name.
   Set it to `'/'` if the site ever lives at the root of a domain, which is the
   case for a repository named `<organisation>.github.io` or for a custom domain.
2. `src/layouts/BaseLayout.astro` contains a `robots` line that keeps the draft
   out of search engines. Delete that line when the site is ready to be public.

- **Running locally:** install Node.js 22 or later, then

  ```
  npm install
  npm run dev      # local preview at http://localhost:4321
  npm run build    # writes the finished site to dist/
  ```
