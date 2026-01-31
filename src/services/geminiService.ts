import { GoogleGenerativeAI } from "@google/generative-ai";
import  type { AppState, UserProfile } from "../types";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export const getAIResponse = async (userMessage: string, state: AppState) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const systemInstruction = `
    You are a professional Study Abroad Counsellor. 
    Current User Profile: ${JSON.stringify(state.profile)}
    Current Stage: ${state.currentStage}
    Shortlisted Universities: ${JSON.stringify(state.shortlistedUniversities)}
    Locked Universities: ${JSON.stringify(state.lockedUniversityIds)}

    Your Goal:
    - Guide students step-by-step from confusion to clarity.
    - Explain profile strengths and gaps (e.g., "Your GPA is strong, but you need higher IELTS for Dream unis").
    - Recommend universities (Dream, Target, Safe) based on profile, budget, and preference.
    - Be encouraging but realistic.

    Available Universities to recommend:
    1: University of Toronto (Dream, Canada, High Cost)
    2: University of Waterloo (Target, Canada, Med Cost)
    3: York University (Safe, Canada, Med Cost)
    4: University of Melbourne (Dream, Australia, High Cost)

    Current Context: The user is at stage ${state.currentStage}.
  `;

  try {
    const result = await model.generateContent(systemInstruction + "\n\nUser: " + userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};
