import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

const SEO = ({ title, description, keywords, image, url }) => {
  const defaultTitle = 'Nishan Shrestha | Portfolio';
  const siteTitle = 'Nishan Shrestha'; // For appending to page titles
  const siteDescription = 'Nishan Shrestha - AI/ML Enthusiast and Web Developer based in Nepal.';
  const siteKeywords = 'Nishan, Nishan Shrestha, Nishan Shrestah, Nishan Portfolio, Nishan Developer, Portfolio, Web Developer, AI, ML, React, Nepal';
  const siteUrl = 'https://nishanshrestha04.com.np'; 
  const siteImage = '/assets/og-image.png'; 

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

      {/* Twitter */}
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || siteDescription} />
      <meta name="twitter:image" content={currentImage} />
    </Helmet>
  );
};

export default SEO;
