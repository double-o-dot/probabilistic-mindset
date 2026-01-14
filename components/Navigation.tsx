import React, { useState, useEffect } from 'react';

interface NavigationProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage = 'home', onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      setMobileMenuOpen(false);
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
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#" 
              onClick={(e) => handleClick(e, 'journal')}
              className={`text-xs uppercase tracking-[0.2em] transition-colors ${
                currentPage === 'journal' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Journal
            </a>
            <a 
              href="#" 
              onClick={(e) => handleClick(e, 'idea')}
              className={`text-xs uppercase tracking-[0.2em] transition-colors ${
                currentPage === 'idea' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Idea
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Join Club Button */}
          <button className="hidden md:block px-5 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
            Join Club
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto absolute top-full left-0 w-full bg-[#020617]/95 backdrop-blur-md border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
            <a 
              href="#" 
              onClick={(e) => handleClick(e, 'journal')}
              className={`text-sm uppercase tracking-[0.2em] transition-colors py-2 ${
                currentPage === 'journal' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Journal
            </a>
            <a 
              href="#" 
              onClick={(e) => handleClick(e, 'idea')}
              className={`text-sm uppercase tracking-[0.2em] transition-colors py-2 ${
                currentPage === 'idea' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Idea
            </a>
            <button className="w-full px-5 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 text-left">
              Join Club
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;