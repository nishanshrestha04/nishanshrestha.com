'use client';

const AIPipelineVisual = () => {
  return (
    <div className="w-full max-w-md bg-bg-primary border border-border-primary p-8 font-mono text-xs shadow-2xl relative">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#1f1f22]">
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 bg-[#0070f3] animate-pulse" />
          <span className="text-text-secondary tracking-wider">
            SYSTEM STATUS ● ONLINE
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 relative">
        {/* Animated Data Line Background */}
        <div className="absolute left-6 top-8 bottom-8 w-px bg-[#1f1f22] z-0" />
        <div className="absolute left-6 top-8 bottom-8 w-px overflow-hidden z-0">
          <div className="w-full h-8 bg-gradient-to-b from-transparent via-[#0070f3] to-transparent animate-[dataFlow_3s_linear_infinite]" />
        </div>

        {/* Client */}
        <div className="flex items-center gap-6 relative z-10 p-4 border border-transparent hover:border-border-primary hover:bg-bg-secondary transition-colors group">
          <div className="w-4 h-4 border-2 border-border-primary bg-bg-primary group-hover:border-white transition-colors" />
          <div className="flex-1">
            <div className="text-text-secondary mb-1 tracking-widest uppercase">
              Client
            </div>
            <div className="text-text-primary text-sm">Next.js / React</div>
          </div>
        </div>

        {/* API */}
        <div className="flex items-center gap-6 relative z-10 p-4 border border-transparent hover:border-border-primary hover:bg-bg-secondary transition-colors group">
          <div className="w-4 h-4 border-2 border-border-primary bg-bg-primary group-hover:border-white transition-colors" />
          <div className="flex-1">
            <div className="text-text-secondary mb-1 tracking-widest uppercase">
              API
            </div>
            <div className="text-text-primary text-sm">FastAPI / Node.js</div>
          </div>
        </div>

        {/* AI Model */}
        <div className="flex items-center gap-6 relative z-10 p-4 border border-[#0070f3]/30 bg-[#0070f3]/5 transition-colors">
          <div className="w-4 h-4 border-2 border-[#0070f3] bg-bg-primary shadow-[0_0_10px_rgba(0,112,243,0.5)]" />
          <div className="flex-1">
            <div className="text-[#0070f3] mb-1 tracking-widest uppercase font-semibold">
              AI Model
            </div>
            <div className="text-text-primary text-sm">Python / ML / LLM</div>
          </div>
        </div>

        {/* Database */}
        <div className="flex items-center gap-6 relative z-10 p-4 border border-transparent hover:border-border-primary hover:bg-bg-secondary transition-colors group">
          <div className="w-4 h-4 border-2 border-border-primary bg-bg-primary group-hover:border-white transition-colors" />
          <div className="flex-1">
            <div className="text-text-secondary mb-1 tracking-widest uppercase">
              Database
            </div>
            <div className="text-text-primary text-sm">PostgreSQL / Vector</div>
          </div>
        </div>

        {/* Deployment */}
        <div className="flex items-center gap-6 relative z-10 p-4 border border-transparent hover:border-border-primary hover:bg-bg-secondary transition-colors group">
          <div className="w-4 h-4 border-2 border-border-primary bg-bg-primary group-hover:border-white transition-colors" />
          <div className="flex-1">
            <div className="text-text-secondary mb-1 tracking-widest uppercase">
              Deployment
            </div>
            <div className="text-text-primary text-sm">Docker / AWS</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes dataFlow {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(800%);
          }
        }
      `}</style>
    </div>
  );
};

export default AIPipelineVisual;
