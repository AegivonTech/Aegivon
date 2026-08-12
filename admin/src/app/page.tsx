"use client";
import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/Cards";
import { Users, FileText, CheckCircle, Clock } from "lucide-react";
import { api } from "@/lib/api";

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
    return <div className="text-secondary">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Command Center Overview</h1>
        <p className="text-secondary">Welcome back. Here is what is happening at Aegivon today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-secondary text-sm">Total Enquiries</p>
            <h3 className="text-2xl font-bold">{stats?.totalEnquiries || 0}</h3>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-secondary text-sm">New Applications</p>
            <h3 className="text-2xl font-bold">{stats?.newApplications || 0}</h3>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6 flex items-center gap-4 border-primary/30">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-secondary text-sm">Rakshak Interest</p>
            <h3 className="text-2xl font-bold">{stats?.rakshakInterest || 0}</h3>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
            <Clock className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <p className="text-secondary text-sm">Open Positions</p>
            <h3 className="text-2xl font-bold">{stats?.openPositions || 0}</h3>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GlassCard className="p-6 h-full">
            <h3 className="text-xl font-heading font-bold mb-6">Recent Activity</h3>
            {stats?.recentActivity?.length > 0 ? (
              <ul className="space-y-4">
                {stats.recentActivity.map((log: any) => (
                  <li key={log.id} className="flex items-start gap-4 p-4 rounded-md bg-[#0a0e17] border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <p className="text-white"><span className="font-semibold text-secondary">{log.user.name}</span> performed <span className="font-mono text-sm bg-white/10 px-1 rounded">{log.action}</span> on {log.entity}</p>
                      <span className="text-xs text-secondary mt-1 block">{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-secondary text-sm">No recent activity.</p>
            )}
          </GlassCard>
        </div>
        
        <div className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-heading font-bold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors text-sm">
                Review New Applications ({stats?.newApplications || 0})
              </button>
              <button className="w-full text-left px-4 py-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors text-sm">
                Respond to Enquiries ({stats?.newEnquiries || 0})
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
