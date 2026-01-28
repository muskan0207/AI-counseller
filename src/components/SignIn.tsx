import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { map } from "../assets";

interface SignInProps {
  onBack?: () => void;
  onSignInSuccess?: () => void;
  onSignUpClick?: () => void;
}

export const SignIn: React.FC<SignInProps> = ({
  onBack,
  onSignInSuccess,
  onSignUpClick,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    keepLoggedIn: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { data, error: signInError } = await supabase.auth.signInWithPassword(
      {
        email: formData.email,
        password: formData.password,
      },
    );

    setIsLoading(false);

    if (signInError) {
      setError(signInError.message);
    } else if (data.user) {
      onSignInSuccess?.();
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center bg-bg font-sans selection:bg-gray-200 py-10">
      {/* Background World Map */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-20">
        <img
          src={map}
          alt="world map"
          className="w-full h-full object-cover animate-pulse"
        />
      </div>

      <div className="relative z-10 w-full max-w-[450px] p-8 md:p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] shadow-2xl">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 transition-all group"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform"
          >
            <path d="M19 12H5m0 0l7 7m-7-7l7-7" />
          </svg>
          Back to landing
        </button>

        <h1 className="text-[32px] font-bold text-gray-900 mb-2">Sign In</h1>
        <p className="text-sm text-gray-400 mb-8">
          Enter your email and password to sign in!
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-100 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email*
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="mail@simmmmple.com"
              className="w-full px-3 py-2 bg-white/5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Password*
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Min. 8 characters"
                className="w-full px-3 py-2 bg-white/5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-sm"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="keepLoggedIn"
                checked={formData.keepLoggedIn}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                id="keep"
              />
              <label htmlFor="keep" className="text-xs text-gray-400">
                Keep me logged in
              </label>
            </div>
            <button
              type="button"
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gray-900 text-white rounded-[20px] font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg disabled:opacity-50 disabled:scale-100"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Not registered yet?{" "}
            <button
              onClick={onSignUpClick}
              className="text-blue-600 font-bold hover:underline"
            >
              Create an Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
