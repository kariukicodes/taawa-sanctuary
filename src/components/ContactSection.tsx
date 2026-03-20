import { useState } from "react";
import PillTag from "./PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ContactSection = () => {
  const ref = useScrollReveal();
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section ref={ref} id="contact" className="bg-taawa-bg py-28 px-[5%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center max-w-6xl mx-auto">
        <div className="scroll-reveal-left">
          <PillTag className="mb-5">Contact Us</PillTag>
          <h2 className="font-syne font-bold text-taawa-text leading-tight mb-5" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            Get Connected With Our Team for Personalized Wellness Support
          </h2>
          <p className="font-instrument text-taawa-muted leading-relaxed text-[0.95rem]">
            Reach out today and take the first step toward a healthier, more balanced life. Our team is here to help.
          </p>
        </div>

        <div className="scroll-reveal-right">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white rounded-card border-[1.5px] border-taawa-sage/30 p-9 shadow-sm"
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="bg-taawa-bg3 rounded-pill px-5 py-[0.9rem] font-instrument text-[0.88rem] text-taawa-text placeholder:text-taawa-muted/60 focus:outline-none focus:border-taawa-sage border border-transparent transition-colors" />
              <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="bg-taawa-bg3 rounded-pill px-5 py-[0.9rem] font-instrument text-[0.88rem] text-taawa-text placeholder:text-taawa-muted/60 focus:outline-none focus:border-taawa-sage border border-transparent transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Mobile Number" className="bg-taawa-bg3 rounded-pill px-5 py-[0.9rem] font-instrument text-[0.88rem] text-taawa-text placeholder:text-taawa-muted/60 focus:outline-none focus:border-taawa-sage border border-transparent transition-colors" />
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="bg-taawa-bg3 rounded-pill px-5 py-[0.9rem] font-instrument text-[0.88rem] text-taawa-text placeholder:text-taawa-muted/60 focus:outline-none focus:border-taawa-sage border border-transparent transition-colors" />
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full bg-taawa-bg3 rounded-[16px] px-5 py-[0.9rem] font-instrument text-[0.88rem] text-taawa-text placeholder:text-taawa-muted/60 focus:outline-none focus:border-taawa-sage border border-transparent transition-colors mb-5 min-h-[110px] resize-none"
            />
            <button
              type="submit"
              className="bg-taawa-salmon text-white font-instrument font-medium rounded-pill px-7 py-[0.78rem] hover:-translate-y-0.5 transition-transform duration-300 w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
