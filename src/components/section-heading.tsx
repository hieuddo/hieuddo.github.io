import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Single source of truth for section headings on the home page.
 * Strong type over a hairline rule, anchored by one short primary accent that
 * marks each section switch. Defined once here as a deliberate brand system
 * rather than copy-pasted per section.
 */
export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        'relative text-lg sm:text-xl font-bold tracking-tight text-foreground pb-2 border-b border-border/40 w-full',
        className
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-12 rounded-full bg-primary"
      />
    </h2>
  );
}
