'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
}: ResumeCardProps) => {
  // Treat as link if href is provided and not empty
  const isLink = href && href !== '#';

  const CardContent = (
    <Card className="flex border border-border/40 dark:border-white/5 bg-card/25 dark:bg-card/10 backdrop-blur-sm p-4 rounded-2xl hover:border-primary/35 dark:hover:border-primary/25 hover:shadow-lg hover:shadow-primary/[0.01] hover:-translate-y-[1px] transition-all duration-300 ease-out group relative overflow-hidden">
      {/* Dynamic left highlight decoration */}
      <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300" />
      
      <div className="flex-none">
        {logoUrl ? (
          <Avatar className="border border-border/40 dark:border-white/10 size-12 bg-white p-1 rounded-xl shadow-sm">
            <AvatarImage
              src={logoUrl}
              alt={altText}
              className="object-contain rounded-lg"
            />
            <AvatarFallback className="font-bold text-xs">{altText[0]}</AvatarFallback>
          </Avatar>
        ) : null}
      </div>
      <div className="flex-grow ml-4">
        <div className="flex flex-col gap-y-1">
          <div className="flex items-start justify-between gap-x-2">
            <h3 className="font-bold text-foreground text-xs sm:text-sm tracking-tight inline-flex items-center gap-1.5 leading-snug">
              {title}
              {badges && (
                <span className="inline-flex gap-x-1">
                  {badges.map((badge, index) => (
                    <Badge
                      variant="secondary"
                      className="px-1.5 py-0 text-[10px] bg-secondary/80 border-none text-secondary-foreground"
                      key={index}
                    >
                      {badge}
                    </Badge>
                  ))}
                </span>
              )}
              {isLink && (
                <ChevronRightIcon className="size-3.5 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 text-primary" />
              )}
            </h3>
            <div className="text-[11px] sm:text-xs tabular-nums text-muted-foreground text-right whitespace-nowrap shrink-0 pt-0.5">
              {period}
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
      <Link href={href || '#'} className="block cursor-pointer" target="_blank">
        {CardContent}
      </Link>
    );
  }

  return <div className="block">{CardContent}</div>;
};
