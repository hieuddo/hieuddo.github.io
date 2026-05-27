'use client';

import { Card } from '@/components/ui/card';
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
    <Card className="flex border border-border/40 dark:border-white/5 bg-card/25 dark:bg-card/10 backdrop-blur-sm p-4 rounded-2xl hover:border-primary/35 dark:hover:border-primary/25 hover:shadow-lg hover:shadow-primary/[0.01] hover:-translate-y-[1px] transition-all duration-300 ease-out group relative overflow-hidden w-full">
      {/* Dynamic left highlight decoration */}
      <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300" />
      
      {/* Sleek icon placeholder */}
      <div className="flex-none">
        <div className={`size-10 rounded-xl border flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105 ${config.bgClass}`}>
          <IconComponent className={`size-5 ${config.iconClass}`} />
        </div>
      </div>
      
      {/* Content wrapper */}
      <div className="flex-grow ml-4">
        <div className="flex flex-col gap-y-1">
          <div className="flex items-start justify-between gap-x-3">
            <h3 className="font-bold text-foreground text-xs sm:text-sm tracking-tight inline-flex items-center gap-1.5 leading-snug">
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
            <div className="font-sans text-xs text-muted-foreground font-medium leading-normal">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  if (isLink) {
    return (
      <Link href={href || '#'} className="block cursor-pointer w-full" target="_blank">
        {CardContent}
      </Link>
    );
  }

  return <div className="block w-full">{CardContent}</div>;
};
