import { Request, Response } from "express";
import { supabaseAdmin } from "../../config/supabase.js";

export async function getSubscribers(_req: Request, res: Response) {
  const { data, error } = await supabaseAdmin
    .from("subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({
      message: "Failed to fetch subscribers",
      error: error.message,
    });
  }

  return res.json(data);
}

export async function createSubscriber(req: Request, res: Response) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  const { data, error } = await supabaseAdmin
    .from("subscribers")
    .insert([
      {
        email,
        status: "active",
      },
    ])
    .select()
    .single();

  if (error) {
    return res.status(500).json({
      message: "Failed to create subscriber",
      error: error.message,
    });
  }

  return res.status(201).json({
    message: "Subscriber added successfully",
    data,
  });
}