import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import SEO from './components/SEO';
import Hero from './sections/Hero';
import About from './sections/About';
import AboutSummary from './sections/AboutSummary';
import Project from './sections/Project';
import FeaturedProjects from './sections/FeaturedProjects';
import Experiences from './sections/Experiences';
import Contact from './sections/Contact';
import ContactTeaser from './sections/ContactTeaser';
import LoadingScreen from './components/LoadingScreen';

import ScrollToTop from './components/ScrollToTop';
import Footer from './sections/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import AdminPanel from './admin/AdminPanel';

const App = () => {
  const [isLoading, setIsLoading] = useState(() => {
    // Check if user has visited in this session
    const hasVisited = sessionStorage.getItem('hasVisited');
    return !hasVisited;
  });

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('hasVisited', 'true');
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  index
                  element={
                    <>
                      <SEO title="Home" description="Welcome to my portfolio. Explore my work and skills." />
                      <Hero />
                      <AboutSummary />
                      <FeaturedProjects />
                      <ContactTeaser />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="about"
                  element={
                    <>
                      <SEO title="About Me" description="Learn more about Nishan Shrestha, an AI/ML enthusiast and developer." />
                      <About />
                    </>
                  }
                />
                <Route
                  path="projects"
                  element={
                    <>
                      <SEO title="Projects" description="Check out my latest projects in Web Development and AI." />
                      <Project />
                    </>
                  }
                />
                <Route
                  path="work"
                  element={
                    <>
                      <SEO title="Experience" description="My professional experience and work history." />
                      <Experiences />
                    </>
                  }
                />
                <Route
                  path="contact"
                  element={
                    <>
                      <SEO title="Contact" description="Get in touch with me for collaborations or opportunities." />
                      <Contact />
                    </>
                  }
                />
              </Route>
              <Route
                path="admin"
                element={
                  <>
                    <SEO title="Admin Panel" description="Portfolio content management" />
                    <AdminPanel />
                  </>
                }
              />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
};

export default App;
