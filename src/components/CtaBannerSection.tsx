import PillTag from "./PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CtaBannerSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-taawa-bg2 py-12 px-[5%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
        <div className="scroll-reveal-left">
          <PillTag className="mb-5">Start Your Journey</PillTag>
          <h2 className="font-syne font-bold text-taawa-text leading-tight mb-5" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}>
            Ready to embark on the journey of wellness?
          </h2>
          <p className="font-instrument text-taawa-muted leading-relaxed text-[0.95rem] mb-8">
            Take the first step toward a healthier, more balanced life. Our team of certified professionals is ready to guide you.
          </p>
          <a href="#contact" className="inline-flex bg-taawa-green text-white font-instrument font-medium rounded-xl px-8 py-3 outline-none hover:-translate-y-1 hover:shadow-lg hover:shadow-taawa-green/30 active:scale-[0.98] transition-all duration-300">
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




