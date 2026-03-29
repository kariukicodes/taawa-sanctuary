import { useEffect, useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer, type Event } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  parseISO,
  addMinutes,
} from "date-fns";
import enUS from "date-fns/locale/en-US";
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

type CalendarEvent = Event & {
  resource?: Booking;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function parseBookingDateTime(date: string, time: string) {
  return parse(`${date} ${time}`, "yyyy-MM-dd h:mm a", new Date());
}

const AdminCalendar = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
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
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const events: CalendarEvent[] = useMemo(() => {
    return bookings.map((booking) => {
      const start = parseBookingDateTime(
        booking.session_date,
        booking.session_time
      );
      const end = addMinutes(start, 60);

      return {
        title: `${booking.full_name} — ${booking.service_type}`,
        start,
        end,
        resource: booking,
      };
    });
  }, [bookings]);

  const eventStyleGetter = (event: CalendarEvent) => {
    const status = event.resource?.status;

    let backgroundColor = "#d7f36a";
    let color = "#17252A";
    let borderColor = "#d7f36a";

    if (status === "pending") {
      backgroundColor = "#FEF3C7";
      color = "#92400E";
      borderColor = "#FCD34D";
    }

    if (status === "confirmed") {
      backgroundColor = "#DCFCE7";
      color = "#166534";
      borderColor = "#86EFAC";
    }

    if (status === "cancelled") {
      backgroundColor = "#FEE2E2";
      color = "#991B1B";
      borderColor = "#FCA5A5";
    }

    if (status === "completed") {
      backgroundColor = "#DBEAFE";
      color = "#1D4ED8";
      borderColor = "#93C5FD";
    }

    return {
      style: {
        backgroundColor,
        color,
        border: `1px solid ${borderColor}`,
        borderRadius: "12px",
        padding: "2px 6px",
      },
    };
  };

  return (
    <AdminLayout
      title="Calendar"
      description="View session bookings in a weekly or monthly calendar."
    >
      {loading && (
        <div className="rounded-3xl border border-[#e6ece8] bg-white p-8 shadow-sm">
          <p className="text-[#5f6f68]">Loading calendar...</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
          <div className="overflow-hidden rounded-3xl border border-[#e6ece8] bg-white p-4 shadow-sm">
            <div className="h-[750px]">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={["month", "week", "day"]}
                defaultView="week"
                step={30}
                timeslots={2}
                popup
                eventPropGetter={eventStyleGetter}
                onSelectEvent={(event) => {
                  if (event.resource) {
                    setSelectedBooking(event.resource);
                  }
                }}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-[#e6ece8] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#17252A]">
              Booking Details
            </h2>

            {!selectedBooking ? (
              <p className="mt-4 text-sm text-[#5f6f68]">
                Select a booking from the calendar to view its details.
              </p>
            ) : (
              <div className="mt-4 space-y-3 text-sm text-[#17252A]">
                <p>
                  <span className="font-semibold">Client:</span>{" "}
                  {selectedBooking.full_name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedBooking.email}
                </p>
                {selectedBooking.phone && (
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {selectedBooking.phone}
                  </p>
                )}
                <p>
                  <span className="font-semibold">Service:</span>{" "}
                  {selectedBooking.service_type}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {selectedBooking.session_date}
                </p>
                <p>
                  <span className="font-semibold">Time:</span>{" "}
                  {selectedBooking.session_time}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="capitalize">{selectedBooking.status}</span>
                </p>
                <p>
                  <span className="font-semibold">Message:</span>{" "}
                  {selectedBooking.message || "No message provided"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCalendar;