import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';
import RevealLeft from '@/core/components/animations/RevealLeft';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background Glow Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 text-center flex flex-col items-center">
        <RevealLeft delay={0.1}>
          <div className="w-20 h-20 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-xl">
            <Compass className="w-10 h-10 text-emerald-400" />
          </div>
        </RevealLeft>
        
        <RevealLeft delay={0.2}>
          <h1 className="text-7xl font-bold font-playfair bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            404
          </h1>
        </RevealLeft>
        
        <RevealLeft delay={0.3}>
          <h2 className="text-2xl font-semibold text-neutral-200 mb-4">
            Page Not Found
          </h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-10 text-lg">
            Looks like you've ventured into the unknown. The page you're looking for doesn't exist or has been moved.
          </p>
        </RevealLeft>
        
        <RevealLeft delay={0.4}>
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 font-medium text-white transition-all duration-300 bg-neutral-900 border border-neutral-800 rounded-full hover:bg-neutral-800 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Return Home
            </span>
          </Link>
        </RevealLeft>
      </div>
    </div>
  );
}
