"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Briefcase, Box, Image as ImageIcon, LogOut, Menu, X, Archive } from "lucide-react";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Don't show sidebar on login page
  if (pathname === "/login") {
    return (
      <html lang="en">
        <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
          <div className="min-h-screen bg-[#0A0F17]">{children}</div>
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
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-[#0A0F17] flex flex-col md:flex-row text-white font-sans">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#0a0e17]">
            <span className="font-heading font-bold text-lg">Aegivon Command Center</span>
            <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2">
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Sidebar */}
          <div className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0e17] border-r border-white/5 transform transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0
            ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          `}>
            <div className="p-6">
              <Link href="/" className="font-heading font-bold text-xl tracking-wide flex items-center gap-2">
                <span className="text-primary">AEGIVON</span>
                <span className="text-xs text-secondary tracking-widest uppercase">Admin</span>
              </Link>
            </div>
            <nav className="px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive ? "bg-primary/10 text-primary" : "text-secondary hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="absolute bottom-0 w-full p-4 border-t border-white/5">
              <button
                onClick={async () => {
                  try {
                    // Call the server-side logout endpoint — this is the ONLY way
                    const { api } = await import('@/lib/api');
                    await api('/api/v1/auth/logout', { method: 'POST' });
                  } catch (_) {
                    // Even if the fetch fails, we still navigate away
                  } finally {
                    // Wipe any locally cached state from the browser
                    sessionStorage.clear();
                    localStorage.removeItem('admin_session');
                    // Hard navigate so browser doesn't cache the page
                    window.location.replace('/login');
                  }
                }}
                className="flex items-center gap-3 px-4 py-3 text-secondary hover:text-red-400 hover:bg-white/5 rounded-lg w-full transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto h-screen">
            <div className="p-6 md:p-10 max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
