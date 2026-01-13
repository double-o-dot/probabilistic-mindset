import React from 'react';
import { AXIOMS } from '../constants';

const Philosophy: React.FC = () => {
  return (
    <section className="relative w-full py-32 md:py-48 px-6 bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Intro */}
        <div className="mb-32 md:mb-48 border-l border-indigo-500/30 pl-8">
          <p className="font-serif-display text-2xl md:text-4xl text-slate-200 leading-relaxed font-light max-w-3xl">
            "Make a better Life for "
          </p>
        </div>

        {/* Axioms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16">
          {AXIOMS.map((axiom) => (
            <div key={axiom.id} className="group flex flex-col gap-6 p-4 md:p-0 transition-all duration-500 hover:-translate-y-2">
              {/* Number/Icon abstract representation */}
              <div className="text-slate-700 font-serif-display text-6xl opacity-20 group-hover:opacity-40 transition-opacity">
                0{axiom.id}
              </div>
              
              <div className="space-y-2">
                <span className="text-indigo-400 text-xs uppercase tracking-[0.2em] font-medium">
                  {axiom.topicEn}
                </span>
                <h3 className="font-kr font-bold text-2xl md:text-3xl text-white">
                  {axiom.topicKr}
                </h3>
              </div>

              <div className="h-px w-full bg-slate-800 group-hover:bg-indigo-900/50 transition-colors duration-500"></div>

              <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base pr-4">
                {axiom.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;