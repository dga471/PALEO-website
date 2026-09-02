# PALEO website

Public static website of the PALEO collaboration (Passive Asynchronous Lattice
Exposure Observatory). Astro, static output, deployed to GitHub Pages by
`.github/workflows/deploy.yml`.

**Human editing guide: [EDITING.md](EDITING.md).** Read it first; it lists which
file to change for every routine task.

## Constraints (keep these)

- The site is maintained by physicists who are not developers. All routine changes
  (members, institutions, publications, talks, news, menu, pages, photo albums)
  must be made by editing one obvious data or content file under `data/` or
  `content/`, never a template. Keep it that way.
- Keep the code layer small and plain. No abstractions beyond what is in `src/lib/`.
  Templates only loop over data and group by a field.
- No CSS framework, no component library, no client-side JavaScript except an
  optional photo lightbox. All styling is in `src/styles/site.css`; all colours,
  fonts and spacing are in `src/styles/tokens.css`.
- Content collections are defined in `src/content.config.ts` with flat schemas so
  the build fails on malformed entries. Keep schemas to simple scalar fields.
- Use the built-in image optimisation of Astro (`astro:assets`) so raw phone photos
  can be committed.
- Do not reference any personal GitHub username in config, base URLs or the
  deploy workflow; the repository will move to the organisation of the collaboration.
- The logo is the single component `src/components/Logo.astro`.

## Layout

```
data/            nav, members, institutions, talks, links (YAML); publications.bib
content/         home.md, news/*.md, pages/*.md, photos/<album>/index.md + images
src/content.config.ts   collection schemas (one per data/content file type)
src/layouts/     BaseLayout.astro
src/components/  Header, Footer, Logo
src/pages/       one template per section
src/styles/      tokens.css (design tokens), site.css
src/lib/         format.ts (dates, sorting), photos.ts (album image lookup)
public/talks/    PDFs referenced from data/talks.yaml
```

## Commands

`npm install`, `npm run dev`, `npm run build` (writes `dist/`).
