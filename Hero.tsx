import React from 'react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-[-2vh] relative">
      {/* Blurred background SVG */}
      <svg 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full h-auto z-0"
        width="830" 
        height="410" 
        viewBox="0 0 830 410" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_20_22)">
          <path d="M57.5525 72.2086C59.4645 69.2753 59.4706 68.0838 58.9125 67.6948C54.7093 69.1454 57.8443 66.9504 58.9125 67.6948C60.9254 67.0002 64.6211 65.4695 71.0327 62.3795C112.533 42.3794 97.2454 55.3139 112.533 48.8798C127.82 42.4458 139.635 46.328 158.533 42.3794C177.43 38.4307 212.892 47.6003 228.533 44.8796C244.173 42.1589 270.392 46.1223 302.533 44.8796C334.674 43.6369 373.339 39.7176 437.533 42.3795C501.726 45.0414 510.965 38.166 553.033 42.3794C607.367 47.8213 606.056 23.0698 612.533 42.3794C616.308 53.6344 689.701 17.4162 663.533 42.3794C626.408 77.7951 678.65 40.3717 696.658 48.8794C738.03 68.4254 757.158 53.1364 762.033 62.3794C767.989 73.6721 781.784 87.3466 789.879 94.7507C789.93 94.7934 789.981 94.8363 790.033 94.8794C799.485 102.784 796.715 101.004 789.879 94.7507C760.544 70.281 786.205 109.473 783.533 133.879C780.828 158.583 769.922 176.162 762.343 188.379L762.033 188.879C748.843 210.146 736.998 218.729 724.225 231.737C715.629 240.491 677.886 243.629 659.533 254.879C644.734 263.951 590.416 252.21 560.033 268.379C546.88 275.379 556.696 296.247 529.033 306.534C511.013 313.235 537.982 355.232 515.533 359.879C481.896 366.843 461.629 372.235 437.533 373.705C418.319 374.878 379.049 379.529 337.533 373.705C296.017 367.882 326.372 305.879 296.033 297.695C265.693 289.511 226.07 265.255 213.533 258.879C186.466 245.116 109.1 250.046 90.0328 231.737C66.5903 209.225 61.957 220.512 57.5524 203.879C53.6901 189.294 47.6066 182.117 40.0328 164.271C24.0616 129.645 42.2386 128.16 40.0326 108.379C39.2826 96.8496 56.0818 88.6798 57.5525 72.2086Z" fill="#F1F0F1"/>
        </g>
        <defs>
          <filter id="filter0_f_20_22" x="-0.0000991821" y="0.000389099" width="829.513" height="409.974" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="16.7" result="effect1_foregroundBlur_20_22"/>
          </filter>
        </defs>
      </svg>

      {/* Main Heading */}
      <h1 className="text-6xl md:text-7xl lg:text-[7rem] font-bold text-text-secondary tracking-tight leading-none mb-4 relative z-10">
        AI Counsellor
      </h1>

      {/* Subheading */}
      <p className="text-text-tertiary text-lg md:text-2xl font-light max-w-2xl leading-relaxed mb-12 relative z-10">
        We take responsibility to help you achieve your goals.
      </p>

      {/* CTA Button */}
      <button 
        onClick={onGetStarted}
        className="
        relative z-10
        px-10 py-3.5
        rounded-full
        font-bold text-text-primary text-base
        bg-gradient-to-b from-[#F7F7F7] to-[#E3E3E3]
        border border-white/40
        shadow-[0_4px_10px_-2px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)]
        hover:shadow-[0_6px_12px_-2px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,1)]
        active:scale-[0.98]
        transition-all duration-200
      ">
        Get Started
      </button>
    </div>
  );
};