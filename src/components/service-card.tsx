'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from 'lucide-react';
import React from 'react';

interface ServiceCardProps {
  type: string;
  description?: string;
  isLast?: boolean;
}

export const ServiceCard = ({ type, description, isLast }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isExpandable = !!description;

  const toggle = () => setIsExpanded((prev) => !prev);

  const interactiveProps = isExpandable
    ? {
        role: 'button' as const,
        tabIndex: 0,
        'aria-expanded': isExpanded,
        onClick: toggle,
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        },
      }
    : {};

  return (
    <div
      className={cn(
        'group block w-full',
        !isLast && 'border-b border-border/40 dark:border-white/5',
        isExpandable
          ? 'cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
          : 'cursor-default'
      )}
      {...interactiveProps}
    >
      <div className="flex flex-col gap-y-1 py-3.5">
        <div className="flex items-center justify-between gap-x-2">
          <h3 className="font-semibold text-foreground text-xs sm:text-sm tracking-tight inline-flex items-center gap-1.5 leading-snug group-hover:text-primary transition-colors">
            {type}
            {isExpandable && (
              <ChevronRightIcon
                className={cn(
                  'size-3.5 transform transition-all duration-300 ease-out text-primary shrink-0',
                  isExpanded ? 'rotate-90 opacity-100' : 'rotate-0 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5'
                )}
              />
            )}
          </h3>
        </div>

        {isExpandable && description && (
          <motion.div
            initial={false}
            animate={{
              opacity: isExpanded ? 1 : 0,
              height: isExpanded ? 'auto' : 0,
              marginTop: isExpanded ? 8 : 0,
            }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="overflow-hidden font-sans text-xs sm:text-sm text-muted-foreground leading-normal"
          >
            {description}
          </motion.div>
        )}
      </div>
    </div>
  );
};
