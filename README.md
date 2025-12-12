# Portfolio Template (Next.js + MDX)

A small Next.js portfolio template designed for static hosting (GitHub Pages). Content lives in `content/` and is rendered from MDX.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## After forking: configure your content

### 1) Update site config

Edit `src/config/site.ts`:

- `name`, `role`, `location`, `initials`
- `features.blog` / `features.projects` (toggle nav + routes)
- `cv.pdfPath` (defaults to `/cv.pdf`)
- `contact` links

### 2) Add your CV PDF

Put your PDF at:

- `public/cv.pdf`

If you want a different filename, update `siteConfig.cv.pdfPath` in `src/config/site.ts`.

### 3) Add your profile image

Place an image in `public/` and point `siteConfig.profileImage` at it.

Recommended:

- `public/me.png` or `public/me.jpg`
- then set `profileImage: '/me.png'` (or `'/me.jpg'`) in `src/config/site.ts`

### 4) Edit Home content

- `content/home/about.mdx` controls the “About” section
- `content/home/skills.txt` controls the skill badges (one per line; lines starting with `#` are ignored)

### 5) Edit the 404 page

- `content/not-found/not-found.mdx`

This file supports frontmatter:

- `title`
- `headline`
- `description`
- `primaryCta: { label, href }`

## Blog posts and projects

### Add a blog post

Create an MDX file:

- `content/posts/<slug>.mdx`

### Add a project

Create an MDX file:

- `content/projects/<slug>.mdx`

Slug rules: letters/numbers, `-` and `_` only.

Each MDX file can use frontmatter (example fields used by the site):

- `title` (string)
- `date` (ISO format recommended, e.g. `2025-12-12`)
- `description` (string)
- `tags` (array)
- Projects only: `url` (string)

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-github-pages.yml`.

### 1) Enable GitHub Pages

In your GitHub repo:

- Settings → Pages
- Source: **GitHub Actions**

### 2) Push to deploy

The workflow runs on pushes to `main` and publishes the static export in the `out/` folder.

### Base path behavior (`username.github.io` vs repo pages)

The deploy workflow sets `NEXT_PUBLIC_BASE_PATH` automatically:

- If your repository name is exactly `username.github.io`, the base path is empty (site served at `/`).
- Otherwise, base path is `/<repo-name>` (site served under `/repo-name/`).

This is applied via:

- `.github/workflows/deploy-github-pages.yml` (sets `NEXT_PUBLIC_BASE_PATH`)
- `next.config.ts` (reads `NEXT_PUBLIC_BASE_PATH` as `basePath`)

## Build a static export locally

```bash
npm run build
npx serve@latest out
```