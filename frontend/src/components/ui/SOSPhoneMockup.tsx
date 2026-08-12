"use client";
import React, { useEffect, useState } from "react";
import { MapPin, ShieldAlert, Lock, CheckCircle, Wifi, Battery, Signal, Users } from "lucide-react";

export const SOSPhoneMockup = () => {
  const [time, setTime] = useState("09:41");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
    };
    update();
    const iv = setInterval(update, 60000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="relative w-full max-w-[580px] mx-auto select-none">

      {/* ── Ambient glow ── */}
      <div className="absolute inset-0 top-16 bg-primary/10 blur-[80px] rounded-full pointer-events-none -z-10" />

      {/* ══════════════════════════════════
          Laptop Lid
      ══════════════════════════════════ */}
      <div
        className="relative rounded-t-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #222226 0%, #161618 100%)",
          border: "2px solid rgba(255,255,255,0.07)",
          borderBottom: "none",
          padding: "14px 14px 0",
          boxShadow: "0 -6px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
      >
        {/* Camera */}
        <div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#252528] border border-white/5" />

        {/* Screen */}
        <div className="rounded-t-xl overflow-hidden bg-[#0b0c10]" style={{ aspectRatio: "16/10" }}>
          <div className="flex flex-col h-full">

            {/* ── Menubar ── */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#0e0f13] border-b border-white/[0.06] shrink-0">
              {/* Traffic lights */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[11px] text-white/25 font-medium">Rakshak · Safety Platform</span>
              </div>
              {/* System icons */}
              <div className="flex items-center gap-2.5 text-white/30">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3 h-3" />
                <span className="text-[11px] font-semibold tabular-nums text-white/40">{time}</span>
              </div>
            </div>

            {/* ── App content ── */}
            <div className="flex-1 flex flex-col p-4 gap-3 overflow-hidden">

              {/* Header row */}
              <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center">
                    <ShieldAlert className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest leading-none">Command Center</p>
                    <p className="text-sm font-bold text-white leading-tight">Rakshak Dashboard</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-2.5 py-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[10px] text-green-400 font-semibold">Live · Protected</span>
                </div>
              </div>

              {/* ── Main grid: 3 stat pills + map + SOS ── */}
              <div className="flex-1 grid grid-cols-3 grid-rows-[auto_1fr] gap-3 min-h-0">

                {/* ── Stat cards (top row, span 2 cols, 3 cards in that space) ── */}
                <div className="col-span-2 grid grid-cols-3 gap-2">
                  {[
                    { icon: Users,        label: "Guardians",   value: "3",  color: "text-blue-400",   ring: "border-blue-400/20",   bg: "bg-blue-400/5"   },
                    { icon: CheckCircle,  label: "Status",      value: "OK", color: "text-green-400",  ring: "border-green-400/20",  bg: "bg-green-400/5"  },
                    { icon: Lock,         label: "Encrypted",   value: "On", color: "text-purple-400", ring: "border-purple-400/20", bg: "bg-purple-400/5" },
                  ].map((s, i) => (
                    <div key={i} className={`flex flex-col items-center justify-center rounded-xl border py-2.5 gap-1 ${s.bg} ${s.ring}`}>
                      <s.icon className={`w-4 h-4 ${s.color}`} />
                      <p className={`text-base font-black ${s.color} leading-none`}>{s.value}</p>
                      <p className="text-[9px] text-white/30 uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* SOS card (top-right, 1 col) */}
                <div className="row-span-2 bg-primary/5 border border-primary/20 rounded-xl flex flex-col items-center justify-center gap-3 p-3">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-14 h-14 rounded-full bg-primary/10 animate-ping [animation-duration:2.5s]" />
                    <div className="w-12 h-12 rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center shadow-[0_0_20px_rgba(225,29,46,0.3)] relative z-10">
                      <ShieldAlert className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-white text-xs font-bold">SOS</p>
                    <p className="text-white/25 text-[9px] mt-0.5">Hold to send</p>
                  </div>
                  <div className="w-full space-y-1.5 mt-1">
                    {[
                      { label: "Alert Guardians", color: "bg-primary/80" },
                      { label: "Anonymous Report", color: "bg-white/8" },
                    ].map((btn, i) => (
                      <div key={i} className={`w-full text-center py-1.5 rounded-lg text-[10px] font-semibold text-white cursor-pointer ${btn.color} border border-white/10 hover:brightness-110 transition-all`}>
                        {btn.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Map (bottom-left, 2 cols) ── */}
                <div className="col-span-2 bg-[#0a0b0f] border border-white/8 rounded-xl overflow-hidden relative">

                  {/* Map label */}
                  <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-3 py-1.5 bg-gradient-to-b from-[#0a0b0f]/95 to-transparent">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-2.5 h-2.5 text-primary" />
                      <span className="text-[9px] text-white/50 font-medium">Manav Rachna University, Faridabad</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[9px] text-green-400 font-semibold">Live</span>
                    </div>
                  </div>

                  {/* Map body */}
                  <div className="absolute inset-0">
                    {/* Dark map base */}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #101218 0%, #0c0e14 100%)" }} />

                    {/* Street grid */}
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      {/* Major roads */}
                      <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#252a3a" strokeWidth="4" />
                      <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#1e2230" strokeWidth="2" />
                      <line x1="35%" y1="0" x2="35%" y2="100%" stroke="#252a3a" strokeWidth="4" />
                      <line x1="65%" y1="0" x2="65%" y2="100%" stroke="#1e2230" strokeWidth="2" />
                      {/* Minor roads */}
                      {[20, 55, 85].map(y => (
                        <line key={`h${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#181c26" strokeWidth="1" />
                      ))}
                      {[15, 50, 80].map(x => (
                        <line key={`v${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#181c26" strokeWidth="1" />
                      ))}

                      {/* Buildings */}
                      {[
                        [5, 5, 25, 30], [5, 45, 25, 20], [5, 75, 25, 20],
                        [40, 5, 20, 30], [40, 45, 20, 20], [40, 75, 20, 20],
                        [70, 5, 25, 30], [70, 45, 25, 20], [70, 75, 25, 18],
                      ].map(([x, y, w, h], i) => (
                        <rect key={i} x={`${x}%`} y={`${y}%`} width={`${w}%`} height={`${h}%`}
                          fill="#1a1e2a" rx="2" opacity="0.7" />
                      ))}

                      {/* Park */}
                      <rect x="40%" y="45%" width="20%" height="20%" fill="#143020" rx="3" opacity="0.5" />
                      <text x="50%" y="57%" textAnchor="middle" fill="#1a5530" fontSize="7" fontFamily="sans-serif" opacity="0.8">Park</text>
                    </svg>

                    {/* Safe zone ring */}
                    <div className="absolute" style={{
                      left: "46%", top: "28%", width: "18%", height: "28%",
                      borderRadius: "50%",
                      border: "1px dashed rgba(225,29,46,0.25)",
                      background: "radial-gradient(circle, rgba(225,29,46,0.04) 0%, transparent 70%)"
                    }} />

                    {/* Location pin */}
                    <div className="absolute z-20 flex flex-col items-center" style={{ left: "53%", top: "38%", transform: "translate(-50%, -100%)" }}>
                      <div className="relative">
                        <div className="absolute inset-0 -m-2 rounded-full bg-primary/20 animate-ping [animation-duration:2s]" />
                        <div className="absolute inset-0 -m-1 rounded-full bg-primary/15 animate-ping [animation-duration:3s]" />
                        <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-[0_0_10px_rgba(225,29,46,0.8)] relative z-10 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        </div>
                      </div>
                      <div className="w-px h-2 bg-primary/80" />
                    </div>

                    {/* "You are here" tooltip */}
                    <div className="absolute z-20 bg-[#0e1018]/95 backdrop-blur-sm border border-primary/30 rounded-lg px-2 py-1 shadow-lg"
                      style={{ left: "55%", top: "20%", transform: "translateX(-50%)" }}>
                      <p className="text-[9px] text-primary font-bold whitespace-nowrap">You are here</p>
                    </div>

                    {/* Scale bar */}
                    <div className="absolute bottom-2 right-3 flex items-end gap-1 z-10">
                      <div className="flex flex-col items-center gap-px">
                        <div className="w-10 h-px bg-white/25" />
                        <span className="text-[8px] text-white/25">500 m</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Laptop Base ── */}
      <div
        className="h-3.5 rounded-b-xl relative"
        style={{
          background: "linear-gradient(to bottom, #1c1c20, #141416)",
          border: "2px solid rgba(255,255,255,0.06)",
          borderTop: "1px solid rgba(0,0,0,0.5)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        }}
      >
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/5 rounded-full" />
      </div>

      {/* Ground shadow */}
      <div className="mx-auto mt-1 h-2 w-3/4 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, transparent 70%)" }} />
    </div>
  );
};
