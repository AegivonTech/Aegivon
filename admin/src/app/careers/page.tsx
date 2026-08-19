"use client";
import { useEffect, useState } from "react";
import { SciFiCard } from "@/components/ui/SciFiCard";
import { SciFiButton } from "@/components/ui/SciFiButton";
import { SciFiBadge } from "@/components/ui/SciFiBadge";
import { api } from "@/lib/api";
import { X, UserPlus } from "lucide-react";

export default function CareersDashboard() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const fetchApplications = () => {
    api("/api/v1/admin/applications")
      .then((res) => res.json())
      .then((data) => {
        setApplications(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch applications:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await api(`/api/v1/admin/applications/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setApplications(applications.map(a => a.id === id ? { ...a, status } : a));
      }
    } catch (error) {
      console.error("Failed to update status");
    }
  };

  const deleteApplication = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this application? This action cannot be undone.")) {
      return;
    }
    
    try {
      const res = await api(`/api/v1/admin/applications/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setApplications(applications.filter(a => a.id !== id));
        if (selectedApplication?.id === id) {
          setSelectedApplication(null);
        }
      } else {
        const errorText = await res.text();
        console.error("Delete failed with status:", res.status, errorText);
        alert(`Failed to delete application: ${res.status} ${errorText}`);
      }
    } catch (error) {
      console.error("Failed to delete application:", error);
      alert("An error occurred while deleting the application.");
    }
  };

  return (
    <div className="space-y-6 relative w-full text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-500/20 pb-6">
        <div>
          <h1 className="text-3xl font-heading font-black tracking-widest text-white mb-2 uppercase">Recruitment DB</h1>
          <p className="text-blue-400 font-bold tracking-[0.2em] text-xs uppercase flex items-center gap-2">
            Personnel Acquisition System <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> <span className="text-green-500">Active</span>
          </p>
        </div>
      </div>

      <SciFiCard glow={false} className="overflow-hidden bg-[#010308]">
        {loading ? (
          <div className="p-16 text-center text-blue-500 font-mono tracking-widest uppercase animate-pulse">
            Scanning Databanks...
          </div>
        ) : applications.length === 0 ? (
          <div className="p-16 text-center text-blue-500/50 font-mono tracking-widest uppercase">
            No applicant records found.
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[#020610] z-10 border-b border-blue-500/30 shadow-[0_5px_15px_-5px_rgba(0,0,0,0.5)]">
                <tr>
                  <th className="p-5 text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Timestamp</th>
                  <th className="p-5 text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Candidate ID</th>
                  <th className="p-5 text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Designation</th>
                  <th className="p-5 text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Status</th>
                  <th className="p-5 text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-500/10">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-blue-500/5 transition-colors relative group">
                    <td className="p-5 text-sm text-blue-100 font-mono">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-5">
                      <div className="font-bold text-white tracking-wide">{app.name}</div>
                      <div className="text-xs text-blue-400 mt-1 font-mono">{app.email}</div>
                    </td>
                    <td className="p-5">
                      <span className="font-mono text-sm text-blue-200 bg-blue-500/10 px-2 py-1 rounded-sm border border-blue-500/20">{app.role?.title || 'UNKNOWN ROLE'}</span>
                    </td>
                    <td className="p-5">
                      <select 
                        value={app.status}
                        onChange={(e) => updateStatus(app.id, e.target.value)}
                        className="bg-[#020610] border border-blue-500/30 text-xs font-bold tracking-widest uppercase px-3 py-2 text-white focus:outline-none focus:border-blue-400 cursor-pointer"
                      >
                        <option value="NEW">NEW</option>
                        <option value="REVIEWING">REVIEWING</option>
                        <option value="SHORTLISTED">SHORTLISTED</option>
                        <option value="INTERVIEW">INTERVIEW</option>
                        <option value="SELECTED">SELECTED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                      <div className="mt-2">
                         <SciFiBadge status={app.status} />
                      </div>
                    </td>
                    <td className="p-5 flex gap-3">
                      {app.resumeUrl && (
                        <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-bold text-xs uppercase tracking-wider flex items-center border border-blue-500/30 px-2 py-1 bg-[#020610] transition-colors hover:bg-blue-500/10">
                          Data File
                        </a>
                      )}
                      <button 
                        onClick={() => setSelectedApplication(app)}
                        className="text-blue-500 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors border border-blue-500/30 px-2 py-1 bg-[#020610] hover:bg-blue-500/10"
                      >
                        Inspect
                      </button>
                      <button 
                        onClick={() => deleteApplication(app.id)}
                        className="text-red-500 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors border border-red-500/30 px-2 py-1 bg-[#020610] hover:bg-red-500/10 opacity-0 group-hover:opacity-100"
                      >
                        Purge
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SciFiCard>

      {/* Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-[#010308]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <SciFiCard className="max-w-2xl w-full p-8 relative">
            <button 
              onClick={() => setSelectedApplication(null)}
              className="absolute top-4 right-4 text-blue-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-heading font-black tracking-widest text-white mb-6 border-b border-blue-500/20 pb-4 flex items-center gap-3">
              <UserPlus className="w-6 h-6 text-blue-500" /> APPLICANT PROFILE
            </h2>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-xs text-blue-500 font-bold uppercase tracking-[0.2em] mb-1">Subject Name</p>
                <p className="text-white font-medium text-lg">{selectedApplication.name}</p>
              </div>
              <div>
                <p className="text-xs text-blue-500 font-bold uppercase tracking-[0.2em] mb-1">Comm Link</p>
                <p className="text-white font-medium"><a href={`mailto:${selectedApplication.email}`} className="text-blue-400 hover:underline">{selectedApplication.email}</a></p>
              </div>
              <div>
                <p className="text-xs text-blue-500 font-bold uppercase tracking-[0.2em] mb-1">Frequency (Phone)</p>
                <p className="text-white font-medium font-mono">{selectedApplication.phone || 'UNAVAILABLE'}</p>
              </div>
              <div>
                <p className="text-xs text-blue-500 font-bold uppercase tracking-[0.2em] mb-1">Target Designation</p>
                <p className="text-blue-300 font-medium bg-blue-500/10 inline-block px-3 py-1 rounded-sm text-sm font-mono border border-blue-500/20">{selectedApplication.role?.title || 'UNKNOWN'}</p>
              </div>
              <div>
                <p className="text-xs text-blue-500 font-bold uppercase tracking-[0.2em] mb-1">Clearance Status</p>
                <p className="mt-1"><SciFiBadge status={selectedApplication.status} /></p>
              </div>
              <div>
                <p className="text-xs text-blue-500 font-bold uppercase tracking-[0.2em] mb-1">Timestamp</p>
                <p className="text-blue-200 font-mono text-sm">{new Date(selectedApplication.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-blue-500 font-bold uppercase tracking-[0.2em] mb-1">Attached Data</p>
                {selectedApplication.resumeUrl ? (
                  <a href={selectedApplication.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-2 text-sm font-bold uppercase"><span className="w-2 h-2 bg-blue-500 inline-block"></span> Access File</a>
                ) : (
                  <p className="text-blue-500/50 font-mono text-sm">NO DATA</p>
                )}
              </div>
            </div>
            
            {selectedApplication.coverLetter && (
              <div className="bg-[#020610] p-6 border border-blue-500/20" style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}>
                <p className="text-xs text-blue-500 font-bold uppercase tracking-[0.2em] mb-2">Transmission Log (Cover Letter)</p>
                <p className="text-blue-100/80 whitespace-pre-wrap leading-relaxed font-mono text-sm max-h-[200px] overflow-y-auto">
                  {selectedApplication.coverLetter}
                </p>
              </div>
            )}
            
            <div className="mt-8 flex justify-end">
              <SciFiButton variant="primary" onClick={() => setSelectedApplication(null)}>
                Acknowledge
              </SciFiButton>
            </div>
          </SciFiCard>
        </div>
      )}
    </div>
  );
}
