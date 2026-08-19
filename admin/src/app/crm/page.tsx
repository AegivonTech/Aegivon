"use client";

import { useEffect, useState, useCallback } from "react";
import { SciFiCard } from "@/components/ui/SciFiCard";
import { SciFiButton } from "@/components/ui/SciFiButton";
import { SciFiBadge } from "@/components/ui/SciFiBadge";
import { api } from "@/lib/api";
import { formatDistanceToNow, differenceInHours } from "date-fns";
import { Search, Filter, X, ChevronLeft, ChevronRight, Activity } from "lucide-react";

export default function CRMDashboard() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);

  // Filters & Pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
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
      status: statusFilter,
      type: typeFilter,
    });
    
    if (debouncedSearch) params.append("search", debouncedSearch);
    if (from) params.append("from", from);
    if (to) params.append("to", to);

    api(`/api/v1/admin/enquiries?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setEnquiries(Array.isArray(data.enquiries) ? data.enquiries : []);
        setTotal(data.total || 0);
      })
      .catch((err) => {
        console.error("Failed to fetch enquiries:", err);
        showToast("Failed to fetch data", "error");
      })
      .finally(() => setLoading(false));
  }, [page, pageSize, statusFilter, typeFilter, debouncedSearch, dateRange, customFrom, customTo]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await api(`/api/v1/admin/enquiries/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        if (status === "ARCHIVED") {
          setEnquiries(enquiries.filter(e => e.id !== id));
          showToast("Enquiry archived successfully");
        } else {
          setEnquiries(enquiries.map(e => e.id === id ? { ...e, status } : e));
          showToast("Status updated");
        }
      } else {
        showToast("Failed to update status", "error");
      }
    } catch (error) {
      showToast("Network error updating status", "error");
    }
  };

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deleteEnquiry = async (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      const res = await api(`/api/v1/admin/enquiries/${deletingId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEnquiries(enquiries.filter(e => e.id !== deletingId));
        showToast("Enquiry deleted successfully");
        if (selectedEnquiry?.id === deletingId) {
          setSelectedEnquiry(null);
        }
      } else {
        const text = await res.text();
        showToast(`Failed to delete: ${res.status} ${text}`, "error");
      }
    } catch (error) {
      showToast("Network error while deleting", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setTypeFilter("ALL");
    setDateRange("ALL_TIME");
    setCustomFrom("");
    setCustomTo("");
    setPage(1);
  };

  const isAging = (enq: any) => {
    return enq.status === 'NEW' && differenceInHours(now, new Date(enq.createdAt)) > 48;
  };

  const totalPages = Math.ceil(total / pageSize) || 1;

  return (
    <div className="space-y-6 relative w-full text-left">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-3 border transition-all ${
          toast.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400'
        }`} style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}>
          {toast.message}
        </div>
      )}

      {/* Delete Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-[#010308]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <SciFiCard className="max-w-md w-full p-8 relative">
            <h2 className="text-xl font-bold mb-4 text-white uppercase tracking-widest border-b border-blue-500/20 pb-4">Delete this enquiry?</h2>
            <p className="text-blue-200/60 mb-8 font-mono text-sm">This action cannot be undone. Data will be purged from the active system.</p>
            <div className="flex justify-end gap-4">
              <SciFiButton variant="secondary" onClick={() => setDeletingId(null)}>Cancel</SciFiButton>
              <SciFiButton variant="danger" onClick={confirmDelete}>Confirm Purge</SciFiButton>
            </div>
          </SciFiCard>
        </div>
      )}

      {/* Details Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-[#010308]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <SciFiCard className="max-w-3xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-4 right-4 text-blue-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-heading font-black tracking-widest text-white mb-6 border-b border-blue-500/20 pb-4 flex items-center gap-3">
              <Activity className="w-6 h-6 text-blue-500" /> ENQUIRY DETAILS
            </h2>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-xs text-blue-500 font-bold uppercase tracking-[0.2em] mb-1">Target Name</p>
                <p className="text-white font-medium text-lg">{selectedEnquiry.name}</p>
              </div>
              <div>
                <p className="text-xs text-blue-500 font-bold uppercase tracking-[0.2em] mb-1">Comm Link</p>
                <p className="text-white font-medium text-lg"><a href={`mailto:${selectedEnquiry.email}`} className="text-blue-400 hover:text-blue-300 hover:underline">{selectedEnquiry.email}</a></p>
              </div>
              <div>
                <p className="text-xs text-blue-500 font-bold uppercase tracking-[0.2em] mb-1">Organization</p>
                <p className="text-white font-medium text-lg">{selectedEnquiry.organization || 'UNIDENTIFIED'}</p>
              </div>
              <div>
                <p className="text-xs text-blue-500 font-bold uppercase tracking-[0.2em] mb-1">Classification</p>
                <p className="text-blue-300 font-medium bg-blue-500/10 inline-block px-3 py-1 rounded-sm text-sm font-mono border border-blue-500/20">{selectedEnquiry.type}</p>
              </div>
              <div>
                <p className="text-xs text-blue-500 font-bold uppercase tracking-[0.2em] mb-1">Timestamp</p>
                <p className="text-blue-200 font-mono text-sm">{new Date(selectedEnquiry.createdAt).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-[#020610] p-6 border border-blue-500/20 mb-6" style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}>
              <p className="text-xs text-blue-500 font-bold uppercase tracking-[0.2em] mb-2">Subject</p>
              <p className="text-white font-medium text-lg">{selectedEnquiry.subject}</p>
            </div>
            
            <div className="bg-[#020610] p-6 border border-blue-500/20" style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}>
              <p className="text-xs text-blue-500 font-bold uppercase tracking-[0.2em] mb-2">Transmission Data</p>
              <p className="text-blue-100/80 whitespace-pre-wrap leading-relaxed font-mono text-sm">
                {selectedEnquiry.message}
              </p>
            </div>
            
            <div className="mt-8 flex justify-end">
              <SciFiButton variant="primary" onClick={() => setSelectedEnquiry(null)}>
                Acknowledge
              </SciFiButton>
            </div>
          </SciFiCard>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-500/20 pb-6">
        <div>
          <h1 className="text-3xl font-heading font-black tracking-widest text-white mb-2">AEGIVON CRM</h1>
          <p className="text-blue-400 font-bold tracking-[0.2em] text-xs uppercase flex items-center gap-2">
            Secure connection established to Aegivon servers <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> <span className="text-green-500">System Active</span>
          </p>
        </div>
      </div>

      {/* Filters */}
      <SciFiCard glow={false} className="p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
            <input 
              type="text" 
              placeholder="Search databanks..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#020610] border border-blue-500/30 pl-10 pr-4 py-2.5 text-sm text-blue-100 focus:outline-none focus:border-blue-400 transition-colors font-mono"
            />
          </div>
          
          <select 
            value={statusFilter} 
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="bg-[#020610] border border-blue-500/30 px-4 py-2.5 text-sm text-blue-300 focus:outline-none font-bold tracking-wider uppercase cursor-pointer"
          >
            <option value="ALL">All Status</option>
            <option value="NEW">New</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>

          <select 
            value={typeFilter} 
            onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
            className="bg-[#020610] border border-blue-500/30 px-4 py-2.5 text-sm text-blue-300 focus:outline-none font-bold tracking-wider uppercase cursor-pointer"
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
            className="bg-[#020610] border border-blue-500/30 px-4 py-2.5 text-sm text-blue-300 focus:outline-none font-bold tracking-wider uppercase cursor-pointer"
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
            <input type="date" value={customFrom} onChange={e => {setCustomFrom(e.target.value); setPage(1);}} className="bg-[#020610] border border-blue-500/30 px-3 py-1.5 text-sm text-blue-300 focus:outline-none font-mono" />
            <span className="text-blue-500">to</span>
            <input type="date" value={customTo} onChange={e => {setCustomTo(e.target.value); setPage(1);}} className="bg-[#020610] border border-blue-500/30 px-3 py-1.5 text-sm text-blue-300 focus:outline-none font-mono" />
          </div>
        )}

        {(search || statusFilter !== "ALL" || typeFilter !== "ALL" || dateRange !== "ALL_TIME") && (
          <div className="flex items-center gap-2 pt-4 border-t border-blue-500/10 text-xs font-bold uppercase tracking-wider text-blue-400">
            <Filter className="w-4 h-4" />
            <span>Active filters applied</span>
            <button onClick={clearFilters} className="ml-auto text-blue-300 hover:text-white flex items-center gap-1">
              <X className="w-4 h-4" /> Clear all
            </button>
          </div>
        )}
      </SciFiCard>

      {/* Data Table */}
      <SciFiCard glow={false} className="overflow-hidden bg-[#010308]">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#020610] z-10 border-b border-blue-500/30 shadow-[0_5px_15px_-5px_rgba(0,0,0,0.5)]">
              <tr>
                <th className="p-5 text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Date</th>
                <th className="p-5 text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Name</th>
                <th className="p-5 text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Type</th>
                <th className="p-5 text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Status</th>
                <th className="p-5 text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-500/10">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-5"><div className="h-4 bg-blue-500/10 rounded w-24"></div></td>
                    <td className="p-5"><div className="h-4 bg-blue-500/10 rounded w-32 mb-2"></div><div className="h-3 bg-blue-500/10 rounded w-40"></div></td>
                    <td className="p-5"><div className="h-6 bg-blue-500/10 rounded w-20"></div></td>
                    <td className="p-5"><div className="h-8 bg-blue-500/10 rounded w-28"></div></td>
                    <td className="p-5"><div className="h-6 bg-blue-500/10 rounded w-32"></div></td>
                  </tr>
                ))
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <p className="mb-6 text-blue-400 font-mono tracking-wider">No active signals found in databanks.</p>
                      <SciFiButton variant="primary" onClick={clearFilters}>Reset Scanners</SciFiButton>
                    </div>
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-blue-500/5 transition-colors relative group">
                    <td className="p-5 text-sm">
                      {isAging(enq) && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_10px_#ef4444]" title="Aging Enquiry"></div>
                      )}
                      <div className="text-blue-100 font-mono">{new Date(enq.createdAt).toLocaleDateString()}</div>
                      <div className="text-[10px] text-blue-500 mt-1 uppercase font-bold tracking-wider">
                        {formatDistanceToNow(new Date(enq.createdAt), { addSuffix: true })}
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="font-bold text-white tracking-wide">{enq.name}</div>
                      <div className="text-xs text-blue-400 mt-1 font-mono">{enq.email}</div>
                    </td>
                    <td className="p-5">
                      <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-300 font-bold uppercase tracking-widest shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]">
                        {enq.type}
                      </span>
                    </td>
                    <td className="p-5">
                      <select 
                        value={enq.status}
                        onChange={(e) => updateStatus(enq.id, e.target.value)}
                        className="bg-[#020610] border border-blue-500/30 text-xs font-bold tracking-widest uppercase px-3 py-2 text-white focus:outline-none focus:border-blue-400 cursor-pointer"
                      >
                        <option value="NEW">NEW</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="RESOLVED">RESOLVED</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                      <div className="mt-2">
                        <SciFiBadge status={enq.status} />
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex gap-2">
                        <SciFiButton variant="secondary" onClick={() => setSelectedEnquiry(enq)}>
                          Details
                        </SciFiButton>
                        <SciFiButton variant="danger" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => deleteEnquiry(enq.id)}>
                          Delete
                        </SciFiButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {!loading && enquiries.length > 0 && (
          <div className="p-4 border-t border-blue-500/20 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-blue-500 bg-[#020610]">
            <div>
              Scanning {((page - 1) * pageSize) + 1}-{Math.min(page * pageSize, total)} of {total} records
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1 border border-blue-500/30 hover:bg-blue-500/10 hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1 border border-blue-500/30 hover:bg-blue-500/10 hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </SciFiCard>
    </div>
  );
}
