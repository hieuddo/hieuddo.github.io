'use client';

import React from 'react';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const links = [
    { href: '/', label: 'Home' },
    { href: '/publication', label: 'Publications' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <header className="fixed top-4 inset-x-0 z-50 mx-auto w-full max-w-md px-4 select-none">
      <nav className="flex items-center justify-between w-full px-4 sm:px-5 py-1.5 rounded-full bg-background/65 dark:bg-card/45 backdrop-blur-md border border-border/40 dark:border-white/5 shadow-lg shadow-black/[0.03] dark:shadow-none transition-all duration-300">
        
        {/* Left Section: Favicon Logo */}
        <Link 
          href="/" 
          onClick={handleHomeClick}
          className="hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center"
        >
          <img 
            src="/monkas.svg" 
            alt="Logo" 
            className="size-7 sm:size-8 rounded-full border border-border/40 dark:border-white/10 bg-zinc-100 dark:bg-zinc-800 p-1 shadow-sm transition-colors duration-300"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-x-0.5 sm:gap-x-1">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={link.href === '/' ? handleHomeClick : undefined}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 relative',
                  isActive 
                    ? 'text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-secondary dark:bg-white/5 rounded-full -z-10" />
                )}
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Section: Theme Toggle */}
        <div className="flex items-center border-l border-border/40 pl-2 dark:border-white/10">
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}



