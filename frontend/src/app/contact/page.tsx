"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { GlassCard } from "@/components/ui/Cards";
import { PrimaryButton } from "@/components/ui/Buttons";
import { Mail, MapPin, QrCode, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await api("/api/v1/enquiries", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const errorData = await res.json().catch(() => null);
        if (errorData && errorData.error && Array.isArray(errorData.error)) {
          setError(errorData.error[0].message || "Validation failed.");
        } else {
          setError("Failed to send message. Please try again.");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative pt-32 pb-20 text-center border-b border-white/5 bg-transparent">
        <SectionWrapper>
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
            Get In Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Let's Build <span className="text-primary">Something.</span>
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
            Whether you want to join the team, test our MVP, or help us scale, we're always open to conversations.
          </p>
        </SectionWrapper>
      </section>

      {/* Form & Info */}
      <section className="py-24 bg-transparent">
        <SectionWrapper className="py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Form Column */}
            <div>
              <GlassCard className="p-8">
                <h2 className="text-2xl font-heading font-bold mb-6">Reach Out</h2>
                
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-2">Message Sent</h3>
                    <p className="text-secondary">Thanks for reaching out. We'll get back to you from our campus lab soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary uppercase tracking-wider">Name</label>
                        <input name="name" required type="text" className="w-full bg-transparent border border-white/10 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary uppercase tracking-wider">Email</label>
                        <input name="email" required type="email" className="w-full bg-transparent border border-white/10 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-secondary uppercase tracking-wider">Enquiry Type</label>
                      <select name="type" required defaultValue="" className="w-full bg-transparent border border-white/10 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                        <option value="" disabled className="bg-gray-900">Select a reason...</option>
                        <option value="GENERAL" className="bg-gray-900">Join the Team / General</option>
                        <option value="INVESTMENT_SUPPORT" className="bg-gray-900">Investment / Mentorship</option>
                        <option value="PRODUCT_RAKSHAK" className="bg-gray-900">Early MVP Access / Pilot</option>
                        <option value="PARTNERSHIP" className="bg-gray-900">Partnership</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-secondary uppercase tracking-wider">Message</label>
                      <textarea name="message" required minLength={10} rows={4} className="w-full bg-transparent border border-white/10 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none" placeholder="How can we collaborate?"></textarea>
                    </div>
                    <PrimaryButton type="submit" className="w-full py-3" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"}
                    </PrimaryButton>
                  </form>
                )}
              </GlassCard>
            </div>

            {/* Info Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-bold mb-6">Our Base</h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-white">Email</h4>
                      <a href="mailto:aegivontech@gmail.com" className="text-secondary hover:text-white transition-colors">aegivontech@gmail.com</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-white">Location</h4>
                      <span className="text-secondary leading-relaxed block max-w-sm">
                        Manav Rachna University Campus<br/>
                        Faridabad, Haryana, India
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="pt-8 border-t border-white/5">
                <GlassCard className="p-6 flex items-center gap-6 border-primary/20 bg-primary/5">
                  <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center p-2 shrink-0">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.instagram.com/aegivontech/" 
                      alt="Instagram QR Code" 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-lg mb-2">Connect With Us</h4>
                    <p className="text-sm text-secondary mb-4">Follow our journey as we build.</p>
                    <div className="flex gap-4">
                      <a href="https://twitter.com/AegivonTech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center border border-white/10 hover:border-primary transition-colors">
                        <Twitter className="w-4 h-4 text-white" />
                      </a>
                      <a href="https://www.instagram.com/aegivontech/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center border border-white/10 hover:border-primary transition-colors">
                        <Instagram className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>

          </div>
        </SectionWrapper>
      </section>
    </div>
  );
}

