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
import { SectionHeading } from '@/components/section-heading';
import { CopyEmail } from '@/components/copy-email';

const BLUR_FADE_DELAY = 0.04;
const SQUIRCLE_POWER: 3 | 4 | 5 = 5;

// Light list-item reveal: a quick rise + fade with no blur, so list items
// "settle in" when their list first scrolls into view. Distinct from the
// hero's orchestrated load entrance; section headings stay static.
const LIST_REVEAL = { blur: '0px', yOffset: 6, duration: 0.35 } as const;
const STAGGER_STEP = 0.05;
const STAGGER_CAP = 8; // cap total stagger so long lists don't drag
const staggerDelay = (i: number) => Math.min(i, STAGGER_CAP) * STAGGER_STEP;

export default function Page() {
  const blogposts = getBlogs();
  const parsedWork = parseWorkExperienceFromTex();
  const workExperience = parsedWork.length > 0 ? parsedWork : DATA.work;
  const publications = publicationsData.flatMap((group) => group.publications);
  const resumeContact = Object.entries(DATA.contact.social).find(
    ([name]) => name === 'Resume'
  )?.[1];
  const ResumeIcon = resumeContact?.icon;

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: DATA.name,
    url: DATA.url,
    jobTitle: DATA.description,
    image: `${DATA.url}${DATA.avatarUrl}`,
    sameAs: Object.values(DATA.contact.social)
      .map((social) => social.url)
      .filter((url) => url.startsWith('http')),
  };

  return (
    <div className="flex flex-col min-h-dvh space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-4">
          <div className="gap-4 flex flex-col-reverse sm:flex-row justify-between items-start">
            <div className="flex-col flex flex-1 space-y-3">
              <BlurFadeText
                as="h1"
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-extrabold tracking-tight text-balance sm:text-5xl xl:text-6xl/none text-foreground"
                yOffset={8}
                text={`${DATA.name}`}
              />

              {/* Role + location: one-glance positioning beside the name */}
              <BlurFade delay={BLUR_FADE_DELAY * 1.25}>
                <p className="text-base sm:text-lg font-medium text-foreground">
                  {DATA.description}
                  <span className="text-muted-foreground font-normal">
                    {' · '}
                    {DATA.affiliation}
                  </span>
                </p>
              </BlurFade>

              {/* Profile links in a wrapping row; the highlighted Resume
                  action is pinned to its own line so it never reflows in
                  among the ghost pills. The Email pill is dropped in favor of
                  the click-to-copy address below. */}
              <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
                <div className="flex flex-col items-start gap-2 mt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {Object.entries(DATA.contact.social)
                      .filter(([name]) => name !== 'Resume' && name !== 'Email')
                      .map(([name, social]) => {
                        const IconComponent = social.icon;
                        return (
                          <a
                            key={name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-x-1.5 text-xs font-semibold transition-all duration-200 px-3 py-1 rounded-full shadow-sm shadow-black/[0.01] border text-muted-foreground hover:text-primary bg-secondary/50 dark:bg-card/25 hover:bg-secondary border-border/40 dark:border-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          >
                            <IconComponent className="size-3.5" />
                            {name}
                          </a>
                        );
                      })}
                  </div>
                  {resumeContact && ResumeIcon && (
                    <a
                      href={resumeContact.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-x-1.5 text-xs font-semibold transition-all duration-200 px-3 py-1 rounded-full shadow-sm shadow-black/[0.01] border bg-primary text-primary-foreground border-primary/60 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <ResumeIcon className="size-3.5" />
                      Resume
                    </a>
                  )}
                </div>
              </BlurFade>

              {/* "Drop me an email" launches the mail client; clicking the
                  address itself copies it to the clipboard. */}
              <BlurFade delay={BLUR_FADE_DELAY * 1.75}>
                <p className="text-xs text-muted-foreground mt-1">
                  <a
                    href={`mailto:${DATA.contact.email}`}
                    className="font-medium text-foreground underline decoration-primary/40 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                  >
                    Drop me an email
                  </a>{' '}
                  at: <CopyEmail email={DATA.contact.email} />
                </p>
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
                    width={192}
                    height={192}
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
          <SectionHeading>About</SectionHeading>
          <div className="prose max-w-[68ch] text-pretty font-sans text-sm sm:text-base text-foreground/90 dark:prose-invert leading-relaxed">
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
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <SectionHeading>Research Interests</SectionHeading>
          <div className="flex flex-wrap gap-1.5">
            {DATA.skills.map((skill, id) => (
              <BlurFade
                key={skill}
                {...LIST_REVEAL}
                delay={staggerDelay(id)}
                inView
              >
                <Badge
                  key={skill}
                  className="px-3 py-1 text-xs font-semibold tracking-wide bg-secondary/80 border-none text-secondary-foreground rounded-full"
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
          <SectionHeading>News</SectionHeading>
          <NewsList newsItems={DATA.news} />
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-4">
          <SectionHeading>Work Experience</SectionHeading>
          <div className="flex flex-col gap-3">
            {workExperience.map((work, id) => (
              <BlurFade
                key={work.company}
                {...LIST_REVEAL}
                delay={staggerDelay(id)}
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
          <SectionHeading>Selected Publications</SectionHeading>
          <div className="flex flex-col gap-4">
            {publications.map((pub, id) => (
              <BlurFade
                key={pub.title}
                {...LIST_REVEAL}
                delay={staggerDelay(id)}
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

          <div className="flex justify-center mt-3">
            <a href="/publication">
              <button className="group gap-2 rounded-full border border-border/40 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/20 px-6 py-1.5 transition-all duration-300 font-semibold text-xs sm:text-sm bg-secondary/50 dark:bg-card/25 shadow-sm select-none hover:shadow hover:shadow-primary/[0.02] flex items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                Explore All Publications
                <ChevronRightIcon className="size-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5 shrink-0" />
              </button>
            </a>
          </div>
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-4">
          <SectionHeading>Education</SectionHeading>
          <div className="flex flex-col gap-3">
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                {...LIST_REVEAL}
                delay={staggerDelay(id)}
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
          <SectionHeading>Teaching</SectionHeading>
          <ul className="ml-4 border-l border-muted/80 dark:border-white/10 relative space-y-1 mt-6">
            {DATA.teaching.map((project, id) => (
              <li key={project.title + project.dates}>
                <BlurFade {...LIST_REVEAL} delay={staggerDelay(id)} inView>
                  <TeachingCard
                    title={project.title}
                    description={project.description}
                    role={project.role}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="service">
        <div className="flex min-h-0 flex-col gap-y-4">
          <SectionHeading>Academic Service</SectionHeading>
          <div className="flex flex-col gap-0">
            {DATA.service.map((service, id) => (
              <BlurFade
                key={service.type}
                {...LIST_REVEAL}
                delay={staggerDelay(id)}
                inView
              >
                <ServiceCard
                  type={service.type}
                  description={service.venues}
                  isLast={id === DATA.service.length - 1}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="blogs">
        <div className="space-y-6">
          <div className="space-y-2">
            <SectionHeading>Personal Blogs</SectionHeading>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Create, explore, expand, conquer: the same loop in research and
              out on the trails.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-200 mx-auto">
            {blogposts.map((blog, id) => (
              <BlurFade
                key={blog.title}
                {...LIST_REVEAL}
                delay={staggerDelay(id)}
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
    </div>
  );
}
