"use client";
import { useState, useEffect } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { GlassCard } from "@/components/ui/Cards";
import { PrimaryButton } from "@/components/ui/Buttons";
import { BrainCircuit, Code, ShieldCheck, Palette, ChevronRight, Mail, X, Check } from "lucide-react";
import ParallaxBackground from "@/components/ui/parallax-background";
import { api, apiFormData } from "@/lib/api";

const CUSTOM_ROLES = [
  {
    title: "Machine Learning Engineer",
    icon: BrainCircuit,
    tag: "Core Engineering",
    why: "Our mission relies on intelligent parsing of high-stress scenarios. We need someone who can design algorithms that understand context, urgency, and raw data from multiple sources without faltering.",
    perspective: "You'll be working directly with open-source LLMs, fine-tuning them for rapid NLP processing, and building the logic that might literally save a life. It's raw, unfiltered ML applied to real-world chaos."
  },
  {
    title: "Backend Engineer",
    icon: Code,
    tag: "Infrastructure",
    why: "Real-time SOS signals and encrypted messaging require a backend that does not go down. We need robust, low-latency architecture that scales effortlessly.",
    perspective: "You'll be architecting WebSockets, managing Redis queues, and ensuring PostgreSQL queries are optimized to the millisecond. You own the engine room."
  },
  {
    title: "Security Analyst",
    icon: ShieldCheck,
    tag: "Cybersecurity",
    why: "We are building a safety platform. If we aren't secure, we are nothing. We need a paranoid mind to find our vulnerabilities before someone else does.",
    perspective: "You'll be running penetration tests, auditing our auth flows, and helping design our end-to-end encryption protocols from scratch."
  },
  {
    title: "UI/UX Designer",
    icon: Palette,
    tag: "Design",
    why: "In a panic, users don't have time to navigate complex menus. We need interfaces that are brutally simple, highly accessible, and visually striking.",
    perspective: "You'll define the visual language of safety. Designing flows that are intuitive under extreme stress while maintaining our exclusive, high-tech aesthetic."
  }
];

