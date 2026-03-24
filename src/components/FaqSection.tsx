import { useState } from "react";
import PillTag from "./PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  { 
    q: "What types of counselling services do you offer?", 
    a: "We offer a range of specialized services including mindfulness coaching, stress management, individual holistic therapy, burnout recovery tailored for professionals, anxiety relief programs, and emotional resilience training. Our approach is entirely personalized to integrate seamlessly with your unique lifestyle and mental wellness journey." 
  },
  { 
    q: "Are the therapists licensed and certified?", 
    a: "Absolutely. All of our therapists, counselors, and mindfulness coaches are fully licensed practitioners with extensive clinical experience. They possess advanced certifications in their respective modalities and participate in ongoing training to ensure you receive the most effective, evidence-based care in a safe environment." 
  },
  { 
    q: "How do I book my first session?", 
    a: "Booking your first session is seamless. Simply click the 'Book Your First Session' button anywhere on our website, navigate to our scheduling portal, and select an available time slot that fits your schedule. Our onboarding team will then reach out to pair you with the best-suited professional." 
  },
  { 
    q: "How long does each session take?", 
    a: "A standard individual therapy session lasts for 50 minutes, providing dedicated time to dive deep into discussions and exercises. However, initial intake consultations may be scheduled for up to 75 minutes to ensure we thoroughly understand your background and can develop a comprehensive, long-term plan." 
  },
  { 
    q: "Is my personal information kept confidential?", 
    a: "Your privacy is our utmost priority. We operate under strict confidentiality agreements and adhere to global healthcare privacy standards (including HIPAA). All session notes, personal details, and communications are encrypted and kept strictly confidential between you and your practitioner." 
  },
];

const FaqSection = () => {
  const ref = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} id="faq" className="bg-taawa-bg2 py-16 px-[5%]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
        
        {/* Left Column: Heading & Contact Card */}
        <div className="w-full lg:w-[40%] scroll-reveal pr-0 lg:pr-4">
          <div className="flex mb-6">
            <PillTag>FAQ</PillTag>
          </div>
          
          <h2 className="scroll-reveal font-syne font-bold text-taawa-text leading-tight mb-8" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}>
            Frequently Asked<br />Questions
          </h2>
          
          {/* Booking Card from inspiration */}
          <div className="scroll-reveal bg-white rounded-3xl p-8 shadow-sm relative overflow-hidden border border-gray-100/50">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-6 bg-gray-100">
              <img 
                src="munenewahome.png" 
                alt="Support Agent" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <h3 className="font-syne font-semibold text-2xl text-taawa-text mb-3">
              Book a 15 min call
            </h3>
            
            <p className="font-instrument text-taawa-muted text-[1.05rem] leading-relaxed mb-8">
              If you have any questions, just book a 15-minute introductory call before scheduling.
            </p>
            
            <button className="w-full bg-taawa-salmon hover:-translate-y-1 hover:shadow-lg hover:shadow-taawa-salmon/30 active:scale-[0.98] transition-all duration-300 text-white font-instrument font-medium py-3.5 rounded-xl text-[1.05rem]">
              Book a Free Call
            </button>
          </div>
        </div>

        {/* Right Column: FAQ Accordion */}
        <div className="w-full lg:w-[60%] flex flex-col gap-4 mt-4 lg:mt-0">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="scroll-reveal bg-white rounded-[20px] transition-all duration-300 shadow-sm border border-gray-50 hover:border-gray-100"
                data-delay={`${i * 0.05}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 sm:px-8 py-5 sm:py-6 text-left group"
                >
                  <span className={`font-instrument text-[1.1rem] pr-6 transition-colors duration-200 ${isOpen ? "text-taawa-text font-medium" : "text-taawa-text/70"}`}>
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 flex items-center justify-center text-2xl transition-transform duration-300 origin-center text-taawa-text/40 ${
                      isOpen ? "rotate-45 !text-taawa-text" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows,opacity] duration-300 ease-in-out px-5 sm:px-8"
                  style={{ 
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                    paddingBottom: isOpen ? "1.5rem" : "0"
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="font-instrument text-taawa-muted text-[0.95rem] leading-relaxed max-w-[95%]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;




