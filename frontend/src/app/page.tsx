"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import { GlassCard } from "@/components/ui/Cards";
import { 
  ShieldCheck, 
  Search, 
  Code2, 
  CheckCircle2, 
  ArrowRight,
  FlaskConical,
  Beaker
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  return (
    <div className="flex flex-col w-full relative">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center">
        <SectionWrapper className="relative z-10 w-full pt-10 md:pt-0">
          <div className="flex flex-col items-center text-center">
            <motion.div 
              initial="hidden" animate="visible" variants={fadeUp}
              className="space-y-8 flex flex-col items-center max-w-4xl mx-auto"
            >
              <div className="inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-medium tracking-wide">
                An Aegivon Technologies Initiative
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-tight tracking-tight">
                Building Technology. <br className="hidden md:block" />
                <span className="text-accent">Protecting Lives.</span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-secondary max-w-3xl leading-relaxed font-medium">
                Aegivon Technologies is a student-led technology company building intelligent systems at the intersection of AI, cybersecurity and safety.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-8 w-full sm:w-auto justify-center items-center">
                <Link href="/products/rakshak" className="w-full sm:w-auto">
                  <PrimaryButton className="w-full sm:w-auto text-lg px-10 py-4">
                    Explore What We're Building
                  </PrimaryButton>
                </Link>
                <Link href="/team" className="w-full sm:w-auto">
                  <SecondaryButton className="w-full sm:w-auto text-lg px-10 py-4">
                    Meet the Team
                  </SecondaryButton>
                </Link>
              </div>
              <Link href="/careers" className="text-sm text-secondary hover:text-accent font-medium mt-4 transition-colors">
                Join Aegivon &rarr;
              </Link>
            </motion.div>
          </div>
        </SectionWrapper>
      </section>

      {/* 2. WHY AEGIVON? (Concept Cards) */}
      <SectionWrapper className="bg-transparent/10  border-y border-white/5 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Philosophy</h2>
          <p className="text-secondary max-w-2xl mx-auto">We are rethinking how safety infrastructure is built, focusing on applied research and real-world impact over marketing hype.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="p-8 flex flex-col text-left">
            <Search className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-xl font-heading font-bold mb-3">Problem First</h3>
            <p className="text-secondary text-sm">We start by deeply understanding real vulnerabilities in communities, not by pushing a tech stack.</p>
          </GlassCard>
          
          <GlassCard className="p-8 flex flex-col text-left">
            <Code2 className="w-10 h-10 text-accent mb-6" />
            <h3 className="text-xl font-heading font-bold mb-3">Built While Learning</h3>
            <p className="text-secondary text-sm">A student-led approach that turns academic exploration into functional, scalable software.</p>
          </GlassCard>
          
          <GlassCard className="p-8 flex flex-col text-left">
            <ShieldCheck className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-xl font-heading font-bold mb-3">Security by Design</h3>
            <p className="text-secondary text-sm">Privacy and security aren't afterthoughts; they are the foundational architecture of every prototype.</p>
          </GlassCard>
          
          <GlassCard className="p-8 flex flex-col text-left">
            <CheckCircle2 className="w-10 h-10 text-accent mb-6" />
            <h3 className="text-xl font-heading font-bold mb-3">Real Environments</h3>
            <p className="text-secondary text-sm">We build and validate for real scenarios, preparing solutions for complex operational challenges.</p>
          </GlassCard>
        </div>
      </SectionWrapper>

      {/* 3. WHAT WE ARE BUILDING (Product Lab) */}
      <SectionWrapper className="relative z-10">
        <div className="mb-16 md:flex justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Aegivon Product Lab</h2>
            <p className="text-secondary max-w-2xl">Research and systems currently in active development.</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-2 text-accent font-medium hover:text-white transition-colors">
            View All Research <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Rakshak */}
          <GlassCard className="p-8 md:p-12 border-primary/20 bg-primary/5 flex flex-col justify-between group h-full">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wider uppercase text-white/80 border border-white/10">Flagship Product — In Development</span>
              </div>
              <h3 className="text-3xl font-heading font-bold mb-4">Rakshak</h3>
              <p className="text-secondary text-lg leading-relaxed mb-8">
                An intelligent safety platform designed to help organizations create more responsive, accessible and technology-driven safety systems. Currently in the MVP stage.
              </p>
            </div>
            <div>
              <Link href="/products/rakshak">
                <PrimaryButton className="w-full sm:w-auto flex items-center justify-center gap-2">
                  Explore Rakshak <ArrowRight className="w-4 h-4" />
                </PrimaryButton>
              </Link>
            </div>
          </GlassCard>

          {/* Future Product */}
          <GlassCard className="p-8 md:p-12 border-white/5 border-dashed bg-white/[0.02] flex flex-col justify-between h-full opacity-70">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <FlaskConical className="w-8 h-8 text-secondary" />
                </div>
                <span className="px-3 py-1 bg-black/50 rounded-full text-xs font-semibold tracking-wider uppercase text-secondary border border-white/5">Currently in research</span>
              </div>
              <h3 className="text-3xl font-heading font-bold mb-4 text-white/50">Project [Redacted]</h3>
              <p className="text-secondary/70 text-lg leading-relaxed mb-8">
                We are continually exploring the intersection of distributed systems and predictive security. Our next major initiative is currently in the early research phase.
              </p>
            </div>
            <div>
              <button disabled className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white/5 text-secondary text-sm font-medium cursor-not-allowed border border-white/5 flex items-center justify-center gap-2">
                <Beaker className="w-4 h-4" /> Details coming soon
              </button>
            </div>
          </GlassCard>
        </div>
        
        <Link href="/products" className="mt-8 flex md:hidden items-center justify-center gap-2 text-accent font-medium hover:text-white transition-colors">
          View All Research <ArrowRight className="w-4 h-4" />
        </Link>
      </SectionWrapper>

      {/* 4. CURIOSITY TEASE */}
      <section className="border-t border-white/5 bg-transparent relative z-10">
        <SectionWrapper className="text-center py-32">
          <h2 className="text-3xl md:text-5xl font-heading font-bold leading-tight mb-8">
            You aren't looking at a finished company.<br className="hidden md:block"/> 
            <span className="text-primary">You're watching one being built.</span>
          </h2>
          <div className="flex justify-center">
            <Link href="/building-aegivon">
              <SecondaryButton className="text-lg px-8 py-4">Read Our Development Journal</SecondaryButton>
            </Link>
          </div>
        </SectionWrapper>
      </section>
    </div>
  );
}

