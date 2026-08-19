"use client";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Instagram } from "lucide-react";

export default function FoundersPage() {
  const shubham = {
    name: "Shubham Rathore",
    titles: ["CEO", "CTO", "DIRECTOR", "FOUNDER"],
    summary: "Main Lead — Full Stack Development, AI/ML & Cybersecurity, Product Architecture",
    image: "/Team/SHUBHAM.jpeg",
    bullets: ["Full Stack Developer", "AI/ML & Cybersecurity", "Product Architecture"],
    links: {
      github: "https://github.com/rathorejiworld",
      linkedin: "https://www.linkedin.com/in/rathoreshubham",
      instagram: "https://www.instagram.com/rathore_imperivm/"
    }
  };

  const coFounders = [
    {
      name: "Dhruv Lohchab",
      title: "COO - CO-FOUNDER",
      image: "/Team/DHRUV.jpeg",
      bullets: ["Project Operations", "Execution Strategy", "Partnerships"],
      links: {
        github: "https://github.com/Dhruv-Lohchab",
        linkedin: "https://www.linkedin.com/in/dhruv-lohchab/",
        instagram: "https://www.instagram.com/dhruv._.lohchab/"
      }
    },
    {
      name: "Priyanshu Singh",
      title: "CMO - CO-FOUNDER",
      image: "/Team/Priyanshu.jpeg",
      bullets: ["Developer & Tech Support", "Research & Innovation", "UI/UX"],
      links: {
        github: "https://github.com/priyanshu69as",
        linkedin: "https://www.linkedin.com/in/priyanshu-singh-293308285/",
        instagram: "https://www.instagram.com/priyanshu__000077"
      }
    },
    {
      name: "Manish",
      title: "CO-FOUNDER",
      image: "/Team/MANISH.jpeg",
      bullets: ["Brand Strategy", "Marketing & Comms", "Community Building"],
      links: {
        github: "https://github.com/MANISHKU08",
        linkedin: "https://www.linkedin.com/in/manish-0213ba283",
        instagram: "https://www.instagram.com/imanish8851/"
      }
    }
  ];

  // The CSS clip path for octagonal cards
  const octagonClipPath = "polygon(32px 0, calc(100% - 32px) 0, 100% 32px, 100% calc(100% - 32px), calc(100% - 32px) 100%, 32px 100%, 0 calc(100% - 32px), 0 32px)";
  // A slightly sharper octagon for the photo
  const photoClipPath = "polygon(24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px), 0 24px)";

  return (
    <div className="flex flex-col w-full relative min-h-screen bg-transparent font-sans">
      
      {/* Background Visual System overlays (assuming layout video is behind) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft glowing particle dots overlay via radial gradient pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(rgba(34,211,238,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        {/* Hex grid / circuit trace hint */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-rule='evenodd' stroke='%2322D3EE' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px'
          }}
        />
        {/* Flowing wave-line graphics in lower-left */}
        <div className="absolute -bottom-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(34,211,238,0.1)_0%,transparent_50%)]" />
      </div>

      {/* Hero Header Block */}
      <section className="relative z-10 pt-32 pb-16 text-center">
        <SectionWrapper>
          <div className="inline-block px-5 py-1.5 rounded-full border border-cyan-400 bg-transparent text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            THE FOUNDERS
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-6 text-white tracking-tight">
            Meet the <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">Founders.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Four engineers. One mission: intelligent safety systems that actually work.
          </p>
        </SectionWrapper>
      </section>

      {/* Main Content */}
      <SectionWrapper className="relative z-10 py-10">
        
        {/* Featured Founder Card */}
        <div className="max-w-[1400px] mx-auto mb-24">
          <div 
            className="p-[1px] bg-gradient-to-br from-cyan-400 via-cyan-400/20 to-white/5 relative mx-auto group shadow-[0_0_30px_rgba(34,211,238,0.05)]"
            style={{ clipPath: octagonClipPath }}
          >
            {/* Dark Navy Panel inside the gradient border */}
            <div 
              className="bg-gradient-to-br from-[#0A1420] to-[#0F1B2E] w-full h-full relative p-8 md:p-14 flex flex-col lg:flex-row items-center gap-12"
              style={{ clipPath: octagonClipPath }}
            >
              {/* Subtle inner glow / vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)] pointer-events-none" />

              {/* Decorative diagonal cyan accent lines (bottom right) */}
              <div className="absolute bottom-6 right-8 flex gap-2 rotate-[-45deg] opacity-60">
                <div className="w-8 h-[2px] bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]"></div>
                <div className="w-8 h-[2px] bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]"></div>
                <div className="w-8 h-[2px] bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]"></div>
              </div>

              {/* Featured Photo (Left Side) - Needs overflow visible for pop! */}
              <div className="relative w-56 h-56 md:w-80 md:h-80 shrink-0 group/photo perspective-1000">
                
                {/* Glowing ring that sits outside the image frame */}
                <div 
                  className="absolute -inset-1 bg-cyan-400/30 blur-md rounded-full opacity-50 group-hover/photo:opacity-100 group-hover/photo:blur-xl transition-all duration-300 z-0" 
                />
                
                {/* The actual photo frame */}
                <div 
                  className="relative w-full h-full p-[2px] bg-cyan-400 group-hover/photo:scale-[1.08] group-hover/photo:-translate-y-2 transition-all duration-300 ease-out z-10 shadow-[0_0_20px_rgba(34,211,238,0.4)] group-hover/photo:shadow-[0_0_40px_rgba(34,211,238,0.8)]"
                  style={{ clipPath: photoClipPath }}
                >
                  <div className="w-full h-full bg-[#0A1420] relative overflow-hidden" style={{ clipPath: photoClipPath }}>
                    <Image src={shubham.image} alt={shubham.name} fill className="object-cover object-[center_15%]" />
                  </div>
                </div>

                {/* Overlapping Badge */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#050A10] border-2 border-cyan-400 flex items-center justify-center z-20 shadow-[0_0_15px_rgba(34,211,238,0.5)] group-hover/photo:-translate-y-2 group-hover/photo:scale-[1.08] transition-all duration-300 ease-out">
                   <img src="/brand/aegivon-logo.jpeg" alt="Aegivon Logo" className="w-8 h-8 object-contain mix-blend-screen" />
                </div>
              </div>

              {/* Featured Info (Right Side) */}
              <div className="flex flex-col text-center lg:text-left flex-1 relative z-10 mt-6 lg:mt-0">
                <div className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">
                  LEAD FOUNDER
                </div>
                
                <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6 text-white tracking-tight">
                  {shubham.name}
                </h2>
                
                {/* Title Badge Row */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
                  {shubham.titles.map((title, i) => (
                    <div key={i} className="flex items-center">
                      <span className="px-4 py-1.5 rounded-md border border-cyan-400/40 bg-[#050A10]/80 text-cyan-400 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                        {title}
                      </span>
                      {i < shubham.titles.length - 1 && (
                        <div className="w-4 h-[1px] bg-cyan-400/30 mx-2" />
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-gray-300 font-medium text-lg mb-8 max-w-2xl border-l-2 border-cyan-400/50 pl-4 py-1 bg-gradient-to-r from-cyan-400/5 to-transparent mx-auto lg:mx-0">
                  {shubham.summary}
                </p>
                
                {/* Skill Tags */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10">
                  {shubham.bullets.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0A1420] border border-cyan-400/20 shadow-inner">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,1)]" />
                      <span className="text-sm font-medium text-gray-200">{skill}</span>
                    </div>
                  ))}
                </div>

                {/* Socials */}
                <div className="flex items-center justify-center lg:justify-start gap-5">
                  {[
                    { icon: Github, url: shubham.links.github, label: "GitHub" },
                    { icon: Linkedin, url: shubham.links.linkedin, label: "LinkedIn" },
                    { icon: Instagram, url: shubham.links.instagram, label: "Instagram" }
                  ].map((social, idx) => (
                    <a 
                      key={idx}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={`${shubham.name} on ${social.label}`} 
                      className="w-12 h-12 rounded-full border border-white/20 bg-[#050A10] flex items-center justify-center text-white/80 hover:text-white hover:bg-cyan-400/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300 group/btn"
                    >
                      <social.icon className="w-5 h-5 group-hover/btn:scale-110 group-hover/btn:drop-shadow-[0_0_8px_rgba(255,255,255,1)] transition-all duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Co-Founders Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto pb-20">
          {coFounders.map((member, idx) => (
            <div 
              key={idx} 
              className="group/card relative rounded-2xl bg-[#0F1B2E] border border-white/10 hover:border-cyan-400/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] flex flex-col p-8"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-transparent rounded-t-2xl opacity-50 group-hover/card:opacity-100 transition-opacity duration-500" />
              
              {/* Photo - independent pop interaction */}
              <div className="relative w-32 h-32 mx-auto mb-6 group/photo perspective-1000 z-20">
                <div className="absolute -inset-2 bg-cyan-400/20 blur-md rounded-full opacity-0 group-hover/photo:opacity-100 transition-all duration-300" />
                <div className="relative w-full h-full rounded-full p-1 bg-cyan-400/20 group-hover/photo:bg-cyan-400 group-hover/photo:scale-[1.10] group-hover/photo:-translate-y-2 transition-all duration-300 ease-out z-10 shadow-lg group-hover/photo:shadow-[0_0_25px_rgba(34,211,238,0.6)]">
                  <div className="w-full h-full rounded-full overflow-hidden relative bg-[#050A10]">
                    <Image src={member.image} alt={member.name} fill className="object-cover object-[center_15%]" />
                  </div>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="flex flex-col text-center flex-1 z-10">
                <h3 className="font-heading font-bold text-2xl mb-3 text-white">{member.name}</h3>
                
                <div className="flex justify-center mb-6">
                  <span className="px-4 py-1.5 rounded-md border border-cyan-400/30 bg-[#0A1420] text-cyan-400 text-[11px] font-bold uppercase tracking-wider shadow-inner">
                    {member.title}
                  </span>
                </div>
                
                <div className="w-12 h-[1px] bg-cyan-400/30 mx-auto mb-6" />
                
                <ul className="text-left text-sm text-gray-300 space-y-4 mb-8 mx-auto w-full max-w-[220px] flex-1">
                  {member.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full border border-cyan-400 bg-transparent mt-1.5 shrink-0 shadow-[0_0_5px_rgba(34,211,238,0.5)] group-hover/card:bg-cyan-400 transition-colors duration-300" />
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Socials */}
                <div className="flex items-center justify-center gap-4 mt-auto">
                  {[
                    { icon: Github, url: member.links.github, label: "GitHub" },
                    { icon: Linkedin, url: member.links.linkedin, label: "LinkedIn" },
                    { icon: Instagram, url: member.links.instagram, label: "Instagram" }
                  ].map((social, sIdx) => (
                    <a 
                      key={sIdx}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={`${member.name} on ${social.label}`} 
                      className="w-10 h-10 rounded-full border border-white/10 bg-[#0A1420] flex items-center justify-center text-white/60 hover:text-white hover:bg-cyan-400/20 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300 group/btn"
                    >
                      <social.icon className="w-4 h-4 group-hover/btn:scale-110 group-hover/btn:drop-shadow-[0_0_8px_rgba(255,255,255,1)] transition-all duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
