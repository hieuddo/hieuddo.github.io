'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Determine behavior modes
  // Treat as link if href is provided and not empty
  const isLink = href && href !== '#';
  // Treat as expandable ONLY if it's NOT a link and has a description
  const isExpandable = !isLink && !!description;
  const showIcon = isLink || isExpandable;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isExpandable) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  const CardContent = (
    <Card className="flex">
      <div className="flex-none">
        {logoUrl ? (
          <Avatar className="border size-12 m-auto bg-muted-background dark:bg-foreground">
            <AvatarImage
              src={logoUrl}
              alt={altText}
              className="object-contain"
            />
            <AvatarFallback>{altText[0]}</AvatarFallback>
          </Avatar>
        ) : null}
      </div>
      <div className="flex-grow ml-4 items-center flex-col group">
        <CardHeader>
          <div className="flex items-center justify-between gap-x-2 text-base">
            <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
              {title}
              {badges && (
                <span className="inline-flex gap-x-1">
                  {badges.map((badge, index) => (
                    <Badge
                      variant="secondary"
                      className="align-middle text-xs"
                      key={index}
                    >
                      {badge}
                    </Badge>
                  ))}
                </span>
              )}
              {showIcon && (
                <ChevronRightIcon
                  className={cn(
                    'size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:opacity-100',
                    isLink ? 'group-hover:translate-x-1' : '',
                    isExpandable && isExpanded ? 'rotate-90' : 'rotate-0'
                  )}
                />
              )}
            </h3>
            <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right whitespace-nowrap shrink-0">
              {period}
            </div>
          </div>
          {subtitle && <div className="font-sans text-xs">{subtitle}</div>}
        </CardHeader>
        {isExpandable && description && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isExpanded ? 1 : 0,

              height: isExpanded ? 'auto' : 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-2 text-xs sm:text-sm"
          >
            {description}
          </motion.div>
        )}
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

  return (
    <div
      className={cn(
        'block',
        isExpandable ? 'cursor-pointer' : 'cursor-default'
      )}
      onClick={isExpandable ? handleClick : undefined}
    >
      {CardContent}
    </div>
  );
};;;
