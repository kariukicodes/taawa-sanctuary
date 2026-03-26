import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PillTag from "@/components/PillTag";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { services as allServices } from "@/data/servicesData";

const categoriesList = [
  { id: "core", name: "Core Support", icon: "🧠", desc: "Individual counselling, trauma healing, and core emotional support." },
  { id: "relationships", name: "Relationships", icon: "💑", desc: "Relationship counselling, dating support, and couples therapy." },
  { id: "growth", name: "Growth & Coaching", icon: "🌱", desc: "Self-esteem, career transitions, and life coaching." },
  { id: "identity", name: "Identity & Inclusion", icon: "🏳️‍🌈", desc: "LGBTQ+ affirmative counselling and identity support." },
  { id: "specialist", name: "Specialist Programs", icon: "🎓", desc: "Student support, group therapy, and corporate wellness." }
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM",
];

const bookingSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().optional(),
  message: z.string().max(1000).optional(),
});

const BookSession = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const canGoNext = () => {
    if (step === 1) return !!selectedCategory;
    if (step === 2) return !!selectedService;
    if (step === 3) return !!selectedDate && !!selectedTime;
    if (step === 4) return !!form.fullName && !!form.email;
    return false;
  };

  const handleNext = () => {
    if (step === 4) {
      handleSubmit();
      return;
    }
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    const result = bookingSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => {
        fieldErrors[e.path[0] as string] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const { error } = await supabase.from("bookings").insert({
      full_name: result.data.fullName,
      email: result.data.email,
      phone: result.data.phone || null,
      service_type: selectedService,
      session_date: format(selectedDate!, "yyyy-MM-dd"),
      session_time: selectedTime,
      message: result.data.message || null,
    });

    setSubmitting(false);
    if (error) {
        console.error("Booking Error:", error);
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
          to: "kariukifrancis743@gmail.com",
          subject: `📅 New Booking — ${result.data.fullName}`,
          html: `<div style="font-family:sans-serif"><h2>Session Booked</h2></div>`,
        }),
      });
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
    }

    setStep(5);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const inputClass =
    "w-full bg-taawa-bg2 rounded-xl px-5 py-[0.9rem] font-instrument text-[0.88rem] text-taawa-text placeholder:text-taawa-muted/60 focus:outline-none focus:border-taawa-sage border border-transparent transition-colors";

  return (
    <>
      <Navbar />
      <section className="bg-taawa-bg pt-36 pb-28 px-[5%] min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <PillTag className="mb-5">Book a Session</PillTag>
            <h1
              className="font-syne font-bold text-taawa-text leading-tight mb-4"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              {step === 5 ? "Booking Confirmed!" : "Schedule Your Wellness Session"}
            </h1>
            {step < 5 && (
              <p className="font-instrument text-taawa-muted text-[0.95rem]">
                Step {step} of 4 — {step === 1 ? "Choose a category" : step === 2 ? "Choose a service" : step === 3 ? "Pick a date & time" : "Your details"}
              </p>
            )}
          </div>

          {/* Progress bar */}
          {step < 5 && (
            <div className="flex gap-2 mb-10 max-w-md mx-auto">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full flex-1 transition-colors duration-300 ${
                    s <= step ? "bg-taawa-lime" : "bg-taawa-green/10"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Step 1: Category Selection */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categoriesList.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedCategory(s.id)}
                  className={`text-left rounded-card p-5 border-2 transition-all duration-300 hover:-translate-y-0.5 ${
                    selectedCategory === s.id
                      ? "border-taawa-lime bg-taawa-lime/10 shadow-md"
                      : "border-taawa-green/15 bg-white shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="text-2xl mb-3">{s.icon}</div>
                  <h3 className="font-syne font-bold text-taawa-text text-[0.95rem] mb-1">{s.name}</h3>
                  <p className="font-instrument text-taawa-muted text-[0.82rem] leading-relaxed">{s.desc}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Service Selection */}
          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allServices.filter(s => s.category === selectedCategory).map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedService(s.title)}
                  className={`text-left rounded-card p-5 border-2 transition-all duration-300 hover:-translate-y-0.5 ${
                    selectedService === s.title
                      ? "border-taawa-lime bg-taawa-lime/10 shadow-md"
                      : "border-taawa-green/15 bg-white shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="text-2xl mb-3">{s.icon}</div>
                  <h3 className="font-syne font-bold text-taawa-text text-[0.95rem] mb-1">{s.title}</h3>
                  <p className="font-instrument text-taawa-muted text-[0.82rem] leading-relaxed line-clamp-2">{s.tagline}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-card p-6 border border-taawa-green/15 shadow-sm">
                <h3 className="font-syne font-bold text-taawa-text text-[0.95rem] mb-4">Select a Date</h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className={cn(
                        "w-full flex items-center gap-3 rounded-xl px-5 py-[0.9rem] font-instrument text-[0.88rem] border border-taawa-green/10 bg-taawa-bg2 text-left",
                        !selectedDate && "text-taawa-muted/60"
                      )}
                    >
                      <CalendarIcon className="w-4 h-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="bg-white rounded-card p-6 border border-taawa-green/15 shadow-sm">
                <h3 className="font-syne font-bold text-taawa-text text-[0.95rem] mb-4">Select a Time</h3>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`rounded-xl px-4 py-2.5 font-instrument text-[0.82rem] border transition-all duration-200 ${
                        selectedTime === t
                          ? "border-taawa-lime bg-taawa-lime/20 text-taawa-green font-medium"
                          : "border-taawa-green/10 bg-taawa-bg2 text-taawa-muted hover:border-taawa-green/20"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Contact Details */}
          {step === 4 && (
            <div className="bg-white rounded-card p-8 max-w-lg mx-auto border border-taawa-sage/25 shadow-md">
              <div className="space-y-4">
                <div>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    className={inputClass}
                  />
                  {errors.fullName && <p className="text-taawa-salmon text-[0.75rem] mt-1 pl-5">{errors.fullName}</p>}
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    className={inputClass}
                  />
                  {errors.email && <p className="text-taawa-salmon text-[0.75rem] mt-1 pl-5">{errors.email}</p>}
                </div>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number (optional)"
                  className={inputClass}
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Anything you'd like us to know? (optional)"
                  className="w-full bg-taawa-bg2 rounded-[16px] px-5 py-[0.9rem] font-instrument text-[0.88rem] text-taawa-text placeholder:text-taawa-muted/60 focus:outline-none focus:border-taawa-sage border border-transparent transition-colors min-h-[100px] resize-none"
                />

                {/* Booking summary */}
                <div className="bg-taawa-bg2 rounded-card p-5 mt-2 border border-taawa-green/15">
                  <h4 className="font-syne font-bold text-taawa-text text-[0.85rem] mb-3">Booking Summary</h4>
                  <div className="space-y-1.5 font-instrument text-[0.82rem]">
                    <p><span className="text-taawa-muted">Service:</span> <span className="text-taawa-text font-medium">{selectedService}</span></p>
                    <p><span className="text-taawa-muted">Date:</span> <span className="text-taawa-text font-medium">{selectedDate ? format(selectedDate, "PPP") : ""}</span></p>
                    <p><span className="text-taawa-muted">Time:</span> <span className="text-taawa-text font-medium">{selectedTime}</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div className="text-center bg-white rounded-card p-10 max-w-lg mx-auto border border-taawa-lime/30 shadow-md">
              <div className="w-16 h-16 bg-taawa-lime/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✓</span>
              </div>
              <h2 className="font-syne font-bold text-taawa-text text-xl mb-3">You're All Set!</h2>
              <p className="font-instrument text-taawa-muted text-[0.92rem] leading-relaxed mb-6">
                Your {selectedService} session has been booked for{" "}
                <strong className="text-taawa-text">{selectedDate ? format(selectedDate, "PPP") : ""}</strong> at{" "}
                <strong className="text-taawa-text">{selectedTime}</strong>. We'll send a confirmation to{" "}
                <strong className="text-taawa-text">{form.email}</strong>.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => navigate("/")}
                  className="bg-taawa-green text-white font-instrument font-medium rounded-xl px-8 py-3 outline-none hover:-translate-y-1 hover:shadow-lg hover:shadow-taawa-green/30 active:scale-[0.98] transition-all duration-300"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => { setStep(1); setSelectedService(""); setSelectedDate(undefined); setSelectedTime(""); setForm({ fullName: "", email: "", phone: "", message: "" }); }}
                  className="bg-taawa-lime text-taawa-green font-instrument font-bold rounded-xl px-8 py-3 outline-none hover:-translate-y-1 hover:shadow-lg hover:shadow-taawa-lime/40 active:scale-[0.98] transition-all duration-300"
                >
                  Book Another
                </button>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          {step < 5 && (
            <div className="flex justify-between mt-10 max-w-lg mx-auto">
              <button
                onClick={() => setStep((s) => s - 1)}
                className={`font-instrument text-taawa-muted text-[0.88rem] px-6 py-2.5 rounded-xl border border-taawa-green/10 hover:-translate-y-0.5 transition-all duration-300 ${
                  step === 1 ? "invisible" : ""
                }`}
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canGoNext() || submitting}
                className="bg-taawa-lime text-taawa-green font-instrument font-bold rounded-xl px-8 py-3 outline-none hover:-translate-y-1 hover:shadow-lg hover:shadow-taawa-lime/40 active:scale-[0.98] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? "Booking..." : step === 4 ? "Confirm Booking" : "Continue →"}
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BookSession;



