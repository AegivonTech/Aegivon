import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { GlassCard } from "@/components/ui/Cards";
import { PrimaryButton } from "@/components/ui/Buttons";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProductsOverview() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative pt-32 pb-20 text-center border-b border-white/5">
        <SectionWrapper>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Our <span className="text-accent">Products.</span></h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Discover Aegivon Technologies' suite of intelligent solutions designed to protect, empower, and transform.
          </p>
        </SectionWrapper>
      </section>

      {/* Catalog Grid */}
      <section className="py-24">
        <SectionWrapper className="py-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Rakshak Product Card */}
            <GlassCard className="p-8 flex flex-col h-full group hover:border-accent/50 transition-colors">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-heading font-bold mb-4 group-hover:text-primary transition-colors">Rakshak</h2>
              <p className="text-secondary mb-8 flex-1">
                AI-Powered Safety & Incident Management Platform. Enabling institutions to prevent, report, and resolve safety incidents in real time.
              </p>
              <Link href="/products/rakshak" className="w-full">
                <PrimaryButton className="w-full flex justify-center items-center gap-2">
                  View Rakshak <ArrowRight className="w-4 h-4" />
                </PrimaryButton>
              </Link>
            </GlassCard>

            {/* Future Product Placeholder */}
            <GlassCard className="p-8 flex flex-col h-full border-dashed border-white/10 bg-transparent opacity-50">
              <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                <span className="text-white/20 text-2xl font-bold">?</span>
              </div>
              <h2 className="text-2xl font-heading font-bold mb-4 text-white/40">Coming Soon</h2>
              <p className="text-secondary/50 mb-8 flex-1">
                We are actively developing new modules and platforms to expand our safety ecosystem.
              </p>
            </GlassCard>
          </div>
        </SectionWrapper>
      </section>
    </div>
  );
}
