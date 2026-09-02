# PALEO collaboration website

Public website of PALEO, the Passive Asynchronous Lattice Exposure Observatory.

Static site built with [Astro](https://astro.build) and deployed to GitHub Pages
by the workflow in `.github/workflows/deploy.yml`.

- **Editing content (members, news, publications, photos, ...):** see [EDITING.md](EDITING.md).
- **Running locally:** install Node.js 22 or later, then

  ```
  npm install
  npm run dev      # local preview at http://localhost:4321
  npm run build    # writes the finished site to dist/
  ```
