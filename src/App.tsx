import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AICounsellor from './components/AICounsellor';
import UniversityDiscovery from './components/UniversityDiscovery';
import Application from './components/Application';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { Verification } from './components/Verification';
import { AcademicBackground } from './components/AcademicBackground';
import { StudyGoals } from './components/StudyGoals';
import { BudgetFinance } from './components/BudgetFinance';
import { ReadinessCheck } from './components/ReadinessCheck';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BackgroundMap } from './components/BackgroundMap';
import {type AppState, AppStage, type University, type ToDoItem } from './types';
import { MOCK_UNIVERSITIES, INITIAL_TODOS } from './constants';

// Define app flow stages
const AppFlow = {
  ONBOARDING: 'onboarding',
  SIGN_IN: 'signin',
  SIGN_UP: 'signup',
  VERIFICATION: 'verification',
  ACADEMIC_BACKGROUND: 'academic',
  STUDY_GOALS: 'studygoals',
  BUDGET_FINANCE: 'budget',
  READINESS_CHECK: 'readiness',
  MAIN_APP: 'mainapp'
} as const;

type AppFlow = typeof AppFlow[keyof typeof AppFlow];

const INITIAL_PROFILE = {
  name: 'Patel',
  educationLevel: 'Bachelor in Technology',
  major: 'Information Technology',
  graduationYear: 2026,
  gpa: '3.8/4.0',
  intendedDegree: 'Master\'s',
  fieldOfStudy: 'Information technology',
  targetIntakeYear: 'September 2026',
  preferredCountries: ['Canada'],
  budgetRange: '$15,000 - $20,000',
  fundingPlan: 'Student loan',
  ieltsScore: '7.8',
  greScore: '315',
  sopStatus: 'Draft' as const,
};

