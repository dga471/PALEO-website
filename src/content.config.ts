// Content collections: one per data file or content folder.
// The schemas make the build fail with a clear message when an entry is malformed.
import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';
import yaml from 'js-yaml';
import { parse as parseBibtex } from '@retorquere/bibtex-parser';

// The YAML lists in data/ have no id field; number the entries so Astro can store them.
function yamlList(text: string) {
  const items = (yaml.load(text) ?? []) as Record<string, unknown>[];
  return items.map((item, i) => ({ id: String(i + 1), ...item }));
}

// Turn data/publications.bib into flat entries (one per BibTeX key).
function bibtexList(text: string) {
  const library = parseBibtex(text, { sentenceCase: false });
  if (library.errors.length > 0) {
    throw new Error('data/publications.bib: ' + library.errors.map((e) => e.message).join('; '));
  }
  return library.entries.map((entry) => {
    const f = entry.fields;
    const authors = (f.author ?? [])
      .map((a) => a.name ?? [a.firstName, a.prefix, a.lastName, a.suffix].filter(Boolean).join(' '))
      .join(', ');
    return {
      id: entry.key,
      type: entry.type.toLowerCase(),
      title: f.title ?? '',
      authors,
      year: f.year ?? '',
      venue: f.journal ?? f.booktitle ?? '',
      volume: f.volume ?? '',
      pages: f.pages ?? '',
      school: f.school ?? (f.institution ?? []).join(', '),
      doi: f.doi ?? '',
      eprint: f.eprint ?? '',
      url: f.url ?? '',
    };
  });
}

const nav = defineCollection({
  loader: file('data/nav.yaml', { parser: yamlList }),
  schema: z.object({
    label: z.string(),
    url: z.string(),
  }),
});

const members = defineCollection({
  loader: file('data/members.yaml', { parser: yamlList }),
  schema: z.object({
    name: z.string(),
    institution: z.string(),
    role: z.string(),
    url: z.string().url().optional(),
    email: z.string().email().optional(),
  }),
});

const institutions = defineCollection({
  loader: file('data/institutions.yaml', { parser: yamlList }),
  schema: z.object({
    name: z.string(),
    short: z.string(),
    country: z.string(),
    url: z.string().url(),
    logo: z.string().optional(),   // file name of an image in src/assets/logos/
  }),
});

const talks = defineCollection({
  loader: file('data/talks.yaml', { parser: yamlList }),
  schema: z.object({
    title: z.string(),
    speaker: z.string(),
    event: z.string(),
    date: z.coerce.date(),
    url: z.string().url().optional(),
    file: z.string().optional(),
  }),
});

const links = defineCollection({
  loader: file('data/links.yaml', { parser: yamlList }),
  schema: z.object({
    label: z.string(),
    url: z.string().url(),
    description: z.string(),
  }),
});

const publications = defineCollection({
  loader: file('data/publications.bib', { parser: bibtexList }),
  schema: z.object({
    type: z.string(),
    title: z.string().min(1),
    authors: z.string().min(1),
    year: z.coerce.number().int(),
    venue: z.string(),
    volume: z.string(),
    pages: z.string(),
    school: z.string(),
    doi: z.string(),
    eprint: z.string(),
    url: z.string(),
  }),
});

const home = defineCollection({
  loader: glob({ base: './content', pattern: 'home.md' }),
  schema: z.object({
    title: z.string(),
    headline: z.string(),             // large heading over the hero image
    tagline: z.string().optional(),   // optional small line above the headline
  }),
});

const news = defineCollection({
  loader: glob({ base: './content/news', pattern: '*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
});

const pages = defineCollection({
  loader: glob({ base: './content/pages', pattern: '*.md' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/, 'slug may contain only lowercase letters, digits and hyphens'),
  }),
});

const photos = defineCollection({
  loader: glob({ base: './content/photos', pattern: '*/index.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    captions: z.record(z.string()).optional(),
  }),
});

export const collections = { nav, members, institutions, talks, links, publications, home, news, pages, photos };
