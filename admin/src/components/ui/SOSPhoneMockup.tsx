import React from "react";
import { MapPin, MessageSquare, AlertTriangle, LifeBuoy } from "lucide-react";

export const SOSPhoneMockup = () => {
  return (
    <div className="relative mx-auto w-[300px] h-[600px] bg-black rounded-[40px] border-[8px] border-gray-900 shadow-2xl overflow-hidden shadow-[0_0_50px_rgba(225,29,46,0.2)]">
      {/* Top Notch */}
      <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-xl w-32 mx-auto z-20"></div>
      
      {/* Phone Screen UI */}
      <div className="relative h-full w-full bg-[#0d1220] flex flex-col items-center justify-between py-12 px-6">
        
        {/* Top Status */}
        <div className="w-full text-center space-y-2 mt-4 z-10">
          <div className="flex justify-center items-center gap-2 text-primary font-medium">
            <MapPin className="h-4 w-4 animate-pulse" />
            <span className="text-sm">Location Active</span>
          </div>
          <h3 className="text-white font-heading font-semibold text-lg">Emergency Mode</h3>
        </div>

        {/* 3D Rotating Background Logo */}
        <div className="absolute inset-0 m-auto w-full h-full flex items-center justify-center opacity-20 pointer-events-none perspective-1000">
          <div className="w-48 h-48 animate-[spin_10s_linear_infinite] [transform-style:preserve-3d]">
            <img src="/logo.png" alt="Aegivon Logo" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Message Area instead of SOS */}
        <div className="relative flex flex-col items-center justify-center w-full my-auto z-10 px-4 space-y-6">
          <h2 className="text-white font-heading font-bold text-2xl text-center leading-tight">
            Security and your safety with Rakshak
          </h2>
          <div className="px-6 py-2 bg-primary/20 border border-primary/50 rounded-full">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">Coming Soon as Rakshak</span>
          </div>
        </div>
        
        <p className="text-center text-sm text-secondary mb-8 z-10">Help is on the way</p>

        {/* Bottom Nav */}
        <div className="w-full grid grid-cols-3 gap-2 bg-[#0a0e17]/80 backdrop-blur-md p-4 rounded-2xl border border-white/5 z-10">
          <div className="flex flex-col items-center gap-1 opacity-70">
            <AlertTriangle className="h-5 w-5 text-secondary" />
            <span className="text-[10px] text-secondary">Report</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-70">
            <MessageSquare className="h-5 w-5 text-secondary" />
            <span className="text-[10px] text-secondary">Chat</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-70">
            <LifeBuoy className="h-5 w-5 text-secondary" />
            <span className="text-[10px] text-secondary">Help</span>
          </div>
        </div>

      </div>
      
      {/* Background glow radiating from behind phone */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 blur-[100px] -z-10 rounded-full"></div>
    </div>
  );
};
