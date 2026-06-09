'use client';

import { ArrowUpRight, BookOpen, Briefcase, Trophy, Calendar, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface NewsCardProps {
  title: string;
  subtitle?: string;
  href?: string;
  date: string;
  type?: 'publication' | 'career' | 'milestone' | 'event' | string;
}

export const NewsCard = ({
  title,
  subtitle,
  href,
  date,
  type = 'other',
}: NewsCardProps) => {
  const isLink = href && href !== '#';

  // Get specific icon and color scheme based on news type
  const getTypeConfig = () => {
    switch (type) {
      case 'publication':
        return {
          icon: BookOpen,
          bgClass: 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/25',
          iconClass: 'text-emerald-600 dark:text-emerald-400',
        };
      case 'career':
        return {
          icon: Briefcase,
          bgClass: 'bg-blue-500/10 dark:bg-blue-500/15 border-blue-500/25',
          iconClass: 'text-blue-600 dark:text-blue-400',
        };
      case 'milestone':
        return {
          icon: Trophy,
          bgClass: 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/25',
          iconClass: 'text-amber-600 dark:text-amber-400',
        };
      case 'event':
        return {
          icon: Calendar,
          bgClass: 'bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/25',
          iconClass: 'text-indigo-600 dark:text-indigo-400',
        };
      default:
        return {
          icon: Sparkles,
          bgClass: 'bg-zinc-500/10 dark:bg-zinc-500/15 border-zinc-500/25',
          iconClass: 'text-zinc-600 dark:text-zinc-400',
        };
    }
  };

  const config = getTypeConfig();
  const IconComponent = config.icon;

  const CardContent = (
    <div className="flex items-start gap-3.5 py-3.5 border-b border-border/40 dark:border-white/5 group transition-colors">
      {/* Type-coded icon badge */}
      <div className="flex-none">
        <div className={`size-9 rounded-lg border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${config.bgClass}`}>
          <IconComponent className={`size-4 ${config.iconClass}`} />
        </div>
      </div>

      {/* Content wrapper */}
      <div className="flex-grow min-w-0">
        <div className="flex items-start justify-between gap-x-3">
          <h3 className="font-semibold text-foreground text-xs sm:text-sm tracking-tight inline-flex items-center gap-1.5 leading-snug group-hover:text-primary transition-colors">
            {title}
            {isLink && (
              <ArrowUpRight className="size-3.5 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary transition-all duration-300 ease-out shrink-0" />
            )}
          </h3>
          <div className="text-[11px] sm:text-xs tabular-nums text-muted-foreground text-right whitespace-nowrap shrink-0 pt-0.5">
            {date}
          </div>
        </div>
        {subtitle && (
          <div className="font-sans text-xs text-muted-foreground font-medium leading-normal mt-1">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );

  if (isLink) {
    // Only external links (different origin / http(s)) or PDFs open in a new tab;
    // internal/relative routes (e.g. "/blog/...", "#anchor") stay in the same tab.
    const isExternal =
      /^https?:\/\//i.test(href) || /\.pdf($|[?#])/i.test(href);

    return (
      <Link
        href={href || '#'}
        className="block cursor-pointer w-full rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {CardContent}
      </Link>
    );
  }

  return <div className="block w-full">{CardContent}</div>;
};
