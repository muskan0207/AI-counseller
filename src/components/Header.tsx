
import React from 'react';

interface HeaderProps {
  userName: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ userName, activeTab, onTabChange }) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onTabChange('dashboard')}>
              <span className="text-xl font-bold text-blue-600">AI Counsellor</span>
            </div>
            <div className="hidden md:flex space-x-4">
              {['Dashboard', 'AI Counsellor', 'Universities', 'Application'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab.toLowerCase().replace(' ', ''))}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === tab.toLowerCase().replace(' ', '')
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 border border-gray-200">
              <span className="text-sm font-medium mr-2">Hi, {userName}</span>
              <img className="h-8 w-8 rounded-full" src={`https://ui-avatars.com/api/?name=${userName}&background=random`} alt="User" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
