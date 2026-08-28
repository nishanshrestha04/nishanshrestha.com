'use client';

import Link from 'next/link';
import { ArrowLeft, Compass, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Animated Background Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 translate-x-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" 
      />

      <div className="relative z-10 text-center flex flex-col items-center w-full max-w-2xl">
        
        {/* Floating Icon */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-24 h-24 mb-10 mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-3xl rotate-6 opacity-50 blur-lg animate-pulse" />
            <div className="relative w-full h-full bg-neutral-900 border border-neutral-700/50 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-sm">
              <Compass className="w-12 h-12 text-emerald-400" />
              <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
          </motion.div>
        </motion.div>
        
        {/* Massive Glitchy 404 Text */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
          className="relative"
        >
          {/* Background blurred glow text */}
          <h1 className="absolute inset-0 text-[150px] md:text-[200px] font-black font-playfair bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent blur-2xl opacity-40 select-none">
            404
          </h1>
          {/* Main Text */}
          <h1 className="relative text-[150px] md:text-[200px] leading-none font-black font-playfair bg-gradient-to-br from-white via-emerald-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl select-none">
            404
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Lost in Cyberspace
          </h2>
          <p className="text-neutral-400 max-w-md mx-auto mb-12 text-lg leading-relaxed">
            The page you're looking for has been moved, deleted, or possibly eaten by a black hole.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 rounded-full overflow-hidden"
          >
            {/* Button Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 transition-transform duration-300 group-hover:scale-105" />
            
            {/* Glowing Border effect */}
            <div className="absolute inset-[2px] bg-neutral-950 rounded-full transition-colors duration-300 group-hover:bg-neutral-900/50" />
            
            {/* Content */}
            <span className="relative flex items-center gap-2">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform duration-300" />
              Return to Reality
            </span>
            
            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(16,185,129,0.4)]" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
