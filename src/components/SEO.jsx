import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

const SEO = ({ title, description, keywords, image, url }) => {
  const defaultTitle = 'Nishan Shrestha | AI/ML Enthusiast & Full Stack Web Developer Portfolio';
  const siteTitle = 'Nishan Shrestha'; // For appending to page titles
  const siteDescription = 'Nishan Shrestha - AI/ML Enthusiast and Full Stack Web Developer from Nepal. Explore my portfolio of projects in React, Machine Learning, and modern web development.';
  const siteKeywords = 'Nishan Shrestha, Nishan Shrestha portfolio, Nishan Shrestha developer, Nishan Shrestha Nepal, Web Developer Nepal, AI ML Developer, React Developer, Machine Learning, Full Stack Developer, nishanshrestha04';
  const siteUrl = 'https://www.nishanshrestha04.com.np'; 
  const siteImage = '/assets/og-image-with-cta.jpg'; 

  // Helper to ensure absolute URLs
  const getAbsoluteUrl = (path) => {
    if (!path) return siteUrl;
    if (path.startsWith('http')) return path;
    return `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  const currentUrl = getAbsoluteUrl(url || '');
  const currentImage = getAbsoluteUrl(image || siteImage);

  const fullTitle = title ? `${title} | ${siteTitle}` : defaultTitle;

  useEffect(() => {
    document.title = fullTitle;
  }, [fullTitle]);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || siteDescription} />
      <meta name="keywords" content={keywords || siteKeywords} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || siteDescription} />
      <meta property="og:image" content={currentImage} />
      <meta property="og:url" content={currentUrl} />

      {/* Google Search Console Verification */}
      {(import.meta.env.VITE_GOOGLE_SITE_VERIFICATION) && (
        <meta name="google-site-verification" content={import.meta.env.VITE_GOOGLE_SITE_VERIFICATION} />
      )}

      {/* Twitter */}
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || siteDescription} />
      <meta name="twitter:image" content={currentImage} />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Nishan Shrestha',
            url: siteUrl,
            image: getAbsoluteUrl(siteImage),
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
            description: siteDescription,
          }),
        }}
      />
    </Helmet>
  );
};

export default SEO;
