import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function ContactSection() {
  const [form, setForm] = useState({
    first_name: "", last_name: "",
    email: "", phone: "", message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Save to Supabase
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert([form]);

    if (dbError) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    // Send email notification via Resend
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: "your@email.com", // 👈 replace with your email
          subject: `📩 New Contact — ${form.first_name} ${form.last_name}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
              <div style="background:#1c3028;padding:24px;border-radius:12px 12px 0 0;">
                <h2 style="color:#7aaa88;margin:0;">New Contact Submission</h2>
                <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:13px;">Taawa Counselling</p>
              </div>
              <div style="background:#f4f6f4;padding:24px;border-radius:0 0 12px 12px;border:1px solid #dce8de;">
                <p><strong>Name:</strong> ${form.first_name} ${form.last_name}</p>
                <p><strong>Email:</strong> <a href="mailto:${form.email}">${form.email}</a></p>
                <p><strong>Phone:</strong> ${form.phone || "Not provided"}</p>
                <p><strong>Message:</strong><br/>${form.message}</p>
                <a href="mailto:${form.email}" 
                   style="display:inline-block;margin-top:16px;background:#1c3028;color:#7aaa88;padding:10px 20px;border-radius:100px;text-decoration:none;font-size:13px;">
                  Reply to ${form.first_name} →
                </a>
              </div>
            </div>
          `,
        }),
      });
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
    }

    setSuccess(true);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="bg-taawa-bg3 py-28 px-[5%]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Left */}
        <div>
          <div className="pill mb-5">
            <span className="pill-dot" />
            Contact Us
          </div>
          <h2 className="font-syne font-bold text-display-md text-taawa-text mb-5">
            Get Connected With Our Team for Personalized Wellness Support
          </h2>
          <p className="text-taawa-muted text-[0.92rem] leading-[1.85]">
            We're here to help you take the next step in your wellness journey.
            Contact us for consultations, questions, or guidance.
          </p>
        </div>

        {/* Right — Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-card border border-taawa-lime/30 p-9 shadow-float"
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input name="first_name" placeholder="First Name" required
              onChange={handleChange}
              className="f-input col-span-1" />
            <input name="last_name" placeholder="Last Name" required
              onChange={handleChange}
              className="f-input col-span-1" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input name="phone" placeholder="Mobile Number" type="tel"
              onChange={handleChange}
              className="f-input col-span-1" />
            <input name="email" placeholder="Email Address" type="email" required
              onChange={handleChange}
              className="f-input col-span-1" />
          </div>
          <textarea name="message" placeholder="Message" required rows={4}
            onChange={handleChange}
            className="f-input w-full rounded-[16px] mb-4 resize-none" />

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          {success ? (
            <div className="bg-taawa-bg2 text-taawa-green rounded-full px-5 py-3 text-sm font-medium text-center">
              ✓ Message sent! We'll be in touch within 24 hours.
            </div>
          ) : (
            <button type="submit" disabled={loading}
              className="bg-taawa-salmon text-white font-medium py-3 px-6 rounded-full w-full hover:bg-taawa-salmon2 transition-all">
              {loading ? "Sending..." : "Send Message"}
            </button>
          )}
        </form>
      </div>
    </section>
  );
}