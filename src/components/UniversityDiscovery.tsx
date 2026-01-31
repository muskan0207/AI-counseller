
import React, { useState } from 'react';
import type { AppState } from '../types';
import { MOCK_UNIVERSITIES } from '../constants';

interface UniversityDiscoveryProps {
  state: AppState;
  onAction: (type: string, payload?: any) => void;
}

const UniversityDiscovery: React.FC<UniversityDiscoveryProps> = ({ state, onAction }) => {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'In Budget', 'Preferred', 'Safe', 'Shortlisted', 'Locked'];

  const handleShortlist = (index: number) => {
    // Add shortlist functionality
    onAction('shortlist', index);
  };

  const handleLock = (index: number) => {
    // Add lock functionality
    onAction('lock', index);
  };

  const getFilteredCards = () => {
    // Filter cards based on active tab
    const allCards = [1, 2, 3, 4, 5, 6];
    switch (activeTab) {
      case 'Shortlisted':
        return [2]; // Show only shortlisted card
      case 'Locked':
        return [2]; // Show only locked card
      default:
        return allCards;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0}}>
      {/* Left Side - University Cards */}
      <div className="flex-1 p-6">
        {/* Tab Navigation */}
        <div className="flex space-x-8 mb-8 border-b border-gray-200">
          {tabs.map((tab, index) => (
            <div key={tab} className="flex items-center">
              <button
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-medium ${
                  activeTab === tab
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
              {index === 3 && (
                <div className="ml-4 h-4 w-px bg-gray-400"></div>
              )}
            </div>
          ))}
        </div>

        {/* University Grid */}
        <div className="grid grid-cols-2 gap-4 overflow-y-auto" style={{height: 'calc(100vh - 200px)'}}>
          {getFilteredCards().map((index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-bold text-black mb-1">University Name</h3>
                  <p className="text-xs text-gray-600">USA • $50,000/yr</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-gray-600">40% Match</span>
                </div>
              </div>

              {/* Acceptance Chance Bar */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-gray-600">Acceptance Chance</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-red-500 h-1.5 rounded-full" style={{width: '60%'}}></div>
                </div>
              </div>

              {/* Scholarship and Buttons */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-gray-600 mb-0.5">Scholarship chances</p>
                  <p className="text-[10px] text-gray-500">Moderate</p>
                </div>
                <div className="flex space-x-1">
                  {index === 2 ? (
                    <>
                      <span className="text-[10px] text-gray-600 px-2 py-1">Shortlisted</span>
                      <button className="bg-black text-white text-[10px] px-3 py-1 rounded-md font-medium">
                        Locked
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleShortlist(index)}
                        className="text-[10px] text-gray-600 px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Shortlist
                      </button>
                      <button 
                        onClick={() => handleLock(index)}
                        className="bg-blue-500 text-white text-[10px] px-3 py-1 rounded-md font-medium hover:bg-blue-600"
                      >
                        Lock
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - AI Counsellor */}
      <div className="w-80 bg-gradient-to-b from-amber-50 to-yellow-50 rounded-3xl ml-1 mr-6 my-6 flex flex-col">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-xl font-bold text-gray-800 mb-1">AI Counsellor</h1>
          <p className="text-gray-600 text-xs">Agent that works for you</p>
        </div>

        {/* Find me Universities Button */}
        <div className="px-6 mb-6">
          <button className="w-full text-right text-sm text-gray-700 font-medium">
            Find me Universities
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-6 pb-6">
          <div className="text-sm text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          </div>
          <div className="mt-4 flex justify-end">
            <button className="text-xs text-gray-600 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Run
            </button>
          </div>
        </div>

        {/* Chat Input */}
        <div className="px-6 pb-6">
          <div className="flex items-center bg-gray-400 rounded-full px-4 py-3">
            <input 
              type="text" 
              placeholder="What say ??"
              className="flex-1 bg-transparent text-white placeholder-white/70 focus:outline-none text-sm"
            />
            <button className="ml-2 text-white">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDiscovery;
