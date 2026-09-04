# Editing the PALEO website

This site is built from plain text files. To change something, edit the one file
named below; you never need to touch the templates in `src/`. Everything can be done
in the GitHub web interface: open the file, click the pencil icon, edit, then
"Commit changes". Choose **"Create a new branch and start a pull request"** if you
want the change checked before it goes live (see "Previewing changes" at the end).

Indentation matters in `.yaml` files: copy an existing block and change the values.

## Text containing a colon must be in quotes

This catches everyone once. It applies to the `.yaml` files in `data/` **and** to
the block between the `---` lines at the top of any file in `content/`.

```yaml
headline: PALEO: minerals as particle detectors     # BREAKS THE BUILD
headline: "PALEO: minerals as particle detectors"   # correct
```

The build fails with `bad indentation of a mapping entry` and the file and line
number, which is not an obvious way of saying "there is a stray colon here".
Wrapping the whole value in double quotes fixes it. Quoting is always safe, so
if in doubt, quote. The same goes for a value that starts with `#`, `@`, `%`,
`&`, `*`, `[` or `{`. If the text itself contains a double quote, put a
backslash before it: `title: "The \"paleo\" approach"`.

## Where things live

| To change...             | Edit...                                        |
|--------------------------|------------------------------------------------|
| Top menu                 | `data/nav.yaml`                                |
| Members                  | `data/members.yaml`                            |
| Institutions             | `data/institutions.yaml`                       |
| Publications and theses  | `data/publications.bib`                        |
| Talks                    | `data/talks.yaml` (PDFs go in `public/talks/`) |
| Links page               | `data/links.yaml`                              |
| Home page introduction   | `content/home.md`                              |
| News                     | `content/news/` (one file per item)            |
| About and other pages    | `content/pages/` (one file per page)           |
| Photo albums             | `content/photos/` (one folder per album)       |
| Institution logos        | `src/assets/logos/` + `logo:` in `data/institutions.yaml` |
| Collaboration photo      | `src/assets/collaboration-photo.jpg`           |
| Home headline and image  | `content/home.md`, `src/assets/placeholders/`  |
| Colours, fonts, spacing  | `src/styles/tokens.css`                        |
| Menu-bar wordmark / logo | `src/components/Logo.astro`                    |

## Add a member

Add a block to `data/members.yaml`:

```yaml
- name: Jane Doe
  institution: UMD
  senior: true                        # senior member, shown with *; leave out for junior members
  board: true                         # institutional board member, shown with †; optional
  spokesperson: true                  # optional; listed at the top of the page
  url: https://example.edu/~jdoe      # optional
  email: jdoe@example.edu             # optional
```

- `institution` must exactly match a `short` value in `data/institutions.yaml`
  (the build fails with a message naming the person if it does not).
- Within an institution, senior members are listed before junior members;
  otherwise people appear in the order of this file. To change the order, move
  the blocks.

To remove a member, delete their block.

The photo at the top of the Collaboration page is
`src/assets/collaboration-photo.jpg`; replace that file, keeping the name, to
change the photo. A wide (landscape) photo works best.

## Add an institution

Add a block to `data/institutions.yaml`. Institutions appear on the Collaboration
page in the order of this file.

```yaml
- name: University of Somewhere
  short: Somewhere
  country: Country
  url: https://physics.somewhere.edu/
  logo: somewhere.png        # optional
```

For a logo, upload the image (PNG, JPG or SVG; anything from about 300 px wide
up is fine, it is scaled to a small size) to `src/assets/logos/` and put its
file name in `logo`. Leave `logo` out to show no logo. The current logo files
are placeholders to be replaced.

## Add a publication or thesis

Append a BibTeX entry to `data/publications.bib`. Papers are listed newest first;
`@phdthesis` and `@mastersthesis` entries go into a separate "Theses" section.
Links are made from the `doi`, `eprint` (arXiv number) and `url` fields when present.

