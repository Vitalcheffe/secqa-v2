import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { TopNavBar } from '@/components/TopNavBar';
import { Footer } from '@/components/Footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: {
    default: 'SecQA — Security questionnaires, answered.',
    template: '%s | SecQA',
  },
  description:
    'AI-powered security questionnaire automation for B2B SaaS. Close any questionnaire in 90 minutes instead of 14 hours. Built for SaaS companies $1M-$20M ARR.',
  metadataBase: new URL('https://secqa-v2.vercel.app'),
  keywords: [
    'security questionnaire automation',
    'SOC2 compliance',
    'CAIQ',
    'SIG',
    'vendor security review',
    'AI questionnaire response',
    'SecQA',
    'Vanta alternative',
    'Conveyor alternative',
  ],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'SecQA — Security questionnaires, answered.',
    description:
      'AI-powered security questionnaire automation. $99/mo for SaaS companies $1M-$20M ARR.',
    url: 'https://secqa-v2.vercel.app',
    siteName: 'SecQA',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SecQA — Security questionnaires, answered.',
    description:
      'AI-powered security questionnaire automation. $99/mo for SaaS companies $1M-$20M ARR.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <TopNavBar />
        <main className='pt-14 min-h-screen'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
