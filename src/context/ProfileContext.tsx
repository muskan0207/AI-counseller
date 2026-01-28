import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { supabase } from "../lib/supabaseClient";

export interface University {
  id: string;
  name: string;
  location: string;
  type: "dream" | "target" | "safe";
  risk: "low" | "medium" | "high";
  cost: "low" | "medium" | "high";
  acceptanceChance: number;
}

export interface UserProfile {
  academic: {
    level: string;
    major: string;
    gradYear: string;
    gpa: string;
  };
  goals: {
    degree: string;
    field: string;
    intakeYear: string;
    countries: string[];
  };
  budget: {
    range: string;
    funding: string;
  };
  readiness: {
    exams: string;
    sopStatus: string;
  };
  isOnboarded: boolean;
  shortlistedUniversities: University[];
  lockedUniversityId: string | null;
}

interface ProfileContextType {
  profile: UserProfile;
  isLoading: boolean;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setAcademic: (updates: Partial<UserProfile["academic"]>) => void;
  setGoals: (updates: Partial<UserProfile["goals"]>) => void;
  setBudget: (updates: Partial<UserProfile["budget"]>) => void;
  setReadiness: (updates: Partial<UserProfile["readiness"]>) => void;
  shortlistUniversity: (uni: University) => void;
  lockUniversity: (id: string) => void;
}

const defaultProfile: UserProfile = {
  academic: { level: "", major: "", gradYear: "", gpa: "" },
  goals: { degree: "", field: "", intakeYear: "", countries: [] },
  budget: { range: "", funding: "" },
  readiness: { exams: "", sopStatus: "" },
  isOnboarded: false,
  shortlistedUniversities: [],
  lockedUniversityId: null,
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile on mount or auth change
  useEffect(() => {
    async function getProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile({
          academic: data.academic || defaultProfile.academic,
          goals: data.goals || defaultProfile.goals,
          budget: data.budget || defaultProfile.budget,
          readiness: data.readiness || defaultProfile.readiness,
          isOnboarded: data.is_onboarded ?? false,
          shortlistedUniversities: data.shortlisted_unis || [],
          lockedUniversityId: data.locked_uni_id || null,
        });
      }
      setIsLoading(false);
    }

    getProfile();
  }, []);

  // Sync to Supabase whenever profile changes
  useEffect(() => {
    if (isLoading) return;

    async function syncProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from("profiles").upsert({
        id: user.id,
        academic: profile.academic,
        goals: profile.goals,
        budget: profile.budget,
        readiness: profile.readiness,
        is_onboarded: profile.isOnboarded,
        shortlisted_unis: profile.shortlistedUniversities,
        locked_uni_id: profile.lockedUniversityId,
      });
    }

    const timer = setTimeout(syncProfile, 500); // Debounce
    return () => clearTimeout(timer);
  }, [profile, isLoading]);

  // Actions
  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const setAcademic = (updates: Partial<UserProfile["academic"]>) => {
    setProfile((prev) => ({
      ...prev,
      academic: { ...prev.academic, ...updates },
    }));
  };

  const setGoals = (updates: Partial<UserProfile["goals"]>) => {
    setProfile((prev) => ({ ...prev, goals: { ...prev.goals, ...updates } }));
  };

  const setBudget = (updates: Partial<UserProfile["budget"]>) => {
    setProfile((prev) => ({ ...prev, budget: { ...prev.budget, ...updates } }));
  };

  const setReadiness = (updates: Partial<UserProfile["readiness"]>) => {
    setProfile((prev) => ({
      ...prev,
      readiness: { ...prev.readiness, ...updates },
    }));
  };

  const shortlistUniversity = (uni: University) => {
    setProfile((prev) => {
      if (prev.shortlistedUniversities.find((u) => u.id === uni.id))
        return prev;
      return {
        ...prev,
        shortlistedUniversities: [...prev.shortlistedUniversities, uni],
      };
    });
  };

  const lockUniversity = (id: string) => {
    setProfile((prev) => ({ ...prev, lockedUniversityId: id }));
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        isLoading,
        updateProfile,
        setAcademic,
        setGoals,
        setBudget,
        setReadiness,
        shortlistUniversity,
        lockUniversity,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
