'use client';

import * as React from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X, ArrowUpDown } from 'lucide-react';

export type ContentSearchSort = 'newest' | 'oldest';

export function ContentSearchForm({
  query,
  sort,
  onSubmit,
}: {
  query: string;
  sort: ContentSearchSort;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const key = `${query}::${sort}`;

  const [sortValue, setSortValue] = React.useState<ContentSearchSort>(sort);
  React.useEffect(() => setSortValue(sort), [sort]);

  const hasFilters = Boolean(query?.trim()) || sortValue !== 'newest';

  return (
    <form method="get" className="" key={key} onSubmit={onSubmit}>
      <input type="hidden" name="q" defaultValue={query} />
      <input type="hidden" name="sort" value={sortValue} />

      <div className="rounded-lg border bg-background/50 shadow-sm">
        <div className="hidden sm:flex w-full items-center gap-2 px-2 py-2 sm:py-1">
          <Search className="ml-1 h-4 w-4 shrink-0 text-muted-foreground" />

          <Input
            id="q"
            defaultValue={query}
            onChange={(e) => {
              const hidden = (e.currentTarget
                .closest('form')
                ?.querySelector('input[name="q"]') ??
                null) as HTMLInputElement | null;
              if (hidden) hidden.value = e.currentTarget.value;
            }}
            placeholder="Search titles…"
            className="h-9 flex-1 border-0 bg-transparent px-2 shadow-none focus-visible:ring-0"
            aria-label="Search by title"
          />

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center text-muted-foreground">
              <ArrowUpDown className="h-4 w-4" />
            </div>

            <Select
              value={sortValue}
              onValueChange={(v) =>
                setSortValue(v === 'oldest' ? 'oldest' : 'newest')
              }
            >
              <SelectTrigger
                id="sort"
                className="h-9 w-40 border-0 bg-transparent shadow-none focus:ring-0"
                aria-label="Sort"
              >
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit" className="h-9">
              Apply
            </Button>

            {hasFilters ? (
              <Button
                asChild
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                aria-label="Clear filters"
                title="Clear filters"
              >
                <a href="?">
                  <X className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
          </div>
        </div>

        {/* Mobile layout */}
        <div className="sm:hidden p-2 space-y-2">
          <div className="flex items-center gap-2">
            <Search className="ml-1 h-4 w-4 shrink-0 text-muted-foreground" />
            <Input
              id="q-mobile"
              defaultValue={query}
              onChange={(e) => {
                const hidden = (e.currentTarget
                  .closest('form')
                  ?.querySelector('input[name="q"]') ??
                  null) as HTMLInputElement | null;
                if (hidden) hidden.value = e.currentTarget.value;
              }}
              placeholder="Search titles…"
              className="h-10 flex-1 border-0 bg-transparent px-2 shadow-none focus-visible:ring-0"
              aria-label="Search by title"
            />
            {hasFilters ? (
              <Button
                asChild
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                aria-label="Clear filters"
                title="Clear filters"
              >
                <a href="?">
                  <X className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
          </div>

          <div className="grid grid-cols-[1fr_auto] items-center gap-2">
            <Select
              value={sortValue}
              onValueChange={(v) =>
                setSortValue(v === 'oldest' ? 'oldest' : 'newest')
              }
            >
              <SelectTrigger
                id="sort-mobile"
                className="h-10 w-full bg-transparent"
                aria-label="Sort"
              >
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit" className="h-10 px-4">
              Apply
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
