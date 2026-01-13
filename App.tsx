import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Closing from './components/Closing';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-indigo-500/30 selection:text-white overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <Philosophy />
        <Closing />
      </main>
      <Footer />
    </div>
  );
};

export default App;