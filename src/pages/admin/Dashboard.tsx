import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "./AdminLayout";

type Tab = "overview" | "bookings" | "contacts" | "subscribers";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");
  const [bookings, setBookings] = useState<Record<string, unknown>[]>([]);
  const [contacts, setContacts] = useState<Record<string, unknown>[]>([]);
  const [subscribers, setSubscribers] = useState<Record<string, unknown>[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/admin/login");
  };

  const fetchAll = async () => {
    setLoading(true);
    const { data: b } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
    if (b) setBookings(b);
    // Note: contact_submissions and newsletter_subscribers tables not yet created
    setContacts([]);
    setSubscribers([]);
    setLoading(false);
  };

  const updateBookingStatus = async (id: string, status: string) => {
    await supabase.from("bookings").update({ status }).eq("id", id);
    fetchAll();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const tabs = [
    { id: "overview" as Tab, label: "Overview", emoji: "·" },
    { id: "bookings" as Tab, label: "Bookings", emoji: "·", count: bookings.length },
    { id: "contacts" as Tab, label: "Contacts", emoji: "·", count: contacts.length },
    { id: "subscribers" as Tab, label: "Subscribers", emoji: "·", count: subscribers.length },
  ];

  return (
    <AdminLayout
      title="Dashboard"
      description="Overview of bookings and admin activity."
    >
      <div className="max-w-7xl mx-auto">

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
                tab === t.id
                  ? "bg-taawa-green text-white border-taawa-green"
                  : "bg-white text-taawa-muted border-taawa-lime/20 hover:border-taawa-lime"
              }`}
            >
              <span>{t.emoji}</span>
              {t.label}
              {t.count !== undefined && t.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  tab === t.id
                    ? "bg-taawa-lime text-taawa-green"
                    : "bg-taawa-bg3 text-taawa-muted"
                }`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-taawa-muted text-sm">Loading data...</div>     
          </div>
        ) : (
          <>
            {/* · OVERVIEW · */}
            {tab === "overview" && (
              <div>
                <h2 className="font-syne font-bold text-taawa-text text-2xl mb-6">
                  Dashboard Overview
                </h2>

                {/* Stats cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">   
                  {[
                    { label: "Total Bookings", value: bookings.length, bg: "bg-taawa-bg2", emoji: "·" },
                    { label: "Pending Bookings", value: bookings.filter((b) => b.status === "pending").length, bg: "bg-yellow-50", emoji: "·" },
                    { label: "Contact Messages", value: contacts.length, bg: "bg-taawa-peach", emoji: "·" },
                    { label: "Subscribers", value: subscribers.length, bg: "bg-taawa-bg3", emoji: "·" },
                  ].map((stat) => (
                    <div key={stat.label} className={`${stat.bg} rounded-[20px] p-6 border border-taawa-lime/15`}>
                      <div className="text-2xl mb-2">{stat.emoji}</div>
                      <div className="font-syne font-bold text-taawa-green text-3xl leading-none mb-1">
                        {stat.value}
                      </div>
                      <div className="text-taawa-muted text-xs uppercase tracking-wide">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent bookings table */}
                <h3 className="font-syne font-bold text-taawa-text text-lg mb-4">
                  Recent Bookings
                </h3>
                <div className="bg-white rounded-[20px] border border-taawa-lime/20 overflow-hidden">
                  {bookings.length === 0 ? (
                    <p className="text-taawa-muted text-sm text-center py-10">No bookings yet.</p>
                  ) : (
                    <table className="w-full text-sm">
                      <thead className="bg-taawa-bg3">
                        <tr>
                          {["Name", "Email", "Service", "Date", "Time", "Status", "Action"].map((h) => (
                            <th key={h} className="text-left px-4 py-3 text-taawa-muted font-medium text-xs uppercase tracking-wide">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.slice(0, 5).map((b) => (
                          <tr key={b.id} className="border-t border-taawa-bg3 hover:bg-taawa-bg transition-colors">
                            <td className="px-4 py-3 font-medium text-taawa-text">{b.full_name}</td>
                            <td className="px-4 py-3 text-taawa-muted">{b.email}</td>
                            <td className="px-4 py-3 text-taawa-muted">{b.service_type || "·"}</td>
                            <td className="px-4 py-3 text-taawa-muted">{b.session_date || "·"}</td>
                            <td className="px-4 py-3 text-taawa-muted">{b.session_time || "·"}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[b.status] || STATUS_COLORS.pending}`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={b.status}
                                onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                                className="text-xs border border-taawa-lime/30 rounded-lg px-2 py-1.5 bg-white text-taawa-text outline-none"
                              >
                                <option value="pending">Pending</option>        
                                <option value="confirmed">Confirmed</option>    
                                <option value="cancelled">Cancelled</option>    
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Recent contacts */}
                <h3 className="font-syne font-bold text-taawa-text text-lg mb-4 mt-8">
                  Recent Messages
                </h3>
                <div className="flex flex-col gap-3">
                  {contacts.slice(0, 3).map((c) => (
                    <div key={c.id} className="bg-white rounded-[20px] border border-taawa-lime/20 p-5 flex items-start justify-between gap-4">
                      <div>
                        <div className="font-syne font-bold text-taawa-text">{c.first_name} {c.last_name}</div>
                        <div className="text-taawa-muted text-xs mt-0.5">{c.email}</div>
                        <p className="text-taawa-text text-sm mt-2 leading-relaxed line-clamp-2">{c.message}</p>
                      </div>
                      <a
                        href={`mailto:${c.email}`}
                        className="bg-taawa-green text-taawa-lime text-xs font-medium px-4 py-2 rounded-full hover:bg-taawa-sage transition-all whitespace-nowrap"
                      >
                        Reply ·
                      </a>
                    </div>
                  ))}
                  {contacts.length === 0 && (
                    <p className="text-taawa-muted text-sm text-center py-8">No messages yet.</p>
                  )}
                </div>
              </div>
            )}

            {/* · BOOKINGS · */}
            {tab === "bookings" && (
              <div>
                <h2 className="font-syne font-bold text-taawa-text text-2xl mb-6">
                  Session Bookings
                </h2>
                <div className="flex flex-col gap-4">
                  {bookings.map((b) => (
                    <div key={b.id} className="bg-white rounded-[20px] border border-taawa-lime/20 p-6">
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <span className="font-syne font-bold text-taawa-text text-lg">{b.full_name}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[b.status] || STATUS_COLORS.pending}`}>
                              {b.status}
                            </span>
                          </div>
                          <div className="text-taawa-muted text-sm">{b.email} {b.phone && `· ${b.phone}`}</div>
                          <div className="flex gap-2 mt-3 flex-wrap">
                            {b.service_type && <span className="text-xs bg-taawa-bg3 text-taawa-muted px-3 py-1 rounded-full">· {b.service_type}</span>}     
                            {b.session_date && <span className="text-xs bg-taawa-bg3 text-taawa-muted px-3 py-1 rounded-full">· {b.session_date}</span>}     
                            {b.session_time && <span className="text-xs bg-taawa-bg3 text-taawa-muted px-3 py-1 rounded-full">· {b.session_time}</span>}       
                          </div>
                          {b.message && (
                            <p className="text-taawa-text text-sm mt-3 leading-relaxed max-w-2xl">{b.message}</p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs text-taawa-muted">
                            {new Date(b.created_at).toLocaleDateString()}       
                          </span>
                          <select
                            value={b.status}
                            onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                            className="text-sm border border-taawa-lime/30 rounded-xl px-3 py-2 bg-taawa-bg3 text-taawa-text outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>        
                            <option value="cancelled">Cancelled</option>        
                          </select>
                          <a
                            href={`mailto:${b.email}`}
                            className="bg-taawa-green text-taawa-lime text-xs font-medium px-4 py-2 rounded-full hover:bg-taawa-sage transition-all"
                          >
                            Email Client ·
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                  {bookings.length === 0 && (
                    <p className="text-taawa-muted text-center py-16">No bookings yet.</p>
                  )}
                </div>
              </div>
            )}

            {/* · CONTACTS · */}
            {tab === "contacts" && (
              <div>
                <h2 className="font-syne font-bold text-taawa-text text-2xl mb-6">
                  Contact Messages
                </h2>
                <div className="flex flex-col gap-4">
                  {contacts.map((c) => (
                    <div key={c.id} className="bg-white rounded-[20px] border border-taawa-lime/20 p-6">
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="flex-1">
                          <div className="font-syne font-bold text-taawa-text text-lg mb-0.5">
                            {c.first_name} {c.last_name}
                          </div>
                          <div className="text-taawa-muted text-sm">
                            {c.email} {c.phone && `· ${c.phone}`}
                          </div>
                          <p className="text-taawa-text text-sm mt-3 leading-relaxed max-w-2xl">
                            {c.message}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs text-taawa-muted">
                            {new Date(c.created_at).toLocaleDateString()}       
                          </span>
                          <a
                            href={`mailto:${c.email}`}
                            className="bg-taawa-green text-taawa-lime text-xs font-medium px-4 py-2 rounded-full hover:bg-taawa-sage transition-all"
                          >
                            Reply ·
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                  {contacts.length === 0 && (
                    <p className="text-taawa-muted text-center py-16">No messages yet.</p>
                  )}
                </div>
              </div>
            )}

            {/* · SUBSCRIBERS · */}
            {tab === "subscribers" && (
              <div>
                <h2 className="font-syne font-bold text-taawa-text text-2xl mb-6">
                  Newsletter Subscribers
                </h2>
                <div className="bg-white rounded-[20px] border border-taawa-lime/20 overflow-hidden">
                  {subscribers.length === 0 ? (
                    <p className="text-taawa-muted text-sm text-center py-10">No subscribers yet.</p>
                  ) : (
                    <table className="w-full text-sm">
                      <thead className="bg-taawa-bg3">
                        <tr>
                          {["Email", "Name", "Subscribed", "Status"].map((h) => (
                            <th key={h} className="text-left px-4 py-3 text-taawa-muted font-medium text-xs uppercase tracking-wide">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {subscribers.map((s) => (
                          <tr key={s.id} className="border-t border-taawa-bg3 hover:bg-taawa-bg transition-colors">
                            <td className="px-4 py-3 font-medium text-taawa-text">{s.email}</td>
                            <td className="px-4 py-3 text-taawa-muted">{s.name || "·"}</td>
                            <td className="px-4 py-3 text-taawa-muted">
                              {new Date(s.subscribed_at).toLocaleDateString()}  
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                s.active
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-600"
                              }`}>
                                {s.active ? "Active" : "Unsubscribed"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
