import React, { useState } from 'react';
import { BackgroundMap } from './components/BackgroundMap';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FooterInfo } from './components/FooterInfo';
import { SignUp } from './components/SignUp';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'signup'>('landing');

  const handleGetStarted = () => {
    setCurrentPage('signup');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  if (currentPage === 'signup') {
    return <SignUp onBack={handleBackToLanding} />;
  }

  return (
    <div className="relative w-full h-screen flex flex-col overflow-hidden bg-bg font-sans selection:bg-gray-200">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <BackgroundMap />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col h-full justify-between p-6 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full">
        <Navbar />
        <Hero onGetStarted={handleGetStarted} />
        <FooterInfo />
      </div>
    </div>
  );
};

export default App;