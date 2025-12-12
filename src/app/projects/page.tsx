import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { PageShell } from '@/components/site/page-shell';
import { ContentSearchClient } from '@/components/content/content-search-client';
import { siteConfig } from '@/config/site';
import { getAllProjects } from '@/lib/content';

export default async function ProjectsPage() {
  if (!siteConfig.features.projects) {
    notFound();
  }

  const projects = await getAllProjects();

  return (
    <PageShell>
      <Suspense
        fallback={<div className="text-sm text-muted-foreground">Loading…</div>}
      >
        <ContentSearchClient
          title="Projects"
          items={projects}
          basePath="/projects"
          emptyState={
            <div className="text-sm text-muted-foreground">
              No matching projects.
            </div>
          }
        />
      </Suspense>
    </PageShell>
  );
}
