
import React, { useState, useEffect, useRef } from 'react';
import {  type AppState } from '../types';
import { getAIResponse } from '../services/geminiService';
import { analyzeProfile, getUniversityFitReason } from '../utils/profileAnalysis';
import { getRecommendedUniversities } from '../utils/universityFiltering';
import { MOCK_UNIVERSITIES } from '../constants';

interface Message {
  role: 'user' | 'ai';
  text: string;
  actions?: Array<{
    type: string;
    label: string;
    payload?: any;
  }>;
}

interface AICounsellorProps {
  state: AppState;
  onAction: (type: string, payload?: any) => void;
}

const AICounsellor: React.FC<AICounsellorProps> = ({ state, onAction }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with profile analysis
  useEffect(() => {
    const analysis = analyzeProfile(state.profile);
    const recommendations = getRecommendedUniversities(MOCK_UNIVERSITIES, state.profile);
    
    let initialMessage = `Hello ${state.profile.name}! I've analyzed your profile and here's what I found:\n\n`;
    
    // Profile Strengths
    initialMessage += `🎯 **Your Strengths:**\n`;
    analysis.strengths.forEach(strength => {
      initialMessage += `• ${strength}\n`;
    });
    
    // Profile Gaps
    if (analysis.gaps.length > 0) {
      initialMessage += `\n⚠️ **Areas to Improve:**\n`;
      analysis.gaps.forEach(gap => {
        initialMessage += `• ${gap}\n`;
      });
    }
    
    // University Recommendations
    initialMessage += `\n🏫 **My University Recommendations:**\n\n`;
    
    if (recommendations.dream.length > 0) {
      initialMessage += `**Dream Universities** (Reach for the stars!):\n`;
      recommendations.dream.slice(0, 2).forEach(uni => {
        const reason = getUniversityFitReason(uni, state.profile);
        initialMessage += `• ${uni.name} (${uni.country}) - ${reason}\n`;
      });
    }
    
    if (recommendations.target.length > 0) {
      initialMessage += `\n**Target Universities** (Great fit for you!):\n`;
      recommendations.target.slice(0, 2).forEach(uni => {
        const reason = getUniversityFitReason(uni, state.profile);
        initialMessage += `• ${uni.name} (${uni.country}) - ${reason}\n`;
      });
    }
    
    if (recommendations.safe.length > 0) {
      initialMessage += `\n**Safe Universities** (High acceptance chance!):\n`;
      recommendations.safe.slice(0, 2).forEach(uni => {
        const reason = getUniversityFitReason(uni, state.profile);
        initialMessage += `• ${uni.name} (${uni.country}) - ${reason}\n`;
      });
    }
    
    initialMessage += `\n💡 **Next Steps:**\n`;
    analysis.recommendations.slice(0, 3).forEach(rec => {
      initialMessage += `• ${rec}\n`;
    });
    
    initialMessage += `\nWhat would you like to focus on today?`;
    
    const actions = [
      { type: 'showUniversities', label: 'Show All Recommendations', payload: null },
      { type: 'analyzeProfile', label: 'Detailed Profile Analysis', payload: null },
      { type: 'createTasks', label: 'Create Action Plan', payload: null }
    ];
    
    setMessages([{ role: 'ai', text: initialMessage, actions }]);
  }, [state.profile]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleActionClick = (actionType: string, payload?: any) => {
    switch (actionType) {
      case 'showUniversities':
        onAction('switchToUniversities');
        break;
      case 'shortlistUniversity':
        onAction('shortlist', payload);
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: `Great choice! I've shortlisted ${MOCK_UNIVERSITIES.find(u => u.id === payload)?.name} for you. You can now lock it when you're ready to commit.` 
        }]);
        break;
      case 'lockUniversity':
        onAction('lock', payload);
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: `Excellent! You've locked ${MOCK_UNIVERSITIES.find(u => u.id === payload)?.name}. This shows great commitment. I'll now create personalized application tasks for you.`,
          actions: [{ type: 'createTasks', label: 'Create Application Tasks', payload: payload }]
        }]);
        break;
      case 'createTasks':
        const tasks = [
          'Complete Statement of Purpose draft',
          'Gather academic transcripts',
          'Request recommendation letters',
          'Prepare financial documents',
          'Research scholarship opportunities'
        ];
        tasks.forEach(task => onAction('addTask', { task, category: 'Applications' }));
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: `Perfect! I've created 5 essential application tasks for you. Check your dashboard to track progress. Remember, early preparation is key to success!` 
        }]);
        break;
      case 'completeTask':
        onAction('completeTask', payload);
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: `Task completed! Great progress on your application journey.` 
        }]);
        break;
      case 'analyzeProfile':
        const analysis = analyzeProfile(state.profile);
        let analysisText = `📊 **Detailed Profile Analysis:**\n\n`;
        analysisText += `**Overall Score: ${analysis.overallScore}/100**\n\n`;
        analysisText += `**Detailed Breakdown:**\n`;
        analysis.strengths.forEach(strength => analysisText += `✅ ${strength}\n`);
        if (analysis.gaps.length > 0) {
          analysisText += `\n**Improvement Areas:**\n`;
          analysis.gaps.forEach(gap => analysisText += `❌ ${gap}\n`);
        }
        analysisText += `\n**My Recommendations:**\n`;
        analysis.recommendations.forEach(rec => analysisText += `💡 ${rec}\n`);
        setMessages(prev => [...prev, { role: 'ai', text: analysisText }]);
        break;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Enhanced context for AI
      const analysis = analyzeProfile(state.profile);
      const enhancedState = {
        ...state,
        profileAnalysis: analysis,
        availableUniversities: MOCK_UNIVERSITIES
      };
      
      const result = await getAIResponse(userMsg, enhancedState);
      
      // Check if AI response suggests actions
      let actions: any[] = [];
      if (result.toLowerCase().includes('shortlist') || result.toLowerCase().includes('recommend')) {
        const recommendations = getRecommendedUniversities(MOCK_UNIVERSITIES, state.profile);
        const topUni = recommendations.target[0] || recommendations.dream[0] || recommendations.safe[0];
        if (topUni) {
          actions.push({ type: 'shortlistUniversity', label: `Shortlist ${topUni.name}`, payload: topUni.id });
        }
      }
      
      if (result.toLowerCase().includes('task') || result.toLowerCase().includes('todo')) {
        actions.push({ type: 'createTasks', label: 'Create Action Plan', payload: null });
      }
      
      setMessages(prev => [...prev, { role: 'ai', text: result, actions: actions.length > 0 ? actions : undefined }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-200 overflow-hidden" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0}}>
      {/* Left Sidebar - Task To Do */}
      <div className="w-80 bg-gradient-to-b from-blue-500 to-blue-600 rounded-3xl mr-1 p-6 text-white">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Task To Do</h2>
          <p className="text-blue-100 text-sm">AI Suggested Tasks</p>
        </div>
        
        <div className="space-y-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2">
            <p className="text-[10px] text-gray-500 mb-1 leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </p>
            <div className="flex justify-end">
              <button className="text-gray-400 text-[10px] flex items-center gap-0.5">
                <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Go
              </button>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2">
            <p className="text-[10px] text-gray-500 mb-1 leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </p>
            <div className="flex justify-end">
              <button className="text-gray-400 text-[10px] flex items-center gap-0.5">
                <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Go
              </button>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2">
            <p className="text-[10px] text-gray-500 mb-1 leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </p>
            <div className="flex justify-end">
              <button className="text-gray-400 text-[10px] flex items-center gap-0.5">
                <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Go
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl ml-1">
        {/* Header */}
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">AI Counsellor</h1>
          <p className="text-gray-600 text-sm">Agent that works for you</p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 px-8 pb-6" style={{overflow: 'hidden'}}>
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none p-4' 
                    : 'space-y-3'
                }`}>
                  {m.role === 'ai' && (
                    <div className="bg-white text-gray-800 rounded-2xl rounded-tl-none border border-gray-200 p-4 shadow-sm">
                      <p className="text-sm whitespace-pre-wrap">{m.text}</p>
                    </div>
                  )}
                  {m.role === 'user' && (
                    <p className="text-sm whitespace-pre-wrap">{m.text}</p>
                  )}
                  {m.actions && m.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {m.actions.map((action, actionIdx) => (
                        <button
                          key={actionIdx}
                          onClick={() => handleActionClick(action.type, action.payload)}
                          className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none flex space-x-1 shadow-sm">
                  <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                  <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </div>

        {/* Chat Input */}
        <div className="px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center bg-gray-400 rounded-3xl px-6 py-4 shadow-lg">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="What say ??"
                className="flex-1 bg-transparent text-white placeholder-white/70 focus:outline-none text-base"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={`ml-4 transition-colors ${input.trim() && !isLoading ? 'text-white hover:text-gray-200' : 'text-white/50 cursor-not-allowed'}`}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICounsellor;
