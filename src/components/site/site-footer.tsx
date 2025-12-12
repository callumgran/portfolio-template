import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export function SiteFooter() {
  const { contact } = siteConfig;
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}.
        </p>

        <div className="flex flex-wrap gap-2">
          {contact.email ? (
            <Button asChild variant="outline" size="sm">
              <a href={`mailto:${contact.email}`}>
                <FaEnvelope className="size-4" />
                Email
              </a>
            </Button>
          ) : null}

          {contact.github ? (
            <Button asChild variant="outline" size="sm">
              <a href={contact.github} target="_blank" rel="noreferrer">
                <FaGithub className="size-4" />
                GitHub
              </a>
            </Button>
          ) : null}

          {contact.linkedin ? (
            <Button asChild variant="outline" size="sm">
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedin className="size-4" />
                LinkedIn
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
