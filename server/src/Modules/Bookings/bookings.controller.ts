import { Request, Response } from "express";
import { supabaseAdmin } from "../../config/supabase.js";

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

  return res.status(201).json({
    message: "Booking created successfully",
    booking: data,
  });
}