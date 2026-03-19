import { useState } from "react";
import PillTag from "./PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  { q: "What types of counselling services do you offer?", a: "We offer a range of services including mindfulness coaching, stress management, individual therapy, burnout recovery, anxiety relief programs, and emotional resilience training — all tailored to your unique needs." },
  { q: "Are your counsellors licensed and certified?", a: "Yes, all our counsellors are fully licensed, certified professionals with extensive training in evidence-based therapeutic approaches and years of clinical experience." },
  { q: "How do I book my first session?", a: "Simply click the 'Book Your First Session' button or visit our contact page. You can schedule a consultation online, and our team will match you with the right professional." },
  { q: "How long does each session typically last?", a: "Standard sessions are 50 minutes. However, initial consultations may run up to 75 minutes to ensure we fully understand your needs and create a personalized plan." },
  { q: "Is everything I share kept confidential?", a: "Absolutely. Confidentiality is a cornerstone of our practice. All sessions and communications are protected under strict professional ethics and privacy regulations." },
];

const FaqSection = () => {
  const ref = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} id="faq" className="bg-taawa-bg3 py-28 px-[5%]">
      <div className="text-center mb-14">
        <div className="scroll-reveal flex justify-center mb-5"><PillTag>FAQ</PillTag></div>
        <h2 className="scroll-reveal font-syne font-bold text-taawa-text max-w-[680px] mx-auto leading-tight mb-5" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
          Frequently Asked Questions
        </h2>
        <p className="scroll-reveal font-instrument text-taawa-muted max-w-[560px] mx-auto text-[0.95rem] leading-relaxed">
          Find answers to common questions about our services, process, and approach to mental wellness.
        </p>
      </div>

      <div className="max-w-[800px] mx-auto flex flex-col gap-[0.9rem]">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`scroll-reveal bg-white border border-taawa-green/[0.12] transition-all duration-300 overflow-hidden ${
                isOpen ? "rounded-card" : "rounded-pill"
              }`}
              data-delay={`${i * 0.05}`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-instrument font-medium text-taawa-text text-[0.92rem] pr-4">{faq.q}</span>
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full border-[1.5px] flex items-center justify-center text-[1rem] font-instrument transition-all duration-300 ${
                    isOpen
                      ? "bg-taawa-salmon border-taawa-salmon text-white rotate-45"
                      : "border-taawa-salmon text-taawa-salmon"
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className="transition-all duration-300 overflow-hidden"
                style={{ maxHeight: isOpen ? "200px" : "0", opacity: isOpen ? 1 : 0 }}
              >
                <p className="px-6 pb-5 font-instrument text-taawa-muted text-[0.87rem] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSection;
