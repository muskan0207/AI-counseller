import React, { useState } from 'react';
import { map } from '../assets';

interface ReadinessCheckProps {
  onNext?: () => void;
  onBack?: () => void;
}

export const ReadinessCheck: React.FC<ReadinessCheckProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    englishProficiencyTest: '',
    englishTestStatus: '',
    englishTestScore: '',
    aptitudeTest: '',
    aptitudeTestStatus: '',
    aptitudeTestScore: ''
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
    if (!formData.englishProficiencyTest || !formData.englishTestStatus || !formData.englishTestScore || 
        !formData.aptitudeTest || !formData.aptitudeTestStatus || !formData.aptitudeTestScore) {
      alert('Please fill all fields before proceeding.');
      return;
    }
    
    console.log('Readiness Check submitted:', formData);
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
              <div className="w-6 h-6 rounded-full bg-green-200"></div>
              <span className="ml-3 text-[10px] text-gray-600">STUDY GOALS <span className="text-[10px] underline">Done</span></span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-green-200"></div>
              <span className="ml-3 text-[10px] text-gray-600">BUDGET & FINANCE <span className="text-[10px] underline">Done</span></span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full flex items-center justify-center relative">
                <div className="w-6 h-6 rounded-full border-2 border-dashed border-yellow-400"></div>
                <div className="absolute w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <span className="ml-3 text-[10px] font-medium text-gray-900">READINESS CHECK</span>
            </div>
          </div>
        </div>

        {/* Vertical dotted separator line */}
        <div className="absolute left-70 top-6 bottom-6 w-px border-l border-dashed border-gray-400"></div>

        {/* Right Side Form */}
        <div className="ml-72 flex items-center justify-center h-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* English Proficiency Test */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                1. English Proficiency Test
              </label>
              <div className="flex space-x-4 mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="englishProficiencyTest"
                    value="ielts"
                    checked={formData.englishProficiencyTest === 'ielts'}
                    onChange={(e) => setFormData(prev => ({ ...prev, englishProficiencyTest: e.target.checked ? 'ielts' : '' }))}
                    className="h-3 w-3 rounded border-gray-300 mr-1"
                  />
                  <span className="text-xs text-gray-600">IELTS</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="englishProficiencyTest"
                    value="pte"
                    checked={formData.englishProficiencyTest === 'pte'}
                    onChange={(e) => setFormData(prev => ({ ...prev, englishProficiencyTest: e.target.checked ? 'pte' : '' }))}
                    className="h-3 w-3 rounded border-gray-300 mr-1"
                  />
                  <span className="text-xs text-gray-600">PTE</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="englishProficiencyTest"
                    value="tofel"
                    checked={formData.englishProficiencyTest === 'tofel'}
                    onChange={(e) => setFormData(prev => ({ ...prev, englishProficiencyTest: e.target.checked ? 'tofel' : '' }))}
                    className="h-3 w-3 rounded border-gray-300 mr-1"
                  />
                  <span className="text-xs text-gray-600">Tofel</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="englishProficiencyTest"
                    value="other"
                    checked={formData.englishProficiencyTest === 'other'}
                    onChange={(e) => setFormData(prev => ({ ...prev, englishProficiencyTest: e.target.checked ? 'other' : '' }))}
                    className="h-3 w-3 rounded border-gray-300 mr-1"
                  />
                  <span className="text-xs text-gray-600">Other</span>
                </label>
              </div>
            </div>

            {/* Test Status */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                2. Test Status
              </label>
              <div className="flex space-x-4 mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="englishTestStatus"
                    value="given"
                    checked={formData.englishTestStatus === 'given'}
                    onChange={(e) => setFormData(prev => ({ ...prev, englishTestStatus: e.target.checked ? 'given' : '' }))}
                    className="h-3 w-3 rounded border-gray-300 mr-1"
                  />
                  <span className="text-xs text-gray-600">Given</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="englishTestStatus"
                    value="pending"
                    checked={formData.englishTestStatus === 'pending'}
                    onChange={(e) => setFormData(prev => ({ ...prev, englishTestStatus: e.target.checked ? 'pending' : '' }))}
                    className="h-3 w-3 rounded border-gray-300 mr-1"
                  />
                  <span className="text-xs text-gray-600">Pending</span>
                </label>
              </div>
            </div>

            {/* Test Score */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                3. Test Score
              </label>
              <select
                name="englishTestScore"
                value={formData.englishTestScore}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-300 border-0 rounded-lg text-xs text-white focus:outline-none"
                style={{backgroundColor: '#B8B8B8'}}
              >
                <option value="">7.5</option>
                <option value="6.0">6.0</option>
                <option value="6.5">6.5</option>
                <option value="7.0">7.0</option>
                <option value="7.5">7.5</option>
                <option value="8.0">8.0</option>
                <option value="8.5">8.5</option>
                <option value="9.0">9.0</option>
              </select>
            </div>

            {/* Aptitude Test */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                4. Aptitude Test
              </label>
              <div className="flex space-x-4 mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="aptitudeTest"
                    value="gre"
                    checked={formData.aptitudeTest === 'gre'}
                    onChange={(e) => setFormData(prev => ({ ...prev, aptitudeTest: e.target.checked ? 'gre' : '' }))}
                    className="h-3 w-3 rounded border-gray-300 mr-1"
                  />
                  <span className="text-xs text-gray-600">GRE</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="aptitudeTest"
                    value="gmat"
                    checked={formData.aptitudeTest === 'gmat'}
                    onChange={(e) => setFormData(prev => ({ ...prev, aptitudeTest: e.target.checked ? 'gmat' : '' }))}
                    className="h-3 w-3 rounded border-gray-300 mr-1"
                  />
                  <span className="text-xs text-gray-600">GMAT</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="aptitudeTest"
                    value="sat"
                    checked={formData.aptitudeTest === 'sat'}
                    onChange={(e) => setFormData(prev => ({ ...prev, aptitudeTest: e.target.checked ? 'sat' : '' }))}
                    className="h-3 w-3 rounded border-gray-300 mr-1"
                  />
                  <span className="text-xs text-gray-600">SAT</span>
                </label>
              </div>
            </div>

            {/* Test Status */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                5. Test Status
              </label>
              <div className="flex space-x-4 mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="aptitudeTestStatus"
                    value="given"
                    checked={formData.aptitudeTestStatus === 'given'}
                    onChange={(e) => setFormData(prev => ({ ...prev, aptitudeTestStatus: e.target.checked ? 'given' : '' }))}
                    className="h-3 w-3 rounded border-gray-300 mr-1"
                  />
                  <span className="text-xs text-gray-600">Given</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="aptitudeTestStatus"
                    value="pending"
                    checked={formData.aptitudeTestStatus === 'pending'}
                    onChange={(e) => setFormData(prev => ({ ...prev, aptitudeTestStatus: e.target.checked ? 'pending' : '' }))}
                    className="h-3 w-3 rounded border-gray-300 mr-1"
                  />
                  <span className="text-xs text-gray-600">Pending</span>
                </label>
              </div>
            </div>

            {/* Test Score */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                6. Test Score
              </label>
              <select
                name="aptitudeTestScore"
                value={formData.aptitudeTestScore}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-300 border-0 rounded-lg text-xs text-white focus:outline-none"
                style={{backgroundColor: '#B8B8B8'}}
              >
                <option value="">7.5</option>
                <option value="300">300</option>
                <option value="320">320</option>
                <option value="340">340</option>
                <option value="1200">1200</option>
                <option value="1400">1400</option>
                <option value="1600">1600</option>
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
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};