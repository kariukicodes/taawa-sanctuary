import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "./AdminLayout";

type Message = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  admin_notes: string | null;
  created_at: string;
};

const API_BASE_URL = "http://localhost:5000";

const statusClasses: Record<Message["status"], string> = {
  unread: "bg-yellow-100 text-yellow-800 border-yellow-200",
  read: "bg-blue-100 text-blue-800 border-blue-200",
  replied: "bg-green-100 text-green-800 border-green-200",
};

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/api/messages`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch messages");
      }

      setMessages(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch messages";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    messageId: string,
    status: Message["status"]
  ) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/messages/${messageId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update message status");
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, status } : msg
        )
      );

      if (selectedMessage?.id === messageId) {
        setSelectedMessage({ ...selectedMessage, status });
      }

      toast.success(`Message marked as ${status}`);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to update message status";

      toast.error(message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const matchesSearch =
        msg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || msg.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [messages, searchTerm, statusFilter]);

  return (
    <AdminLayout
      title="Contact Messages"
      description="View and manage all inbound contact messages."
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:max-w-md rounded-2xl border border-[#d9e3dc] bg-white px-4 py-3 text-sm text-[#17252A] outline-none focus:border-[#355847]"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-2xl border border-[#d9e3dc] bg-white px-4 py-3 text-sm text-[#17252A] outline-none focus:border-[#355847]"
          >
            <option value="all">All statuses</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>

        {loading && (
          <div className="rounded-3xl border border-[#e6ece8] bg-white p-8 shadow-sm">
            <p className="text-[#5f6f68]">Loading messages...</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && filteredMessages.length === 0 && (
          <div className="rounded-3xl border border-[#e6ece8] bg-white p-8 shadow-sm">
            <p className="text-[#5f6f68]">No messages found.</p>
          </div>
        )}

        {!loading && !error && filteredMessages.length > 0 && (
          <div className="overflow-hidden rounded-3xl border border-[#e6ece8] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-[#f3f6f3]">
                  <tr className="text-sm text-[#355847]">
                    <th className="px-6 py-4 font-semibold">Sender</th>
                    <th className="px-6 py-4 font-semibold">Subject</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMessages.map((msg) => (
                    <tr
                      key={msg.id}
                      className="border-t border-[#edf1ee] text-sm text-[#17252A]"
                    >
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold">{msg.full_name}</p>
                          <p className="text-[#5f6f68]">{msg.email}</p>
                          {msg.phone && (
                            <p className="text-[#5f6f68]">{msg.phone}</p>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-5">{msg.subject}</td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize ${
                            statusClasses[msg.status]
                          }`}
                        >
                          {msg.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-5">
                        <button
                          onClick={() => setSelectedMessage(msg)}
                          className="rounded-xl bg-[#d7f36a] px-4 py-2 text-xs font-semibold text-[#17252A] transition hover:opacity-90"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedMessage && (
          <div className="mt-8 rounded-3xl border border-[#e6ece8] bg-white p-8 shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#17252A]">
                  {selectedMessage.subject}
                </h2>
                <p className="mt-1 text-sm text-[#5f6f68]">
                  From {selectedMessage.full_name} • {selectedMessage.email}
                </p>
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                className="rounded-xl border border-[#d9e3dc] px-4 py-2 text-sm text-[#355847]"
              >
                Close
              </button>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize ${
                  statusClasses[selectedMessage.status]
                }`}
              >
                {selectedMessage.status}
              </span>

              <button
                onClick={() => updateStatus(selectedMessage.id, "read")}
                className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 transition hover:opacity-90"
              >
                Mark as Read
              </button>

              <button
                onClick={() => updateStatus(selectedMessage.id, "replied")}
                className="rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-xs font-semibold text-green-700 transition hover:opacity-90"
              >
                Mark as Replied
              </button>

              <button
                onClick={() => updateStatus(selectedMessage.id, "unread")}
                className="rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-2 text-xs font-semibold text-yellow-700 transition hover:opacity-90"
              >
                Mark as Unread
              </button>
            </div>

            <div className="rounded-2xl bg-[#f7f9f7] p-5 text-sm leading-7 text-[#17252A]">
              {selectedMessage.message || "No message provided."}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;