'use client';

import { Card } from '@/components/ui/card';
import {
  highlightAuthor,
  type PublicationLinks,
} from '@/lib/publications';
import { BookOpen, FileText, Code } from 'lucide-react';

interface PublicationCardProps {
  title: string;
  authors: string;
  venue: string;
  period: string;
  links?: PublicationLinks;
}

export const PublicationCard = ({
  title,
  authors,
  venue,
  period,
  links,
}: PublicationCardProps) => {
  const pdfLinks = links?.pdf
    ? Array.isArray(links.pdf)
      ? links.pdf
      : [links.pdf]
    : [];

  return (
    <Card className="flex border border-border/40 dark:border-white/5 bg-card p-5 rounded-2xl hover:border-primary/35 dark:hover:border-primary/25 hover:shadow-lg hover:shadow-primary/[0.01] hover:-translate-y-[1px] transition-all duration-300 ease-out group relative overflow-hidden w-full">
      <div className="flex flex-col gap-y-2.5 w-full">
        {/* Header Title and Period */}
        <div className="flex items-start justify-between gap-x-4">
          <h3 className="font-bold text-foreground text-xs sm:text-sm md:text-base leading-snug tracking-tight text-pretty group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <div className="text-[11px] sm:text-xs tabular-nums text-muted-foreground whitespace-nowrap shrink-0 pt-0.5 font-medium">
            {period}
          </div>
        </div>

        {/* Authors */}
        <div className="text-xs sm:text-sm text-muted-foreground leading-normal font-sans">
          {highlightAuthor(authors)}
        </div>

        {/* Venue / Publisher */}
        <div className="text-xs sm:text-sm text-primary font-medium leading-snug">
          {venue}
        </div>

        {/* Action badges / links */}
        {links && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border/20 dark:border-white/5 mt-1 select-none">
            {links.DOI && (
              <a
                href={links.DOI}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/50 dark:border-white/5 bg-secondary/50 dark:bg-zinc-900/60 hover:bg-secondary dark:hover:bg-zinc-800 text-[10px] sm:text-xs font-semibold text-muted-foreground hover:text-primary hover:border-primary/45 transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <BookOpen className="size-3 text-emerald-500/80" /> DOI / Publisher
              </a>
            )}
            {pdfLinks.map((pdfUrl, index) => (
              <a
                key={`pdf-${index}`}
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/50 dark:border-white/5 bg-secondary/50 dark:bg-zinc-900/60 hover:bg-secondary dark:hover:bg-zinc-800 text-[10px] sm:text-xs font-semibold text-muted-foreground hover:text-primary hover:border-primary/45 transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <FileText className="size-3 text-red-500/80" /> PDF {pdfLinks.length > 1 ? `#${index + 1}` : ''}
              </a>
            ))}
            {links.code && (
              <a
                href={links.code}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/50 dark:border-white/5 bg-secondary/50 dark:bg-zinc-900/60 hover:bg-secondary dark:hover:bg-zinc-800 text-[10px] sm:text-xs font-semibold text-muted-foreground hover:text-primary hover:border-primary/45 transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Code className="size-3 text-blue-500/80" /> Source Code
              </a>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
