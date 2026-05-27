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
import { NewsList } from '@/components/news-list';
import { parseWorkExperienceFromTex } from '@/lib/parse-resume';
import { PublicationCard } from '@/components/publication-card';
import publicationsData from '@/data/publications.json';
import { ChevronRightIcon } from 'lucide-react';

const BLUR_FADE_DELAY = 0.04;
const SQUIRCLE_POWER: 3 | 4 | 5 = 5;

export default function Page() {
  const blogposts = getBlogs();
  const parsedWork = parseWorkExperienceFromTex();
  const workExperience = parsedWork.length > 0 ? parsedWork : DATA.work;
  const publications = publicationsData.flatMap((group) => group.publications);

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
              <div
                key={SQUIRCLE_POWER}
                className="size-32 sm:size-36 md:size-48 border border-border/50 dark:border-white/10 p-1 bg-white dark:bg-zinc-950 shadow-lg shrink-0 flex items-center justify-center"
                style={{ clipPath: `url(#squircle-${SQUIRCLE_POWER})` }}
              >
                <div
                  className="size-full bg-zinc-100 dark:bg-zinc-900"
                  style={{ clipPath: `url(#squircle-${SQUIRCLE_POWER})` }}
                >
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
          <BlurFade delay={BLUR_FADE_DELAY * 3} inView>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground pb-2 border-b border-border/40 w-full relative">
              About
              <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-primary" />
            </h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
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
          <BlurFade delay={BLUR_FADE_DELAY * 5} inView>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground pb-2 border-b border-border/40 w-full relative">
              Research Interests
              <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-primary" />
            </h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1.5">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 5 + id * 0.05} inView>
                <Badge
                  key={skill}
                  className="px-3 py-1 text-xs font-semibold tracking-wide bg-secondary/80 hover:bg-secondary border-none text-secondary-foreground rounded-full select-none"
                >
                  {skill}
                </Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="news">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY} inView>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground pb-2 border-b border-border/40 w-full relative">
              News
              <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-primary" />
            </h2>
          </BlurFade>
          <NewsList newsItems={DATA.news} blurFadeDelay={BLUR_FADE_DELAY} />
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY} inView>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground pb-2 border-b border-border/40 w-full relative">
              Work Experience
              <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-primary" />
            </h2>
          </BlurFade>
          <div className="flex flex-col gap-3">
            {workExperience.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 2 + id * 0.05}
                inView
              >
                <ResumeCard
                  key={work.company}
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  period={`${work.start} - ${work.end}`}
                  description={work.description}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="publications">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY} inView>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground pb-2 border-b border-border/40 w-full relative">
              Selected Publications
              <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-primary" />
            </h2>
          </BlurFade>
          <div className="flex flex-col gap-4">
            {publications.map((pub, id) => (
              <BlurFade
                key={pub.title}
                delay={BLUR_FADE_DELAY * 2 + id * 0.05}
                inView
              >
                <PublicationCard
                  title={pub.title}
                  authors={pub.authors}
                  venue={pub.venue}
                  period={pub.time}
                  links={pub.links}
                />
              </BlurFade>
            ))}
          </div>
          
          <BlurFade delay={BLUR_FADE_DELAY * 2 + publications.length * 0.05} inView>
            <div className="flex justify-center mt-3">
              <a href="/publication">
                <button
                  className="group gap-2 rounded-full border border-border/40 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/20 px-6 py-1.5 transition-all duration-300 font-semibold text-xs sm:text-sm bg-secondary/50 dark:bg-card/25 backdrop-blur-sm shadow-sm select-none hover:shadow hover:shadow-primary/[0.02] flex items-center cursor-pointer"
                >
                  Explore All Publications
                  <ChevronRightIcon className="size-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5 shrink-0" />
                </button>
              </a>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY} inView>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground pb-2 border-b border-border/40 w-full relative">
              Education
              <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-primary" />
            </h2>
          </BlurFade>
          <div className="flex flex-col gap-3">
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 2 + id * 0.05}
                inView
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
          <BlurFade delay={BLUR_FADE_DELAY} inView>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground pb-2 border-b border-border/40 w-full relative">
              Teaching
              <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-primary" />
            </h2>
          </BlurFade>
          <ul className="ml-4 border-l border-muted/80 dark:border-white/10 relative space-y-1 mt-6">
            {DATA.teaching.map((project, id) => (
              <BlurFade
                key={project.title + project.dates}
                delay={BLUR_FADE_DELAY * 2 + id * 0.05}
                inView
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
        </div>
      </section>

      <section id="service">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY} inView>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground pb-2 border-b border-border/40 w-full relative">
              Academic Service
              <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-primary" />
            </h2>
          </BlurFade>
          <div className="flex flex-col gap-2">
            {DATA.service.map((service, id) => (
              <BlurFade
                key={service.type}
                delay={BLUR_FADE_DELAY * 2 + id * 0.05}
                inView
              >
                <ServiceCard type={service.type} description={service.venues} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="blogs">
        <div className="space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY} inView>
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
                delay={BLUR_FADE_DELAY * 2 + id * 0.05}
                inView
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
