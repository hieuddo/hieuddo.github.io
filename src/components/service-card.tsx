'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from 'lucide-react';
import React from 'react';

interface ServiceCardProps {
  type: string;
  description?: string;
}

export const ServiceCard = ({ type, description }: ServiceCardProps) => {
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
        'block w-full rounded-2xl',
        isExpandable
          ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
          : 'cursor-default'
      )}
      {...interactiveProps}
    >
      <Card className="flex border border-border/40 dark:border-white/5 bg-card/25 dark:bg-card/10 backdrop-blur-sm p-4 rounded-2xl hover:border-primary/35 dark:hover:border-primary/25 hover:shadow-lg hover:shadow-primary/[0.01] hover:-translate-y-[1px] transition-all duration-300 ease-out group relative overflow-hidden w-full">
        {/* Dynamic left highlight decoration */}
        <span 
          className={cn(
            "absolute left-0 top-0 bottom-0 w-[3px] bg-primary origin-center transition-transform duration-300",
            isExpanded ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
          )} 
        />
        
        <div className="flex-grow">
          <div className="flex flex-col gap-y-1">
            <div className="flex items-center justify-between gap-x-2">
              <h3 className="font-bold text-foreground text-xs sm:text-sm tracking-tight inline-flex items-center gap-1.5 leading-snug">
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
      </Card>
    </div>
  );
};
