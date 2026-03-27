const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createBooking(payload: {
  full_name: string;
  email: string;
  phone: string;
  service_type: string;
  session_date: string;
  session_time: string;
  message?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create booking");
  }

  return data;
}