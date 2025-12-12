import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type NotFoundCta = {
  label: string;
  href: string;
};

export type NotFoundMeta = {
  title?: string;
  headline?: string;
  description?: string;
  primaryCta?: NotFoundCta;
  secondaryCta?: NotFoundCta;
};

const NOT_FOUND_DIR = path.join(process.cwd(), 'content', 'not-found');
const NOT_FOUND_FILE = path.join(NOT_FOUND_DIR, 'not-found.mdx');

export const getNotFoundMdx = async (): Promise<{
  meta: NotFoundMeta;
  content: string;
}> => {
  try {
    const raw = await fs.readFile(NOT_FOUND_FILE, 'utf8');
    const { data, content } = matter(raw);

    const meta: NotFoundMeta = {
      title: data.title ? String(data.title) : undefined,
      headline: data.headline ? String(data.headline) : undefined,
      description: data.description ? String(data.description) : undefined,
      primaryCta:
        data.primaryCta && typeof data.primaryCta === 'object'
          ? {
              label: String(data.primaryCta.label ?? 'Go home'),
              href: String(data.primaryCta.href ?? '/'),
            }
          : undefined,
      secondaryCta:
        data.secondaryCta && typeof data.secondaryCta === 'object'
          ? {
              label: String(data.secondaryCta.label ?? 'Blog'),
              href: String(data.secondaryCta.href ?? '/blog'),
            }
          : undefined,
    };

    return { meta, content };
  } catch {
    return {
      meta: {
        title: '404',
        headline: 'Page not found',
        description:
          'The page you’re looking for doesn’t exist (or was moved).',
        primaryCta: { label: 'Go home', href: '/' },
      },
      content:
        'You can customize this page by creating `content/not-found/not-found.mdx`.\n',
    };
  }
};
