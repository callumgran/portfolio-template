'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContentSearchForm } from '@/components/content/content-search-form';
import type { ContentSearchSort } from '@/components/content/content-search-form';

export type ContentSearchItem = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
};

const normalizeQueryParam = (value: string | null): string => value ?? '';

const normalizeSortParam = (value: string | null): ContentSearchSort =>
  value === 'oldest' ? 'oldest' : 'newest';

export function ContentSearchClient<T extends ContentSearchItem>({
  title,
  items,
  basePath,
  emptyState,
}: {
  title: string;
  items: T[];
  basePath: string;
  emptyState?: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const sp = useSearchParams();

  const q = normalizeQueryParam(sp.get('q'));
  const sort = normalizeSortParam(sp.get('sort'));

  const onSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const nextQ = String(formData.get('q') ?? '').trim();
      const nextSort = String(formData.get('sort') ?? 'newest');

      const params = new URLSearchParams();
      params.set('q', nextQ);
      if (nextSort && nextSort !== 'newest') params.set('sort', nextSort);

      const href = params.toString() ? `${pathname}?${params}` : pathname;
      router.push(href);
    },
    [pathname, router]
  );

  const filtered = React.useMemo(() => {
    const queryLower = q.trim().toLowerCase();
    const list = queryLower
      ? items.filter((i) => i.title.toLowerCase().includes(queryLower))
      : [...items];

    return list.sort((a, b) => {
      const cmp = a.date.localeCompare(b.date);
      return sort === 'newest' ? -cmp : cmp;
    });
  }, [items, q, sort]);

  const empty = emptyState ?? (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">No results</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Try a different search.
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold">{title}</h1>

        <ContentSearchForm query={q} sort={sort} onSubmit={onSubmit} />
      </div>

      {filtered.length === 0 ? empty : null}

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((item) => (
          <Link
            key={item.slug}
            href={`${basePath}/${item.slug}`}
            className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Card className="h-full transition hover:shadow-md">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <div className="text-xs opacity-70">{item.date}</div>
                {item.description ? <p>{item.description}</p> : null}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
