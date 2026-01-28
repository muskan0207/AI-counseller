import React, { useState } from 'react';
import { map } from '../assets';

interface VerificationProps {
  email?: string;
  onVerificationSuccess?: () => void;
}

export const Verification: React.FC<VerificationProps> = ({ email, onVerificationSuccess }) => {
  const [isResending, setIsResending] = useState(false);

  const handleResendCode = async () => {
    setIsResending(true);
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
    }, 2000);
  };

  const handleCheck = () => {
    onVerificationSuccess?.();
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* World Map Background - Full Width */}
      <div className="absolute top-0 left-0 w-full h-full opacity-80">
        <img 
          src={map} 
          alt="World Map" 
          className="w-full h-full object-cover object-center scale-150"
        />
        {/* Diagonal blur overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0.95) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          maskImage: 'linear-gradient(135deg, transparent 40%, black 60%)'
        }}></div>
      </div>

      {/* Animated Moving Light Beam */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-10 -left-10 w-[150vh] h-20 bg-gradient-to-r from-white/60 via-white/30 to-transparent blur-xl transform -rotate-45 origin-top-left animate-[moveLight_4s_ease-in-out_infinite]"
        ></div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes moveLight {
            0% {
              transform: translateX(-100%) translateY(-100%) rotate(-45deg);
              opacity: 0;
            }
            50% {
              opacity: 0.6;
            }
            100% {
              transform: translateX(50vw) translateY(50vh) rotate(-45deg);
              opacity: 0;
            }
          }
        `
      }} />

      <div className="relative bg-white/25 backdrop-blur-sm rounded-2xl shadow-lg border border-white p-6 z-10 flex flex-col justify-center" style={{width: '450.19px', height: '279px'}}>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Check your inbox</h1>
          <p className="text-sm text-gray-500">
            We have sent verification link on {email || 'your email'}
          </p>
        </div>

        <div className="space-y-6">
          <button
            onClick={handleCheck}
            className="w-full bg-gray-800 text-white py-3 px-4 rounded-2xl hover:bg-gray-900 focus:outline-none transition duration-200 text-sm"
          >
            Check
          </button>

          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500">
              Didn't get the email? Check spam or
            </span>
            <button
              onClick={handleResendCode}
              disabled={isResending}
              className="text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
            >
              {isResending ? 'Resending...' : 'Resend Link'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};