import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

import { getAllPosts, getPostBySlug } from '@/lib/content';
import { mdxComponents } from '@/components/mdx-components';
import { siteConfig } from '@/config/site';
import { PageShell } from '@/components/site/page-shell';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => {
  if (!siteConfig.features.blog) {
    return [];
  }

  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
};

export const generateMetadata = async ({ params }: PageProps) => {
  if (!siteConfig.features.blog) {
    return {};
  }

  const { slug } = await params;
  const { meta } = await getPostBySlug(slug);

  return {
    title: meta.title,
    description: meta.description,
  };
};

export default async function BlogPostPage({ params }: PageProps) {
  if (!siteConfig.features.blog) {
    notFound();
  }

  const { slug } = await params;
  const { meta, content } = await getPostBySlug(slug);

  return (
    <PageShell>
      <h1 className="text-3xl font-semibold">{meta.title}</h1>
      <div className="mt-1 text-sm opacity-70">{meta.date}</div>

      <article className="prose dark:prose-invert max-w-none mt-6">
        <MDXRemote source={content} components={mdxComponents} />
      </article>
    </PageShell>
  );
}
