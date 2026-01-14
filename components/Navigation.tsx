import React, { useState, useEffect } from 'react';

interface NavigationProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage = 'home', onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 pointer-events-none ${scrolled ? 'py-4 bg-[#020617]/80 backdrop-blur-md' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          onClick={(e) => handleClick(e, 'home')}
          className="pointer-events-auto text-white font-serif-display text-xl tracking-widest cursor-pointer opacity-90 hover:opacity-100 transition-opacity"
        >
          PROBABILISTIC
        </div>
        <div className="flex items-center gap-8 pointer-events-auto">
          <a 
            href="#" 
            onClick={(e) => handleClick(e, 'journal')}
            className={`hidden md:block text-xs uppercase tracking-[0.2em] transition-colors ${
              currentPage === 'journal' ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Journal
          </a>
          <a 
            href="#" 
            onClick={(e) => handleClick(e, 'idea')}
            className={`hidden md:block text-xs uppercase tracking-[0.2em] transition-colors ${
              currentPage === 'idea' ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Idea
          </a>
          <button className="px-5 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
            Join Club
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;