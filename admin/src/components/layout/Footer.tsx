import Link from "next/link";
import { ShieldCheck, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#070a11] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/brand/aegivon-logo.jpeg" alt="Aegivon Logo" className="h-10 w-auto object-contain mix-blend-screen" />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl tracking-widest leading-none text-white uppercase">Aegivon</span>
                <span className="font-heading font-semibold text-[0.55rem] tracking-[0.3em] text-accent leading-tight uppercase mt-1">Technologies</span>
              </div>
            </div>
            <p className="text-secondary text-sm">Smart Safety. Stronger Society.</p>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-secondary">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors">Products</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-secondary">
              <li><Link href="/investors" className="hover:text-accent transition-colors">Investors</Link></li>
              <li><Link href="/careers" className="hover:text-accent transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Blog & Resources</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-4 text-sm text-secondary">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:aegivontech@gmail.com" className="hover:text-white">aegivontech@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1" />
                <span>Manav Rachna University, Faridabad, Haryana, India</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-secondary">
          <p className="mb-2 font-medium">Together, Let's Build a Safer & Smarter World.</p>
          <p>&copy; {new Date().getFullYear()} Aegivon Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
