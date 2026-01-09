import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const siteTitle = 'Nishan Shrestha | Portfolio';
  const siteDescription = 'Nishan Shrestha - AI/ML Enthusiast and Web Developer based in Nepal.';
  const siteKeywords = 'Nishan Shrestha, Portfolio, Web Developer, AI, ML, React, Nepal';
  const siteUrl = 'https://nishanshrestha.com'; // Replace with actual URL if available
  const siteImage = '/assets/og-image.png'; // Make sure to add an OG image later

  return (
    <Helmet>
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={description || siteDescription} />
      <meta name="keywords" content={keywords || siteKeywords} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || siteDescription} />
      <meta property="og:image" content={image || siteImage} />
      <meta property="og:url" content={url || siteUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description || siteDescription} />
      <meta name="twitter:image" content={image || siteImage} />
    </Helmet>
  );
};

export default SEO;
