import React, { useState } from 'react';
import { map } from '../assets';

interface BudgetFinanceProps {
  onNext?: (data: any) => void;
  onBack?: () => void;
}

export const BudgetFinance: React.FC<BudgetFinanceProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    annualBudgetRange: '',
    fundingSource: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!formData.annualBudgetRange || !formData.fundingSource) {
      alert('Please fill all fields before proceeding.');
      return;
    }
    
    const profileData = {
      budgetRange: formData.annualBudgetRange,
      fundingPlan: formData.fundingSource
    };
    
    onNext?.(profileData);
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

      <div className="relative bg-white/65 backdrop-blur-sm rounded-2xl shadow-lg border border-white z-10" style={{width: '720px', height: '480px', padding: '24px'}}>
        {/* Left Side Progress */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-48">
          <div className="space-y-8">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-green-200"></div>
              <span className="ml-3 text-[10px] text-gray-600">ACADEMIC BACKGROUND <span className="text-[10px] underline">Done</span></span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-green-200"></div>
              <span className="ml-3 text-[10px] text-gray-600">STUDY GOALS <span className="text-[10px] underline">Done</span></span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full flex items-center justify-center relative">
                <div className="w-6 h-6 rounded-full border-2 border-dashed border-yellow-400"></div>
                <div className="absolute w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <span className="ml-3 text-[10px] font-medium text-gray-900">BUDGET & FINANCE</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 border-2 border-dashed border-gray-300 rounded-full bg-transparent"></div>
              <span className="ml-3 text-xs text-gray-400">READINESS CHECK</span>
              <span className="ml-2 text-[10px] text-gray-400 underline">Pending</span>
            </div>
          </div>
        </div>

        {/* Vertical dotted separator line */}
        <div className="absolute left-70 top-6 bottom-6 w-px border-l border-dashed border-gray-400"></div>

        {/* Right Side Form */}
        <div className="ml-56 flex items-center justify-center h-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Annual Budget Range */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                1. Annual Budget Range (USD)
              </label>
              <select
                name="annualBudgetRange"
                value={formData.annualBudgetRange}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-300 border-0 rounded-lg text-xs text-white focus:outline-none"
                style={{backgroundColor: '#B8B8B8'}}
              >
                <option value="">$ 10000 - $ 15000</option>
                <option value="10000-15000">$ 10000 - $ 15000</option>
                <option value="15000-25000">$ 15000 - $ 25000</option>
                <option value="25000-35000">$ 25000 - $ 35000</option>
                <option value="35000-50000">$ 35000 - $ 50000</option>
                <option value="50000+">$ 50000+</option>
              </select>
            </div>

            {/* Funding Source */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                2. Funding Source
              </label>
              <select
                name="fundingSource"
                value={formData.fundingSource}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-300 border-0 rounded-lg text-xs text-white focus:outline-none"
                style={{backgroundColor: '#B8B8B8'}}
              >
                <option value="">Family</option>
                <option value="family">Family</option>
                <option value="personal-savings">Personal Savings</option>
                <option value="scholarship">Scholarship</option>
                <option value="loan">Education Loan</option>
                <option value="employer">Employer Sponsorship</option>
              </select>
            </div>
          </form>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-6 right-6 flex space-x-3">
          <button
            onClick={onBack}
            className="text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium"
          >
            Previous
          </button>
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 text-sm font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};