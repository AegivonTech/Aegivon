import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { GlassCard } from "@/components/ui/Cards";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import Link from "next/link";
import { Calendar, PenTool, Lightbulb, Beaker, CheckCircle2 } from "lucide-react";

export default function BuildingAegivon() {
  const journalEntries = [
    {
      date: "Q3 2024",
      icon: Lightbulb,
      title: "The Problem Hypothesis",
      content: "After observing persistent delays in campus emergency response, we began researching event-driven architectures for real-time SOS routing. The core hypothesis: privacy (anonymity) and latency (speed) are the two biggest barriers to effective incident reporting.",
      status: "Completed",
      type: "Research"
    },
    {
      date: "Q4 2024",
      icon: PenTool,
      title: "Initial Prototyping",
      content: "Developed the first proof-of-concept for Rakshak using WebSockets and a basic React Native client. Early tests showed sub-second latency for coordinate transmission.",
      status: "Completed",
      type: "Engineering"
    },
    {
      date: "Q1 2025",
      icon: Beaker,
      title: "Core Infrastructure & IP",
      content: "Solidified the backend architecture. Filed Patent Application (202611074299 A) to protect the proprietary anonymization and routing workflows that form the backbone of our system.",
      status: "Completed",
      type: "Milestone"
    },
    {
      date: "Current",
      icon: Calendar,
      title: "MVP Development",
      content: "Currently building out the production-grade admin dashboard and refining the mobile client UI. Preparing for load testing and security audits before closed beta.",
      status: "In Progress",
      type: "Engineering"
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative pt-32 pb-20 text-center border-b border-white/5 bg-transparent">
        <SectionWrapper>
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
            Development Journal
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Building in <span className="text-primary">Public.</span>
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
            We are building Aegivon from the ground up. This is an honest look at our progress, our challenges, and our milestones as we engineer the future of safety.
          </p>
        </SectionWrapper>
      </section>

      {/* Visual Timeline */}
      <section className="py-24 bg-transparent">
        <SectionWrapper>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-12 text-center">The Journey So Far</h2>
            
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 md:left-32 top-0 bottom-0 w-px bg-white/10" />
              
              <div className="space-y-12">
                {journalEntries.map((entry, idx) => {
                  const isActive = entry.status === "In Progress";
                  
                  return (
                    <div key={idx} className="relative flex flex-col md:flex-row items-start gap-8">
                      {/* Date / Status (Desktop) */}
                      <div className="hidden md:flex flex-col items-end w-24 shrink-0 pt-2">
                        <span className="font-heading font-bold text-white">{entry.date}</span>
                        <span className={`text-xs font-medium uppercase tracking-wider ${isActive ? 'text-accent' : 'text-secondary'}`}>
                          {entry.status}
                        </span>
                      </div>
                      
                      {/* Timeline Node */}
                      <div className={`absolute left-8 md:static md:w-auto -translate-x-1/2 md:translate-x-0 w-10 h-10 rounded-full border-4 border-[#070a11] flex items-center justify-center shrink-0 z-10 ${isActive ? 'bg-accent' : 'bg-white/20'}`}>
                        <entry.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#070a11]'}`} />
                      </div>
                      
                      {/* Content */}
                      <GlassCard className={`flex-1 p-8 ml-16 md:ml-0 ${isActive ? 'border-accent/30 bg-accent/5' : ''}`}>
                        <div className="md:hidden flex justify-between items-center mb-4">
                          <span className="font-heading font-bold text-white">{entry.date}</span>
                          <span className={`text-xs font-medium uppercase tracking-wider px-2 py-1 rounded ${isActive ? 'bg-accent/20 text-accent' : 'bg-white/10 text-secondary'}`}>
                            {entry.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded border border-white/10 bg-white/5 text-white/70">
                            {entry.type}
                          </span>
                        </div>
                        <h3 className="text-xl font-heading font-bold mb-3">{entry.title}</h3>
                        <p className="text-secondary leading-relaxed">{entry.content}</p>
                      </GlassCard>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* Gallery Section (CMS Ready Placeholder) */}
      <section className="py-24 border-t border-white/5 bg-transparent">
        <SectionWrapper>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Behind the Scenes</h2>
            <p className="text-secondary max-w-2xl mx-auto">Glimpses of the team, late-night coding sessions, and whiteboarding.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="aspect-square bg-white/5 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs text-secondary font-medium tracking-widest uppercase relative z-10">Image {item}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
             <PrimaryButton className="opacity-50 cursor-not-allowed">Load More (CMS Connected)</PrimaryButton>
          </div>
        </SectionWrapper>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-[#0f1419] to-[#070a11] text-center border-t border-white/5">
        <SectionWrapper className="py-24">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Want to be part of the journey?</h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto mb-10">
            We are always looking for mentors, early adopters, and passionate builders to join our mission.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/careers"><PrimaryButton>Join the Team</PrimaryButton></Link>
            <Link href="/contact"><SecondaryButton>Contact Us</SecondaryButton></Link>
          </div>
        </SectionWrapper>
      </section>
    </div>
  );
}

