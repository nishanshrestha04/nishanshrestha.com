'use client';

import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/core/utils/apiClient';

const Footer = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => apiClient('/api/profile'),
  });
  
  const socials = profile?.socials || [];
  const email = profile?.email || 'nishanshrestha212@gmail.com';

  return (
    <footer className="border-t border-border-primary bg-bg-primary mt-auto">
      <div className="c-space py-16 md:py-24 flex flex-col items-center text-center">
        <h2 className="font-mono text-sm tracking-widest text-[#0070f3] uppercase mb-4">
          AI / Full-Stack Developer
        </h2>

        <p className="text-text-secondary text-lg md:text-xl font-light mb-12 max-w-md">
          Building intelligent software from models to products.
        </p>

        <div className="flex items-center justify-center gap-8 mb-12">
          {socials.map((social, i) => {
            const name = social.name.toLowerCase();
            let Icon = null;
            if (name.includes('github')) Icon = FaGithub;
            if (name.includes('linkedin')) Icon = FaLinkedin;
            
            if (!Icon) return null;
            
            return (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity p-2 border border-border-primary hover:bg-bg-secondary text-text-primary"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
          <a
            href={`mailto:${email}`}
            className="text-text-secondary hover:text-text-primary transition-colors p-2 border border-border-primary hover:bg-bg-secondary"
          >
            <Mail size={20} />
          </a>
        </div>

        <p className="text-sm font-mono text-gray-600">© 2026</p>
      </div>
    </footer>
  );
};

export default Footer;
