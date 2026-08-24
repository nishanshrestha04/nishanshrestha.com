'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const RevealRightContainer = ({ children, stagger = 0.15, x = 50, duration = 0.8, className = '' }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const items = gsap.utils.toArray(containerRef.current.children);
    
    gsap.from(items, {
      x: x,
      opacity: 0,
      duration: duration,
      stagger: stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default RevealRightContainer;
