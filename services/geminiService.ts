import { GoogleGenAI, Type, type FunctionDeclaration } from "@google/genai"
import {  type AppState,  type UserProfile } from "../src/types";

const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY || '' });

// Define tools for the AI Counselor
const shortlistUniversityTool: FunctionDeclaration = {
  name: 'shortlistUniversity',
  parameters: {
    type: Type.OBJECT,
    description: 'Add a university to the user\'s shortlist.',
    properties: {
      universityId: { type: Type.STRING, description: 'The ID of the university to shortlist.' },
    },
    required: ['universityId'],
  },
};

const lockUniversityTool: FunctionDeclaration = {
  name: 'lockUniversity',
  parameters: {
    type: Type.OBJECT,
    description: 'Commit to a specific university for the application phase.',
    properties: {
      universityId: { type: Type.STRING, description: 'The ID of the university to lock.' },
    },
    required: ['universityId'],
  },
};

const addTaskTool: FunctionDeclaration = {
  name: 'addTask',
  parameters: {
    type: Type.OBJECT,
    description: 'Add a new task to the user\'s to-do list.',
    properties: {
      task: { type: Type.STRING, description: 'The task description.' },
      category: { type: Type.STRING, enum: ['Profile', 'Exams', 'Applications', 'Documents'] },
    },
    required: ['task', 'category'],
  },
};

export const getAIResponse = async (userMessage: string, state: AppState) => {
  const model = 'gemini-3-flash-preview';
  
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
    - TAKE ACTIONS: Shortlist universities, Lock universities, or Add tasks when requested or appropriate.
    - Be encouraging but realistic.

    Available Universities to recommend:
    1: University of Toronto (Dream, Canada, High Cost)
    2: University of Waterloo (Target, Canada, Med Cost)
    3: York University (Safe, Canada, Med Cost)
    4: University of Melbourne (Dream, Australia, High Cost)

    Current Context: The user is at stage ${state.currentStage}. 
    - If at Stage 1, focus on profile building.
    - If at Stage 2, focus on discovery.
    - Stage 3 requires locking a university to unlock Stage 4 (Application guidance).
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: userMessage,
      config: {
        systemInstruction,
        tools: [{ functionDeclarations: [shortlistUniversityTool, lockUniversityTool, addTaskTool] }],
      },
    });

    return response;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
