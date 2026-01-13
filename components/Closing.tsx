import React from 'react';

const Closing: React.FC = () => {
  return (
    <section className="relative w-full py-32 md:py-48 px-6 bg-[#020617] flex flex-col items-center justify-center text-center">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-12">
        <div className="space-y-6">
          <h2 className="font-kr font-bold text-4xl md:text-5xl text-white tracking-tight">
            Just Do IT.
          </h2>
          <p className="font-serif-display text-xl md:text-2xl text-slate-300 font-light italic leading-relaxed">
            "Less Stress. More Success." <br className="hidden md:block"/>
          </p>
        </div>

        <div className="pt-12">
          <button className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-sm transition-all duration-300">
            <div className="absolute inset-0 w-full h-full bg-slate-50 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="absolute inset-0 border border-slate-700 group-hover:border-slate-50 transition-colors duration-300"></div>
            <span className="relative text-xs uppercase tracking-[0.2em] text-slate-200 group-hover:text-white transition-colors">
              [ Read the Full Manifesto ]
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Closing;