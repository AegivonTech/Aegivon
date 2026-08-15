"use client";
import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/Cards";
import { PrimaryButton } from "@/components/ui/Buttons";
import { api } from "@/lib/api";

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Careers / Applications</h1>
          <p className="text-secondary">Manage job applications and candidates.</p>
        </div>
      </div>

      <GlassCard className="overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-secondary">Loading applications...</div>
        ) : applications.length === 0 ? (
          <div className="p-8 text-center text-secondary">No applications found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 font-medium text-secondary">Date</th>
                  <th className="p-4 font-medium text-secondary">Candidate</th>
                  <th className="p-4 font-medium text-secondary">Role</th>
                  <th className="p-4 font-medium text-secondary">Status</th>
                  <th className="p-4 font-medium text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-sm text-secondary">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-white">{app.name}</div>
                      <div className="text-sm text-secondary">{app.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium">{app.role?.title || 'Unknown Role'}</span>
                    </td>
                    <td className="p-4">
                      <select 
                        value={app.status}
                        onChange={(e) => updateStatus(app.id, e.target.value)}
                        className="bg-[#0a0e17] border border-white/10 rounded px-2 py-1 text-sm text-white focus:outline-none"
                      >
                        <option value="NEW">NEW</option>
                        <option value="REVIEWING">REVIEWING</option>
                        <option value="SHORTLISTED">SHORTLISTED</option>
                        <option value="INTERVIEW">INTERVIEW</option>
                        <option value="SELECTED">SELECTED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    </td>
                    <td className="p-4 flex gap-3">
                      {app.resumeUrl && (
                        <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">Resume</a>
                      )}
                      <button 
                        onClick={() => setSelectedApplication(app)}
                        className="text-primary hover:text-white transition-colors text-sm"
                      >
                        Details
                      </button>
                      <button 
                        onClick={() => deleteApplication(app.id)}
                        className="text-red-500 hover:text-red-400 transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>

      {selectedApplication && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="max-w-2xl w-full p-8 relative">
            <button 
              onClick={() => setSelectedApplication(null)}
              className="absolute top-4 right-4 text-secondary hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-heading font-bold mb-6 border-b border-white/10 pb-4">Application Details</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-1">Name</p>
                <p className="text-white font-medium">{selectedApplication.name}</p>
              </div>
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-1">Email</p>
                <p className="text-white font-medium"><a href={`mailto:${selectedApplication.email}`} className="text-primary hover:underline">{selectedApplication.email}</a></p>
              </div>
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-1">Phone</p>
                <p className="text-white font-medium">{selectedApplication.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-1">Role Applied For</p>
                <p className="text-white font-medium">{selectedApplication.role?.title || 'Unknown Role'}</p>
              </div>
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-1">Status</p>
                <p className="text-white font-medium bg-white/10 inline-block px-2 py-0.5 rounded text-sm font-mono">{selectedApplication.status}</p>
              </div>
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-1">Date Applied</p>
                <p className="text-white font-medium">{new Date(selectedApplication.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-1">Resume</p>
                {selectedApplication.resumeUrl ? (
                  <a href={selectedApplication.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">View Document</a>
                ) : (
                  <p className="text-secondary">Not provided</p>
                )}
              </div>
            </div>
            
            {selectedApplication.coverLetter && (
              <div className="bg-[#0a0e17] rounded-lg p-4 border border-white/5">
                <p className="text-sm text-secondary uppercase tracking-wider mb-2">Cover Letter</p>
                <p className="text-white whitespace-pre-wrap leading-relaxed">
                  {selectedApplication.coverLetter}
                </p>
              </div>
            )}
            
            <div className="mt-8 flex justify-end">
              <PrimaryButton onClick={() => setSelectedApplication(null)}>
                Close
              </PrimaryButton>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
