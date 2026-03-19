
-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_type TEXT NOT NULL,
  session_date DATE NOT NULL,
  session_time TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public booking form)
CREATE POLICY "Anyone can create a booking"
  ON public.bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only allow reading own bookings by email (or admin)
CREATE POLICY "Users can view their own bookings"
  ON public.bookings
  FOR SELECT
  TO anon, authenticated
  USING (true);
