import React, { useState } from "react";
import { useProfile } from "../context/ProfileContext";
import type { University } from "../context/ProfileContext";
import { AICounsellor } from "./AICounsellor";
import { UniversityDiscovery, MOCK_UNIVERSITIES } from "./UniversityDiscovery";

interface DashboardProps {
  onLogout?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { profile } = useProfile();
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "discovery">(
    "overview",
  );

  const stages = [
    { id: 1, name: "Building Profile", active: profile.isOnboarded },
    {
      id: 2,
      name: "Discovering Universities",
      active: profile.isOnboarded && !profile.lockedUniversityId,
    },
    {
      id: 3,
      name: "Finalizing Universities",
      active:
        profile.shortlistedUniversities.length > 0 &&
        !profile.lockedUniversityId,
    },
    {
      id: 4,
      name: "Preparing Applications",
      active: !!profile.lockedUniversityId,
    },
  ];

  const currentStageNum = profile.lockedUniversityId
    ? 4
    : profile.shortlistedUniversities.length > 0
      ? 3
      : 2;

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-500">Here's your study-abroad progress.</p>
          </div>

          <div className="flex items-center gap-2 bg-gray-200/50 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "overview" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("discovery")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "discovery" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Discovery
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hidden lg:block">
              Stage {currentStageNum}: {stages[currentStageNum - 1].name}
            </div>
            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            </button>
          </div>
        </div>

