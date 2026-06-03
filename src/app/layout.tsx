import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { DATA } from '@/data/resume';
import { cn } from '@/lib/utils';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans as FontSans } from 'next/font/google';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  icons: {
    icon: '/monkas.svg',
  },
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: 'en_US',
    type: 'website',
    images: [{ url: DATA.avatarUrl, alt: DATA.name }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: 'summary_large_image',
    images: [DATA.avatarUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto pt-28 pb-20 px-6 sm:px-8 relative',
          fontSans.variable
        )}
      >
        <GoogleAnalytics gaId="G-PXZ5HVM2CP" />
        <ThemeProvider attribute="class" defaultTheme="system">
          <TooltipProvider delayDuration={0}>
            {/* Global mathematical Squircle clipPath definitions (n=3, n=4, n=5) */}
            <svg width="0" height="0" className="absolute pointer-events-none -z-50">
              <defs>
                {/* n=3: Softer squircle */}
                <clipPath id="squircle-3" clipPathUnits="objectBoundingBox">
                  <path d="M 0.5,0 C 0.15,0 0,0.15 0,0.5 C 0,0.85 0.15,1 0.5,1 C 0.85,1 1,0.85 1,0.5 C 1,0.15 0.85,0 0.5,0 Z" />
                </clipPath>
                {/* n=4: Xiaomi style */}
                <clipPath id="squircle-4" clipPathUnits="objectBoundingBox">
                  <path d="M 0.5,0 C 0.1,0 0,0.1 0,0.5 C 0,0.9 0.1,1 0.5,1 C 0.9,1 1,0.9 1,0.5 C 1,0.1 0.9,0 0.5,0 Z" />
                </clipPath>
                {/* n=5: iOS style */}
                <clipPath id="squircle-5" clipPathUnits="objectBoundingBox">
                  <path d="M 0.5,0 C 0.05,0 0,0.05 0,0.5 C 0,0.95 0.05,1 0.5,1 C 0.95,1 1,0.95 1,0.5 C 1,0.05 0.95,0 0.5,0 Z" />
                </clipPath>
              </defs>
            </svg>

            {/* Immersive technical grid pattern */}
            <div className="fixed inset-0 tech-grid pointer-events-none -z-10" />

            {/* Top Navbar & Floating Utilities */}
            <Navbar />

            <main className="w-full page-fade-in">
              {children}
            </main>

            <footer className="w-full mt-16 pt-6 border-t border-border/40 text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} {DATA.name}
            </footer>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
