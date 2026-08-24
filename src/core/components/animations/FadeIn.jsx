'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FadeIn = ({ children, delay = 0, y = 30, duration = 0.8, className = '' }) => {
  const elementRef = useRef(null);

  useGSAP(() => {
    if (!elementRef.current) return;
    
    gsap.from(elementRef.current, {
      y: y,
      opacity: 0,
      duration: duration,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none' // Play once and don't reverse
      }
    });
  }, { scope: elementRef });

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default FadeIn;
