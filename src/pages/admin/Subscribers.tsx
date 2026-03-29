import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "./AdminLayout";

type Subscriber = {
  id: string;
  email: string;
  status: "active" | "unsubscribed";
  created_at: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const statusClasses: Record<Subscriber["status"], string> = {
  active: "bg-green-100 text-green-800 border-green-200",
  unsubscribed: "bg-gray-100 text-gray-700 border-gray-200",
};

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/api/subscribers`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch subscribers");
      }

      setSubscribers(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch subscribers";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((subscriber) =>
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [subscribers, searchTerm]);

  // Export Subscribers to CSV
  const exportSubscribersToCSV = () => {
    if (filteredSubscribers.length === 0) {
      toast.error("No subscribers to export.");
      return;
    }

    const headers = ["Email", "Status", "Created At"];

    const rows = filteredSubscribers.map((subscriber) => [
      subscriber.email,
      subscriber.status,
      subscriber.created_at,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast.success("Subscribers exported successfully.");
  };

  return (
    <AdminLayout
      title="Newsletter Subscribers"
      description="View and manage newsletter signups."
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-[320px] rounded-2xl border border-[#d9e3dc] bg-white px-4 py-3 text-sm text-[#17252A] outline-none focus:border-[#355847]"
          />

          <button
            onClick={exportSubscribersToCSV}
            className="rounded-2xl border border-[#d9e3dc] bg-white px-4 py-3 text-sm font-semibold text-[#355847] transition hover:bg-[#f3f6f3]"
          >
            Export CSV
          </button>
        </div>

        {loading && (
          <div className="rounded-3xl border border-[#e6ece8] bg-white p-8 shadow-sm">
            <p className="text-[#5f6f68]">Loading subscribers...</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && filteredSubscribers.length === 0 && (
          <div className="rounded-3xl border border-[#e6ece8] bg-white p-8 shadow-sm">
            <p className="text-[#5f6f68]">No subscribers found.</p>
          </div>
        )}

        {!loading && !error && filteredSubscribers.length > 0 && (
          <div className="overflow-hidden rounded-3xl border border-[#e6ece8] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-[#f3f6f3]">
                  <tr className="text-sm text-[#355847]">
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Date Added</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredSubscribers.map((subscriber) => (
                    <tr
                      key={subscriber.id}
                      className="border-t border-[#edf1ee] text-sm text-[#17252A]"
                    >
                      <td className="px-6 py-5 font-medium">{subscriber.email}</td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize ${
                            statusClasses[subscriber.status]
                          }`}
                        >
                          {subscriber.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        {new Date(subscriber.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSubscribers;