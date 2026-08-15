"use client";

import { useEffect, useState, useCallback } from "react";
import { GlassCard } from "@/components/ui/Cards";
import { PrimaryButton } from "@/components/ui/Buttons";
import { api } from "@/lib/api";
import { formatDistanceToNow, differenceInHours } from "date-fns";
import { Search, Filter, X, ChevronLeft, ChevronRight, ArchiveRestore, Trash2 } from "lucide-react";
import { ReauthModal } from "@/components/admin/ReauthModal";

export default function ArchivedEnquiriesDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showReauthModal, setShowReauthModal] = useState(true);

  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);

  // Filters & Pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [dateRange, setDateRange] = useState("ALL_TIME");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  
  // Toast
  const [toast, setToast] = useState<{message: string, type: 'success'|'error'} | null>(null);

  const showToast = (message: string, type: 'success'|'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Elapsed time trigger
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // reset to first page on search
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchEnquiries = useCallback(() => {
    if (!isAuthenticated) return;

    setLoading(true);
    let from = "";
    let to = "";
    const today = new Date();
    
    if (dateRange === "TODAY") {
      from = new Date(today.setHours(0,0,0,0)).toISOString();
    } else if (dateRange === "LAST_7_DAYS") {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      from = d.toISOString();
    } else if (dateRange === "LAST_30_DAYS") {
      const d = new Date();
      d.setDate(d.getDate() - 30);
      from = d.toISOString();
    } else if (dateRange === "CUSTOM") {
      from = customFrom ? new Date(customFrom).toISOString() : "";
      to = customTo ? new Date(customTo).toISOString() : "";
    }

    const params = new URLSearchParams({
      page: page.toString(),
      page_size: pageSize.toString(),
      type: typeFilter,
    });
    
    if (debouncedSearch) params.append("search", debouncedSearch);
    if (from) params.append("from", from);
    if (to) params.append("to", to);

    api(`/api/v1/admin/enquiries/archived?${params.toString()}`)
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) {
          setIsAuthenticated(false);
          setShowReauthModal(true);
          throw new Error("Re-authentication required");
        }
        return res.json();
      })
      .then((data) => {
        setEnquiries(Array.isArray(data.enquiries) ? data.enquiries : []);
        setTotal(data.total || 0);
      })
      .catch((err) => {
        if (err.message !== "Re-authentication required") {
          console.error("Failed to fetch enquiries:", err);
          showToast("Failed to fetch data", "error");
        }
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated, page, pageSize, typeFilter, debouncedSearch, dateRange, customFrom, customTo]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const unarchive = async (id: string) => {
    try {
      const res = await api(`/api/v1/admin/enquiries/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "NEW" }),
      });
      if (res.ok) {
        setEnquiries(enquiries.filter(e => e.id !== id));
        showToast("Enquiry unarchived successfully");
      } else {
        showToast("Failed to unarchive", "error");
      }
    } catch (error) {
      showToast("Network error while unarchiving", "error");
    }
  };

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const confirmPermanentDelete = async () => {
    if (!deletingId || deleteConfirmation !== "DELETE") return;
    try {
      const res = await api(`/api/v1/admin/enquiries/${deletingId}/permanent`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEnquiries(enquiries.filter(e => e.id !== deletingId));
        showToast("Enquiry permanently deleted");
        if (selectedEnquiry?.id === deletingId) {
          setSelectedEnquiry(null);
        }
      } else {
        if (res.status === 401 || res.status === 403) {
          setIsAuthenticated(false);
          setShowReauthModal(true);
        } else {
          const text = await res.text();
          showToast(`Failed to delete: ${res.status} ${text}`, "error");
        }
      }
    } catch (error) {
      showToast("Network error while deleting", "error");
    } finally {
      setDeletingId(null);
      setDeleteConfirmation("");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("ALL");
    setDateRange("ALL_TIME");
    setCustomFrom("");
    setCustomTo("");
    setPage(1);
  };

  const totalPages = Math.ceil(total / pageSize) || 1;

  if (showReauthModal) {
    return (
      <ReauthModal
        isOpen={showReauthModal}
        onSuccess={() => {
          setIsAuthenticated(true);
          setShowReauthModal(false);
          // fetchEnquiries will trigger via useEffect dependency change
        }}
        onCancel={() => {
          // Keep showing if they cancel, they can't access this page without auth
          window.location.href = '/crm';
        }}
      />
    );
  }

  return (
    <div className="space-y-6 relative">
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg border transition-all ${
          toast.type === 'success' ? 'bg-green-500/20 border-green-500/50 text-green-300' : 'bg-red-500/20 border-red-500/50 text-red-300'
        }`}>
          {toast.message}
        </div>
      )}

      {deletingId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="max-w-md w-full p-8 border-red-500/50">
            <h2 className="text-xl font-bold mb-4 text-red-500 flex items-center gap-2"><Trash2 className="w-5 h-5"/> Permanent Delete</h2>
            <p className="text-secondary mb-4">This action is <strong>completely irreversible</strong>. The record will be permanently deleted from the database.</p>
            <div className="mb-6">
              <label className="block text-sm text-secondary mb-2">Type DELETE to confirm</label>
              <input 
                type="text" 
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="w-full bg-[#0a0e17] border border-red-500/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                placeholder="DELETE"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-4">
              <button onClick={() => {setDeletingId(null); setDeleteConfirmation("");}} className="px-4 py-2 text-secondary hover:text-white transition-colors">Cancel</button>
              <button 
                onClick={confirmPermanentDelete} 
                disabled={deleteConfirmation !== "DELETE"}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Permanently Delete
              </button>
            </div>
          </GlassCard>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Archived Enquiries</h1>
          <p className="text-secondary">Password-protected view of historical communications.</p>
        </div>
      </div>

      <GlassCard className="p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a0e17] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
            />
          </div>
          
          <select 
            value={typeFilter} 
            onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
            className="bg-[#0a0e17] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
          >
            <option value="ALL">All Types</option>
            <option value="GENERAL">General</option>
            <option value="PRODUCT_RAKSHAK">Product Rakshak</option>
            <option value="PARTNERSHIP">Partnership</option>
            <option value="INVESTMENT_SUPPORT">Investment</option>
            <option value="MEDIA">Media</option>
          </select>

          <select 
            value={dateRange} 
            onChange={(e) => { setDateRange(e.target.value); setPage(1); }}
            className="bg-[#0a0e17] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
          >
            <option value="ALL_TIME">All Time</option>
            <option value="TODAY">Today</option>
            <option value="LAST_7_DAYS">Last 7 Days</option>
            <option value="LAST_30_DAYS">Last 30 Days</option>
            <option value="CUSTOM">Custom Range...</option>
          </select>
        </div>

        {dateRange === "CUSTOM" && (
          <div className="flex gap-4 items-center">
            <input type="date" value={customFrom} onChange={e => {setCustomFrom(e.target.value); setPage(1);}} className="bg-[#0a0e17] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none" />
            <span className="text-secondary">to</span>
            <input type="date" value={customTo} onChange={e => {setCustomTo(e.target.value); setPage(1);}} className="bg-[#0a0e17] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none" />
          </div>
        )}

        {(search || typeFilter !== "ALL" || dateRange !== "ALL_TIME") && (
          <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-sm text-secondary">
            <Filter className="w-4 h-4" />
            <span>Active filters applied</span>
            <button onClick={clearFilters} className="ml-auto text-primary hover:text-white flex items-center gap-1">
              <X className="w-3 h-3" /> Clear all
            </button>
          </div>
        )}
      </GlassCard>

      <GlassCard className="overflow-hidden border-gray-500/20">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#0a0e17]/95 backdrop-blur-sm z-10">
              <tr className="border-b border-gray-500/20">
                <th className="p-4 font-medium text-secondary">Date</th>
                <th className="p-4 font-medium text-secondary">Name</th>
                <th className="p-4 font-medium text-secondary">Type</th>
                <th className="p-4 font-medium text-secondary">Status</th>
                <th className="p-4 font-medium text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500/10">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-4"><div className="h-4 bg-white/5 rounded w-24"></div></td>
                    <td className="p-4"><div className="h-4 bg-white/5 rounded w-32 mb-2"></div><div className="h-3 bg-white/5 rounded w-40"></div></td>
                    <td className="p-4"><div className="h-6 bg-white/5 rounded w-20"></div></td>
                    <td className="p-4"><div className="h-8 bg-white/5 rounded w-28"></div></td>
                    <td className="p-4"><div className="h-4 bg-white/5 rounded w-16"></div></td>
                  </tr>
                ))
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-secondary">
                    <div className="flex flex-col items-center justify-center">
                      <p className="mb-4">No archived enquiries found.</p>
                      <PrimaryButton onClick={clearFilters}>Clear Filters</PrimaryButton>
                    </div>
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/5 transition-colors relative group">
                    <td className="p-4 text-sm">
                      <div className="text-secondary">{new Date(enq.createdAt).toLocaleDateString()}</div>
                      <div className="text-xs text-white/50 mt-1 font-mono">
                        {formatDistanceToNow(new Date(enq.createdAt), { addSuffix: true })}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-300">{enq.name}</div>
                      <div className="text-sm text-secondary">{enq.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-white/10 rounded text-xs text-secondary font-mono">
                        {enq.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded text-sm">
                        ARCHIVED
                      </span>
                    </td>
                    <td className="p-4 flex gap-3 items-center">
                      <button 
                        onClick={() => setSelectedEnquiry(enq)}
                        className="text-primary hover:text-white transition-colors text-sm"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => unarchive(enq.id)}
                        className="text-amber-500 hover:text-amber-400 transition-colors text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Unarchive"
                      >
                        <ArchiveRestore className="w-4 h-4"/> Unarchive
                      </button>
                      <button 
                        onClick={() => setDeletingId(enq.id)}
                        className="text-red-500 hover:text-red-400 transition-colors text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Delete Permanently"
                      >
                        <Trash2 className="w-4 h-4"/>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {!loading && enquiries.length > 0 && (
          <div className="p-4 border-t border-gray-500/20 flex items-center justify-between text-sm text-secondary">
            <div>
              Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, total)} of {total} results
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1 rounded hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1 rounded hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </GlassCard>

      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <GlassCard className="max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-4 right-4 text-secondary hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-heading font-bold mb-6 border-b border-gray-500/20 pb-4 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded text-sm">ARCHIVED</span> Enquiry Details
            </h2>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-1">Name</p>
                <p className="text-gray-300 font-medium">{selectedEnquiry.name}</p>
              </div>
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-1">Email</p>
                <p className="text-gray-300 font-medium"><a href={`mailto:${selectedEnquiry.email}`} className="text-primary hover:underline">{selectedEnquiry.email}</a></p>
              </div>
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-1">Organization</p>
                <p className="text-gray-300 font-medium">{selectedEnquiry.organization || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-1">Type</p>
                <p className="text-gray-300 font-medium bg-white/5 inline-block px-2 py-0.5 rounded text-sm font-mono">{selectedEnquiry.type}</p>
              </div>
              <div>
                <p className="text-sm text-secondary uppercase tracking-wider mb-1">Date</p>
                <p className="text-gray-300 font-medium">{new Date(selectedEnquiry.createdAt).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-[#0a0e17] rounded-lg p-4 border border-white/5 mb-6">
              <p className="text-sm text-secondary uppercase tracking-wider mb-2">Subject</p>
              <p className="text-gray-300 font-medium">{selectedEnquiry.subject}</p>
            </div>
            
            <div className="bg-[#0a0e17] rounded-lg p-4 border border-white/5">
              <p className="text-sm text-secondary uppercase tracking-wider mb-2">Message</p>
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
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
