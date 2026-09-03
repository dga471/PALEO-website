// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // The sub-folder the site is served from. GitHub Pages serves a repository
  // called <name> at https://<account>.github.io/<name>/, so the sub-folder is
  // the repository name.
  //
  // Change this when the site moves: use '/' if it is ever served from the root
  // of a domain (for example a repository called <organisation>.github.io, or a
  // custom domain such as paleo-collaboration.org).
  base: '/PALEO-website',

  // Once the site has its final address, set it here as well; it is used for
  // canonical links.
  // site: 'https://<organisation>.github.io',

  output: 'static',
});
