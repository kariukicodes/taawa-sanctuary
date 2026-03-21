import { useState } from "react";
import { supabase, ContactSubmission, SessionBooking, NewsletterSubscriber } from "@/lib/supabase";

// ── Contact Form ──
export function useContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitContact = async (data: ContactSubmission) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase
      .from("contact_submissions")
      .insert([data]);
    if (error) {
      setError("Something went wrong. Please try again.");
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return { submitContact, loading, success, error };
}

// ── Book a Session ──
export function useSessionBooking() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitBooking = async (data: SessionBooking) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase
      .from("session_bookings")
      .insert([data]);
    if (error) {
      setError("Booking failed. Please try again.");
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return { submitBooking, loading, success, error };
}

// ── Newsletter ──
export function useNewsletter() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (data: NewsletterSubscriber) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([data]);
    if (error) {
      if (error.code === "23505") {
        setError("You're already subscribed!");
      } else {
        setError("Subscription failed. Please try again.");
      }
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return { subscribe, loading, success, error };
}