'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const RevealLeft = ({ children, delay = 0, duration = 0.8, x = -50, className = '' }) => {
  const ref = useRef(null);

  useGSAP(() => {
    if (!ref.current) return;
    
    gsap.from(ref.current, {
      x: x,
      opacity: 0,
      duration: duration,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default RevealLeft;
