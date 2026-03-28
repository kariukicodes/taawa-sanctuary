import { Request, Response } from "express";
import { supabaseAdmin } from "../../Config/supabase.js";

export async function getMessages(_req: Request, res: Response) {
  const { data, error } = await supabaseAdmin
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({
      message: "Failed to fetch messages",
      error: error.message,
    });
  }

  return res.json(data);
}

export async function createMessage(req: Request, res: Response) {
  const { full_name, email, phone, subject, message } = req.body;

  if (!full_name || !email || !subject || !message) {
    return res.status(400).json({
      message: "Missing required message fields",
    });
  }

  const { data, error } = await supabaseAdmin
    .from("messages")
    .insert([
      {
        full_name,
        email,
        phone: phone || null,
        subject,
        message,
        status: "unread",
      },
    ])
    .select()
    .single();

  if (error) {
    return res.status(500).json({
      message: "Failed to create message",
      error: error.message,
    });
  }

  return res.status(201).json({
    message: "Message sent successfully",
    data,
  });
}

export async function updateMessageStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["unread", "read", "replied"];

  if (!status || !allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid message status",
    });
  }

  const { data, error } = await supabaseAdmin
    .from("messages")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({
      message: "Failed to update message status",
      error: error.message,
    });
  }

  return res.json({
    message: "Message status updated successfully",
    data,
  });
}