'use client';

import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface CopyEmailProps {
  email: string;
  className?: string;
}

/**
 * Renders an email address as a click-to-copy control. Clicking (or pressing
 * Enter/Space) writes the address to the clipboard and shows a brief "Copied"
 * confirmation; the address text itself stays the visible label. Pairs with a
 * plain mailto link elsewhere so a reader can either launch their mail client
 * or grab the raw address for an ATS / CRM.
 */
export function CopyEmail({ email, className }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard can be unavailable (insecure context / denied permission);
      // the paired mailto link remains the fallback path.
      return;
    }
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1800);
  }, [email]);

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy email address ${email} to clipboard`}
      className={cn(
        'group/email inline-flex items-center gap-1 rounded-sm align-baseline font-medium text-foreground underline decoration-primary/40 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className
      )}
    >
      {email}
      <span aria-hidden="true" className="relative inline-flex size-3.5 shrink-0">
        <Copy
          className={cn(
            'absolute inset-0 size-3.5 text-muted-foreground transition-all duration-200 motion-reduce:transition-none group-hover/email:text-primary',
            copied ? 'scale-50 opacity-0' : 'scale-100 opacity-60'
          )}
        />
        <Check
          className={cn(
            'absolute inset-0 size-3.5 text-primary transition-all duration-200 motion-reduce:transition-none',
            copied ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          )}
        />
      </span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </button>
  );
}
