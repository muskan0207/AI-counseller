import React, { useState, useEffect } from "react";
import { BackgroundMap } from "./components/BackgroundMap";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { FooterInfo } from "./components/FooterInfo";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Onboarding } from "./components/Onboarding";
import { Dashboard } from "./components/Dashboard";
import { useProfile } from "./context/ProfileContext";

import { supabase } from "./lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";

type AppStage = "landing" | "signup" | "signin" | "onboarding" | "dashboard";

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>("landing");
  const [session, setSession] = useState<Session | null>(null);
  const { profile, isLoading: isProfileLoading } = useProfile();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    setStage("signup");
  };

  const handleSignUpSuccess = () => {
    setStage("onboarding");
  };

  const handleSignInSuccess = () => {
    setStage(profile.isOnboarded ? "dashboard" : "onboarding");
  };

  const handleBackToLanding = () => {
    setStage("landing");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setStage("landing");
  };

  if (isProfileLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin" />
      </div>
    );
  }

  // Stage: Dashboard (Phase 2)
  if (session && profile.isOnboarded) {
    return <Dashboard onLogout={handleLogout} />;
  }

  // Stage: Onboarding (Mandatory Gate)
  if (session && !profile.isOnboarded) {
    return <Onboarding />;
  }

  // Stage: Auth
  if (stage === "signup") {
    return (
      <SignUp
        onSignUpSuccess={handleSignUpSuccess}
        onBack={handleBackToLanding}
        onLoginClick={() => setStage("signin")}
      />
    );
  }

  if (stage === "signin") {
    return (
      <SignIn
        onBack={handleBackToLanding}
        onSignInSuccess={handleSignInSuccess}
      />
    );
  }

  // Stage: Landing (Default)
  return (
    <div className="relative w-full h-screen flex flex-col overflow-hidden bg-bg font-sans selection:bg-gray-200">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <BackgroundMap />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col h-full justify-between p-6 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full">
        <Navbar
          onGetStarted={handleGetStarted}
          onLogin={() => setStage("signin")}
        />
        <Hero onGetStarted={handleGetStarted} />
        <FooterInfo />
      </div>
    </div>
  );
};

export default App;
