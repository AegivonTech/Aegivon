"use client";
import { useEffect, useState } from "react";
import { SciFiCard } from "@/components/ui/SciFiCard";
import { SciFiButton } from "@/components/ui/SciFiButton";
import { Users, FileText, ShieldAlert, Briefcase, Activity, Shield, Eye, MessageSquare } from "lucide-react";
import { api } from "@/lib/api";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/api/v1/admin/dashboard/stats")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <span className="text-blue-400 font-bold tracking-widest text-sm uppercase">Initializing Systems...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative z-50">
      
      {/* Top Header Block */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">Welcome Back, <span className="text-white">Admin</span></p>
          <h1 className="text-4xl md:text-5xl font-heading font-black tracking-wider text-white mb-2 shadow-blue-500/50 drop-shadow-md">
            AEGIVON COMMAND
          </h1>
          <p className="text-blue-500 font-bold tracking-[0.3em] text-sm uppercase">Control. Monitor. Protect.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <SciFiCard glow={false} className="px-6 py-3 flex items-center gap-6" wrapperClassName="h-auto">
            <div>
              <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mb-1">System Status</p>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold tracking-wider">ONLINE</span>
              </div>
            </div>
            <Activity className="w-8 h-8 text-blue-500/50" />
          </SciFiCard>
          
          <SciFiCard glow={false} className="px-6 py-3 flex items-center gap-6 border-l border-blue-500/20" wrapperClassName="h-auto">
            <div>
              <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mb-1">Security Level</p>
              <div className="flex items-center gap-2">
                <span className="text-blue-400 font-bold tracking-wider">MAXIMUM</span>
              </div>
            </div>
            <Shield className="w-8 h-8 text-blue-500" />
          </SciFiCard>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <SciFiCard className="p-6 flex items-center gap-6 h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full"></div>
            <Activity className="w-10 h-10 text-blue-400 relative z-10" />
          </div>
          <div>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Total Site Visits</p>
            <h3 className="text-3xl font-black text-white">{stats?.totalSiteVisits || 0}</h3>
          </div>
        </SciFiCard>

        <Link href="/crm" className="block group">
          <SciFiCard className="p-6 flex items-center gap-6 h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full"></div>
              <ShieldAlert className="w-10 h-10 text-blue-400 relative z-10" />
            </div>
            <div>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Rakshak Interest</p>
              <h3 className="text-3xl font-black text-white">{stats?.rakshakInterest || 0}</h3>
            </div>
          </SciFiCard>
        </Link>

        <Link href="/crm" className="block group">
          <SciFiCard className="p-6 flex items-center gap-6 h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full"></div>
              <Users className="w-10 h-10 text-blue-400 relative z-10" />
            </div>
            <div>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Total Enquiries</p>
              <h3 className="text-3xl font-black text-white">{stats?.totalEnquiries || 0}</h3>
            </div>
          </SciFiCard>
        </Link>
        
        <Link href="/careers" className="block group">
          <SciFiCard className="p-6 flex items-center gap-6 h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full"></div>
              <FileText className="w-10 h-10 text-blue-400 relative z-10" />
            </div>
            <div>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">New Applications</p>
              <h3 className="text-3xl font-black text-white">{stats?.newApplications || 0}</h3>
            </div>
          </SciFiCard>
        </Link>
        
        <Link href="/careers" className="block group">
          <SciFiCard className="p-6 flex items-center gap-6 h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full"></div>
              <Briefcase className="w-10 h-10 text-blue-400 relative z-10" />
            </div>
            <div>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Open Positions</p>
              <h3 className="text-3xl font-black text-white">{stats?.openPositions || 0}</h3>
            </div>
          </SciFiCard>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* Recent Activity with Radar Background effect */}
        <div className="lg:col-span-2">
          <SciFiCard className="p-8 h-full relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-blue-500/10 rounded-full opacity-20 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-blue-500/10 rounded-full opacity-20 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-blue-500/20 rounded-full opacity-30 pointer-events-none bg-blue-500/5"></div>
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_10px_#3b82f6]"></div>

            <h3 className="text-sm text-blue-400 font-bold tracking-widest uppercase flex items-center gap-2 mb-8 relative z-10">
              <span className="w-2 h-4 bg-blue-500"></span> Recent Activity
            </h3>
            
            <div className="relative z-10">
              {stats?.recentActivity?.length > 0 ? (
                <ul className="space-y-4">
                  {stats.recentActivity.map((log: any) => (
                    <li key={log.id} className="flex items-start gap-4 p-4 bg-blue-900/10 border-l-2 border-blue-500 backdrop-blur-sm">
                      <div>
                        <p className="text-blue-100 text-sm">
                          <span className="font-bold text-white">{log.user.name}</span> performed <span className="font-mono text-xs bg-blue-500/20 px-2 py-0.5 rounded text-blue-300">{log.action}</span> on {log.entity}
                        </p>
                        <span className="text-xs text-blue-500/70 mt-1 block font-mono">{new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-blue-500/50 text-sm font-mono">No recent activity detected.</p>
              )}
            </div>
          </SciFiCard>
        </div>
        
        {/* Quick Actions */}
        <div className="space-y-6">
          <SciFiCard className="p-8 h-full">
            <h3 className="text-sm text-blue-400 font-bold tracking-widest uppercase flex items-center gap-2 mb-8">
              <span className="w-2 h-4 bg-blue-500"></span> Quick Actions
            </h3>
            <div className="space-y-4">
              <Link href="/careers" className="w-full flex items-center gap-4 px-6 py-4 bg-[#0a0e17] border border-blue-500/30 text-left hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 group">
                <Eye className="w-5 h-5 text-blue-500 group-hover:text-blue-400" />
                <span className="text-sm font-bold text-blue-100 tracking-wide">REVIEW NEW APPLICATIONS ({stats?.newApplications || 0})</span>
              </Link>
              <Link href="/crm" className="w-full flex items-center gap-4 px-6 py-4 bg-[#0a0e17] border border-blue-500/30 text-left hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 group">
                <MessageSquare className="w-5 h-5 text-blue-500 group-hover:text-blue-400" />
                <span className="text-sm font-bold text-blue-100 tracking-wide">RESPOND TO ENQUIRIES ({stats?.newEnquiries || 0})</span>
              </Link>
            </div>
          </SciFiCard>
        </div>
      </div>
    </div>
  );
}
