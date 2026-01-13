import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 border-t border-slate-900 bg-[#020617] text-center">
      <div className="flex flex-col gap-4 items-center">
         <div className="text-white font-serif-display text-lg tracking-widest opacity-50">
          PROBABILISTIC
        </div>
        <p className="text-slate-600 text-xs uppercase tracking-wider">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;