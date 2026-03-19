import PillTag from "./PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const HeroSection = () => {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=80"
        alt="Serene natural landscape"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(45,61,30,0.88) 0%, rgba(45,61,30,0.45) 50%, rgba(45,61,30,0.10) 100%)",
        }}
      />
      <div className="relative z-10 px-[5%] pb-20 max-w-3xl">
        <div className="scroll-reveal">
          <PillTag className="border-taawa-lime/30 text-white/80 bg-white/10 mb-6">
            Find Peace, Strength, and Clarity
          </PillTag>
        </div>
        <h1 className="scroll-reveal font-syne font-extrabold text-white leading-[1.08] mb-6" style={{ fontSize: "clamp(2.8rem, 5vw, 5.4rem)" }}>
          Mindful{" "}
          <em className="text-taawa-lime not-italic" style={{ fontStyle: "italic" }}>
            Healing
          </em>{" "}
          Practices for Your Mental Health
        </h1>
        <p className="scroll-reveal font-instrument font-light text-white/[0.68] max-w-[440px] text-[1.05rem] leading-relaxed mb-8">
          Compassionate, evidence-driven support to help you navigate life's challenges with clarity and resilience.
        </p>
        <a
          href="#contact"
          className="scroll-reveal inline-flex bg-taawa-lime text-taawa-green font-instrument font-semibold rounded-pill px-7 py-[0.9rem] hover:-translate-y-0.5 transition-transform duration-300 text-[0.95rem]"
        >
          Start Your Journey →
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
