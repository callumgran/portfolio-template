import { Button } from '@/components/ui/button';
import { PageShell } from '@/components/site/page-shell';
import { siteConfig } from '@/config/site';
import { withBasePath } from '@/lib/base-path';

export default function CvPage() {
  const pdfPath = siteConfig.cv.pdfPath;

  return (
    <PageShell className="max-w-5xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">CV</h1>
          <p className="text-sm text-muted-foreground">
            Place your PDF at <code>public{pdfPath}</code>.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <a href={withBasePath(pdfPath)} target="_blank" rel="noreferrer">
              Open
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={withBasePath(pdfPath)} download>
              Download
            </a>
          </Button>
        </div>
      </div>

      <iframe
        title="CV preview"
        src={pdfPath}
        className="h-[78vh] w-full bg-background"
      />
    </PageShell>
  );
}
