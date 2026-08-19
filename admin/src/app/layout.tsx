"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Briefcase, Box, Image as ImageIcon, LogOut, Menu, X, Archive, Shield } from "lucide-react";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { SciFiButton } from "@/components/ui/SciFiButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (pathname === "/login") {
    return (
      <html lang="en">
        <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-black text-white`}>
          <div className="min-h-screen relative overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              src="/VIDEO/blank_theme.mp4"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />
            <div className="relative z-10">{children}</div>
          </div>
        </body>
      </html>
    );
  }

  const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "CRM", href: "/crm", icon: Users },
    { label: "Archived Enquiries", href: "/crm/archived", icon: Archive },
    { label: "Careers", href: "/careers", icon: Briefcase },
    { label: "Products", href: "/products", icon: Box },
    { label: "Media", href: "/media", icon: ImageIcon },
  ];

  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-[#010308] text-blue-100 selection:bg-blue-500/30`}>
        {/* Background Grids and Glows */}
        <div className="fixed inset-0 z-0 bg-[#010308]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#001133_1px,transparent_1px),linear-gradient(to_bottom,#001133_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none opacity-50" />
        </div>

        <div className="min-h-screen flex flex-col md:flex-row relative z-10">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-blue-500/20 bg-[#020610]/80 backdrop-blur-md">
            <span className="font-heading font-bold text-lg text-white">Aegivon Command</span>
            <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 text-blue-400">
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Sidebar */}
          <div className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-[#020610]/95 backdrop-blur-xl border-r border-blue-500/20 transform transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0 flex flex-col
            ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
            shadow-[10px_0_30px_rgba(0,0,0,0.5)]
          `}>
            {/* Sidebar Header / Logo */}
            <div className="p-8 pb-4 border-b border-blue-500/10">
              <Link href="/" className="flex items-center gap-4 group">
                <div className="relative">
                  <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-md group-hover:bg-blue-500/40 transition-all duration-300"></div>
                  <Shield className="w-10 h-10 text-blue-400 relative z-10" />
                </div>
                <div>
                  <div className="font-heading font-bold text-2xl tracking-widest text-white group-hover:text-blue-200 transition-colors">
                    AEGIVON
                  </div>
                  <div className="text-[10px] text-blue-500 tracking-[0.2em] uppercase font-bold">
                    Admin
                  </div>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-r-md transition-all duration-300 group ${
                      isActive 
                        ? "bg-gradient-to-r from-blue-500/20 to-transparent border-l-2 border-blue-400 text-blue-100 shadow-[inset_10px_0_20px_-10px_rgba(59,130,246,0.3)]" 
                        : "border-l-2 border-transparent text-slate-400 hover:text-blue-300 hover:bg-blue-500/5 hover:border-blue-500/30"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? "text-blue-400" : "group-hover:text-blue-400"} transition-colors`} />
                    <span className="font-medium text-sm tracking-wide">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout Footer */}
            <div className="p-6 border-t border-blue-500/10 bg-gradient-to-t from-[#020610] to-transparent">
              <button
                onClick={async () => {
                  try {
                    const { api } = await import('@/lib/api');
                    await api('/api/v1/auth/logout', { method: 'POST' });
                  } catch (_) {
                  } finally {
                    sessionStorage.clear();
                    localStorage.removeItem('admin_session');
                    window.location.replace('/login');
                  }
                }}
                className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg w-full transition-all duration-300 group"
              >
                <LogOut className="w-5 h-5 group-hover:text-blue-400" />
                <span className="font-medium text-sm tracking-wide">Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-auto h-screen relative">
            {/* Top Right Admin Profile Mockup */}
            <div className="hidden md:flex absolute top-6 right-8 z-50 items-center gap-3 bg-[#020610]/80 backdrop-blur-md border border-blue-500/20 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-white tracking-wider">Admin</span>
            </div>

            <div className="p-4 md:p-8 max-w-7xl mx-auto w-full pt-20 md:pt-8">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
