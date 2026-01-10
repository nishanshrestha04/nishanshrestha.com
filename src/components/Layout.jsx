import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from '../sections/Navbar';
import ToastProvider from './ToastProvider';
import Starfield from './Starfield';
import MouseSpotlight from './MouseSpotlight';
import Footer from '../sections/Footer';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="flex flex-col min-h-screen bg-primary text-white relative">
      <Starfield
        speed={0.2}
        backgroundColor="#030412"
        starColor="#ffffff"
      />
      <MouseSpotlight />
      <Navbar />
      <main className="grow z-10 relative">
            <Outlet />
      </main>
      {!isHomePage && location.pathname !== '/contact' && <Footer className="relative z-20 mt-auto" />}
      <ToastProvider />
    </div>
  );
};


export default Layout;
