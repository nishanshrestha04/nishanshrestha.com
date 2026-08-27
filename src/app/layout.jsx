import './globals.css';

import LayoutWrapper from '@/core/components/LayoutWrapper';
import { ThemeProvider } from '@/core/components/ThemeProvider';

import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata = {
  metadataBase: new URL('https://nishanshrestha04.com.np'),
  title: {
    default: 'Nishan Shrestha - AI & Full-Stack Developer',
    template: '%s | Nishan Shrestha',
  },
  description:
    'Portfolio of Nishan Shrestha, a software developer specializing in AI-powered applications, machine learning, and full-stack systems.',
  keywords: [
    'Nishan Shrestha',
    'Nishan Shrestha Nepal',
    'Nishan Shrestha Developer',
    'Software Developer',
    'AI Developer',
    'Full-Stack Developer',
    'Machine Learning',
    'Web Developer',
    'Portfolio',
  ],
  authors: [{ name: 'Nishan Shrestha', url: 'https://nishanshrestha04.com.np' }],
  creator: 'Nishan Shrestha',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nishanshrestha04.com.np',
    title: 'Nishan Shrestha - AI & Full-Stack Developer',
    description:
      'Portfolio of Nishan Shrestha, a software developer specializing in AI-powered applications, machine learning, and full-stack systems.',
    siteName: 'Nishan Shrestha',
    images: [
      {
        url: '/og-image.jpg', // You can add an actual image here later
        width: 1200,
        height: 630,
        alt: 'Nishan Shrestha Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nishan Shrestha - AI & Full-Stack Developer',
    description:
      'Portfolio of Nishan Shrestha, a software developer specializing in AI-powered applications, machine learning, and full-stack systems.',
    images: ['/og-image.jpg'],
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
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        sizes: 'any',
      },
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nishan Shrestha',
    url: 'https://nishanshrestha04.com.np',
    image: 'https://nishanshrestha04.com.np/og-image.jpg',
    sameAs: [
      'https://www.linkedin.com/in/shresthanishan/',
      'https://github.com/nishanshrestha04',
      'https://devfolio.co/@nishanshrestha',
    ],
    jobTitle: 'Full Stack Web Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Self-Employed',
    },
    description: 'Portfolio of Nishan Shrestha, a software developer specializing in AI-powered applications, machine learning, and full-stack systems.',
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased overflow-x-hidden pb-20 md:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}