        {activeTab === "overview" ? (
          <>
            {/* Top Grid: Profile Summary & Strength */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Summary */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Profile Summary
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">
                      Education
                    </p>
                    <p className="text-sm font-medium text-gray-800 capitalize">
                      {profile.academic.level}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">
                      Target Intake
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {profile.goals.intakeYear}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">
                      Budget
                    </p>
                    <p className="text-sm font-medium text-gray-800 capitalize">
                      {profile.budget.range}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">
                      Exams
                    </p>
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {profile.readiness.exams || "Not Added"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Strength */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Profile Strength
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Academics</span>
                      <span className="text-green-600 font-bold">Strong</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[85%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Exams</span>
                      <span className="text-yellow-600 font-bold">
                        In Progress
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 w-[40%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Documents (SOP)</span>
                      <span
                        className={
                          profile.readiness.sopStatus === "ready"
                            ? "text-green-600 font-bold"
                            : "text-red-500 font-bold"
                        }
                      >
                        {profile.readiness.sopStatus.replace("_", " ")}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${profile.readiness.sopStatus === "ready" ? "bg-green-500 w-full" : "bg-red-400 w-1/4"}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Section: Stage Indicators & AI To-Do */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Stage Track */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Your Journey
                </h2>
                <div className="space-y-6 flex-1">
                  {stages.map((s, i) => (
                    <div key={s.id} className="flex items-start gap-4">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${s.active ? "bg-blue-600 text-white ring-4 ring-blue-50" : "bg-gray-100 text-gray-400"}`}
                      >
                        {s.id}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-sm font-bold ${s.active ? "text-gray-900" : "text-gray-400"}`}
                        >
                          {s.name}
                        </p>
                        {s.active && (
                          <p className="text-[10px] text-blue-600 mt-0.5">
                            Current Phase
                          </p>
                        )}
                      </div>
                      {i < stages.length - 1 && (
                        <div className="absolute ml-3 mt-6 w-0.5 h-6 bg-gray-100" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* AI To-Do List */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    AI Generated Tasks
                  </h2>
                  <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-bold uppercase">
                    Dynamic
                  </span>
                </div>

                <div className="space-y-3">
                  {profile.lockedUniversityId ? (
                    <>
                      <div className="group p-4 rounded-2xl border border-blue-100 bg-blue-50/20 transition-all flex items-center gap-4 cursor-pointer">
                        <div className="w-5 h-5 rounded-md border-2 border-blue-600 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-800">
                            Finalize SOP for{" "}
                            {
                              MOCK_UNIVERSITIES.find(
                                (u: University) =>
                                  u.id === profile.lockedUniversityId,
                              )?.name
                            }
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            Focus on alignment with their{" "}
                            {profile.academic.major} program requirements.
                          </p>
                        </div>
                        <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                          High Priority
                        </div>
                      </div>

                      <div className="group p-4 rounded-2xl border border-gray-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all flex items-center gap-4 cursor-pointer">
                        <div className="w-5 h-5 rounded-md border-2 border-gray-300 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-800">
                            Request 2 LORs from professors
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            Required for{" "}
                            {
                              MOCK_UNIVERSITIES.find(
                                (u: University) =>
                                  u.id === profile.lockedUniversityId,
                              )?.location
                            }{" "}
                            applications.
                          </p>
                        </div>
                        <div className="text-[10px] font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg">
                          Medium Priority
                        </div>
                      </div>

                      <div className="group p-4 rounded-2xl border border-gray-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all flex items-center gap-4 cursor-pointer">
                        <div className="w-5 h-5 rounded-md border-2 border-gray-300 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-800">
                            Prepare proof of funds (${profile.budget.range})
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            Essential for{" "}
                            {
                              MOCK_UNIVERSITIES.find(
                                (u: University) =>
                                  u.id === profile.lockedUniversityId,
                              )?.location
                            }{" "}
                            visa sponsorship.
                          </p>
                        </div>
                        <div className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
                          Low Priority
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="group p-4 rounded-2xl border border-gray-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all flex items-center gap-4 cursor-pointer">
                        <div className="w-5 h-5 rounded-md border-2 border-gray-300 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-800">
                            Shortlist 3 Universities
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            Use the Discovery tab to find matches for{" "}
                            {profile.goals.countries.join(", ")}.
                          </p>
                        </div>
                        <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                          High Priority
                        </div>
                      </div>

                      <div className="group p-4 rounded-2xl border border-gray-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all flex items-center gap-4 cursor-pointer">
                        <div className="w-5 h-5 rounded-md border-2 border-gray-300 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-800">
                            Complete IELTS preparation
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            Based on your "In Progress" status and target intake{" "}
                            {profile.goals.intakeYear}
                          </p>
                        </div>
                        <div className="text-[10px] font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg">
                          Medium Priority
                        </div>
                      </div>
                    </>
                  )}

                  <div className="group p-4 rounded-2xl border border-gray-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all flex items-center gap-4 cursor-pointer">
                    <div className="w-5 h-5 rounded-md border-2 border-gray-300 flex-shrink-0 text-white bg-green-500 border-green-500">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="w-full h-full p-0.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-400 line-through">
                        Complete Onboarding
                      </p>
                      <p className="text-[10px] text-gray-300 mt-0.5">
                        Verified academic and goal data
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-2xl flex items-start gap-4 ring-1 ring-gray-200">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white font-bold italic">
                    AI
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 mb-1">
                      Counsellor Tip
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {profile.lockedUniversityId
                        ? "Great choice! Now let's focus on your application strategy. Your next task is to finalize the SOP."
                        : profile.shortlistedUniversities.length > 0
                          ? "I see you've shortlisted some great options. Take a moment to 'Lock' your top choice to unlock application guidance."
                          : `Based on your GPA of ${profile.academic.gpa}, I recommend focusing on "Target" universities. We'll explore these in the next stage!`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <UniversityDiscovery />
        )}
      </div>

      {/* AI Counsellor Chat Overlay */}
      {isAIChatOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-end justify-end p-6 lg:p-10 pointer-events-none">
          <div className="w-full max-w-md h-[600px] pointer-events-auto animate-in slide-in-from-bottom-5 duration-300">
            <div className="relative h-full">
              <button
                onClick={() => setIsAIChatOpen(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-gray-50 transition-all"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-5 h-5 text-gray-500"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <AICounsellor />
            </div>
          </div>
        </div>
      )}

      {/* Persistent AI Counsellor Button (Mobile/Floating) */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={() => setIsAIChatOpen(!isAIChatOpen)}
          className="bg-gray-900 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group"
        >
          <svg
            className="w-8 h-8 group-hover:animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
