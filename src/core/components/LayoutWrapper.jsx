'use client';

import React from 'react';
import Navbar from '@/core/components/Navbar';
import Footer from '@/core/components/Footer';
import ToastProvider from '@/core/components/ToastProvider';

const LayoutWrapper = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative bg-bg-primary">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ToastProvider />
    </div>
  );
};

export default LayoutWrapper;
