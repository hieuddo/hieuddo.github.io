import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import Markdown from 'react-markdown';
import MarkdownImage from './markdown-image';

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[] | string;
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <Card
      className={
        'flex flex-col overflow-hidden border border-border/40 dark:border-white/5 bg-card/40 dark:bg-card/25 backdrop-blur-md hover:border-primary/45 dark:hover:border-primary/40 hover:shadow-xl hover:shadow-primary/[0.02] hover:-translate-y-0.5 transition-all duration-300 ease-out h-full rounded-2xl'
      }
    >
      <Link
        href={href || '#'}
        className={cn('block cursor-pointer overflow-hidden', className)}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top hover:scale-[1.03] transition-transform duration-500" // needed because random black line at bottom of video
          />
        )}
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-40 w-full overflow-hidden object-cover object-top hover:scale-[1.03] transition-transform duration-500"
          />
        )}
      </Link>
      <CardHeader className="p-4 sm:p-5 pb-0">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-sm sm:text-base font-bold text-foreground hover:text-primary transition-colors">
            <Link href={href || '#'}>{title}</Link>
          </CardTitle>
          <time className="font-sans text-[11px] text-muted-foreground">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace('https://', '').replace('www.', '').replace('/', '')}
          </div>
          <div className="prose max-w-full text-pretty font-sans text-xs sm:text-sm text-muted-foreground dark:prose-invert mt-2 leading-relaxed">
            <Markdown
              components={{
                img: MarkdownImage,
              }}
            >
              {description}
            </Markdown>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col p-4 sm:p-5 pt-0">
        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {(Array.isArray(tags) ? tags : (tags as string).split(',')).map(
              (tag) => (
                <Badge
                  className="px-2 py-0.5 text-[10px] font-medium tracking-wide bg-secondary/80 text-secondary-foreground border-none hover:bg-secondary"
                  variant="secondary"
                  key={tag.trim()}
                >
                  {tag.trim()}
                </Badge>
              )
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 sm:p-5 pt-0 pb-4">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

