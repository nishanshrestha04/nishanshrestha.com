"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, FolderKanban, Briefcase, FileText, Wrench, Mail, User, LogOut } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/core/utils/apiClient';

const navItems = [
  { name: 'Dashboard', href: '/nishan-portal', icon: LayoutDashboard },
  { name: 'Profile Settings', href: '/nishan-portal/profile', icon: User },
  { name: 'Projects', href: '/nishan-portal/projects', icon: FolderKanban },
  { name: 'Experiences', href: '/nishan-portal/experiences', icon: Briefcase },
  { name: 'Articles', href: '/nishan-portal/articles', icon: FileText },
  { name: 'Toolkit', href: '/nishan-portal/toolkit', icon: Wrench },
  { name: 'Contacts', href: '/nishan-portal/contacts', icon: Mail },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();

  const handlePrefetch = (href) => {
    if (href === '/nishan-portal') return;
    const endpoint = href.replace('/nishan-portal', '/api');
    const queryKey = [endpoint.replace('/api/', '')];
    
    queryClient.prefetchQuery({
      queryKey,
      queryFn: () => apiClient(endpoint),
      staleTime: 5 * 60 * 1000,
    });
  };

  useEffect(() => {
    // Basic client-side guard
    const token = localStorage.getItem('token');
    
    if (!token && pathname !== '/nishan-portal/login') {
      router.push('/nishan-portal/login');
    } else if (token) {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    router.push('/nishan-portal/login');
  };

  // Don't render the sidebar if we are on the login page or not authenticated yet
  if (pathname === '/nishan-portal/login') {
    return (
      <div className="min-h-screen bg-neutral-950 text-white">
        <Toaster theme="dark" position="top-right" />
        {children}
      </div>
    );
  }

  if (!isAuthenticated) return null; // Avoid flashing content before redirect

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-100 font-sans overflow-hidden">
      <Toaster theme="dark" position="top-right" />
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col">
        <div className="p-6 border-b border-neutral-800">
          <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Admin Panel
          </h2>
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onMouseEnter={() => handlePrefetch(item.href)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
