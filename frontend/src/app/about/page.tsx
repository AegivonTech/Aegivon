import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { GlassCard } from "@/components/ui/Cards";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import Link from "next/link";
import { Target, Lightbulb, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col w-full relative">
      {/* Hero */}
      <section className="relative pt-32 pb-20 text-center overflow-hidden">
        <SectionWrapper className="relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
            Our Story
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            From a Campus Project to <span className="text-primary">Aegivon.</span>
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
            We are a small, student-led team building deep-tech safety solutions from our dorms and labs at Manav Rachna University.
          </p>
        </SectionWrapper>
      </section>

      {/* Origin Story */}
      <section className="py-24 bg-transparent/10  relative z-10">
        <SectionWrapper>
          <div className="max-w-3xl mx-auto">
            <GlassCard className="p-8 md:p-12 mb-16">
              <h2 className="text-2xl font-heading font-bold mb-6">The Origin</h2>
              <div className="space-y-6 text-secondary leading-relaxed">
                <p>
                  Aegivon didn't start in a corporate boardroom. It started on a college campus in Faridabad. As engineering students at Manav Rachna University, we observed a critical gap in institutional safety: when emergencies happen, the latency between an incident and the security response is often too high, and the fear of reporting holds people back.
                </p>
                <p>
                  We realized that safety isn't just about guards or cameras—it's an engineering problem. It's about data routing, anonymity protocols, and real-time geospatial tracking. 
                </p>
                <p>
                  So, we started building. What began as a late-night research project soon evolved into our flagship initiative, Rakshak. Today, Aegivon Technologies is an early-stage startup dedicated to solving complex safety challenges through intelligent architecture and honest engineering.
                </p>
              </div>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <GlassCard className="p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                  <Lightbulb className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">Our Vision</h3>
                <p className="text-secondary leading-relaxed">
                  To eliminate the latency in emergency response and ensure every individual has a secure, anonymous voice when they need it most.
                </p>
              </GlassCard>
              <GlassCard className="p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                  <Target className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">Our Mission</h3>
                <p className="text-secondary leading-relaxed">
                  To harness deep tech—without the corporate bloat—to deliver accessible, privacy-first safety solutions tailored for communities and campuses.
                </p>
              </GlassCard>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-heading font-bold mb-6">What We Stand For</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm font-medium border border-white/10 text-secondary">
                  <ShieldCheck className="w-4 h-4 text-primary" /> Honest Engineering
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm font-medium border border-white/10 text-secondary">
                  <ShieldCheck className="w-4 h-4 text-primary" /> Privacy First
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm font-medium border border-white/10 text-secondary">
                  <ShieldCheck className="w-4 h-4 text-primary" /> Student Led
                </span>
              </div>
            </div>
            
          </div>
        </SectionWrapper>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 border-t border-primary/20 py-24 text-center relative z-10">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-white">Join the Mission</h2>
          <p className="text-secondary text-lg mb-8 max-w-xl mx-auto">
            We are actively looking for mentors, advisors, and early testing partners to help us refine our technology.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/team">
              <PrimaryButton>Meet the Team</PrimaryButton>
            </Link>
            <Link href="/contact">
              <SecondaryButton>Contact Us</SecondaryButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

