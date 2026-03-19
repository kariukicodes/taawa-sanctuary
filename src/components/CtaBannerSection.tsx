import PillTag from "./PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CtaBannerSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-taawa-peach py-20 px-[5%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
        <div className="scroll-reveal-left">
          <PillTag className="mb-5">Start Your Journey</PillTag>
          <h2 className="font-syne font-bold text-taawa-text leading-tight mb-5" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            Ready to embark on the journey of wellness?
          </h2>
          <p className="font-instrument text-taawa-muted leading-relaxed text-[0.95rem] mb-8">
            Take the first step toward a healthier, more balanced life. Our team of certified professionals is ready to guide you.
          </p>
          <a href="#contact" className="inline-flex bg-taawa-green text-white font-instrument font-medium rounded-pill px-8 py-[0.88rem] hover:-translate-y-0.5 transition-transform duration-300">
            Get Started →
          </a>
        </div>
        <div className="scroll-reveal-right">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
            alt="Community wellness group"
            className="w-full h-[300px] object-cover rounded-[28px] border-4 border-white"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default CtaBannerSection;
