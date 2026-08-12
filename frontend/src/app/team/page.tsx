import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { GlassCard } from "@/components/ui/Cards";
import { PrimaryButton } from "@/components/ui/Buttons";
import Link from "next/link";
import Image from "next/image";
import { UserCircle2, Code, Shield, Megaphone, Terminal } from "lucide-react";

export default function TeamPage() {
  const team = [
    {
      name: "Shubham Rathore", 
      role: "Student Founder & Lead Engineer",
      image: "/Team/SHUBHAM.jpeg",
      icon: Code,
      bullets: ["Full Stack Developer", "AI/ML & Cybersecurity", "Product Architecture"]
    },
    {
      name: "Dhruv", 
      role: "Student Founder & Operations Lead",
      image: "/Team/DHRUV.jpeg",
      icon: Shield,
      bullets: ["Project Operations", "Execution Strategy", "Partnerships"]
    },
    {
      name: "Manish", 
      role: "Student Founder & Growth Lead",
      image: "/Team/MANISH.jpeg",
      icon: Megaphone,
      bullets: ["Brand Strategy", "Marketing & Comms", "Community Building"]
    },
    {
      name: "Priyanshu", 
      role: "Core Team Member",
      image: "/Team/Priyanshu.jpeg",
      icon: Terminal,
      bullets: ["Developer & Tech Support", "Research & Innovation", "UI/UX"]
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative pt-32 pb-20 text-center border-b border-white/5 bg-transparent">
        <SectionWrapper>
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
            The Builders
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Meet the <span className="text-primary">Team.</span>
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
            We are a dedicated group of engineering students from Manav Rachna University, united by a single mission: to build intelligent safety systems that actually work.
          </p>
        </SectionWrapper>
      </section>

      {/* Team Grid */}
      <SectionWrapper className="py-24 bg-transparent">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {team.map((member, idx) => (
            <GlassCard key={idx} className="p-8 group hover:border-primary/50 transition-colors flex flex-col sm:flex-row items-center sm:items-start gap-8">
              <div className="w-36 h-36 shrink-0 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-primary/30 transition-colors overflow-hidden relative shadow-lg">
                {member.image ? (
                  <Image src={member.image} alt={member.name} fill className="object-cover object-[center_15%]" />
                ) : (
                  <member.icon className="w-10 h-10 text-secondary group-hover:text-primary transition-colors" />
                )}
              </div>
              <div className="flex flex-col text-center sm:text-left flex-1">
                <h3 className="font-heading font-bold text-2xl mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-6">{member.role}</p>
                <ul className="text-left text-sm text-secondary space-y-3">
                  {member.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* Join the team CTA */}
      <section className="bg-primary/5 border-t border-primary/20 py-24 text-center">
        <SectionWrapper className="py-0">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-6">We're Expanding</h2>
            <p className="text-secondary text-lg leading-relaxed mb-8">
              Aegivon is growing. If you're a student, researcher, or builder who is passionate about deep-tech and public safety, we want to hear from you.
            </p>
            <Link href="/careers">
              <PrimaryButton className="px-8 py-3 text-lg">View Open Roles</PrimaryButton>
            </Link>
          </div>
        </SectionWrapper>
      </section>
    </div>
  );
}

