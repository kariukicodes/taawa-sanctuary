import { useScrollReveal } from "@/hooks/useScrollReveal";
import PillTag from "./PillTag";

const steps = [
  { num: "01", title: "Book a Session", desc: "Choose a time that works for you and schedule your first consultation online." },
  { num: "02", title: "Meet Your Expert", desc: "Connect with a certified professional who understands your unique needs." },
  { num: "03", title: "Follow Your Plan", desc: "Stick to your custom wellness plan with ongoing check-ins and support." },
  { num: "04", title: "Transform Your Mindset", desc: "Experience lasting growth and develop a healthier, more resilient mindset." },
];

const HowItWorksSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-taawa-bg py-16 lg:py-20 px-[5%] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="scroll-reveal flex justify-center mb-6">
            <PillTag>How It Works</PillTag>
          </div>
          
          <h2 className="scroll-reveal font-syne font-bold text-taawa-text leading-tight mb-5" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Your Path to Wellness in Four <span className="font-instrument italic font-normal text-taawa-sage">Simple Steps</span>
          </h2>
          
          <p className="scroll-reveal font-instrument text-taawa-muted max-w-[560px] mx-auto text-[1.05rem] leading-relaxed">
            We've simplified the process so you can focus on what matters most — your healing journey.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Continuous Line Background (Desktop) */}
          <div className="absolute top-[32px] left-[10%] right-[10%] h-[1px] bg-taawa-sage/30 hidden md:block z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((s, i) => (
              <div 
                key={s.num} 
                className="scroll-reveal flex flex-col items-center text-center group"
                data-delay={`${i * 0.1}`}
              >
                {/* Step Node */}
                <div className="w-[64px] h-[64px] rounded-full bg-taawa-green flex items-center justify-center text-white text-[1.25rem] font-syne font-medium mb-6 shadow-md transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_15px_30px_rgba(23,37,42,0.15)] relative">
                  {s.num}
                  {/* Small connector line for mobile (hidden on desktop) */}
                  {i !== steps.length - 1 && (
                    <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[1px] h-12 bg-taawa-sage/30 md:hidden"></div>
                  )}
                </div>

                {/* Step Content */}
                <h3 className="font-syne font-semibold text-taawa-text text-[1.15rem] mb-3">
                  {s.title}
                </h3>
                <p className="font-instrument text-taawa-muted text-[0.95rem] leading-[1.6] max-w-[240px]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;

