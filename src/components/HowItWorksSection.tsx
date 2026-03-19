import PillTag from "./PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const leftSteps = [
  { num: 1, title: "Book a Session", desc: "Choose a time that works for you and schedule your first consultation online." },
  { num: 3, title: "Follow Your Plan", desc: "Stick to your custom wellness plan with ongoing check-ins and support." },
];
const rightSteps = [
  { num: 2, title: "Meet Your Expert", desc: "Connect with a certified professional who understands your unique needs." },
  { num: 4, title: "Transform Your Mindset", desc: "Experience lasting growth and develop a healthier, more resilient mindset." },
];

const StepCard = ({ num, title, desc, align }: { num: number; title: string; desc: string; align: "left" | "right" }) => (
  <div className={`mb-10 ${align === "right" ? "text-left" : "text-right"}`}>
    <span className="inline-block bg-taawa-salmon text-white font-instrument font-medium text-[0.72rem] rounded-pill px-4 py-1.5 mb-3">
      Step {num}
    </span>
    <h3 className="font-syne font-bold text-taawa-text text-[1.1rem] mb-2">{title}</h3>
    <p className={`font-instrument text-taawa-muted text-[0.85rem] leading-relaxed max-w-[260px] ${align === "right" ? "" : "ml-auto"}`}>
      {desc}
    </p>
  </div>
);

const HowItWorksSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-taawa-bg3 py-28 px-[5%]">
      <div className="text-center mb-16">
        <div className="scroll-reveal flex justify-center mb-5"><PillTag>How It Works</PillTag></div>
        <h2 className="scroll-reveal font-syne font-bold text-taawa-text max-w-[680px] mx-auto leading-tight mb-5" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
          Your Path to Wellness in Four Simple Steps
        </h2>
        <p className="scroll-reveal font-instrument text-taawa-muted max-w-[560px] mx-auto text-[0.95rem] leading-relaxed">
          We've simplified the process so you can focus on what matters most — your healing journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
        <div className="scroll-reveal-left">
          {leftSteps.map((s) => (
            <StepCard key={s.num} {...s} align="right" />
          ))}
        </div>

        <div className="scroll-reveal flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80"
            alt="Wellness professional"
            className="w-[300px] h-[400px] object-cover rounded-[28px] border-4 border-white shadow-xl"
            loading="lazy"
          />
        </div>

        <div className="scroll-reveal-right">
          {rightSteps.map((s) => (
            <StepCard key={s.num} {...s} align="left" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
