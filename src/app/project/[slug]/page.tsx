import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

import { mdxComponents } from '@/components/mdx-components';
import { PageShell } from '@/components/site/page-shell';
import { siteConfig } from '@/config/site';
import { getAllProjects, getProjectBySlug } from '@/lib/content';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => {
  if (!siteConfig.features.projects) {
    return [];
  }

  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
};

export const generateMetadata = async ({ params }: PageProps) => {
  if (!siteConfig.features.projects) {
    return {};
  }

  const { slug } = await params;
  const { meta } = await getProjectBySlug(slug);

  return {
    title: meta.title,
    description: meta.description,
  };
};

export default async function ProjectPage({ params }: PageProps) {
  if (!siteConfig.features.projects) {
    notFound();
  }

  const { slug } = await params;
  const { meta, content } = await getProjectBySlug(slug);

  return (
    <PageShell>
      <h1 className="text-3xl font-semibold">{meta.title}</h1>
      <div className="mt-1 text-sm opacity-70">{meta.date}</div>

      <article className="prose dark:prose-invert max-w-none">
        <MDXRemote source={content} components={mdxComponents} />
      </article>
    </PageShell>
  );
}
