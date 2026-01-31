import React from 'react';
import type { AppState } from '../types';

interface ApplicationProps {
  state: AppState;
  onAction: (type: string, payload?: any) => void;
}

const Application: React.FC<ApplicationProps> = ({ state, onAction }) => {
  return (
    <div className="bg-gray-100 min-h-screen p-12">
      {/* University Details Section */}
      <div className="mb-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-lg text-gray-600 font-normal">Your locked University Details</h1>
          <span className="text-sm text-gray-600">40% Match</span>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-black mb-1">University Name</h2>
            <p className="text-gray-600 text-sm">USA • $50,000/yr</p>
          </div>
          <div className="text-right">
            <div className="mb-2">
              <span className="text-xs text-gray-600">Acceptance Chance</span>
            </div>
            <div className="w-64 bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{width: '70%'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Timeline Section */}
      <div className="mb-16">
        <h2 className="text-lg text-gray-600 font-normal mb-8">Application Timeline</h2>
        
        <div className="flex items-start justify-between relative">
          {/* Profile Analysis - Done */}
          <div className="bg-gray-100 rounded-lg p-4 flex-1">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-500">Done</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Profile Analysis</h3>
            <p className="text-xs text-gray-500">Initial assessment and university matching.</p>
          </div>
          
          {/* Dashed line */}
          <div className="flex-1 border-t border-dashed border-gray-400 mx-4 mt-8"></div>
          
          {/* Document Preparation - Current */}
          <div className="bg-gray-100 rounded-lg p-4 flex-1">
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mr-2">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Document Preparation</h3>
            <p className="text-xs text-gray-500">Drafting SOPs, gathering LORs, and transcripts.</p>
          </div>
          
          {/* Dashed line */}
          <div className="flex-1 border-t border-dashed border-gray-400 mx-4 mt-8"></div>
          
          {/* Final Submission - Pending */}
          <div className="bg-gray-100 rounded-lg p-4 flex-1">
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center mr-2">
                <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs text-gray-500">Pending</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Final Submission</h3>
            <p className="text-xs text-gray-500">Review portal and simple submission.</p>
          </div>
        </div>
      </div>

      {/* Document Upload Section */}
      <div>
        <h2 className="text-lg text-gray-600 font-normal mb-8">Document Upload</h2>
        
        <div className="space-y-4">
          {/* First row - uploaded */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
              <div>
                <h3 className="text-sm text-gray-800 font-medium">Statement of Purpose (SOP)</h3>
                <p className="text-xs text-gray-500">Drafting • Due in 5 days</p>
              </div>
            </div>
            <div className="border border-dashed border-gray-400 px-3 py-1 rounded">
              <span className="text-xs text-gray-600 font-medium">UPLOADED</span>
            </div>
          </div>
          
          {/* Second row */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <div className="w-2 h-2 border border-dashed border-yellow-500 rounded-full mr-4"></div>
              <div>
                <h3 className="text-sm text-gray-800 font-medium">Statement of Purpose (SOP)</h3>
                <p className="text-xs text-gray-500">Drafting • Due in 5 days</p>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-1 rounded text-xs font-medium hover:bg-blue-600">
              UPLOAD
            </button>
          </div>
          
          {/* Third row */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <div className="w-2 h-2 border border-dashed border-gray-400 rounded-full mr-4"></div>
              <div>
                <h3 className="text-sm text-gray-800 font-medium">Statement of Purpose (SOP)</h3>
                <p className="text-xs text-gray-500">Drafting • Due in 5 days</p>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-1 rounded text-xs font-medium hover:bg-blue-600">
              UPLOAD
            </button>
          </div>
          
          {/* Fourth row */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <div className="w-2 h-2 border border-dashed border-gray-400 rounded-full mr-4"></div>
              <div>
                <h3 className="text-sm text-gray-800 font-medium">Statement of Purpose (SOP)</h3>
                <p className="text-xs text-gray-500">Drafting • Due in 5 days</p>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-1 rounded text-xs font-medium hover:bg-blue-600">
              UPLOAD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;