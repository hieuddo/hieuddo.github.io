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
  },
  verification: {
    google: '',
    yandex: '',
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
          'min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto pt-28 pb-20 px-6 sm:px-8 relative page-fade-in',
          fontSans.variable
        )}
      >
        <GoogleAnalytics gaId="G-PXZ5HVM2CP" />
        <ThemeProvider attribute="class" defaultTheme="system">
          <TooltipProvider delayDuration={0}>
            {/* Global mathematical Squircle clipPath definition */}
            <svg width="0" height="0" className="absolute pointer-events-none -z-50">
              <defs>
                <clipPath id="squircle" clipPathUnits="objectBoundingBox">
                  <path d="M 0.5,0 C 0.1,0 0,0.1 0,0.5 C 0,0.9 0.1,1 0.5,1 C 0.9,1 1,0.9 1,0.5 C 1,0.1 0.9,0 0.5,0 Z" />
                </clipPath>
              </defs>
            </svg>

            {/* Immersive technical grid pattern */}
            <div className="fixed inset-0 tech-grid pointer-events-none -z-10" />
            
            {/* Top Navbar */}
            <Navbar />
            
            <main className="w-full">
              {children}
            </main>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

