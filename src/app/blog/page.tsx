import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { PageShell } from '@/components/site/page-shell';
import { ContentSearchClient } from '@/components/content/content-search-client';
import { siteConfig } from '@/config/site';
import { getAllPosts } from '@/lib/content';

export default async function BlogIndexPage() {
  if (!siteConfig.features.blog) {
    notFound();
  }

  const posts = await getAllPosts();

  return (
    <PageShell>
      <Suspense
        fallback={<div className="text-sm text-muted-foreground">Loading…</div>}
      >
        <ContentSearchClient
          title="Blog"
          items={posts}
          basePath="/blog"
          emptyState={
            <div className="text-sm text-muted-foreground">
              No matching posts.
            </div>
          }
        />
      </Suspense>
    </PageShell>
  );
}
