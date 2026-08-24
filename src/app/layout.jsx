import './globals.css';
import LayoutWrapper from '../components/LayoutWrapper';

export const metadata = {
  title: 'Nishan Shrestha - Portfolio',
  description: 'AI/ML Enthusiast and Full Stack Web Developer from Nepal. Explore my portfolio of projects in React, Machine Learning, and modern web development.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
