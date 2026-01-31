import React, { useState } from 'react';
import { map } from '../assets';

interface StudyGoalsProps {
  onNext?: (data: any) => void;
  onBack?: () => void;
}

export const StudyGoals: React.FC<StudyGoalsProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    intendedDegree: '',
    targetField: '',
    preferredCountries: '',
    targetedIntake: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!formData.intendedDegree || !formData.targetField || !formData.preferredCountries || !formData.targetedIntake) {
      alert('Please fill all fields before proceeding.');
      return;
    }
    
    const profileData = {
      intendedDegree: formData.intendedDegree,
      fieldOfStudy: formData.targetField,
      preferredCountries: [formData.preferredCountries],
      targetIntakeYear: formData.targetedIntake
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
          input[type="checkbox"]:checked {
            accent-color: black !important;
            background-color: black !important;
            border-color: black !important;
            color: white !important;
          }
          input[type="checkbox"]:checked::before {
            color: white !important;
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
              <div className="w-6 h-6 rounded-full flex items-center justify-center relative">
                <div className="w-6 h-6 rounded-full border-2 border-dashed border-yellow-400"></div>
                <div className="absolute w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <span className="ml-3 text-[10px] font-medium text-gray-900">STUDY GOALS</span>
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
            {/* Intended Degree */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                1. Intended Degree
              </label>
              <div className="flex space-x-4 mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="intendedDegree"
                    value="bachelor"
                    checked={formData.intendedDegree === 'bachelor'}
                    onChange={(e) => setFormData(prev => ({ ...prev, intendedDegree: e.target.checked ? 'bachelor' : '' }))}
                    className="h-3 w-3 rounded border-gray-300 mr-1"
                  />
                  <span className="text-xs text-gray-600">Bachelor</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="intendedDegree"
                    value="master"
                    checked={formData.intendedDegree === 'master'}
                    onChange={(e) => setFormData(prev => ({ ...prev, intendedDegree: e.target.checked ? 'master' : '' }))}
                    className="h-3 w-3 rounded border-gray-300 mr-1"
                  />
                  <span className="text-xs text-gray-600">Master</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="intendedDegree"
                    value="phd"
                    checked={formData.intendedDegree === 'phd'}
                    onChange={(e) => setFormData(prev => ({ ...prev, intendedDegree: e.target.checked ? 'phd' : '' }))}
                    className="h-3 w-3 rounded border-gray-300 mr-1"
                  />
                  <span className="text-xs text-gray-600">PhD</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="intendedDegree"
                    value="mba"
                    checked={formData.intendedDegree === 'mba'}
                    onChange={(e) => setFormData(prev => ({ ...prev, intendedDegree: e.target.checked ? 'mba' : '' }))}
                    className="h-3 w-3 rounded border-gray-300 mr-1"
                  />
                  <span className="text-xs text-gray-600">MBA</span>
                </label>
              </div>
            </div>

            {/* Target Field of Study */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                2. Target Field of Study
              </label>
              <select
                name="targetField"
                value={formData.targetField}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-300 border-0 rounded-lg text-xs text-white focus:outline-none"
                style={{backgroundColor: '#B8B8B8'}}
              >
                <option value="">Information Technology</option>
                <option value="information-technology">Information Technology</option>
                <option value="computer-science">Computer Science</option>
                <option value="engineering">Engineering</option>
                <option value="business">Business</option>
              </select>
            </div>

            {/* Preferred Countries */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                3. Preferred Countries
              </label>
              <select
                name="preferredCountries"
                value={formData.preferredCountries}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-300 border-0 rounded-lg text-xs text-white focus:outline-none"
                style={{backgroundColor: '#B8B8B8'}}
              >
                <option value="">Enter Country To Separate</option>
                <option value="usa">United States</option>
                <option value="canada">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="australia">Australia</option>
                <option value="germany">Germany</option>
              </select>
            </div>

            {/* Targeted Intake */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                4. Targeted Intake
              </label>
              <select
                name="targetedIntake"
                value={formData.targetedIntake}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-300 border-0 rounded-lg text-xs text-white focus:outline-none"
                style={{backgroundColor: '#B8B8B8'}}
              >
                <option value="">September</option>
                <option value="september">September</option>
                <option value="january">January</option>
                <option value="may">May</option>
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