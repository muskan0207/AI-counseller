import React from "react";

interface NavbarProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onGetStarted, onLogin }) => {
  return (
    <nav className="w-full relative rounded-[2rem] px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 flex items-center justify-between shadow-sm min-h-[68px]">
      {/* Glassmorphism Background SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1448 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <foreignObject x="-20" y="-20" width="1488" height="108">
          <div
            style={{
              backdropFilter: "blur(10px)",
              clipPath: "url(#bgblur_0_20_34_clip_path)",
              height: "100%",
              width: "100%",
            }}
          />
        </foreignObject>
        <g data-figma-bg-blur-radius="20">
          <rect
            width="1448"
            height="68"
            rx="24"
            fill="url(#paint0_linear_20_34)"
          />
          <rect
            x="0.5"
            y="0.5"
            width="1447"
            height="67"
            rx="23.5"
            stroke="url(#paint1_linear_20_34)"
            strokeOpacity="0.6"
          />
        </g>
        <defs>
          <clipPath id="bgblur_0_20_34_clip_path" transform="translate(20 20)">
            <rect width="1448" height="68" rx="24" />
          </clipPath>
          <linearGradient
            id="paint0_linear_20_34"
            x1="0"
            y1="1.37695"
            x2="30.0529"
            y2="245.71"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.5" />
            <stop offset="1" stopColor="white" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_20_34"
            x1="0"
            y1="0"
            x2="35.8892"
            y2="275.881"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
        </defs>
      </svg>

      {/* Logo */}
      <div className="text-text-primary font-bold text-lg tracking-tight relative z-10 cursor-pointer">
        AI Counsellor
      </div>

      {/* Navigation Links */}
      <div className="hidden sm:flex items-center gap-6 md:gap-12 relative z-10">
        <a
          href="#"
          className="text-gray-700 hover:text-black font-normal text-sm md:text-[15px] transition-colors"
        >
          Overview
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-black font-normal text-sm md:text-[15px] transition-colors"
        >
          Features
        </a>
        <button
          onClick={onLogin}
          className="text-gray-700 hover:text-black font-normal text-sm md:text-[15px] transition-colors cursor-pointer"
        >
          Login
        </button>
      </div>

      {/* Action */}
      <button
        onClick={onGetStarted}
        className="font-bold text-text-primary text-sm md:text-[15px] relative z-10 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all cursor-pointer"
      >
        Get Started
      </button>
    </nav>
  );
};
