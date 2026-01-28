import React, { useState, useEffect, useRef } from "react";
import { useProfile } from "../context/ProfileContext";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

export const AICounsellor: React.FC = () => {
  const { profile } = useProfile();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial Greeting
    if (messages.length === 0) {
      setMessages([
        {
          id: "1",
          type: "ai",
          content: `Hello! I've analyzed your profile. Since you're targeting a ${profile.goals.degree} in ${profile.academic.major} for ${profile.goals.intakeYear}, I can help you shortlist universities or evaluate your current readiness. What would you like to start with?`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [profile]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulated AI Reasoning
    setTimeout(() => {
      const aiResponseContent = getMockAIResponse(input, profile);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponseContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold italic text-xs">
          AI
        </div>
        <div>
          <h2 className="text-sm font-bold text-gray-900">AI Counsellor</h2>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <p className="text-[10px] text-gray-500">Online & Reasoning</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                m.type === "user"
                  ? "bg-blue-600 text-white rounded-tr-none shadow-md"
                  : "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200"
              }`}
            >
              {m.content}
              <p
                className={`text-[10px] mt-1 opacity-50 ${m.type === "user" ? "text-right" : "text-left"}`}
              >
                {m.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-2xl animate-pulse flex gap-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75" />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100">
        <div className="relative">
          <input
            type="text"
            className="w-full pl-4 pr-12 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Ask about universities, risks, or next steps..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all disabled:opacity-50 disabled:bg-gray-400"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-2">
          The AI uses your{" "}
          <span className="font-bold underline">Profile Data</span> to provide
          tailored advice.
        </p>
      </div>
    </div>
  );
};

// Simplified Mock Reasoning Engine
function getMockAIResponse(input: string, profile: any): string {
  const query = input.toLowerCase();

  if (
    query.includes("university") ||
    query.includes("shortlist") ||
    query.includes("recommend")
  ) {
    return `Based on your GPA of ${profile.academic.gpa} and your target for ${profile.goals.countries.join(", ")}, I've shortlisted 3 universities for you: 1. Stanford (Dream), 2. University of Toronto (Target), and 3. ASU (Safe). You can view them in the Discovery tab!`;
  }

  if (query.includes("risk") || query.includes("fit")) {
    return `Looking at your profile, your main strength is your academic record. The main risk is your ${profile.readiness.sopStatus === "not_started" ? "missing Statement of Purpose (SOP)" : "current SOP draft"}. Most ${profile.goals.countries[0]} universities require a finalized SOP by year-end for the ${profile.goals.intakeYear} intake.`;
  }

  if (
    query.includes("action") ||
    query.includes("task") ||
    query.includes("todo")
  ) {
    return `I've updated your to-do list with a new task: "Finalize SOP for ${profile.goals.countries[0]} Applications". This is crucial for your next stage.`;
  }

  return "I understand. I'm here to guide your study-abroad journey. We can talk about university fits, application risks, or your specific to-do list. What's on your mind?";
}