export default function Careers() {
  const [dbRoles, setDbRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  useEffect(() => {
    // Fetch roles for the application form dropdown
    api("/api/v1/job-roles")
      .then((res: any) => res.json())
      .then((data: any) => setDbRoles(data))
      .catch((err: any) => console.error("Failed to fetch roles:", err));
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedRole !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedRole]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await apiFormData("/api/v1/applications", formData);

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Failed to submit application. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full bg-transparent relative">
      {/* Full-page parallax — fixed, runs across all sections */}
      <ParallaxBackground
        imageUrl="https://images.unsplash.com/photo-1537884944318-390069bb8665?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        intensity={6}
        fixed={true}
        overlayClassName="bg-[#070a11]/70"
      />

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-20 pb-10 text-center border-b border-white/5 overflow-hidden bg-transparent">
        
        <SectionWrapper className="relative z-10 -mt-24 md:-mt-32">
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-8">
            Join The Rebellion
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-8 max-w-4xl mx-auto tracking-tight leading-[1.1] text-white">
            Rebuilding the <span className="text-primary drop-shadow-[0_0_15px_rgba(0,194,255,0.4)]">Future</span> of Security
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-5xl mx-auto">
            {/* Story side */}
            <div className="flex-1 text-left space-y-4">
              <h3 className="text-3xl font-heading font-bold text-white uppercase tracking-wide">From Campus Labs <br/>to Global Impact</h3>
              <p className="text-secondary text-lg leading-relaxed">
                We didn't start in a boardroom. We are tearing down broken systems of safety and building something intelligent from the ground up.
              </p>
            </div>
            
            {/* Expectation side */}
            <div className="flex-1 text-left bg-white/5 p-8 rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
              <h3 className="text-xl font-heading font-bold text-accent mb-6 uppercase tracking-wider border-b border-white/10 pb-4">Expectation Check</h3>
              <ul className="text-secondary space-y-4 text-base">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0"><Check className="w-4 h-4 text-primary"/></div>
                  <span>Unpaid Internships & Raw Experience</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0"><Check className="w-4 h-4 text-primary"/></div>
                  <span>Absolute Ownership of Features</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0"><Check className="w-4 h-4 text-primary"/></div>
                  <span>Potential for Pre-Placement Offers (PPOs)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0"><Check className="w-4 h-4 text-primary"/></div>
                  <span>High Chaos, High Reward</span>
                </li>
              </ul>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* Role Cards Section */}
      <section className="py-24 bg-transparent border-b border-white/5 relative z-10">
        <SectionWrapper>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 uppercase tracking-wider">Who We Need</h2>
            <p className="text-secondary max-w-2xl mx-auto text-lg">We are looking for relentless builders. Review the profiles below to see where you fit in our architecture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {CUSTOM_ROLES.map((role, idx) => (
              <GlassCard 
                key={idx} 
                className="p-8 cursor-pointer group hover:border-primary/50 transition-colors duration-500 relative overflow-hidden"
                onClick={() => setSelectedRole(idx)}
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-transparent border border-white/10 group-hover:border-primary/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_var(--card-glow)] group-hover:shadow-[0_0_20px_var(--primary-glow)] transition-all duration-500">
                    <role.icon className="w-8 h-8 text-primary opacity-80 group-hover:opacity-100" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-2xl mb-1 text-white/90 group-hover:text-white transition-colors">{role.title}</h3>
                    <span className="text-xs text-accent font-medium uppercase tracking-widest">{role.tag}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:text-primary transition-all duration-500 text-secondary text-sm font-bold uppercase tracking-widest">
                    <span>Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* Application Form & Success Popup */}
      <section id="application-form" className="py-24 bg-transparent relative z-10">
        <SectionWrapper>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold mb-4 uppercase tracking-wider">Step Forward</h2>
              <p className="text-secondary text-lg">If you are ready to take absolute ownership, submit your details below.</p>
            </div>

            <GlassCard className="p-8 md:p-12 relative overflow-hidden">
              {/* Form styling glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -z-10" />
              
              {submitted ? (
                <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-primary/10 border border-primary/30 text-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_var(--primary-glow)]">
                    <Mail className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-heading font-bold mb-4 text-white uppercase tracking-wider">Profile Registered</h3>
                  <p className="text-secondary text-lg mb-8 max-w-md mx-auto">
                    Your details have been securely logged in our system. To complete your application process, you must submit your credentials.
                  </p>
                  <div className="p-6 bg-white/5 border border-primary/30 rounded-xl inline-block">
                    <p className="text-sm text-secondary uppercase tracking-widest mb-2 font-bold">Mail your Resume / CV to:</p>
                    <a href="mailto:aegivontech@gmail.com" className="text-2xl font-heading font-bold text-primary hover:text-white transition-colors">
                      aegivontech@gmail.com
                    </a>
                  </div>
                </div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit}>
                  {error && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-secondary uppercase tracking-widest">Operative Name</label>
                      <input name="name" type="text" required className="w-full bg-transparent/50 border border-white/10 rounded-lg px-5 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/5 transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-secondary uppercase tracking-widest">Comm Link (Email)</label>
                      <input name="email" type="email" required className="w-full bg-transparent/50 border border-white/10 rounded-lg px-5 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/5 transition-all" placeholder="john@example.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-secondary uppercase tracking-widest">Target Designation</label>
                    <div className="relative">
                      <select name="roleId" required defaultValue="" className="w-full bg-transparent/50 border border-white/10 rounded-lg px-5 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/5 transition-all appearance-none cursor-pointer">
                        <option value="" disabled className="bg-gray-900">Select your role...</option>
                        {dbRoles.map((r, i) => <option key={i} value={r.id} className="bg-gray-900">{r.title}</option>)}
                      </select>
                      {/* Using ChevronRight rotated for dropdown icon since we replaced ChevronDown */}
                      <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary pointer-events-none rotate-90" />
                    </div>
                    {dbRoles.length === 0 ? (
                      <p className="text-xs text-accent mt-2">Loading active deployments from the database...</p>
                    ) : (
                      <p className="text-xs text-primary/50 mt-2">Active roles synced securely.</p>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-secondary uppercase tracking-widest">Digital Footprint (GitHub / Portfolio / LinkedIn)</label>
                    <input name="portfolioUrl" type="url" required className="w-full bg-transparent/50 border border-white/10 rounded-lg px-5 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/5 transition-all" placeholder="https://" />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-secondary uppercase tracking-widest">Why are you here?</label>
                    <textarea name="answers" required rows={4} className="w-full bg-transparent/50 border border-white/10 rounded-lg px-5 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/5 transition-all resize-none" placeholder="Tell us why you want to build with us..." />
                  </div>
                  
                  <PrimaryButton className="w-full py-5 text-xl tracking-widest" type="submit" disabled={loading}>
                    {loading ? "INITIALIZING..." : "INITIALIZE APPLICATION"}
                  </PrimaryButton>
                </form>
              )}
            </GlassCard>
          </div>
        </SectionWrapper>
      </section>

      {/* Role Details Modal */}
      {selectedRole !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={() => setSelectedRole(null)}
        >
          <div 
            className="bg-[#0d1220]/30 border border-primary/20 p-8 md:p-12 rounded-2xl max-w-2xl w-full relative shadow-[0_0_80px_rgba(0,194,255,0.08)] max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
            
            <button 
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors z-10"
              onClick={() => setSelectedRole(null)}
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-6 mb-10 border-b border-white/10 pb-8">
              <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_var(--primary-glow)]">
                {(() => {
                  const Icon = CUSTOM_ROLES[selectedRole].icon;
                  return <Icon className="w-8 h-8 text-primary" />;
                })()}
              </div>
              <div>
                <h3 className="font-heading font-bold text-3xl mb-1 text-white">{CUSTOM_ROLES[selectedRole].title}</h3>
                <span className="text-sm text-primary/70 font-medium uppercase tracking-widest">{CUSTOM_ROLES[selectedRole].tag}</span>
              </div>
            </div>

            <div className="space-y-10 relative z-10">
              <div>
                <h4 className="text-xs font-heading font-bold text-primary mb-4 uppercase tracking-[0.2em] flex items-center gap-3">
                  <span className="inline-block w-5 h-[2px] bg-primary rounded-full"></span>
                  Why We Need You
                </h4>
                <p className="text-white/80 text-base leading-loose">{CUSTOM_ROLES[selectedRole].why}</p>
              </div>
              <div>
                <h4 className="text-xs font-heading font-bold mb-4 uppercase tracking-[0.2em] flex items-center gap-3" style={{color: 'var(--accent, #00d4a0)'}}>
                  <span className="inline-block w-5 h-[2px] rounded-full" style={{backgroundColor: 'var(--accent, #00d4a0)'}}></span>
                  What do we expect from you
                </h4>
                <p className="text-white/80 text-base leading-loose">{CUSTOM_ROLES[selectedRole].perspective}</p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <PrimaryButton 
                className="w-full tracking-widest py-4"
                onClick={() => {
                  setSelectedRole(null);
                  setTimeout(() => {
                    const formSection = document.getElementById('application-form');
                    if (formSection) {
                      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
              >
                PROCEED TO APPLICATION
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
