import React, { useState } from 'react';
import { map } from '../assets';

interface AcademicBackgroundProps {
  onNext?: () => void;
  onBack?: () => void;
}

export const AcademicBackground: React.FC<AcademicBackgroundProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    educationLevel: '',
    currentlyEnrolled: false,
    stream: '',
    cgpa: '',
    passingYear: '',
    assessmentLanguage: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    // Validate CGPA input to allow only numbers, decimals, and percentage
    if (name === 'cgpa') {
      const cgpaPattern = /^[0-9]*\.?[0-9]*%?$/;
      if (value !== '' && !cgpaPattern.test(value)) {
        return; // Don't update if invalid
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!formData.educationLevel || !formData.stream || (!formData.currentlyEnrolled && !formData.cgpa) || !formData.passingYear || !formData.assessmentLanguage) {
      alert('Please fill all fields before proceeding.');
      return;
    }
    
    console.log('Academic background submitted:', formData);
    onNext?.();
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
              <div className="w-6 h-6 rounded-full flex items-center justify-center relative">
                <div className="w-6 h-6 rounded-full border-2 border-dashed border-yellow-400"></div>
                <div className="absolute w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <span className="ml-3 text-xs font-medium text-gray-900">ACADEMIC BACKGROUND</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 border-2 border-dashed border-gray-300 rounded-full bg-transparent"></div>
              <span className="ml-3 text-xs text-gray-400">STUDY GOALS</span>
              <span className="ml-2 text-[10px] text-gray-400 underline">Pending</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 border-2 border-dashed border-gray-300 rounded-full bg-transparent"></div>
              <span className="ml-3 text-xs text-gray-400">BUDGET & FINANCE</span>
              <span className="ml-2 text-[10px] text-gray-400 underline">Pending</span>
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
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Current Education Level */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                1. Current Education Level
              </label>
              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-300 border-0 rounded-lg text-xs text-white focus:outline-none"
                style={{backgroundColor: '#B8B8B8'}}
              >
                <option value="">Bachelor's Degree</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">PhD</option>
              </select>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  name="currentlyEnrolled"
                  checked={formData.currentlyEnrolled}
                  onChange={handleInputChange}
                  className="h-3 w-3 rounded border-gray-300"
                />
                <label className="ml-2 text-xs text-gray-600">Currently Enrolled</label>
              </div>
            </div>

            {/* Stream */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                2. Which Stream
              </label>
              <select
                name="stream"
                value={formData.stream}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-300 border-0 rounded-lg text-xs text-white focus:outline-none"
                style={{backgroundColor: '#B8B8B8'}}
              >
                <option value="">Information Technology</option>
                <option value="information-technology">Information Technology</option>
                <option value="computer-science">Computer Science</option>
                <option value="engineering">Engineering</option>
              </select>
            </div>

            {/* CGPA and Passing Year */}
            <div className="flex space-x-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  3. CGPA / Percentage
                </label>
                <input
                  type="text"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleInputChange}
                  placeholder="Like 7.8 / 86%"
                  disabled={formData.currentlyEnrolled}
                  className="w-full px-3 py-2 bg-gray-300 border-0 rounded-lg text-xs text-white focus:outline-none"
                  style={{backgroundColor: '#B8B8B8'}}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  4. Passing Year
                </label>
                <select
                  name="passingYear"
                  value={formData.passingYear}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-300 border-0 rounded-lg text-xs text-white focus:outline-none"
                  style={{backgroundColor: '#B8B8B8'}}
                >
                  <option value="">2022</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              </div>
            </div>

            {/* Assessment Language */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                5. Degree Assessment Language
              </label>
              <select
                name="assessmentLanguage"
                value={formData.assessmentLanguage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-300 border-0 rounded-lg text-xs text-white focus:outline-none"
                style={{backgroundColor: '#B8B8B8'}}
              >
                <option value="">Like 7.8 / 86%</option>
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
              </select>
            </div>
          </form>
        </div>

        {/* Next Button */}
        <div className="absolute bottom-6 right-6">
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