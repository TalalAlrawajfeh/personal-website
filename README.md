# Talal Alrawajfeh — research website

A static Astro site for a research profile, publications, projects, CV, and writing. It has no analytics and needs no frontend framework.

## Local development

Requires Node.js 22.19 or newer.

```sh
npm install
npm run dev -- --background
```

Manage the background server with `npx astro dev status`, `npx astro dev logs`, and `npx astro dev stop`. Run `npm run build` to create the static site in `dist/`.

## Content

The site uses Astro content collections, defined in `src/content.config.ts`. Add a Markdown (`.md`) or MDX (`.mdx`) file to a collection; list and detail pages are generated automatically.

### Research: `src/content/research/`

Required frontmatter: `title`, `description`, `status` (`published`, `preprint`, or `ongoing`). Optional frontmatter: `authors`, `venue`, `year`, `paperUrl`, `arxivUrl`, `codeUrl`, `projectUrl`, `tags`, `image`, `abstract`, `featured`, `order`. The file name becomes the page slug. Add an image under `public/` and refer to it as `/your-image.jpg`.

### Publications: `src/content/publications/`

Required frontmatter: `title`, `authors`, `venue`, `year`. Optional fields: `details`, `note`, `paperUrl`, `arxivUrl`, `codeUrl`, `bibtex`, `researchSlug`. A matching `researchSlug` links the citation to its project page. The BibTeX field is displayed in an expandable block.

### Blog: `src/content/blog/`

Required frontmatter: `title`, `description`, `publishedAt`. Optional fields: `updatedAt`, `tags`, `draft`, `image`. Drafts do not appear in listings, detail pages, or RSS. `mathematics-formalization.md` contains the full Markdown version of “What Does a Machine-Checked Proof Actually Verify?”, with equations, Lean examples, diagrams, and linked references from the original note.

Example `src/content/blog/my-first-post.mdx`:

```mdx
---
title: My first post
description: A short summary for listings and search results.
publishedAt: 2026-09-30
tags: [Machine learning, Mathematics]
draft: true
---

Markdown and MDX are supported. Inline math: $p(x \mid y)$.

Display math:

$$
p(x \mid y) = \frac{p(y \mid x)p(x)}{p(y)}
$$
```

Remove `draft: true` and set the correct date when ready to publish.

## Profile and CV

- `src/data/site.ts` holds contact and profile links, including Google Scholar.
- `cv/talal-alrawajfeh-cv.tex` is the content source for the online CV and downloadable PDF. Edit this file to update the summary, skills, experience, publications, education, and additional information. The online CV reads it directly through `src/data/cv.ts`, preserving section order, wording, emphasis, and links.
- Run `npm run cv:pdf` after editing the LaTeX file to regenerate the PDF and copy it to `public/talal-alrawajfeh-cv.pdf` (requires `latexmk` and a LaTeX installation). Then run `npm run build` to rebuild the website. Website builds do not require LaTeX; the deployment uses the committed PDF.
- The online renderer supports the CV's existing `section`, `role`, `itemize`, `textbf`, `textit`, and `href` commands. Unsupported content commands cause a build error so edits cannot silently disappear. Research and publication pages continue to use their content collections.
- `public/portrait.jpg` is a copy of the supplied portrait.
- Research and publication data were transcribed from `/home/talalalr/Documents/Personal/Resume/about me.txt` and `resume.tex`.

## Deployment

The workflow in `.github/workflows/deploy.yml` builds and deploys `main` to GitHub Pages. `astro.config.mjs` sets the canonical site URL to `https://talalalrawajfeh.eu`, and `public/CNAME` declares the custom domain. Configure that domain in the repository's GitHub Pages settings and DNS before launch.
