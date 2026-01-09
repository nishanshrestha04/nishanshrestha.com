import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import ToastProvider from './ToastProvider';
import { Particles } from './Particles';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="flex flex-col min-h-screen bg-primary text-white relative">
      <Particles
        className="fixed inset-0 z-0"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
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
