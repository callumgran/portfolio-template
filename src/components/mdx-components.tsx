import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { withBasePath } from '@/lib/base-path';

export const mdxComponents: MDXComponents = {
  a: ({ href, children, ...props }) => {
    const url = String(href ?? '');
    const isExternal = url.startsWith('http');
    if (isExternal) {
      return (
        <a href={url} target="_blank" rel="noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={url} {...props}>
        {children}
      </Link>
    );
  },

  Callout: ({
    title,
    children,
  }: {
    title?: string;
    children: React.ReactNode;
  }) => (
    <Alert className="my-6">
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  ),

  Card: ({
    title,
    children,
  }: {
    title?: string;
    children: React.ReactNode;
  }) => (
    <Card className="my-6">
      {title ? (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      ) : null}
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  ),

  MdxImage: ({
    src,
    alt,
    caption,
    width = 1200,
    height = 675,
    priority = false,
  }: {
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
    priority?: boolean;
  }) => (
    <figure className="my-6">
      <div className="overflow-hidden rounded-xl border">
        <Image
          src={withBasePath(src)}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          priority={priority}
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  ),

  CtaButton: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Button asChild className="my-4">
      <a href={withBasePath(href)}>{children}</a>
    </Button>
  ),
};
