import React, { useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { BackgroundMap } from "./BackgroundMap";

export const Onboarding: React.FC = () => {
  const {
    profile,
    setAcademic,
    setGoals,
    setBudget,
    setReadiness,
    updateProfile,
  } = useProfile();
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    updateProfile({ isOnboarded: true });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              Academic Background
            </h2>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Current Education Level
              </label>
              <select
                className="w-full px-3 py-2 bg-white/20 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={profile.academic.level}
                onChange={(e) => setAcademic({ level: e.target.value })}
              >
                <option value="">Select Level</option>
                <option value="highschool">High School</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Major / Field of Study
              </label>
              <input
                type="text"
                placeholder="e.g. Computer Science"
                className="w-full px-3 py-2 bg-white/20 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={profile.academic.major}
                onChange={(e) => setAcademic({ major: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Graduation Year
                </label>
                <input
                  type="text"
                  placeholder="2024"
                  className="w-full px-3 py-2 bg-white/20 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={profile.academic.gradYear}
                  onChange={(e) => setAcademic({ gradYear: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  GPA / Percentage
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3.8 or 85%"
                  className="w-full px-3 py-2 bg-white/20 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={profile.academic.gpa}
                  onChange={(e) => setAcademic({ gpa: e.target.value })}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Study Goals</h2>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Intended Degree
              </label>
              <select
                className="w-full px-3 py-2 bg-white/20 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={profile.goals.degree}
                onChange={(e) => setGoals({ degree: e.target.value })}
              >
                <option value="">Select Degree</option>
                <option value="bachelors">Bachelor's</option>
                <option value="masters">Master's</option>
                <option value="mba">MBA</option>
                <option value="phd">PhD</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Preferred Countries (comma separated)
              </label>
              <input
                type="text"
                placeholder="USA, UK, Canada"
                className="w-full px-3 py-2 bg-white/20 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={profile.goals.countries.join(", ")}
                onChange={(e) =>
                  setGoals({
                    countries: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Target Intake Year
              </label>
              <input
                type="text"
                placeholder="2025"
                className="w-full px-3 py-2 bg-white/20 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={profile.goals.intakeYear}
                onChange={(e) => setGoals({ intakeYear: e.target.value })}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              Budget & Funding
            </h2>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Budget Range (Per Year)
              </label>
              <select
                className="w-full px-3 py-2 bg-white/20 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={profile.budget.range}
                onChange={(e) => setBudget({ range: e.target.value })}
              >
                <option value="">Select Range</option>
                <option value="low">Under $20k</option>
                <option value="medium">$20k - $50k</option>
                <option value="high">$50k+</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Funding Plan
              </label>
              <select
                className="w-full px-3 py-2 bg-white/20 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={profile.budget.funding}
                onChange={(e) => setBudget({ funding: e.target.value })}
              >
                <option value="">Select Funding</option>
                <option value="self">Self-funded</option>
                <option value="scholarship">Scholarship-dependent</option>
                <option value="loan">Loan-dependent</option>
              </select>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              Exams & Readiness
            </h2>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Exams Taken / Planned
              </label>
              <input
                type="text"
                placeholder="IELTS: 7.5, GRE: 320"
                className="w-full px-3 py-2 bg-white/20 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={profile.readiness.exams}
                onChange={(e) => setReadiness({ exams: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                SOP Status
              </label>
              <select
                className="w-full px-3 py-2 bg-white/20 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={profile.readiness.sopStatus}
                onChange={(e) => setReadiness({ sopStatus: e.target.value })}
              >
                <option value="not_started">Not Started</option>
                <option value="draft">In Progress / Draft</option>
                <option value="ready">Completed / Ready</option>
              </select>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl text-blue-800 text-xs">
              <p className="font-bold mb-1">Why is this mandatory?</p>
              Your AI Counsellor needs this data to provide accurate university
              recommendations and risks.
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <BackgroundMap />
      </div>

      <div className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white p-8 z-10 w-full max-w-md">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Step {step} of 4
            </span>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1 w-8 rounded-full ${i <= step ? "bg-blue-600" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Complete Profile
          </h1>
        </div>

        {renderStep()}

        <div className="mt-10 flex gap-4">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 px-6 py-3 rounded-2xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-white/50 transition-all"
            >
              Back
            </button>
          )}
          <button
            onClick={step === 4 ? handleSubmit : handleNext}
            className="flex-[2] px-6 py-3 rounded-2xl bg-gray-900 text-white font-bold text-sm hover:bg-black transition-all shadow-lg"
          >
            {step === 4 ? "Finish & Unlock AI" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};
