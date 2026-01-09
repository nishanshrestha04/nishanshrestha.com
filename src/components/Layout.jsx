import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import ToastProvider from './ToastProvider';
import Starfield from './Starfield';
import MouseSpotlight from './MouseSpotlight';

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
      <main className="grow z-10">
        <Outlet />
      </main>
      {!isHomePage && <Footer className="relative z-20 mt-auto" />}
      <ToastProvider />
    </div>
  );
};

export default Layout;
