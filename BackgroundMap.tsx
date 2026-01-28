import React from 'react';

export const BackgroundMap: React.FC = () => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* 
        Container for the sliding background.
        Width is 200% to hold two copies of the image.
        Animation moves it to the left by 50% (one image width) to create the loop.
      */}
      <div className="flex w-[200%] h-full animate-scroll will-change-transform">
        {/* First copy of the map */}
        <div 
          className="w-1/2 h-full bg-gray-200"
          style={{ 
            backgroundImage: "url('/world-map-transparent.png')",
            backgroundSize: '120%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.4
          }}
        ></div>
        {/* Second copy of the map for seamless looping */}
        <div 
          className="w-1/2 h-full bg-gray-200"
          style={{ 
            backgroundImage: "url('/world-map-transparent.png')",
            backgroundSize: '120%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.4
          }}
        ></div>
      </div>
    </div>
  );
};