import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error: dbError } = await supabase.from("bookings").insert({
      full_name: `${form.first_name} ${form.last_name}`,
      email: form.email,
      phone: form.phone,
      message: form.message,
      service_type: "contact_inquiry",
      session_date: new Date().toISOString().split("T")[0],
      session_time: new Date().toLocaleTimeString(),
    });

    if (dbError) {
      console.error("Booking Error:", dbError);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: "kariukifrancis743@gmail.com",
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
              </div>
            </div>
          `,
        }),
      });
      toast.success("Message sent! We'll be in touch within 24 hours.");
      onClose();
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
      toast.error("Failed to send email notification.");
    } finally {
      setLoading(false);
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        message: "",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] border-2 border-taawa-accent rounded-3xl p-8 bg-white">
        <DialogHeader>
          <DialogTitle className="font-syne font-bold text-2xl text-foreground mb-2">Get Connected</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm font-instrument leading-relaxed">
            We're here to help you take the next step in your wellness journey. Leave us a message and we'll get back to you!
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              name="first_name"
              placeholder="First Name"
              required
              onChange={handleChange}
              value={form.first_name}
              className="border-taawa-lightest font-instrument"
            />
            <Input
              name="last_name"
              placeholder="Last Name"
              required
              onChange={handleChange}
              value={form.last_name}
              className="border-taawa-lightest font-instrument"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              name="phone"
              placeholder="Mobile Number"
              type="tel"
              onChange={handleChange}
              value={form.phone}
              className="border-taawa-lightest font-instrument"
            />
            <Input
              name="email"
              placeholder="Email Address"
              type="email"
              required
              onChange={handleChange}
              value={form.email}
              className="border-taawa-lightest font-instrument"
            />
          </div>

          <Textarea
            name="message"
            placeholder="Message"
            required
            rows={4}
            onChange={handleChange}
            value={form.message}
            className="border-taawa-lightest resize-none font-instrument"
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-taawa-salmon text-white font-medium py-3 rounded-full hover:bg-taawa-salmon2 transition-all flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}