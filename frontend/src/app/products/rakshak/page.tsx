"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { GlassCard } from "@/components/ui/Cards";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import { SOSPhoneMockup } from "@/components/ui/SOSPhoneMockup";
import Link from "next/link";
import {
  EyeOff, BellRing, Scale, HeartHandshake, LayoutDashboard, Search,
  ShieldCheck, Building2, Briefcase, Landmark, CheckCircle2, Network,
  Award, ArrowRight, Rocket, FlaskConical, Flag, Maximize2, TestTube2,
  ScanSearch, Lightbulb, CheckSquare
} from "lucide-react";

// ─── Sub-nav config ────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Overview",      id: "overview"     },
  { label: "Capabilities",  id: "features"     },
  { label: "Roadmap",       id: "roadmap"      },
  { label: "Technology",    id: "technology"   },
  { label: "Journey",       id: "journey"      },
  { label: "Get Involved",  id: "get-involved" },
];

// ─── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1500, shouldStart: boolean = false, reducedMotion: boolean = false) {
  const [count, setCount] = useState(reducedMotion || !shouldStart ? target : 0);
  useEffect(() => {
    if (!shouldStart || reducedMotion) { setCount(target); return; }
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [shouldStart, target, duration, reducedMotion]);
  return count;
}

// ─── Sticky Sub-Nav ────────────────────────────────────────────────────────────
function SubNav({ activeId }: { activeId: string }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 120; // navbar + subnav height
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="sticky top-[70px] z-40 bg-[#0a0008]/90 backdrop-blur-md border-b border-primary/20 shadow-[0_2px_20px_rgba(225,29,46,0.15)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide gap-1 py-2">
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200
                ${activeId === id
                  ? "bg-primary text-white shadow-[0_0_12px_rgba(225,29,46,0.5)]"
                  : "text-white/50 hover:text-white hover:bg-white/10"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Animated timeline line ────────────────────────────────────────────────────
function TimelineLine({ progress }: { progress: number }) {
  return (
    <svg className="absolute left-4 md:left-1/2 top-0 bottom-0 h-full w-2 md:-translate-x-1/2" style={{ overflow: "visible" }}>
      {/* Background track */}
      <line x1="4" y1="0" x2="4" y2="100%" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
      {/* Animated gradient fill */}
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00C2FF" />
          <stop offset="50%" stopColor="#e11d2e" />
          <stop offset="100%" stopColor="#e11d2e" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <line
        x1="4" y1="0" x2="4" y2={`${progress * 100}%`}
        stroke="url(#lineGrad)" strokeWidth="3"
        strokeLinecap="round"
        style={{ transition: "all 0.1s ease-out", filter: "drop-shadow(0 0 6px rgba(225,29,46,0.8))" }}
      />
    </svg>
  );
}

// ─── Phase icons ───────────────────────────────────────────────────────────────
const PHASE_ICONS = [Lightbulb, ScanSearch, FlaskConical, Rocket, TestTube2, Flag, Maximize2];
const PHASE_LABELS: Record<string, string> = {
  "Completed":   "Done",
  "In Progress": "YOU ARE HERE",
  "Upcoming":    "Upcoming",
  "Planned":     "Planned",
  "Long-Term":   "Long-Term",
};

export default function RakshakProduct() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  // ── Scrollspy ──
  const [activeId, setActiveId] = useState("overview");
  const [showSubNav, setShowSubNav] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("overview");
    const onScroll = () => {
      const scrollY = window.scrollY;
      setShowSubNav(scrollY > 200);

      // Find which section is active
      let current = "overview";
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Timeline progress ──
  const timelineRef = useRef<HTMLDivElement>(null);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const visibleHeight = window.innerHeight - rect.top;
      const totalHeight = rect.height;
      const progress = Math.min(Math.max(visibleHeight / (totalHeight + window.innerHeight * 0.3), 0), 1);
      setLineProgress(shouldReduceMotion ? 1 : progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldReduceMotion]);

  // ── Stats count-up ──
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const stat300 = useCountUp(300, 1400, statsInView, shouldReduceMotion);

  // ─── Data ──────────────────────────────────────────────────────────────────
  const intendedEnvironments = [
    {
      id: "colleges", title: "Designed for Education", icon: Building2,
      desc: "Campuses need modern safety tools. Rakshak aims to provide students and faculty with anonymous reporting and mental health support interfaces.",
      features: ["Anonymous Harassment Reporting", "Student Mental Health Support", "Campus Security SOS", "Live Incident Dashboard"]
    },
    {
      id: "corporates", title: "Designed for Workplaces", icon: Briefcase,
      desc: "Our vision for corporate compliance and safety, enabling seamless workplace incident reporting and rapid response to medical emergencies.",
      features: ["Workplace Incident Reporting", "Employee Safety Compliance", "Corporate Security Dashboard", "Automated Logging"]
    },
    {
      id: "government", title: "Vision for Smart Cities", icon: Landmark,
      desc: "Exploring integrations for next-generation public safety infrastructure to enhance law-enforcement coordination and incident tracking.",
      features: ["Smart-City Integration", "Public Safety Infrastructure", "Law-Enforcement Coordination", "City-Wide Analytics"]
    }
  ];

  const timelinePhases = [
    { phase: "Phase 1", title: "Ideation & Problem Discovery", status: "Completed",   desc: "Identified critical gaps in existing campus and corporate safety infrastructure." },
    { phase: "Phase 2", title: "System Architecture Design",   status: "Completed",   desc: "Designed the event-driven architecture and encrypted communication protocols." },
    { phase: "Phase 3", title: "Intellectual Property",        status: "Completed",   desc: "Filed Patent Application (202611074299 A) covering core anonymization workflows." },
    { phase: "Phase 4", title: "MVP Core Features",            status: "In Progress", desc: "Actively developing real-time SOS, anonymous reporting, and admin dashboard." },
    { phase: "Phase 5", title: "Internal Testing",             status: "Upcoming",    desc: "Rigorous security and load testing of the core infrastructure." },
    { phase: "Phase 6", title: "Closed Beta Validation",       status: "Planned",     desc: "Deploying to select academic institutions for real-world feedback." },
    { phase: "Phase 7", title: "Public Launch v1.0",           status: "Long-Term",   desc: "General availability for organizations nationwide." },
  ];

  const features = [
    { icon: EyeOff,          title: "Anonymous Reporting",    desc: "Report incidents safely & confidentially",    status: "In Development", color: "text-blue-400   bg-blue-400/10   border-blue-400/30"   },
    { icon: BellRing,        title: "SOS Emergency Alert",    desc: "One-tap SOS with live location sharing",      status: "Prototype",      color: "text-green-400  bg-green-400/10  border-green-400/30"  },
    { icon: LayoutDashboard, title: "Live Incident Dashboard",desc: "Admin monitoring & response interface",        status: "In Development", color: "text-blue-400   bg-blue-400/10   border-blue-400/30"   },
    { icon: Scale,           title: "AI Legal Assistant",     desc: "Guidance on laws, rights & procedures",       status: "Concept",        color: "text-purple-400 bg-purple-400/10 border-purple-400/30" },
    { icon: HeartHandshake,  title: "Mental Health Support",  desc: "AI chatbot for emotional counseling",         status: "Planned",        color: "text-orange-400 bg-orange-400/10 border-orange-400/30" },
    { icon: Search,          title: "Digital Forensics",      desc: "Automated DFIR & evidence handling",          status: "Planned",        color: "text-orange-400 bg-orange-400/10 border-orange-400/30" },
  ];

  const techStack = [
    { title: "Frontend Client",    items: "Next.js 14, React, Tailwind CSS, Framer Motion" },
    { title: "Backend Services",   items: "Node.js, Express, WebSockets for real-time SOS" },
    { title: "Database Layer",     items: "PostgreSQL (Relational), Redis (Pub/Sub & Caching)" },
    { title: "AI/ML (Research)",   items: "Python, Open-source LLMs for NLP parsing" },
    { title: "Infrastructure",     items: "Docker, Vercel/AWS, GitHub Actions CI/CD" },
    { title: "Security Protocols", items: "JWT Auth, bcrypt, Planned E2E Encryption" },
  ];

  const fadeUp = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.08 } },
  };

  return (
    <div className="flex flex-col w-full theme-red text-[var(--foreground)] min-h-screen relative">

      {/* ── Sticky sub-nav ── */}
      <div className={`transition-all duration-300 ${showSubNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <SubNav activeId={activeId} />
      </div>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section id="overview" className="relative pt-32 pb-20 overflow-hidden border-b border-white/5">
        {/* Glow blob */}
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

        <SectionWrapper className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={stagger}
              className="space-y-6"
            >
              <motion.div variants={fadeUp}>
                <span className="inline-block px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-black tracking-widest uppercase shadow-[0_0_12px_rgba(225,29,46,0.2)]">
                  BUILDING / MVP STAGE
                </span>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(225,29,46,0.3)]">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-5xl md:text-6xl font-heading font-black uppercase tracking-widest text-white">
                  RAKSHAK
                </h1>
              </motion.div>

              <motion.h2 variants={fadeUp} className="text-2xl font-heading font-semibold text-white/70">
                Safety Reimagined.
              </motion.h2>

              <motion.p variants={fadeUp} className="text-lg text-secondary leading-relaxed max-w-xl">
                An intelligent safety platform in active development, designed to help organizations create more responsive, accessible and technology-driven safety systems.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
                <Link href="#features" onClick={(e) => { e.preventDefault(); document.getElementById("features")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>
                  <PrimaryButton className="flex items-center gap-2">
                    Explore Capabilities <ArrowRight className="w-4 h-4" />
                  </PrimaryButton>
                </Link>
                <Link href="/contact">
                  <SecondaryButton>Partner With Us</SecondaryButton>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <SOSPhoneMockup />
            </motion.div>
          </div>
        </SectionWrapper>
      </section>

      {/* ══════════════════════════════════════════
          2. WHY RAKSHAK MATTERS
      ══════════════════════════════════════════ */}
      <section id="why" className="py-20">
        <SectionWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Why Rakshak Matters</h2>
              <p className="text-secondary text-lg leading-relaxed mb-5">
                Current safety reporting systems are fragmented, slow, and often discourage victims from coming forward due to fear of retaliation. We recognized a desperate need for a system that puts privacy and speed first.
              </p>
              <p className="text-secondary text-lg leading-relaxed">
                Rakshak is our answer—a unified platform that bridges the gap between individuals in distress and those equipped to help, utilizing modern tech to ensure every voice is heard safely.
              </p>
            </motion.div>

            {/* Stats grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              {[
                { value: `${stat300}%`, label: "Increase in reporting with anonymity", accent: true },
                { value: "< 1s",        label: "Target latency for SOS routing",       accent: false },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`bg-white/5 border rounded-2xl p-6 text-center relative overflow-hidden ${
                    s.accent ? "border-primary/30" : "border-white/10"
                  }`}
                >
                  {s.accent && <div className="absolute inset-0 bg-primary/5 rounded-2xl" />}
                  <div className={`text-3xl font-heading font-black mb-2 relative z-10 ${s.accent ? "text-primary" : "text-accent"}`}>
                    {s.value}
                  </div>
                  <p className="text-xs text-secondary uppercase tracking-wider relative z-10">{s.label}</p>
                </motion.div>
              ))}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="col-span-2 bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center"
              >
                <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="text-lg font-heading font-bold text-white mb-1">Built for Resilience</h4>
                <p className="text-sm text-secondary">Operating securely even in high-stress scenarios.</p>
              </motion.div>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ══════════════════════════════════════════
          3. IP BANNER
      ══════════════════════════════════════════ */}
      <section className="border-y border-primary/20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 py-12 relative overflow-hidden">
        {/* Decorative corner marks */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-primary/40 rounded-tl" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-primary/40 rounded-tr" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-primary/40 rounded-bl" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-primary/40 rounded-br" />

        <SectionWrapper>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center shrink-0 border-2 border-primary/40 shadow-[0_0_20px_rgba(225,29,46,0.3)]">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Protected Intellectual Property</div>
                <h3 className="text-2xl font-heading font-bold mb-1">Proprietary Research & IP</h3>
                <p className="text-secondary">The core anonymization and routing workflows powering Rakshak are legally protected.</p>
              </div>
            </div>
            <div className="bg-black/30 px-8 py-5 rounded-xl border border-primary/30 flex flex-col items-center shadow-[0_0_20px_rgba(225,29,46,0.1)] shrink-0">
              <span className="text-[10px] text-secondary font-bold uppercase tracking-[0.2em] mb-2">Patent Application No.</span>
              <span className="text-2xl font-heading font-black text-primary tracking-wider">202611074299 A</span>
              <span className="text-[10px] text-secondary/60 mt-1 uppercase tracking-widest">Government of India</span>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ══════════════════════════════════════════
          4. CORE CAPABILITIES
      ══════════════════════════════════════════ */}
      <section id="features" className="py-24">
        <SectionWrapper>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs text-primary font-bold uppercase tracking-widest">What We're Building</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-4">Core Capabilities</h2>
            <p className="text-secondary max-w-2xl mx-auto">
              A transparent look at the features we are building and their current development status.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
              >
                <GlassCard className="p-8 flex flex-col h-full group hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(225,29,46,0.15)] transition-all duration-300 cursor-default">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className={`px-3 py-1 text-[10px] uppercase tracking-widest font-black rounded-full border ${feature.color}`}>
                      {feature.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-secondary flex-grow text-sm leading-relaxed">{feature.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ══════════════════════════════════════════
          5. DEVELOPMENT HORIZON
      ══════════════════════════════════════════ */}
      <section id="roadmap" className="py-20 border-y border-white/5">
        <SectionWrapper>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs text-primary font-bold uppercase tracking-widest">Development Roadmap</span>
            <h2 className="text-3xl font-heading font-bold mt-2">Development Horizon</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 rounded-2xl overflow-hidden border border-white/10">
            {[
              {
                title: "MVP Phase", colorBorder: "border-green-500", colorHeader: "bg-green-500/10 text-green-400",
                items: [
                  { done: true,  text: "Web & Mobile UI Foundations" },
                  { done: true,  text: "Authentication System" },
                  { done: true,  text: "Basic Reporting Flow" },
                ]
              },
              {
                title: "Currently Building", colorBorder: "border-primary", colorHeader: "bg-primary/10 text-primary",
                items: [
                  { done: false, text: "Real-time SOS WebSockets", active: true },
                  { done: false, text: "Admin Dashboard UI", active: true },
                  { done: false, text: "Geolocation Services", active: true },
                ]
              },
              {
                title: "Planned (Next)", colorBorder: "border-blue-500/50", colorHeader: "bg-blue-500/10 text-blue-400",
                items: [
                  { done: false, text: "End-to-end Encryption" },
                  { done: false, text: "Native Mobile Apps" },
                  { done: false, text: "Role-based Access Control" },
                ]
              },
              {
                title: "Long-Term Vision", colorBorder: "border-white/20", colorHeader: "bg-white/5 text-white/40",
                items: [
                  { done: false, text: "AI Legal Assistant" },
                  { done: false, text: "Automated DFIR" },
                  { done: false, text: "Smart City API Integration" },
                ]
              },
            ].map((col, ci) => (
              <motion.div
                key={ci}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1 }}
                className={`flex flex-col bg-white/[0.02] border-l first:border-l-0 border-white/10 border-t-4 ${col.colorBorder}`}
              >
                <div className={`px-6 py-4 font-heading font-bold text-sm uppercase tracking-widest border-b border-white/10 ${col.colorHeader}`}>
                  {col.title}
                </div>
                <ul className="p-6 space-y-4 flex-1">
                  {col.items.map((item, ii) => (
                    <li key={ii} className="flex items-start gap-3">
                      {item.done ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      ) : 'active' in item && item.active ? (
                        <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5 animate-pulse" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-white/20 shrink-0 mt-0.5" />
                      )}
                      <span className="text-sm text-secondary">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ══════════════════════════════════════════
          6. WHO WE'RE BUILDING FOR
      ══════════════════════════════════════════ */}
      <section id="solutions" className="py-24 border-b border-white/5">
        <SectionWrapper>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs text-primary font-bold uppercase tracking-widest">Target Environments</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-4">Who We're Building For</h2>
            <p className="text-secondary max-w-2xl mx-auto">Rakshak is being engineered from the ground up to serve complex organizational environments.</p>
          </motion.div>

          <div className="flex flex-col gap-6 max-w-5xl mx-auto">
            {intendedEnvironments.map((sector, idx) => (
              <motion.div
                key={sector.id}
                initial={shouldReduceMotion ? false : { opacity: 0, x: idx % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <GlassCard className="p-8 border-primary/10 hover:border-primary/40 hover:shadow-[0_4px_30px_rgba(225,29,46,0.1)] transition-all duration-300 group">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_rgba(225,29,46,0.2)] transition-all">
                      <sector.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">{sector.title}</h3>
                      <p className="text-secondary text-base mb-5">{sector.desc}</p>
                      <ul className="flex flex-wrap gap-2">
                        {sector.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2 bg-primary/5 border border-primary/15 px-3 py-1.5 rounded-full">
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                            <span className="text-xs font-medium text-white/80">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ══════════════════════════════════════════
          7. TECHNOLOGY STACK
      ══════════════════════════════════════════ */}
      <section id="technology" className="py-24">
        <SectionWrapper>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs text-primary font-bold uppercase tracking-widest">Under the Hood</span>
            <h2 className="text-3xl font-heading font-bold mt-2 mb-3">Our Technology Stack</h2>
            <p className="text-secondary">The foundation we are using to construct the Rakshak MVP.</p>
          </motion.div>

          {/* AI Node Graphic — responsive centered */}
          <div className="relative w-48 h-48 mx-auto mb-16">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping [animation-duration:3s]" />
            <div className="absolute inset-4 bg-primary/15 rounded-full animate-ping [animation-duration:2s]" style={{ animationDelay: "0.5s" }} />
            <div className="absolute inset-0 m-auto w-20 h-20 bg-primary rounded-full shadow-[0_0_40px_rgba(225,29,46,0.8)] flex items-center justify-center z-10">
              <Network className="h-9 w-9 text-white" />
            </div>
            <svg className="absolute inset-[-60px] w-[calc(100%+120px)] h-[calc(100%+120px)] -z-10 opacity-30" viewBox="0 0 300 300">
              <line x1="150" y1="150" x2="40"  y2="60"  stroke="currentColor" strokeWidth="1.5" className="text-primary" />
              <line x1="150" y1="150" x2="260" y2="60"  stroke="currentColor" strokeWidth="1.5" className="text-primary" />
              <line x1="150" y1="150" x2="40"  y2="240" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
              <line x1="150" y1="150" x2="260" y2="240" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
              {[{cx:40,cy:60},{cx:260,cy:60},{cx:40,cy:240},{cx:260,cy:240}].map((c,i)=>(
                <circle key={i} cx={c.cx} cy={c.cy} r="5" fill="#e11d2e" opacity="0.6" />
              ))}
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {techStack.map((stack, idx) => (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
              >
                <GlassCard className="p-6 group hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                  <h3 className="font-heading font-bold text-base mb-2 text-primary group-hover:text-primary/80 transition-colors">{stack.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed">{stack.items}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ══════════════════════════════════════════
          8. PRODUCT JOURNEY TIMELINE  ← ★ HERO MOMENT ★
      ══════════════════════════════════════════ */}
      <section id="journey" className="py-24 border-y border-white/5 overflow-hidden">
        <SectionWrapper>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-xs text-primary font-bold uppercase tracking-widest">Where We've Been · Where We Are · Where We're Going</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-4">The Product Journey</h2>
            <p className="text-secondary max-w-2xl mx-auto">Watch Rakshak evolve from an idea into an enterprise-grade safety platform.</p>
          </motion.div>

          {/* Timeline container */}
          <div className="relative max-w-4xl mx-auto" ref={timelineRef}>
            {/* Animated vertical line */}
            <TimelineLine progress={lineProgress} />

            <div className="space-y-10">
              {timelinePhases.map((phase, idx) => {
                const isCompleted  = phase.status === "Completed";
                const isInProgress = phase.status === "In Progress";
                const isLeft = idx % 2 === 0;
                const Icon = PHASE_ICONS[idx];

                return (
                  <motion.div
                    key={idx}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: 0.05 }}
                    className={`relative flex flex-col md:flex-row items-start md:items-center ${isLeft ? "md:flex-row-reverse" : ""}`}
                  >
                    {/* ── Node ── */}
                    <div className={`absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10 flex flex-col items-center translate-y-5 md:translate-y-0`}>
                      {/* Outer pulse ring — only for active */}
                      {isInProgress && (
                        <div className="absolute inset-0 w-8 h-8 -m-2 rounded-full bg-primary/30 animate-ping [animation-duration:1.5s]" />
                      )}
                      <div className={`relative flex items-center justify-center rounded-full border-[3px] transition-all duration-300
                        ${isInProgress
                          ? "w-10 h-10 bg-primary border-primary shadow-[0_0_20px_rgba(225,29,46,0.8)]"
                          : isCompleted
                          ? "w-7 h-7 bg-primary/80 border-primary/50 shadow-[0_0_10px_rgba(225,29,46,0.4)]"
                          : "w-6 h-6 bg-transparent border-white/20"
                        }`}
                      >
                        {isCompleted  && <CheckSquare className="w-3.5 h-3.5 text-white" />}
                        {isInProgress && <Icon className="w-5 h-5 text-white" />}
                      </div>
                      {/* YOU ARE HERE label */}
                      {isInProgress && (
                        <div className="absolute -bottom-7 whitespace-nowrap">
                          <span className="text-[10px] bg-primary text-white font-black uppercase tracking-widest px-2 py-0.5 rounded">
                            YOU ARE HERE
                          </span>
                        </div>
                      )}
                    </div>

                    {/* ── Card ── */}
                    <div className={`ml-14 md:ml-0 md:w-[45%] ${isLeft ? "md:pl-10" : "md:pr-10"}`}>
                      <motion.div
                        whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <GlassCard className={`p-6 border transition-all duration-300 ${
                          isInProgress
                            ? "border-primary/50 bg-primary/5 shadow-[0_0_30px_rgba(225,29,46,0.15)]"
                            : isCompleted
                            ? "border-white/15 hover:border-primary/30"
                            : "border-white/5 opacity-60 hover:opacity-80"
                        }`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isCompleted || isInProgress ? "bg-primary/15 border border-primary/20" : "bg-white/5 border border-white/10"}`}>
                                <Icon className={`w-4 h-4 ${isCompleted || isInProgress ? "text-primary" : "text-white/30"}`} />
                              </div>
                              <span className="text-xs font-bold tracking-widest uppercase text-secondary">{phase.phase}</span>
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                              isInProgress ? "bg-primary/20 text-primary border-primary/40 shadow-[0_0_10px_rgba(225,29,46,0.3)]"
                              : isCompleted ? "bg-white/10 text-white/70 border-white/15"
                              : "bg-white/5 text-white/30 border-white/10"
                            }`}>
                              {PHASE_LABELS[phase.status] ?? phase.status}
                            </span>
                          </div>
                          <h4 className={`text-lg font-heading font-bold mb-2 ${isInProgress ? "text-white" : isCompleted ? "text-white/90" : "text-white/40"}`}>
                            {phase.title}
                          </h4>
                          <p className={`text-sm leading-relaxed ${isInProgress ? "text-secondary" : isCompleted ? "text-secondary/80" : "text-secondary/40"}`}>
                            {phase.desc}
                          </p>
                        </GlassCard>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ══════════════════════════════════════════
          9. CTA — Support the Journey
      ══════════════════════════════════════════ */}
      <section id="get-involved" className="py-32 relative overflow-hidden">
        {/* Rich ambient background — continuous with page theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0008] via-[#0f0005] to-[#0a0e17]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(225,29,46,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(225,29,46,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <SectionWrapper className="relative z-10 text-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-black tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(225,29,46,0.2)]">
              <Rocket className="w-3.5 h-3.5" /> Join the Mission
            </div>

            <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 leading-tight">
              Support the <span className="text-primary [text-shadow:0_0_30px_rgba(225,29,46,0.5)]">Journey</span>
            </h2>
            <p className="text-lg text-secondary mb-12 leading-relaxed max-w-xl mx-auto">
              We are actively seeking institutions for closed-beta deployment, mentors in deep-tech scaling, and early-stage investors aligned with our mission to democratize safety.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <PrimaryButton className="text-lg px-10 py-4 w-full sm:w-auto shadow-[0_0_30px_rgba(225,29,46,0.4)]">
                  Partner with Us
                </PrimaryButton>
              </Link>
              <Link href="/building-aegivon">
                <SecondaryButton className="text-lg px-10 py-4 w-full sm:w-auto">
                  Follow Our Progress
                </SecondaryButton>
              </Link>
            </div>
          </motion.div>
        </SectionWrapper>
      </section>

    </div>
  );
}
