import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { Button } from '@/components/ui/button';
import { PageShell } from '@/components/site/page-shell';
import { mdxComponents } from '@/components/mdx-components';
import { getNotFoundMdx } from '@/lib/not-found-content';

export default async function NotFound() {
  const { meta, content } = await getNotFoundMdx();

  const title = meta.title ?? '404';
  const headline = meta.headline ?? 'Page not found';
  const description =
    meta.description ??
    'The page you’re looking for doesn’t exist (or was moved).';

  const primary = meta.primaryCta ?? { label: 'Go home', href: '/' };

  return (
    <PageShell>
      <div className="relative overflow-hidden p-6 sm:p-10">
        <div className="relative space-y-6">
          <div className="space-y-2">
            <div className="text-sm font-medium tracking-wider text-muted-foreground">
              {title}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {headline}
            </h1>
            <p className="max-w-prose text-sm text-muted-foreground sm:text-base">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild className="h-10">
              <Link href={primary.href}>{primary.label}</Link>
            </Button>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none">
            <MDXRemote source={content} components={mdxComponents} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
