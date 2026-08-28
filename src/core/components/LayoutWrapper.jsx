'use client';

import React from 'react';
import Navbar from '@/core/components/Navbar';
import Footer from '@/core/components/Footer';
import ToastProvider from '@/core/components/ToastProvider';

import { usePathname } from 'next/navigation';

const LayoutWrapper = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen relative bg-bg-primary">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAdminRoute && <Footer />}
      <ToastProvider />
    </div>
  );
};

export default LayoutWrapper;
