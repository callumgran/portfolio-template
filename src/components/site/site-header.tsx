import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { siteConfig } from '@/config/site';
import { ThemeToggle } from '@/components/site/theme-toggle';

export function SiteHeader() {
  const navLinkClassName = `${navigationMenuTriggerStyle()} cursor-pointer`;

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className={navLinkClassName}>
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {siteConfig.features.blog ? (
              <NavigationMenuItem>
                <NavigationMenuLink className={navLinkClassName}>
                  <Link href="/blog">Blog</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ) : null}

            {siteConfig.features.projects ? (
              <NavigationMenuItem>
                <NavigationMenuLink className={navLinkClassName}>
                  <Link href="/projects">Projects</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ) : null}

            <NavigationMenuItem>
              <NavigationMenuLink className={navLinkClassName}>
                <Link href="/cv">CV</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
