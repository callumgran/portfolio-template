import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mdxComponents } from '@/components/mdx-components';
import { siteConfig } from '@/config/site';
import { getAllPosts, getAllProjects } from '@/lib/content';
import { getHomeAboutMdx, getHomeSkills } from '@/lib/home-content';
import { withBasePath } from '@/lib/base-path';

export default async function HomePage() {
  const [posts, projects, aboutMdx, skills] = await Promise.all([
    getAllPosts(),
    getAllProjects(),
    getHomeAboutMdx(),
    getHomeSkills(),
  ]);

  const latestPost = posts[0];
  const latestProject = projects[0];

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-10">
      <section className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-24 md:size-32">
            {siteConfig.profileImage ? (
              <AvatarImage
                src={withBasePath(siteConfig.profileImage)}
                alt={siteConfig.name}
              />
            ) : null}
            <AvatarFallback>{siteConfig.initials ?? 'YN'}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {siteConfig.name}
            </h1>
            <p className="text-muted-foreground">
              {[siteConfig.role, siteConfig.location]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">About</h2>

        <div className="prose dark:prose-invert max-w-none">
          <MDXRemote source={aboutMdx} components={mdxComponents} />
        </div>

        {skills.length ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        ) : null}
      </section>

      {siteConfig.features.blog || siteConfig.features.projects ? (
        <section className="grid gap-4 md:grid-cols-2">
          {siteConfig.features.blog ? (
            latestPost ? (
              <Link href={`/blog/${latestPost.slug}`} className="block">
                <Card className="h-full transition hover:shadow-md">
                  <CardHeader>
                    <CardTitle>Latest blog post</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm font-medium">
                      {latestPost.title}
                    </div>
                    {latestPost.description ? (
                      <p className="text-sm text-muted-foreground">
                        {latestPost.description}
                      </p>
                    ) : null}
                    {latestPost.tags?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {latestPost.tags.slice(0, 3).map((t) => (
                          <Badge key={t} variant="secondary">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Latest blog post</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  No posts yet. Add one in <code>content/posts</code>.
                </CardContent>
              </Card>
            )
          ) : null}

          {siteConfig.features.projects ? (
            latestProject ? (
              <Link href={`/projects/${latestProject.slug}`} className="block">
                <Card className="h-full transition hover:shadow-md">
                  <CardHeader>
                    <CardTitle>Latest project</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm font-medium">
                      {latestProject.title}
                    </div>
                    {latestProject.description ? (
                      <p className="text-sm text-muted-foreground">
                        {latestProject.description}
                      </p>
                    ) : null}
                    {latestProject.tags?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {latestProject.tags.slice(0, 3).map((t) => (
                          <Badge key={t} variant="secondary">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Latest project</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  No projects yet. Add one in <code>content/projects</code>.
                </CardContent>
              </Card>
            )
          ) : null}
        </section>
      ) : null}
    </main>
  );
}
