"use client";
import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/Cards";
import { PrimaryButton } from "@/components/ui/Buttons";
import { api } from "@/lib/api";

export default function CRMDashboard() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);

  const fetchEnquiries = () => {
    api("/api/v1/admin/enquiries")
      .then((res) => res.json())
      .then((data) => setEnquiries(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Failed to fetch enquiries:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await api(`/api/v1/admin/enquiries/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setEnquiries(enquiries.map(e => e.id === id ? { ...e, status } : e));
      }
    } catch (error) {
      console.error("Failed to update status");
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this enquiry? This action cannot be undone.")) {
      return;
    }
    
    try {
      const res = await api(`/api/v1/admin/enquiries/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEnquiries(enquiries.filter(e => e.id !== id));
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry(null);
        }
      } else {
        alert("Failed to delete enquiry.");
      }
    } catch (error) {
      console.error("Failed to delete enquiry:", error);
      alert("An error occurred while deleting the enquiry.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">CRM / Enquiries</h1>
          <p className="text-secondary">Manage incoming communications.</p>
        </div>
      </div>

      <GlassCard className="overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-secondary">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-8 text-center text-secondary">No enquiries found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 font-medium text-secondary">Date</th>
                  <th className="p-4 font-medium text-secondary">Name</th>
                  <th className="p-4 font-medium text-secondary">Type</th>
                  <th className="p-4 font-medium text-secondary">Status</th>
                  <th className="p-4 font-medium text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-sm text-secondary">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-white">{enq.name}</div>
                      <div className="text-sm text-secondary">{enq.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-white/10 rounded text-xs text-secondary font-mono">
                        {enq.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <select 
                        value={enq.status}
                        onChange={(e) => updateStatus(enq.id, e.target.value)}
                        className="bg-[#0a0e17] border border-white/10 rounded px-2 py-1 text-sm text-white focus:outline-none"
                      >
                        <option value="NEW">NEW</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="RESOLVED">RESOLVED</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </td>
                    <td className="p-4 flex gap-3">
                      <button 
                        onClick={() => setSelectedEnquiry(enq)}
                        className="text-primary hover:text-white transition-colors text-sm"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => deleteEnquiry(enq.id)}
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

      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="max-w-2xl w-full p-8 relative">
            <button 
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-4 right-4 text-secondary hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-heading font-bold mb-6 border-b border-white/10 pb-4">Enquiry Details</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-1">Name</p>
                <p className="text-white font-medium">{selectedEnquiry.name}</p>
              </div>
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-1">Email</p>
                <p className="text-white font-medium"><a href={`mailto:${selectedEnquiry.email}`} className="text-primary hover:underline">{selectedEnquiry.email}</a></p>
              </div>
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-1">Phone</p>
                <p className="text-white font-medium">{selectedEnquiry.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-1">Company</p>
                <p className="text-white font-medium">{selectedEnquiry.company || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-1">Type</p>
                <p className="text-white font-medium bg-white/10 inline-block px-2 py-0.5 rounded text-sm font-mono">{selectedEnquiry.type}</p>
              </div>
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-1">Date</p>
                <p className="text-white font-medium">{new Date(selectedEnquiry.createdAt).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-[#0a0e17] rounded-lg p-4 border border-white/5">
              <p className="text-sm text-secondary uppercase tracking-wider mb-2">Message</p>
              <p className="text-white whitespace-pre-wrap leading-relaxed">
                {selectedEnquiry.message}
              </p>
            </div>
            
            <div className="mt-8 flex justify-end">
              <PrimaryButton onClick={() => setSelectedEnquiry(null)}>
                Close
              </PrimaryButton>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
