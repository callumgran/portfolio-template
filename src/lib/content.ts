import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO, e.g. "2025-12-12"
  description?: string;
  tags?: string[];
  /** Optional cover image path under /public (e.g. '/posts/my-post.jpg'). */
  image?: string;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  date: string; // ISO
  description?: string;
  tags?: string[];
  url?: string;
};

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects');
const MDX_EXT = '.mdx';

const SLUG_RE = /^[a-z0-9][a-z0-9_-]*$/i;

const assertValidSlug = (slug: string) => {
  if (!SLUG_RE.test(slug)) {
    throw new Error('Invalid slug');
  }
};

const resolveSafeMdxPath = async (
  baseDir: string,
  slug: string
): Promise<string> => {
  assertValidSlug(slug);

  const candidate = path.resolve(baseDir, `${slug}${MDX_EXT}`);

  const baseResolved = path.resolve(baseDir) + path.sep;
  if (!candidate.startsWith(baseResolved)) {
    throw new Error('Path traversal blocked');
  }

  const [baseReal, candidateReal] = await Promise.all([
    fs.realpath(baseDir),
    fs.realpath(candidate),
  ]);

  const baseRealWithSep = baseReal + path.sep;
  if (!candidateReal.startsWith(baseRealWithSep)) {
    throw new Error('Symlink escape blocked');
  }

  return candidateReal;
};

const listSafeSlugs = async (baseDir: string): Promise<string[]> => {
  const entries = await fs.readdir(baseDir, { withFileTypes: true });

  return entries
    .filter((e) => e.isFile() && e.name.endsWith(MDX_EXT))
    .map((e) => e.name.slice(0, -MDX_EXT.length))
    .filter((slug) => SLUG_RE.test(slug));
};

export const getAllPosts = async (): Promise<PostMeta[]> => {
  const slugs = await listSafeSlugs(POSTS_DIR);

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const fullPath = await resolveSafeMdxPath(POSTS_DIR, slug);
      const raw = await fs.readFile(fullPath, 'utf8');
      const { data } = matter(raw);

      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? '1970-01-01'),
        description: data.description ? String(data.description) : undefined,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
        image: data.image ? String(data.image) : undefined,
      } satisfies PostMeta;
    })
  );

  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
};

export const getPostBySlug = async (
  slug: string
): Promise<{ meta: PostMeta; content: string }> => {
  const fullPath = await resolveSafeMdxPath(POSTS_DIR, slug);
  const raw = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? '1970-01-01'),
      description: data.description ? String(data.description) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
      image: data.image ? String(data.image) : undefined,
    },
    content,
  };
};

export const getAllProjects = async (): Promise<ProjectMeta[]> => {
  const slugs = await listSafeSlugs(PROJECTS_DIR);

  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const fullPath = await resolveSafeMdxPath(PROJECTS_DIR, slug);
      const raw = await fs.readFile(fullPath, 'utf8');
      const { data } = matter(raw);

      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? '1970-01-01'),
        description: data.description ? String(data.description) : undefined,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
        url: data.url ? String(data.url) : undefined,
      } satisfies ProjectMeta;
    })
  );

  projects.sort((a, b) => (a.date < b.date ? 1 : -1));
  return projects;
};

export const getProjectBySlug = async (
  slug: string
): Promise<{ meta: ProjectMeta; content: string }> => {
  const fullPath = await resolveSafeMdxPath(PROJECTS_DIR, slug);
  const raw = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? '1970-01-01'),
      description: data.description ? String(data.description) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
      url: data.url ? String(data.url) : undefined,
    },
    content,
  };
};
