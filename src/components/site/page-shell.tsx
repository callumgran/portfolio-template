import * as React from 'react';

import { cn } from '@/lib/utils';

export function PageShell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <main className={cn('mx-auto max-w-4xl p-6 space-y-6', className)}>
      {children}
    </main>
  );
}
