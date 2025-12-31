'use client';

import { Card, CardHeader } from '@/components/ui/card';
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

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isExpandable) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      className={cn(
        'block',
        isExpandable ? 'cursor-pointer' : 'cursor-default'
      )}
      onClick={isExpandable ? handleClick : undefined}
    >
      <Card className="flex">
        <div className="grow ml-4 items-center flex-col group">
          <CardHeader>
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                {type}
                {isExpandable && (
                  <ChevronRightIcon
                    className={cn(
                      'size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:opacity-100',
                      isExpanded ? 'rotate-90' : 'rotate-0'
                    )}
                  />
                )}
              </h3>
            </div>
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
    </div>
  );
};
