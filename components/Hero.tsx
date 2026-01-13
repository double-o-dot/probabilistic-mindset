import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.HTMLAttributes<HTMLElement> & { url?: string };
    }
  }
}

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#020617]">
      {/* Spline Viewer Background */}
      <div className="absolute inset-0 z-0">
        <spline-viewer 
          url="https://prod.spline.design/90QJOQM4cfcr5rft/scene.splinecode"
          className="w-full h-full block"
        ></spline-viewer>
        
        {/* Dark Gradient Overlay to ensure text readability at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80 pointer-events-none"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-4 pointer-events-none">
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;