const App: React.FC = () => {
  const [currentFlow, setCurrentFlow] = useState<AppFlow>(AppFlow.ONBOARDING);
  const [userEmail, setUserEmail] = useState<string>('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [state, setState] = useState<AppState>({
    profile: INITIAL_PROFILE,
    shortlistedUniversities: [],
    lockedUniversityIds: [],
    toDos: INITIAL_TODOS,
    currentStage: AppStage.BUILDING_PROFILE,
  });

  const handleAction = useCallback((type: string, payload?: any) => {
    setState(prev => {
      switch (type) {
        case 'shortlist': {
          const uniId = payload;
          const uni = MOCK_UNIVERSITIES.find(u => u.id === uniId);
          if (!uni || prev.shortlistedUniversities.some(u => u.id === uniId)) return prev;
          return {
            ...prev,
            shortlistedUniversities: [...prev.shortlistedUniversities, uni]
          };
        }
        case 'lock': {
          const uniId = payload;
          if (prev.lockedUniversityIds.includes(uniId)) return prev;
          const newLocked = [...prev.lockedUniversityIds, uniId];
          return {
            ...prev,
            lockedUniversityIds: newLocked,
            currentStage: Math.max(prev.currentStage, AppStage.FINALIZING_UNIVERSITIES) as AppStage
          };
        }
        case 'unlock': {
          const uniId = payload;
          const newLocked = prev.lockedUniversityIds.filter(id => id !== uniId);
          return {
            ...prev,
            lockedUniversityIds: newLocked,
            currentStage: (newLocked.length === 0 && prev.currentStage >= AppStage.PREPARING_APPLICATIONS 
              ? AppStage.FINALIZING_UNIVERSITIES 
              : prev.currentStage) as AppStage
          };
        }
        case 'addTask': {
          const newTask: ToDoItem = {
            id: `t-${Date.now()}`,
            task: payload.task,
            category: payload.category || 'Applications',
            completed: false
          };
          return { ...prev, toDos: [newTask, ...prev.toDos] };
        }
        case 'completeTask': {
          const taskId = payload;
          return {
            ...prev,
            toDos: prev.toDos.map(todo => 
              todo.id === taskId ? { ...todo, completed: true } : todo
            )
          };
        }
        case 'nextStage': {
          if (prev.currentStage === AppStage.FINALIZING_UNIVERSITIES && prev.lockedUniversityIds.length === 0) {
            alert("Please lock at least one university to start preparing applications!");
            return prev;
          }
          const next = Math.min(prev.currentStage + 1, AppStage.PREPARING_APPLICATIONS);
          return { ...prev, currentStage: next as AppStage };
        }
        case 'switchToAICounsellor': {
          setActiveTab('aicounsellor');
          return prev;
        }
        case 'switchToUniversities': {
          setActiveTab('universities');
          return prev;
        }
        default:
          return prev;
      }
    });
  }, []);

  // Handle authentication and onboarding flow
  const handleFlowNavigation = {
    // Onboarding flow
    onGetStarted: () => setCurrentFlow(AppFlow.SIGN_UP),
    
    // Sign In flow
    onSignInSuccess: () => setCurrentFlow(AppFlow.MAIN_APP),
    onGoToSignUp: () => setCurrentFlow(AppFlow.SIGN_UP),
    
    // Sign Up flow
    onSignUpSuccess: (email: string) => {
      setUserEmail(email);
      setCurrentFlow(AppFlow.VERIFICATION);
    },
    onGoToSignIn: () => setCurrentFlow(AppFlow.SIGN_IN),
    
    // Verification flow
    onVerificationSuccess: () => setCurrentFlow(AppFlow.ACADEMIC_BACKGROUND),
    
    // Onboarding flow
    onAcademicNext: () => setCurrentFlow(AppFlow.STUDY_GOALS),
    onStudyGoalsNext: () => setCurrentFlow(AppFlow.BUDGET_FINANCE),
    onStudyGoalsBack: () => setCurrentFlow(AppFlow.ACADEMIC_BACKGROUND),
    onBudgetNext: () => setCurrentFlow(AppFlow.READINESS_CHECK),
    onBudgetBack: () => setCurrentFlow(AppFlow.STUDY_GOALS),
    onReadinessNext: () => setCurrentFlow(AppFlow.MAIN_APP),
    onReadinessBack: () => setCurrentFlow(AppFlow.BUDGET_FINANCE),
  };

  const renderAuthFlow = () => {
    switch (currentFlow) {
      case AppFlow.ONBOARDING:
        return (
          <div className="min-h-screen bg-gray-100 relative overflow-hidden">
            <div className="absolute inset-0">
              <BackgroundMap />
            </div>
            <div className="relative z-10 min-h-screen flex flex-col">
              <div className="container mx-auto px-4 pt-8">
                <Navbar />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <Hero onGetStarted={handleFlowNavigation.onGetStarted} />
              </div>
            </div>
          </div>
        );
      case AppFlow.SIGN_IN:
        return (
          <SignIn 
            onSignInSuccess={handleFlowNavigation.onSignInSuccess}
            onGoToSignUp={handleFlowNavigation.onGoToSignUp}
          />
        );
      case AppFlow.SIGN_UP:
        return (
          <SignUp 
            onSignUpSuccess={handleFlowNavigation.onSignUpSuccess}
            onGoToSignIn={handleFlowNavigation.onGoToSignIn}
          />
        );
      case AppFlow.VERIFICATION:
        return (
          <Verification 
            email={userEmail}
            onVerificationSuccess={handleFlowNavigation.onVerificationSuccess}
          />
        );
      case AppFlow.ACADEMIC_BACKGROUND:
        return (
          <AcademicBackground 
            onNext={handleFlowNavigation.onAcademicNext}
          />
        );
      case AppFlow.STUDY_GOALS:
        return (
          <StudyGoals 
            onNext={handleFlowNavigation.onStudyGoalsNext}
            onBack={handleFlowNavigation.onStudyGoalsBack}
          />
        );
      case AppFlow.BUDGET_FINANCE:
        return (
          <BudgetFinance 
            onNext={handleFlowNavigation.onBudgetNext}
            onBack={handleFlowNavigation.onBudgetBack}
          />
        );
      case AppFlow.READINESS_CHECK:
        return (
          <ReadinessCheck 
            onNext={handleFlowNavigation.onReadinessNext}
            onBack={handleFlowNavigation.onReadinessBack}
          />
        );
      default:
        return null;
    }
  };

  const renderMainAppContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard state={state} onAction={handleAction} />;
      case 'aicounsellor':
        return <AICounsellor state={state} onAction={handleAction} />;
      case 'universities':
        return <UniversityDiscovery state={state} onAction={handleAction} />;
      case 'application':
        return <Application state={state} onAction={handleAction} />;
      default:
        return <Dashboard state={state} onAction={handleAction} />;
    }
  };

  // Show auth/onboarding flow or main app
  if (currentFlow !== AppFlow.MAIN_APP) {
    return renderAuthFlow();
  }

  return (
    <div className="min-h-screen pb-20">
      <Header 
        userName={state.profile.name} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {renderMainAppContent()}
      </main>

      <button 
        onClick={() => setActiveTab('aicounsellor')}
        className="fixed bottom-6 right-6 h-14 w-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 group"
      >
        <svg className="h-6 w-6 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
};

export default App;