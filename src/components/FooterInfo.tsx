import React from 'react';

export const FooterInfo: React.FC = () => {
  return (
    <div className="w-full relative rounded-[2rem] px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-sm min-h-[68px] gap-4 sm:gap-0">
      {/* Glassmorphism Background SVG */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 1448 68" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <foreignObject x="-20" y="-20" width="1488" height="108">
          <div xmlns="http://www.w3.org/1999/xhtml"
            style={{
              backdropFilter: 'blur(10px)',
              clipPath: 'url(#bgblur_footer_clip_path)',
              height: '100%',
              width: '100%'
            }}
          />
        </foreignObject>
        <g data-figma-bg-blur-radius="20">
          <rect width="1448" height="68" rx="24" fill="url(#paint0_linear_footer)"/>
          <rect x="0.5" y="0.5" width="1447" height="67" rx="23.5"
            stroke="url(#paint1_linear_footer)" strokeOpacity="0.6"/>
        </g>
        <defs>
          <clipPath id="bgblur_footer_clip_path" transform="translate(20 20)">
            <rect width="1448" height="68" rx="24"/>
          </clipPath>
          <linearGradient id="paint0_linear_footer" x1="0" y1="1.37695" x2="30.0529" y2="245.71" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.5"/>
            <stop offset="1" stopColor="white" stopOpacity="0.2"/>
          </linearGradient>
          <linearGradient id="paint1_linear_footer" x1="0" y1="0" x2="35.8892" y2="275.881" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white"/>
          </linearGradient>
        </defs>
      </svg>

      {/* Left Text */}
      <div className="text-gray-800 text-xs sm:text-sm md:text-[15px] font-light max-w-full sm:max-w-[60%] md:max-w-[45%] leading-relaxed relative z-10">
        Shortlist the <strong className="font-bold text-black">best university</strong> for you <strong className="font-bold text-black">with</strong> the help of an advanced, <strong className="font-bold text-black">trained AI model.</strong>
      </div>

      {/* Right Text */}
      <div className="text-gray-800 text-xs sm:text-sm md:text-[15px] font-light max-w-full sm:max-w-[35%] sm:text-right leading-relaxed relative z-10">
        Find the <strong className="font-bold text-black">best scholarship</strong> with us that suits you.
      </div>
    </div>
  );
};