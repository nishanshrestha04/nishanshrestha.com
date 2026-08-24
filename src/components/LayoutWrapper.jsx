"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../sections/Navbar';
import ToastProvider from './ToastProvider';
import Starfield from './Starfield';
import MouseSpotlight from './MouseSpotlight';
import Footer from '../sections/Footer';
import LoadingScreen from './LoadingScreen';
import ErrorBoundary from './ErrorBoundary';

const LayoutWrapper = ({ children }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('hasVisited', 'true');
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen bg-primary text-white relative">
          <Starfield
            speed={0.2}
            backgroundColor="#030412"
            starColor="#ffffff"
          />
          <MouseSpotlight />
          <Navbar />
          <main className="grow z-10 relative">
            {children}
          </main>
          {!isHomePage && pathname !== '/contact' && <Footer className="relative z-20 mt-auto" />}
          <ToastProvider />
        </div>
      </ErrorBoundary>
    </>
  );
};

export default LayoutWrapper;
