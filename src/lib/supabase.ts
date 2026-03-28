import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables! Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.");
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder-project.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

// Types matching your database tables
export type ContactSubmission = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  message: string;
};

export type SessionBooking = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  service?: string;
  preferred_date?: string;
  preferred_time?: string;
  message?: string;
};

export type NewsletterSubscriber = {
  email: string;
  name?: string;
};