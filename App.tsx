import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Closing from './components/Closing';
import Footer from './components/Footer';
import Journal from './components/Journal';
import Idea from './components/Idea';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-indigo-500/30 selection:text-white overflow-x-hidden">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main>
        {currentPage === 'home' && (
          <>
            <Hero />
            <Philosophy />
            <Closing />
          </>
        )}
        {currentPage === 'journal' && <Journal />}
        {currentPage === 'idea' && <Idea />}
      </main>
      <Footer />
    </div>
  );
};

export default App;