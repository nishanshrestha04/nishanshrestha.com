export default function Loading() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Minimalist Spinner */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* Subtle background track */}
          <div className="absolute inset-0 rounded-full border border-border-primary/50"></div>
          
          {/* Spinning gradient border */}
          <div className="absolute inset-0 rounded-full border border-transparent border-t-[#0070f3] border-r-[#0070f3]/50 animate-[spin_1.5s_linear_infinite]"></div>
          
          {/* Inner pulsing core */}
          <div className="w-2 h-2 rounded-full bg-[#0070f3] animate-pulse shadow-[0_0_10px_#0070f3]"></div>
        </div>
        
        {/* Typographic Label matching Hero */}
        <div className="flex items-center gap-4">
          <span className="w-1.5 h-1.5 bg-[#0070f3] animate-pulse"></span>
          <p className="text-text-secondary font-mono text-sm tracking-widest uppercase">
            Loading
          </p>
        </div>
      </div>
    </div>
  );
}
