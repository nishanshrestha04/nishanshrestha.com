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
  title: 'Nishan Shrestha - AI & Full-Stack Developer',
  description: 'Portfolio of Nishan Shrestha, a software developer specializing in AI-powered applications, machine learning, and full-stack systems.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased overflow-x-hidden pb-20 md:pb-0">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
