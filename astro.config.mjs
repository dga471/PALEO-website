// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Once the site has its final address, set it here (used for canonical links):
  // site: 'https://<organisation>.github.io',
  //
  // If the site is served from a sub-path such as https://<organisation>.github.io/<repo>/
  // (a "project page" rather than the organisation's root page), uncomment and set:
  // base: '/<repo>',
  output: 'static',
});
