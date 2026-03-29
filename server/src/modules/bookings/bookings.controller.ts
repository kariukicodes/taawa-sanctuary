import { Request, Response } from "express";
import { supabaseAdmin } from "../../Config/supabase.js";
import { getResend } from "../../config/resend.js";

export async function getBookings(req: Request, res: Response) {
  const { date } = req.query;

  let query = supabaseAdmin
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (date) {
    query = query.eq("session_date", date);
  }

  const { data, error } = await query;

  if (error) {
    return res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }

  return res.json(data);
}

export async function createBooking(req: Request, res: Response) {
  const {
    full_name,
    email,
    phone,
    service_type,
    session_date,
    session_time,
    message,
  } = req.body;

  if (
    !full_name ||
    !email ||
    !phone ||
    !service_type ||
    !session_date ||
    !session_time
  ) {
    return res.status(400).json({
      message: "Missing required booking fields",
    });
  }
const { data: existingBooking, error: existingBookingError } = await supabaseAdmin
  .from("bookings")
  .select("id, full_name, session_date, session_time, status")
  .eq("session_date", session_date)
  .eq("session_time", session_time)
  .in("status", ["pending", "confirmed"])
  .maybeSingle();

if (existingBookingError) {
  return res.status(500).json({
    message: "Failed to check existing bookings",
    error: existingBookingError.message,
  });
}

if (existingBooking) {
  return res.status(409).json({
    message: "This time slot is already booked. Please choose another time.",
  });
}
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .insert([
      {
        full_name,
        email,
        phone,
        service_type,
        session_date,
        session_time,
        message: message || null,
        status: "pending",
      },
    ])
    .select()
    .single();

  if (error) {
    return res.status(500).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }

  const resend = getResend();
  if (resend) {
    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Your Taawa counselling session booking is confirmed",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Booking Confirmed</h2>
            <p>Hi ${full_name},</p>
            <p>Your session has been booked successfully.</p>
            <p><strong>Service:</strong> ${service_type}</p>
            <p><strong>Date:</strong> ${session_date}</p>
            <p><strong>Time:</strong> ${session_time}</p>
            <p>We look forward to supporting you.</p>
            <p>— Taawa Counselling</p>
          </div>
        `,
      });

      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "kariukifrancis743@gmail.com",
        subject: `📅 New Booking — ${full_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>New Booking Received</h2>
            <p><strong>Name:</strong> ${full_name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Service:</strong> ${service_type}</p>
            <p><strong>Date:</strong> ${session_date}</p>
            <p><strong>Time:</strong> ${session_time}</p>
            <p><strong>Message:</strong> ${message || "No message"}</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Booking email failed:", emailError);
    }
  } else {
    console.warn("Skipping booking emails because RESEND_API_KEY is missing");
  }

  return res.status(201).json({
    message: "Booking created successfully",
    booking: data,
  });
}

export async function updateBookingStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["pending", "confirmed", "cancelled", "completed"];

  if (!status || !allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid booking status",
    });
  }

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({
      message: "Failed to update booking status",
      error: error.message,
    });
  }

  return res.json({
    message: "Booking status updated successfully",
    booking: data,
  });
}
