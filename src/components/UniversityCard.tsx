
import React, { useState } from 'react';
import {  type University } from '../types';

interface UniversityCardProps {
  university: University;
  isShortlisted: boolean;
  isLocked: boolean;
  onShortlist: (id: string) => void;
  onLock: (id: string) => void;
  onUnlock: (id: string) => void;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ 
  university, 
  isShortlisted, 
  isLocked, 
  onShortlist, 
  onLock,
  onUnlock
}) => {
  const [showLockDialog, setShowLockDialog] = useState(false);
  const [showUnlockDialog, setShowUnlockDialog] = useState(false);

  const handleLockClick = () => {
    setShowLockDialog(true);
  };

  const confirmLock = () => {
    onLock(university.id);
    setShowLockDialog(false);
  };

  const handleUnlockClick = () => {
    setShowUnlockDialog(true);
  };

  const confirmUnlock = () => {
    onUnlock(university.id);
    setShowUnlockDialog(false);
  };

  return (
    <>
      <div className={`p-5 rounded-xl border transition-all relative ${
        isLocked 
          ? 'border-blue-500 ring-2 ring-blue-100 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg' 
          : isShortlisted
          ? 'border-yellow-300 bg-yellow-50 shadow-md'
          : 'border-gray-200 bg-white hover:shadow-md hover:border-gray-300'
      }`}>
        {/* Lock Status Badge */}
        {isLocked && (
          <div className="absolute -top-2 -right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>LOCKED</span>
          </div>
        )}

        {isShortlisted && !isLocked && (
          <div className="absolute -top-2 -right-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>SHORTLISTED</span>
          </div>
        )}

        <div className="flex justify-between items-start mb-3">
          <div>
            <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${
              university.category === 'Dream' ? 'bg-purple-100 text-purple-700' :
              university.category === 'Target' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
            }`}>
              {university.category}
            </span>
            <h3 className={`text-lg font-bold mt-2 ${
              isLocked ? 'text-blue-800' : 'text-gray-800'
            }`}>{university.name}</h3>
            <p className="text-sm text-gray-500">{university.country}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase font-bold">Fees</p>
            <p className="text-sm font-semibold text-gray-700">{university.tuitionFee}</p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <p className="text-xs font-bold text-gray-500 mb-1">Why it fits:</p>
            <p className="text-sm text-gray-700">{university.whyFit}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded bg-gray-50 border border-gray-100">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Acceptance</p>
              <p className={`text-xs font-bold ${
                university.acceptanceChance === 'High' ? 'text-green-600' :
                university.acceptanceChance === 'Medium' ? 'text-yellow-600' : 'text-red-600'
              }`}>{university.acceptanceChance} Chance</p>
            </div>
            <div className="p-2 rounded bg-gray-50 border border-gray-100">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Cost Level</p>
              <p className="text-xs font-bold text-gray-700">{university.costLevel}</p>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          {!isShortlisted ? (
            <button 
              onClick={() => onShortlist(university.id)}
              className="flex-1 text-sm bg-white border border-blue-600 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Shortlist
            </button>
          ) : !isLocked ? (
            <>
               <button 
                className="flex-1 text-sm bg-yellow-100 text-yellow-700 py-2 rounded-lg font-semibold cursor-default"
                disabled
              >
                ✓ Shortlisted
              </button>
              <button 
                onClick={handleLockClick}
                className="flex-1 text-sm bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-sm transition-all transform hover:scale-105"
              >
                🔒 Lock & Commit
              </button>
            </>
          ) : (
            <button 
              onClick={handleUnlockClick}
              className="flex-1 text-sm bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              🔓 Unlock & Research
            </button>
          )}
        </div>
      </div>

      {/* Lock Confirmation Dialog */}
      {showLockDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Lock University?</h3>
              <p className="text-gray-600 mb-4">
                You're about to commit to <span className="font-semibold text-blue-600">{university.name}</span>. 
                This will unlock application guidance and document checklists.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> You can unlock later to research other options, but this shows your commitment level.
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowLockDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmLock}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                🔒 Lock & Commit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unlock Confirmation Dialog */}
      {showUnlockDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Unlock University?</h3>
              <p className="text-gray-600 mb-4">
                You're about to unlock <span className="font-semibold text-orange-600">{university.name}</span>. 
                This will remove your commitment and allow you to research other options.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Info:</strong> Your application progress will be saved, and you can re-lock this university anytime.
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowUnlockDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmUnlock}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
              >
                🔓 Unlock
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UniversityCard;
