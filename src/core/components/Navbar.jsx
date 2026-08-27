'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Briefcase, FolderCode, Mail, Menu, X, Home } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About', path: '/about', icon: User },
  { name: 'Experience', path: '/experience', icon: Briefcase },
  { name: 'Projects', path: '/projects', icon: FolderCode },
  { name: 'Contact', path: '/contact', icon: Mail },
];

const NavItems = ({ pathname }) => {
  return (
    <ul className="flex items-center gap-8">
      {navLinks.map((link) => {
        const Icon = link.icon;
        const isActive =
          pathname === link.path ||
          (link.path !== '/' && pathname.startsWith(link.path));
        return (
          <li key={link.name}>
            <Link
              href={link.path}
              className={`text-sm font-medium flex items-center gap-2 transition-colors px-3 py-1.5 focus:outline-none ${isActive ? 'text-text-primary bg-bg-secondary border border-border-primary rounded-full' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <Icon size={14} className={isActive ? 'text-[#0070f3]' : ''} />
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const Navbar = () => {
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/90 backdrop-blur-md border-b border-border-primary">
        <div className="w-full px-6 sm:px-10 lg:px-20 h-16 grid grid-cols-2 md:grid-cols-3 items-center">
          {/* Left: Logo */}
          <Link
            href="/#"
            className="text-2xl font-black tracking-normal text-text-primary hover:text-text-secondary transition-colors justify-self-start font-['var(--font-playfair)'] italic"
          >
            Nishan.
          </Link>

          {/* Center: Desktop Nav */}
          <nav className="hidden md:flex justify-self-center items-center">
            <NavItems pathname={pathname} />
          </nav>

          {/* Right: Socials (Desktop & Mobile) */}
          <div className="flex items-center gap-2 justify-self-end">
            <ThemeToggle />
            <div className="w-px h-5 bg-border-primary mx-2 hidden sm:block" />
            <a
              href="https://github.com/nishanshrestha04"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity p-2 text-text-primary"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/shresthanishan/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity p-2 text-text-primary"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-primary/90 backdrop-blur-lg border-t border-border-primary pb-safe shadow-2xl">
        <ul className="flex items-center justify-around px-2 py-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.path ||
              (link.path !== '/' && pathname.startsWith(link.path));
            return (
              <li key={link.name} className="flex-1">
                <Link
                  href={link.path}
                  className={`flex flex-col items-center justify-center gap-1 transition-colors focus:outline-none ${isActive ? 'text-[#0070f3]' : 'text-text-secondary hover:text-text-secondary'}`}
                >
                  <Icon
                    size={22}
                    className={isActive ? 'fill-[#0070f3]/20' : ''}
                  />
                  <span className="text-[10px] font-medium tracking-wide">
                    {link.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
