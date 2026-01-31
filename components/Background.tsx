
import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#0f172a] overflow-hidden">
      {/* Dynamic Animated Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-700/30 rounded-full blur-[120px] animate-pulse delay-700"></div>
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      
      {/* Subtle Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>
    </div>
  );
};

export default Background;
