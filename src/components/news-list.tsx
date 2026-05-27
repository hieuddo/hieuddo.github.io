'use client';

import { useState } from 'react';
import { NewsCard } from './news-card';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import BlurFade from '@/components/magicui/blur-fade';

interface NewsItem {
  title: string;
  subtitle?: string;
  href?: string;
  date: string;
  type?: string;
}

interface NewsListProps {
  newsItems: readonly NewsItem[];
  blurFadeDelay: number;
}

export const NewsList = ({ newsItems, blurFadeDelay }: NewsListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleThreshold = 5;

  const initialItems = newsItems.slice(0, visibleThreshold);
  const hiddenItems = newsItems.slice(visibleThreshold);
  const hasMore = newsItems.length > visibleThreshold;

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* news list items wrapper with uniform gap spacing */}
      <div className="flex flex-col gap-3 w-full">
        {initialItems.map((news, id) => (
          <BlurFade
            key={news.title}
            delay={blurFadeDelay * 2 + id * 0.05}
            inView
          >
            <NewsCard
              title={news.title}
              subtitle={news.subtitle}
              href={news.href}
              date={news.date}
              type={news.type}
            />
          </BlurFade>
        ))}

        {/* Collapsible Hidden History (nested inside the flex list for mathematically uniform spacing) */}
        {hasMore && (
          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="overflow-hidden flex flex-col gap-3 w-full"
          >
            {hiddenItems.map((news, id) => (
              <div key={news.title} className="w-full">
                <NewsCard
                  title={news.title}
                  subtitle={news.subtitle}
                  href={news.href}
                  date={news.date}
                  type={news.type}
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Elegant Toggle Button */}
      {hasMore && (
        <BlurFade delay={blurFadeDelay * 2 + visibleThreshold * 0.05} inView>
          <div className="flex justify-center mt-3">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="group gap-2 rounded-full border border-border/40 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/20 px-6 py-1.5 transition-all duration-300 font-semibold text-xs sm:text-sm bg-secondary/50 dark:bg-card/25 backdrop-blur-sm shadow-sm select-none hover:shadow hover:shadow-primary/[0.02]"
            >
              {isExpanded ? (
                <>
                  Show Less
                  <ChevronUp className="size-4 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 shrink-0" />
                </>
              ) : (
                <>
                  Show All News
                  <ChevronDown className="size-4 text-primary transition-transform duration-300 group-hover:translate-y-0.5 shrink-0" />
                </>
              )}
            </Button>
          </div>
        </BlurFade>
      )}
    </div>
  );
};
