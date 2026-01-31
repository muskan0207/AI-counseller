import React, { useEffect, useState } from 'react';
import type { AppState } from '../types';
import ApiService from '../services/apiService';

interface ApplicationProps {
  state: AppState;
  onAction: (type: string, payload?: any) => void;
}

const Application: React.FC<ApplicationProps> = ({ state, onAction }) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkApplicationAccess();
  }, [state.lockedUniversityIds]);

  const checkApplicationAccess = async () => {
    try {
      await ApiService.request('/user/application-access');
      setHasAccess(true);
    } catch (error) {
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="mb-6">
            <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Lock a University First</h2>
            <p className="text-gray-600 mb-6">
              You need to lock at least one university to access application guidance. This shows commitment and helps us create a focused application plan.
            </p>
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={() => onAction('switchToUniversities')}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium"
            >
              Go to Universities
            </button>
            <p className="text-sm text-gray-500">
              Shortlisted: {state.shortlistedUniversities.length} • Locked: {state.lockedUniversityIds.length}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-100 min-h-screen p-12">
      {/* University Details Section */}
      <div className="mb-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-lg text-gray-600 font-normal">Your Locked University Details</h1>
          <span className="text-sm text-gray-600">Application Progress</span>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-black mb-1">
              {state.lockedUniversityIds.length > 0 ? 'University Locked' : 'No University Locked'}
            </h2>
            <p className="text-gray-600 text-sm">
              {state.lockedUniversityIds.length} locked • Ready for applications
            </p>
          </div>
          <div className="text-right">
            <div className="mb-2">
              <span className="text-xs text-gray-600">Completion Rate</span>
            </div>
            <div className="w-64 bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{width: `${Math.round((state.toDos.filter(t => t.completed).length / Math.max(state.toDos.length, 1)) * 100)}%`}}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {state.toDos.filter(t => t.completed).length} of {state.toDos.length} tasks completed
            </p>
          </div>
        </div>
      </div>

      {/* Application Timeline Section */}
      <div className="mb-16">
        <h2 className="text-lg text-gray-600 font-normal mb-8">Application Timeline</h2>
        
        <div className="flex items-start justify-between relative">
          {/* Profile Analysis - Done */}
          <div className="bg-white rounded-lg p-4 flex-1 shadow-sm">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-green-600 font-medium">Completed</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Profile Analysis</h3>
            <p className="text-xs text-gray-500">Initial assessment and university matching completed.</p>
          </div>
          
          {/* Dashed line */}
          <div className="flex-1 border-t border-dashed border-gray-400 mx-4 mt-8"></div>
          
          {/* Document Preparation - Current */}
          <div className={`rounded-lg p-4 flex-1 shadow-sm ${
            state.lockedUniversityIds.length > 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-100'
          }`}>
            <div className="flex items-center mb-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                state.lockedUniversityIds.length > 0 ? 'bg-yellow-400' : 'border border-gray-400'
              }`}>
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className={`text-xs font-medium ${
                state.lockedUniversityIds.length > 0 ? 'text-yellow-700' : 'text-gray-500'
              }`}>
                {state.lockedUniversityIds.length > 0 ? 'In Progress' : 'Pending'}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Document Preparation</h3>
            <p className="text-xs text-gray-500">Drafting SOPs, gathering LORs, and transcripts.</p>
          </div>
          
          {/* Dashed line */}
          <div className="flex-1 border-t border-dashed border-gray-400 mx-4 mt-8"></div>
          
          {/* Final Submission - Pending */}
          <div className="bg-gray-100 rounded-lg p-4 flex-1 shadow-sm">
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center mr-2">
                <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs text-gray-500">Pending</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Final Submission</h3>
            <p className="text-xs text-gray-500">Review and submit applications.</p>
          </div>
        </div>
      </div>

      {/* Document Checklist Section */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg text-gray-600 font-normal">Application Checklist</h2>
          <button 
            onClick={() => onAction('addTask', { task: 'Custom application task', category: 'Applications' })}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            + Add Custom Task
          </button>
        </div>
        
        <div className="space-y-4">
          {state.toDos.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500 mb-4">No application tasks yet</p>
              <p className="text-sm text-gray-400">Lock a university to generate your personalized application checklist</p>
            </div>
          ) : (
            state.toDos.map((todo) => (
              <div key={todo.id} className="flex items-center justify-between py-4 px-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <button
                    onClick={() => onAction('completeTask', todo.id)}
                    className={`w-4 h-4 rounded-full mr-4 border-2 flex items-center justify-center ${
                      todo.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {todo.completed && (
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <div>
                    <h3 className={`text-sm font-medium ${
                      todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                    }`}>
                      {todo.task}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {todo.category} • Priority: {todo.priority || 'Medium'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {todo.completed ? (
                    <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded">
                      COMPLETED
                    </span>
                  ) : (
                    <span className="text-xs text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded">
                      PENDING
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        
        {state.toDos.length > 0 && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Pro Tips</h3>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Start with high-priority tasks first</li>
              <li>• Request recommendation letters 6-8 weeks before deadlines</li>
              <li>• Keep digital copies of all documents</li>
              <li>• Submit applications at least 1 week before deadlines</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Application;