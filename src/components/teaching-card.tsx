import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  dates: string;
  role: string;
  image?: string;
  links?: readonly {
    icon: React.ReactNode;
    title: string;
    href: string;
  }[];
}

export function TeachingCard({
  title,
  description,
  dates,
  role,
  image,
  links,
}: Props) {
  return (
    <li className="relative ml-10 pb-6 group">
      {/* Refined Timeline Dot */}
      <div className="absolute -left-[40px] top-1.5 -translate-x-1/2 z-10">
        {image ? (
          <Avatar className="border border-border/40 dark:border-white/10 size-10 bg-white dark:bg-zinc-900 p-0.5 rounded-full shadow-sm">
            <AvatarImage src={image} alt={title} className="object-contain rounded-full" />
            <AvatarFallback>{title[0]}</AvatarFallback>
          </Avatar>
        ) : (
          <div className="size-3 rounded-full border-2 border-primary bg-background flex items-center justify-center relative shadow-[0_0_8px_rgba(99,102,241,0.35)] dark:shadow-[0_0_8px_rgba(99,102,241,0.55)] transition-transform duration-300 group-hover:scale-125">
            <span className="absolute size-1.5 rounded-full bg-primary" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-start gap-1.5 pl-2">
        {dates && (
          <time className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">{dates}</time>
        )}
        <h3 className="font-bold text-foreground text-sm sm:text-base leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>
        {role && (
          <p className="text-xs sm:text-sm font-medium text-indigo-500/80 dark:text-indigo-400/80">{role}</p>
        )}
        {description && (
          <span className="prose dark:prose-invert text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {description}
          </span>
        )}
      </div>
      {links && links.length > 0 && (
        <div className="mt-2 ml-2 flex flex-row flex-wrap items-start gap-2">
          {links?.map((link, idx) => (
            <Link href={link.href} key={idx}>
              <Badge key={idx} title={link.title} className="flex gap-2 text-[10px] px-2 py-0.5">
                {link.icon}
                {link.title}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}