```bibtex
@article{Doe:2026abc,
  author  = {Doe, Jane and Roe, Richard},
  title   = {A new limit from paleo-detectors},
  journal = {Phys. Rev. D},
  volume  = {114},
  pages   = {012345},
  year    = {2026},
  doi     = {10.1103/PhysRevD.114.012345},
  eprint  = {2605.01234}
}

@phdthesis{Doe:2026thesis,
  author = {Doe, Jane},
  title  = {Readout of nuclear recoil tracks in olivine},
  school = {University of Somewhere},
  year   = {2026},
  url    = {https://example.edu/thesis.pdf}
}
```

Every entry needs `author`, `title` and `year`. Copying an entry from INSPIRE or
arXiv works; extra fields are ignored.

## Add a talk

Add a block to `data/talks.yaml`. Talks are sorted newest first.

```yaml
- title: "Paleo-detectors: status and prospects"
  speaker: Jane Doe
  event: TAUP 2026, Vienna
  date: 2026-08-25
  url: https://indico.example.org/event/123/    # optional
  file: doe-taup-2026.pdf                       # optional; upload the PDF to public/talks/
```

## Add a link

Add a block to `data/links.yaml`:

```yaml
- label: Snowmass paleo-detector white paper
  url: https://arxiv.org/abs/2203.05094
  description: Overview of the technique and its prospects.
```

## Add a news item

Create a new file in `content/news/`, for example `2026-10-01-first-samples.md`
(the file name is free, but starting with the date keeps the folder tidy):

```markdown
---
title: First mineral samples arrive at Virginia Tech
date: 2026-10-01
---

Text of the news item in Markdown. **Bold**, *italic*, [links](https://example.org)
and lists all work.
```

The three newest items appear on the home page; all of them at `/news/`.

## Add a page

Create a file in `content/pages/`, for example `content/pages/join.md`:

```markdown
---
title: Joining PALEO
slug: join
---

Page text in Markdown.
```

The page is then available at `/join/`. To put it in the top menu, add a line to
`data/nav.yaml` (see below). `content/pages/about.md` is the About page.

## Change the menu

Edit `data/nav.yaml`. Each entry is a label and a url; internal urls start and
end with `/`.

```yaml
- label: Join
  url: /join/
```

To hide a menu entry without losing it, put a `#` in front of both of its lines.
That is how Photos is hidden at the moment. The page itself still exists at its
address; only the menu link is gone.

## Add a photo album

1. Create a folder in `content/photos/`, e.g. `content/photos/2026-10-vt-meeting/`.
   (In the GitHub web interface: "Add file" > "Upload files", and type the new
   folder name in front of the file names, or drag the whole folder in.)
2. Upload the photos into that folder. JPG and PNG straight from a phone are
   fine; the site resizes them when it is built.
3. Add a file `index.md` in the same folder:

```markdown
---
title: Collaboration meeting, Virginia Tech
date: 2026-10-15
description: Two days of talks and lab tours in Blacksburg.
captions:
  IMG_4521.jpg: Opening session.
  IMG_4530.jpg: Tour of the microscopy lab.
---

Optional longer text about the album.
```

`description` and `captions` are optional. Albums are listed newest first; images
appear in file-name order.

## Change the home page headline or image

The large headline over the image is `headline:` at the top of `content/home.md`.
To show a small line above it, add `tagline: Some text` there too.

The image itself is `src/assets/placeholders/hero-thin-section.jpg`; replace that
file with a real photo of the same name (any size, landscape works best). Its
height is `--hero-height` in `src/styles/tokens.css`.

## Change colours, fonts or spacing

Edit `src/styles/tokens.css`. It is the one place where colours, fonts, spacing
and the hero height are defined.

## Change the menu-bar wordmark or replace it with a logo

The text "PALEO collaboration" in the menu bar is in `src/components/Logo.astro`.
Edit the words there, or follow the comment in that file to use a logo image.

## Previewing changes

Every pull request and every push runs the build (the "Build and deploy" check
on the pull request page). If the check is green, the files are valid. A red
check means a file has a problem; open the log of the check and look for the
line starting with "Error", which names the file and the field.

Pushing to the `main` branch publishes the site within a few minutes.

To see changes on your own computer before pushing, install Node.js and run
`npm install` once, then `npm run dev` and open http://localhost:4321.
