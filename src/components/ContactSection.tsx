import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import PillTag from "./PillTag";

export default function ContactSection() {
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

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: `${form.first_name} ${form.last_name}`,
          email: form.email,
          phone: form.phone || null,
          subject: "Contact Inquiry",
          message: form.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      // ✅ Optional email notification (keep your current logic)
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
              <div style="font-family:sans-serif">
                <h2>New Contact Submission</h2>
                <p><strong>Name:</strong> ${form.first_name} ${form.last_name}</p>
                <p><strong>Email:</strong> ${form.email}</p>
                <p><strong>Phone:</strong> ${form.phone || "Not provided"}</p>
                <p><strong>Message:</strong><br/>${form.message}</p>
              </div>
            `,
          }),
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }

      toast.success("Message sent! We'll be in touch within 24 hours.");

      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        message: "",
      });

    } catch (err) {
      console.error("Message Error:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="bg-taawa-lightest py-12 px-[5%]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div>
            <PillTag>Contact Us</PillTag>
            <h2 className="font-syne font-bold text-3xl md:text-4xl text-foreground mt-6 mb-6">
              Get Connected With Our Team for Personalized Wellness Support
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              We're here to help you take the next step in your wellness journey. Contact us for consultations, questions, or guidance. Our support team and professionals are available to ensure you feel heard, valued, and supported.
            </p>
          </div>

          {/* Right Form */}
          <form
            onSubmit={handleSubmit}
            className="border-2 border-taawa-accent rounded-3xl p-8 bg-white space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                name="first_name"
                placeholder="First Name"
                required
                onChange={handleChange}
                value={form.first_name}
                className="border-taawa-lightest"
              />
              <Input
                name="last_name"
                placeholder="Last Name"
                required
                onChange={handleChange}
                value={form.last_name}
                className="border-taawa-lightest"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                name="phone"
                placeholder="Mobile Number"
                type="tel"
                onChange={handleChange}
                value={form.phone}
                className="border-taawa-lightest"
              />
              <Input
                name="email"
                placeholder="Email Address"
                type="email"
                required
                onChange={handleChange}
                value={form.email}
                className="border-taawa-lightest"
              />
            </div>

            <Textarea
              name="message"
              placeholder="Message"
              required
              rows={5}
              onChange={handleChange}
              value={form.message}
              className="border-taawa-lightest resize-none"
            />

            <Button
              type="submit"
              disabled={loading}
              className="bg-taawa-salmon text-white font-medium py-3 px-6 rounded-full hover:bg-taawa-salmon2 transition-all inline-flex items-center gap-2 hover:-translate-y-0.5 h-auto"
              size={"lg"}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}



