'use client';

import React, { useState, useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, FileText, Code, Search } from 'lucide-react';
import {
  highlightAuthor,
  type Publication,
  type PublicationLinks,
  type YearGroup,
} from '@/lib/publications';
import { cn } from '@/lib/utils';

interface ExplorerProps {
  data: YearGroup[];
}

const LinkIcons: React.FC<{ links: PublicationLinks }> = ({ links }) => {
  const pdfLinks = Array.isArray(links.pdf)
    ? links.pdf
    : links.pdf
      ? [links.pdf]
      : [];

  return (
    <div className="flex flex-wrap gap-2 mt-2 ml-1">
      {links.DOI && (
        <a
          href={links.DOI}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border border-border/50 dark:border-white/5 bg-secondary/40 dark:bg-zinc-900/60 text-[10px] font-semibold text-muted-foreground hover:text-primary hover:border-primary/45 transition-colors"
        >
          <BookOpen className="size-3 text-emerald-500/80" /> DOI
        </a>
      )}
      {pdfLinks.map((pdfUrl, index) => (
        <a
          key={`pdf-${index}`}
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border border-border/50 dark:border-white/5 bg-secondary/40 dark:bg-zinc-900/60 text-[10px] font-semibold text-muted-foreground hover:text-primary hover:border-primary/45 transition-colors"
        >
          <FileText className="size-3 text-red-500/80" /> PDF {pdfLinks.length > 1 ? `#${index + 1}` : ''}
        </a>
      ))}
      {links.code && (
        <a
          href={links.code}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border border-border/50 dark:border-white/5 bg-secondary/40 dark:bg-zinc-900/60 text-[10px] font-semibold text-muted-foreground hover:text-primary hover:border-primary/45 transition-colors"
        >
          <Code className="size-3 text-foreground/80" /> Code
        </a>
      )}
    </div>
  );
};

function PubCard({ title, authors, dates, venue, image, links }: {
  title: string;
  authors: string;
  dates: string;
  venue: string;
  image?: string;
  links?: PublicationLinks;
}) {
  return (
    <li className="relative ml-8 pb-8 group">
      {/* Concentric Circle Timeline Indicator */}
      <div className="absolute -left-[32px] top-1.5 -translate-x-1/2 z-10">
        {image ? (
          <Avatar className="border border-border/40 dark:border-white/10 size-10 bg-white dark:bg-zinc-900 p-0.5 rounded-full shadow-sm">
            <AvatarImage src={image} alt={title} className="object-contain rounded-full" />
            <AvatarFallback>{title[0]}</AvatarFallback>
          </Avatar>
        ) : (
          <div className="size-3 rounded-full border-2 border-primary bg-background flex items-center justify-center relative shadow-[0_0_8px_hsl(var(--primary)/0.35)] transition-transform duration-300 group-hover:scale-125">
            <span className="absolute size-1.5 rounded-full bg-primary" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-start gap-1 pl-2">
        {dates && (
          <time className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">{dates}</time>
        )}
        <h3 className="font-bold text-foreground text-sm sm:text-base leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>
        {venue && (
          <p className="text-xs sm:text-sm font-medium text-primary leading-normal">{venue}</p>
        )}
        {authors && (
          <span className="text-xs sm:text-sm text-muted-foreground leading-normal">
            {highlightAuthor(authors)}
          </span>
        )}
        {links && <LinkIcons links={links} />}
      </div>
    </li>
  );
}

export default function PublicationsExplorer({ data }: ExplorerProps) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const tabs = [
    { id: 'All', label: 'All Research' },
    { id: 'RS', label: 'Recommender Systems' },
    { id: 'MTL', label: 'Continual / MTL' },
    { id: 'Journals', label: 'Journals (TORS)' }
  ];

  // Helper matching tag categories
  const matchesTab = (pub: Publication, tab: string) => {
    if (tab === 'All') return true;
    const titleLower = pub.title.toLowerCase();
    const venueLower = pub.venue.toLowerCase();
    
    if (tab === 'RS') {
      return titleLower.includes('recommend') || venueLower.includes('recommend') || venueLower.includes('recsys');
    }
    if (tab === 'MTL') {
      return titleLower.includes('continual') || titleLower.includes('multiple tasks') || titleLower.includes('multi-task') || titleLower.includes('gradient alignment');
    }
    if (tab === 'Journals') {
      return venueLower.includes('transactions') || venueLower.includes('tors') || venueLower.includes('journal');
    }
    return true;
  };

  const filteredData = useMemo(() => {
    const searchLower = search.toLowerCase().trim();
    
    return data.map(yearGroup => {
      const filteredPubs = yearGroup.publications.filter(pub => {
        // Keyword Search matching
        const matchesSearch = 
          searchLower === '' ||
          pub.title.toLowerCase().includes(searchLower) ||
          pub.authors.toLowerCase().includes(searchLower) ||
          pub.venue.toLowerCase().includes(searchLower) ||
          pub.time.toLowerCase().includes(searchLower);
          
        // Tab matching
        const matchesCategory = matchesTab(pub, activeTab);
        
        return matchesSearch && matchesCategory;
      });
      
      return {
        ...yearGroup,
        publications: filteredPubs
      };
    }).filter(yearGroup => yearGroup.publications.length > 0);
  }, [data, search, activeTab]);

  return (
    <div className="space-y-8">
      {/* Search Input Widget */}
      <div className="relative w-full group select-none">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4 group-focus-within:text-primary transition-colors" />
        <input
          type="text"
          placeholder="Search papers by title, venue, or co-authors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-full bg-secondary/40 dark:bg-card/20 border border-border/40 dark:border-white/5 focus:outline-none focus:border-primary/50 dark:focus:border-primary/45 focus:shadow-md focus:shadow-primary/[0.01] transition-all duration-300"
        />
        {search && (
          <button 
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground hover:text-foreground font-medium"
          >
            Clear
          </button>
        )}
      </div>

      {/* Tabs Filter Bar */}
      <div className="flex flex-wrap gap-x-2 gap-y-1.5 border-b border-border/40 dark:border-white/5 pb-2 select-none">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-200",
              activeTab === tab.id
                ? "bg-primary/10 dark:bg-primary/20 text-primary border-primary/20 dark:border-primary/30"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/40 dark:hover:bg-white/5"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Render Publications Lists */}
      {filteredData.length > 0 ? (
        <div className="space-y-10">
          {filteredData.map((yearGroup) => (
            <div key={yearGroup.year} className="space-y-4">
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-foreground/90 border-b border-border/30 dark:border-white/5 pb-1 w-fit select-none">
                {yearGroup.year}
              </h2>
              <ul className="ml-4 border-l border-muted/80 dark:border-white/10 relative space-y-1">
                {yearGroup.publications.map((pub) => (
                  <PubCard
                    key={pub.title + pub.time}
                    title={pub.title}
                    authors={pub.authors}
                    venue={pub.venue}
                    dates={pub.time}
                    image={pub.image}
                    links={pub.links}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 select-none border border-dashed border-border/40 dark:border-white/5 rounded-2xl">
          <p className="text-xs sm:text-sm text-muted-foreground">No publications found matching your selection.</p>
          <button 
            onClick={() => { setSearch(''); setActiveTab('All'); }}
            className="text-[11px] font-semibold text-primary mt-2 hover:underline"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
