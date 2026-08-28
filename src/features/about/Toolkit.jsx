'use client';

import { useRef, useMemo } from 'react';
import {
  Server,
  Layout,
  Database,
  Terminal,
  Sparkles,
  Binary,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/core/utils/apiClient';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap = {
  Binary,
  Sparkles,
  Layout,
  Server,
  Database,
  Terminal,
};

const Toolkit = () => {
  const containerRef = useRef(null);

  const { data: myToolkit = [], isLoading } = useQuery({
    queryKey: ['toolkit'],
    queryFn: () => apiClient('/api/toolkit'),
  });

  const formattedToolkit = useMemo(() => {
    if (!Array.isArray(myToolkit)) return [];
    
    const categoryIconMap = {
      'Frontend': 'Layout',
      'Backend': 'Server',
      'Database': 'Database',
      'DevOps': 'Terminal',
      'AI / ML': 'Sparkles',
      'Languages': 'Binary',
    };

    const groups = myToolkit.reduce((acc, item) => {
      const cat = item.category || 'Uncategorized';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item.name);
      return acc;
    }, {});
    
    return Object.keys(groups).sort().map(cat => ({
      title: cat,
      icon: categoryIconMap[cat] || 'Binary',
      items: groups[cat],
    }));
  }, [myToolkit]);

  useGSAP(
    () => {
      if (isLoading || formattedToolkit.length === 0) return;
      const cards = gsap.utils.toArray('.toolkit-card');

      gsap.from(cards, {
        scale: 0.8,
        opacity: 0,
        rotation: 2,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.toolkit-header', {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: containerRef, dependencies: [isLoading, formattedToolkit.length] },
  );

  if (isLoading) {
    return (
      <section id="toolkit" className="c-space section-spacing border-t border-border-primary overflow-hidden flex items-center justify-center">
        <div className="font-mono text-text-secondary animate-pulse">LOADING_TOOLKIT...</div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="c-space section-spacing border-t border-border-primary overflow-hidden"
      id="toolkit"
    >
      <div className="mb-16 toolkit-header">
        <h2 className="text-heading mb-4">Toolkit</h2>
        <p className="text-text-secondary text-lg md:text-xl max-w-2xl font-light">
          Tools and technologies I use to build, deploy, and ship software.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formattedToolkit.map((toolkit) => {
          const IconComponent = iconMap[toolkit.icon];
          return (
            <div
              key={toolkit.title}
              className="toolkit-card bg-bg-secondary border border-border-primary p-8 hover:border-[#0070f3]/50 transition-colors"
            >
              <div className="flex items-center gap-4 mb-8">
                {IconComponent && (
                  <IconComponent size={24} className="text-[#0070f3]" />
                )}
                <h3 className="text-xl font-bold text-text-primary tracking-tight">
                  {toolkit.title}
                </h3>
              </div>
              <ul className="flex flex-col gap-4 font-mono text-sm text-text-secondary">
                {toolkit.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Toolkit;
