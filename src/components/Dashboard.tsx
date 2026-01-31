
import React from 'react';
import { type AppState, AppStage } from '../types';

interface DashboardProps {
  state: AppState;
  onAction: (type: string, payload?: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ state, onAction }) => {
  const { profile, currentStage, toDos } = state;

  const getProfileStrength = () => {
    const score = parseFloat(profile.ieltsScore || '0');
    if (score >= 7.5) return { label: 'Strong', color: 'text-white' };
    if (score >= 6.5) return { label: 'Average', color: 'text-white/80' };
    return { label: 'Developing', color: 'text-white/60' };
  };

  const strength = getProfileStrength();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Banner Card */}
      <div className="relative overflow-hidden rounded-3xl shadow-xl min-h-[220px]" style={{
        background: 'linear-gradient(135deg, #4A90E2 0%, #7BB3F0 100%)'
      }}>
        <div className="relative z-10 p-8 text-white">
          <h1 className="text-5xl font-light mb-4 tracking-tight">
            Academics : <span className="font-bold underline decoration-white/50">{strength.label}</span>
          </h1>
          <div className="space-y-1 text-lg opacity-90">
            <p>IELTS : Started / completed - {profile.ieltsScore}</p>
            <p>SOP : Draft / Pending / Started</p>
          </div>
        </div>
        {/* World Map Silhouette - matching the picture */}
        <div className="absolute top-0 right-0 w-1/2 h-full flex items-center justify-end pr-8">
          <div className="w-80 h-64 opacity-40">
            <svg viewBox="0 0 400 300" className="w-full h-full fill-white">
              {/* North America */}
              <path d="M50 80 Q70 70 90 75 Q110 80 130 85 L140 95 Q135 105 125 110 L115 120 Q105 125 95 120 L85 115 Q75 110 65 105 L55 95 Q50 90 50 80 Z"/>
              {/* South America */}
              <path d="M80 140 Q90 135 100 140 L105 150 Q110 160 115 170 L120 180 Q115 190 110 195 L105 200 Q100 205 95 200 L90 195 Q85 190 80 185 L75 175 Q70 165 75 155 L80 145 Q80 140 80 140 Z"/>
              {/* Europe */}
              <path d="M180 70 Q190 65 200 70 L210 75 Q215 80 220 85 L225 90 Q220 95 215 100 L210 105 Q200 110 190 105 L185 100 Q180 95 175 90 L170 85 Q175 80 180 75 L180 70 Z"/>
              {/* Africa */}
              <path d="M190 110 Q200 105 210 110 L220 115 Q225 125 230 135 L235 145 Q240 155 235 165 L230 175 Q225 185 220 190 L210 195 Q200 200 190 195 L185 190 Q180 185 175 175 L170 165 Q175 155 180 145 L185 135 Q190 125 190 115 L190 110 Z"/>
              {/* Asia */}
              <path d="M240 60 Q260 55 280 60 L300 65 Q320 70 340 75 L360 80 Q365 90 360 100 L355 110 Q350 120 340 125 L330 130 Q320 135 310 130 L300 125 Q290 120 280 115 L270 110 Q260 105 250 100 L245 90 Q240 80 240 70 L240 60 Z"/>
              {/* Australia */}
              <path d="M300 180 Q315 175 330 180 L345 185 Q350 190 355 195 L360 200 Q355 205 350 210 L345 215 Q335 220 325 215 L315 210 Q305 205 300 200 L295 195 Q300 190 300 185 L300 180 Z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Profile Summary</h2>
            <div className="space-y-4">
              {[
                { label: 'Intake Period', value: profile.targetIntakeYear },
                { label: 'Preferred Program', value: profile.fieldOfStudy },
                { label: 'Study Country', value: profile.preferredCountries.join(', ') },
                { label: 'Budget Range', value: profile.budgetRange },
                { label: 'Funding Source', value: profile.fundingPlan },
                { label: 'Background', value: `${profile.educationLevel} (${profile.graduationYear})` },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-semibold text-gray-800 flex items-center">
                    {item.value}
                    <svg className="h-4 w-4 ml-1 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Scholarship</h2>
                <p className="text-gray-500 text-sm">Chances</p>
              </div>
              <div className="text-4xl font-light text-gray-800">
                78<span className="text-xl opacity-50">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stages Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Stages</h2>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Unlock next steps</span>
            </div>
            
            <div className="space-y-8 relative">
              {/* Vertical line connecting stages */}
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100 -z-0"></div>
              
              {[
                { id: 1, label: 'Profile Building', stage: AppStage.BUILDING_PROFILE },
                { id: 2, label: 'Discovering Universities', stage: AppStage.DISCOVERING_UNIVERSITIES },
                { id: 3, label: 'Finalizing Universities', stage: AppStage.FINALIZING_UNIVERSITIES },
                { id: 4, label: 'Preparing Applications', stage: AppStage.PREPARING_APPLICATIONS },
              ].map((s) => {
                const isActive = currentStage === s.stage;
                const isCompleted = currentStage > s.stage;
                const isLocked = currentStage < s.stage;

                return (
                  <div key={s.id} className={`flex items-start z-10 relative ${isLocked ? 'opacity-50' : ''}`}>
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-4 flex-shrink-0 transition-colors ${
                      isCompleted ? 'bg-green-400 border-2 border-green-400' : 
                      isActive ? 'bg-white border-2 border-dashed border-yellow-400' : 'bg-white border-2 border-dashed border-gray-300'
                    }`}>
                      {isCompleted && <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      {isActive && <div className="h-2 w-2 rounded-full bg-yellow-400"></div>}
                    </div>
                    <div>
                      <h3 className={`font-bold transition-all ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'} ${isActive ? 'text-lg' : 'text-base'}`}>
                        Stage {s.id} - {s.label}
                      </h3>
                      {isActive && (
                        <button 
                          onClick={() => onAction('nextStage')}
                          className="text-xs text-blue-600 font-medium hover:underline mt-1"
                        >
                          Click to complete
                        </button>
                      )}
                      {isLocked && <span className="text-[10px] text-gray-400 italic block mt-0.5">(Locked)</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12">
               <h2 className="text-xl font-bold mb-4 text-gray-800">AI Generated To-Do's</h2>
               <div className="space-y-3">
                 {toDos.map((todo) => (
                   <div key={todo.id} className="flex items-center group cursor-pointer">
                      <div className={`h-5 w-5 rounded-full border-2 mr-3 flex-shrink-0 flex items-center justify-center ${todo.completed ? 'bg-green-400 border-green-400' : 'border-gray-200'}`}>
                        {todo.completed && <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <p className={`text-sm truncate flex-1 ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-600'}`}>{todo.task}</p>
                      <svg className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* AI Column */}
        <div className="space-y-6">
          <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-100 shadow-sm min-h-[400px] flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">AI Counsellor</h2>
                <p className="text-xs text-yellow-700/60 font-medium">Agent that works for you</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-end space-y-4">
               <div className="flex justify-end">
                 <button className="bg-white px-4 py-2 rounded-2xl text-sm font-medium shadow-sm hover:shadow-md transition-shadow">
                   Find me Universities
                 </button>
               </div>
               
               <div className="bg-white rounded-2xl p-4 shadow-sm relative animate-in zoom-in-95 duration-300">
                  <p className="text-sm text-gray-600 italic">
                    "I've analyzed your strong IELTS score of {profile.ieltsScore}. You have great potential for top-tier universities in {profile.preferredCountries[0]}. Should we look at the Dream list now?"
                  </p>
                  <div className="flex justify-end mt-2">
                    <button className="text-[10px] font-bold text-gray-400 flex items-center hover:text-gray-600 uppercase tracking-widest">
                      <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                      Run
                    </button>
                  </div>
               </div>

               <div className="relative">
                 <input 
                  type="text" 
                  placeholder="What say..??"
                  className="w-full bg-gray-200/50 rounded-2xl px-5 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onAction('switchToAICounsellor');
                  }}
                 />
                 <button 
                  onClick={() => onAction('switchToAICounsellor')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gray-300 rounded-xl hover:bg-yellow-400 transition-colors group"
                 >
                   <svg className="h-5 w-5 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                   </svg>
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
