import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "./AdminLayout";

type Booking = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  service_type: string;
  session_date: string;
  session_time: string;
  message: string | null;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  created_at: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const statusClasses: Record<Booking["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
};

const AdminBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/api/bookings`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch bookings");
      }

      setBookings(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch bookings";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (
    bookingId: string,
    status: Booking["status"]
  ) => {
    try {
      setUpdatingId(bookingId);

      const response = await fetch(
        `${API_BASE_URL}/api/bookings/${bookingId}/status`,
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
        throw new Error(data.message || "Failed to update booking status");
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId ? { ...booking, status } : booking
        )
      );

      toast.success(`Booking ${status} successfully`);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to update booking status";
      toast.error(message);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout
      title="Bookings"
      description="View, confirm, and manage all session bookings."
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search by name, email, or service..."
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
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {loading && (
          <div className="rounded-3xl border border-[#e6ece8] bg-white p-8 shadow-sm">
            <p className="text-[#5f6f68]">Loading bookings...</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && filteredBookings.length === 0 && (
          <div className="rounded-3xl border border-[#e6ece8] bg-white p-8 shadow-sm">
            <p className="text-[#5f6f68]">No bookings yet.</p>
          </div>
        )}

        {!loading && !error && filteredBookings.length > 0 && (
          <div className="overflow-hidden rounded-3xl border border-[#e6ece8] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-[#f3f6f3]">
                  <tr className="text-sm text-[#355847]">
                    <th className="px-6 py-4 font-semibold">Client</th>
                    <th className="px-6 py-4 font-semibold">Service</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Time</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-t border-[#edf1ee] text-sm text-[#17252A]"
                    >
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold">{booking.full_name}</p>
                          <p className="text-[#5f6f68]">{booking.email}</p>
                          {booking.phone && (
                            <p className="text-[#5f6f68]">{booking.phone}</p>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-5">{booking.service_type}</td>

                      <td className="px-6 py-5">{booking.session_date}</td>

                      <td className="px-6 py-5">{booking.session_time}</td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize ${
                            statusClasses[booking.status]
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              updateStatus(booking.id, "confirmed")
                            }
                            disabled={updatingId === booking.id}
                            className="rounded-xl bg-[#d7f36a] px-4 py-2 text-xs font-semibold text-[#17252A] transition hover:opacity-90 disabled:opacity-50"
                          >
                            Confirm
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(booking.id, "cancelled")
                            }
                            disabled={updatingId === booking.id}
                            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition hover:opacity-90 disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </div>
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

export default AdminBookings;