import BlurFade from '@/components/magicui/blur-fade';
import BlurFadeText from '@/components/magicui/blur-fade-text';
import { ProjectCard } from '@/components/project-card';
import { ResumeCard } from '@/components/resume-card';
import { ServiceCard } from '@/components/service-card';
import { TeachingCard } from '@/components/teaching-card';
import { Badge } from '@/components/ui/badge';
import { DATA } from '@/data/resume';
import Markdown from 'react-markdown';
import MarkdownImage from '@/components/markdown-image';
import getBlogs from './getBlogs';

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  const blogposts = getBlogs();

  return (
    <main className="flex flex-col min-h-dvh space-y-12">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-4">
          <div className="gap-4 flex flex-col-reverse sm:flex-row justify-between items-start">
            <div className="flex-col flex flex-1 space-y-3">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl/none text-foreground"
                yOffset={8}
                text={`${DATA.name}`}
              />
              
              {/* Dynamic contact and social action bar */}
              <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
                <div className="flex flex-wrap items-center gap-2 mt-2 select-none">
                  {Object.entries(DATA.contact.social).map(([name, social]) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-x-1.5 text-xs text-muted-foreground hover:text-primary font-semibold transition-all duration-200 bg-secondary/50 dark:bg-card/25 hover:bg-secondary border border-border/40 dark:border-white/5 px-3 py-1 rounded-full shadow-sm shadow-black/[0.01]"
                      >
                        <IconComponent className="size-3.5" />
                        {name}
                      </a>
                    );
                  })}
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="size-32 sm:size-36 md:size-48 [clip-path:url(#squircle)] border border-border/50 dark:border-white/10 p-1 bg-white dark:bg-zinc-950 shadow-lg shrink-0 flex items-center justify-center">
                <div className="size-full [clip-path:url(#squircle)] bg-zinc-100 dark:bg-zinc-900">
                  <img
                    alt={DATA.name}
                    src={DATA.avatarUrl}
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="space-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground pb-2 border-b border-border/40 w-full relative">
              About
              <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-primary" />
            </h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans text-xs sm:text-sm text-muted-foreground dark:prose-invert leading-relaxed">
              <Markdown
                components={{
                  img: MarkdownImage,
                  a: ({ node, ...props }) => (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                      className="text-primary hover:underline font-medium"
                    />
                  ),
                }}
              >
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground pb-2 border-b border-border/40 w-full relative">
              Research Interests
              <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-primary" />
            </h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1.5">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
                <Badge key={skill} className="px-3 py-1 text-xs font-semibold tracking-wide bg-secondary/80 hover:bg-secondary border-none text-secondary-foreground rounded-full select-none">{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="news">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground pb-2 border-b border-border/40 w-full relative">
              News
              <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-primary" />
            </h2>
          </BlurFade>
          <div className="flex flex-col gap-3">
            {DATA.news.map((news, id) => (
              <BlurFade key={news.title} delay={BLUR_FADE_DELAY * 7 + id * 0.05}>
                <ResumeCard
                  key={news.title}
                  logoUrl=""
                  altText={news.title}
                  title={news.title}
                  subtitle={news.subtitle}
                  href={news.href}
                  period={news.date}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground pb-2 border-b border-border/40 w-full relative">
              Education
              <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-primary" />
            </h2>
          </BlurFade>
          <div className="flex flex-col gap-3">
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
              >
                <ResumeCard
                  key={education.school}
                  href={education.href}
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${
                    education.end ? education.end : 'Present'
                  }`}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="teaching">
        <div className="space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground pb-2 border-b border-border/40 w-full relative">
              Teaching
              <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-primary" />
            </h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <ul className="ml-4 border-l border-muted/80 dark:border-white/10 relative space-y-1 mt-6">
              {DATA.teaching.map((project, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 10 + id * 0.05}
                >
                  <TeachingCard
                    title={project.title}
                    description={project.description}
                    role={project.role}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>

      <section id="service">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground pb-2 border-b border-border/40 w-full relative">
              Academic Service
              <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-primary" />
            </h2>
          </BlurFade>
          <div className="flex flex-col gap-2">
            {DATA.service.map((service, id) => (
              <BlurFade
                key={service.type}
                delay={BLUR_FADE_DELAY * 11 + id * 0.05}
              >
                <ServiceCard type={service.type} description={service.venues} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="blogs">
        <div className="space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground pb-2 border-b border-border/40 w-full relative text-left">
                Personal Blogs
                <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-primary" />
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm text-left w-full mt-2">
                Explore, experience, and enrich.
              </p>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-200 mx-auto">
            {blogposts.map((blog, id) => (
              <BlurFade
                key={blog.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={blog.href}
                  key={blog.title}
                  title={blog.title}
                  description={blog.summary}
                  dates={blog.publishedAt}
                  tags={blog.tags}
                  image={blog.image}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

