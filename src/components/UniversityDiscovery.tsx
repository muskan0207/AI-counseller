import React from "react";
import { useProfile } from "../context/ProfileContext";
import type { University } from "../context/ProfileContext";

export const MOCK_UNIVERSITIES: University[] = [
  {
    id: "1",
    name: "University of Oxford",
    location: "UK",
    type: "dream",
    risk: "high",
    cost: "high",
    acceptanceChance: 8,
  },
  {
    id: "2",
    name: "University of Toronto",
    location: "Canada",
    type: "target",
    risk: "medium",
    cost: "medium",
    acceptanceChance: 45,
  },
  {
    id: "3",
    name: "Arizona State University",
    location: "USA",
    type: "safe",
    risk: "low",
    cost: "low",
    acceptanceChance: 85,
  },
  {
    id: "4",
    name: "Stanford University",
    location: "USA",
    type: "dream",
    risk: "high",
    cost: "high",
    acceptanceChance: 5,
  },
  {
    id: "5",
    name: "National University of Singapore",
    location: "Singapore",
    type: "target",
    risk: "medium",
    cost: "low",
    acceptanceChance: 25,
  },
  {
    id: "6",
    name: "University of Melbourne",
    location: "Australia",
    type: "safe",
    risk: "low",
    cost: "medium",
    acceptanceChance: 70,
  },
];

export const UniversityDiscovery: React.FC = () => {
  const { profile, shortlistUniversity, lockUniversity } = useProfile();

  // Simple filtering based on preferred countries (from profile)
  const filteredUniversities = MOCK_UNIVERSITIES.filter(
    (uni) =>
      profile.goals.countries.length === 0 ||
      profile.goals.countries.some((country) =>
        uni.location.toLowerCase().includes(country.toLowerCase()),
      ),
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            University Discovery
          </h2>
          <p className="text-sm text-gray-500">
            Based on your preference for{" "}
            {profile.goals.countries.join(", ") || "Global"}
          </p>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-white border border-gray-200">
            GPA: {profile.academic.gpa}
          </span>
          <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-white border border-gray-200">
            Budget: {profile.budget.range}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map((uni) => {
          const isShortlisted = profile.shortlistedUniversities.some(
            (u) => u.id === uni.id,
          );
          const isLocked = profile.lockedUniversityId === uni.id;

          return (
            <div
              key={uni.id}
              className={`bg-white rounded-3xl p-6 border ${isLocked ? "border-blue-500 ring-4 ring-blue-50" : "border-gray-100"} shadow-sm flex flex-col hover:shadow-md transition-all`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    {uni.name}
                  </h3>
                  <p className="text-xs text-gray-400">{uni.location}</p>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg ${
                    uni.type === "dream"
                      ? "bg-purple-100 text-purple-700"
                      : uni.type === "target"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {uni.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold mb-0.5">
                    Acceptance
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {uni.acceptanceChance}%
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold mb-0.5">
                    Risk Level
                  </p>
                  <p
                    className={`text-sm font-bold capitalize ${
                      uni.risk === "high"
                        ? "text-red-500"
                        : uni.risk === "medium"
                          ? "text-yellow-600"
                          : "text-green-600"
                    }`}
                  >
                    {uni.risk}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold mb-0.5">
                    Cost
                  </p>
                  <p className="text-sm font-bold text-gray-800 capitalize">
                    {uni.cost}
                  </p>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-2">
                {!isShortlisted ? (
                  <button
                    onClick={() => shortlistUniversity(uni)}
                    className="w-full py-2 rounded-xl bg-gray-50 text-gray-700 text-xs font-bold hover:bg-black hover:text-white transition-all border border-gray-200"
                  >
                    Shortlist University
                  </button>
                ) : (
                  <>
                    <div className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="w-3.5 h-3.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Shortlisted
                    </div>
                    <button
                      onClick={() => lockUniversity(uni.id)}
                      disabled={isLocked}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                        isLocked
                          ? "bg-blue-600 text-white cursor-default"
                          : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white"
                      }`}
                    >
                      {isLocked ? "University Locked" : "Confirm & Lock"}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredUniversities.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
          <p className="text-gray-500">
            No universities found for your preferences. Try updating your
            profile countries!
          </p>
        </div>
      )}
    </div>
  );
};
