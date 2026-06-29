import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import { fontVariables } from '@/components/themes/font.config';
import { DEFAULT_THEME, THEMES } from '@/components/themes/theme.config';
import ThemeProvider from '@/components/themes/theme-provider';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import '../styles/globals.css';

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b'
};

export const metadata: Metadata = {
  title: 'SecQA — AI Security Questionnaire Automation',
  description:
    'Close any security questionnaire in 90 minutes instead of 14 hours. AI-powered answer drafting from your past responses and SOC2 evidence. Built for B2B SaaS companies $1M-$20M ARR.',
  metadataBase: new URL('https://secqa-saas-sprint.vercel.app'),
  keywords: [
    'security questionnaire automation',
    'SOC2 compliance',
    'CAIQ',
    'SIG',
    'vendor security review',
    'AI questionnaire response',
    'SecQA',
    'Vanta alternative',
    'Conveyor alternative'
  ],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'SecQA — Close security questionnaires in 90 minutes',
    description:
      'AI-powered answer drafting grounded in your past responses and SOC2 evidence. $99/mo for SaaS companies $1M-$20M ARR.',
    type: 'website',
    url: 'https://secqa-saas-sprint.vercel.app',
    siteName: 'SecQA'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SecQA — Close security questionnaires in 90 minutes',
    description:
      'AI-powered answer drafting grounded in your past responses and SOC2 evidence. $99/mo for SaaS companies $1M-$20M ARR.'
  }
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get('active_theme')?.value;
  const isValidTheme = THEMES.some((t) => t.value === activeThemeValue);
  const themeToApply = isValidTheme ? activeThemeValue! : DEFAULT_THEME;

  return (
    <html lang='en' suppressHydrationWarning data-theme={themeToApply}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Set meta theme color
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `
          }}
        />
      </head>
      <body
        className={cn(
          'bg-background overflow-x-hidden overscroll-none font-sans antialiased',
          fontVariables
        )}
      >
        <NextTopLoader color='var(--primary)' showSpinner={false} />
        <NuqsAdapter>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <Providers activeThemeValue={themeToApply}>
              <Toaster />
              {children}
            </Providers>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
