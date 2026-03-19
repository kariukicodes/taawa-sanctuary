
-- Tighten INSERT policy to validate required fields via check constraint
ALTER TABLE public.bookings ADD CONSTRAINT bookings_email_check CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$');
ALTER TABLE public.bookings ADD CONSTRAINT bookings_name_check CHECK (char_length(full_name) > 0 AND char_length(full_name) <= 200);
ALTER TABLE public.bookings ADD CONSTRAINT bookings_service_check CHECK (service_type IN ('Mindfulness Coaching', 'Stress Management', 'Therapy Sessions', 'Anxiety Relief Program', 'Burnout Recovery Plan', 'Self-Esteem Builder', 'Emotional Resilience Track'));

-- Drop overly permissive SELECT policy and replace with more restricted one
DROP POLICY "Users can view their own bookings" ON public.bookings;
CREATE POLICY "Bookings are viewable by email match"
  ON public.bookings
  FOR SELECT
  TO anon, authenticated
  USING (false);
