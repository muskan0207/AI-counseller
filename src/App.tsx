import React, { useState } from 'react';
import { BackgroundMap } from './components/BackgroundMap';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FooterInfo } from './components/FooterInfo';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { Verification } from './components/Verification';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'signup' | 'signin' | 'verification'>('landing');
  const [userEmail, setUserEmail] = useState('');

  const handleGetStarted = () => {
    setCurrentPage('signup');
  };

  const handleGoToSignIn = () => {
    setCurrentPage('signin');
  };

  const handleGoToSignUp = () => {
    setCurrentPage('signup');
  };

  const handleSignUpSuccess = (email: string) => {
    setUserEmail(email);
    setCurrentPage('verification');
  };

  const handleVerificationSuccess = () => {
    setCurrentPage('landing'); // or redirect to dashboard
  };


  if (currentPage === 'signup') {
    return <SignUp onGoToSignIn={handleGoToSignIn} onSignUpSuccess={handleSignUpSuccess} />;
  }

  if (currentPage === 'signin') {
    return <SignIn onGoToSignUp={handleGoToSignUp} />;
  }

  if (currentPage === 'verification') {
    return <Verification email={userEmail} onVerificationSuccess={handleVerificationSuccess} />;
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