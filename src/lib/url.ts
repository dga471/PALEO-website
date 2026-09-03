// Builds links to pages and files inside this site.
//
// Every internal link goes through this so that the site works whether it is
// served from the root of a domain (https://example.org/about/) or from a
// sub-folder (https://example.github.io/repo-name/about/). The sub-folder, if
// any, is the "base" setting in astro.config.mjs.
export function url(path: string): string {
  return (import.meta.env.BASE_URL + '/' + path).replace(/\/{2,}/g, '/');
}
