import PillTag from "./PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RightSideTestimonials } from "./RightSideTestimonials";
import { Typewriter } from "./Typewriter";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative h-[100dvh] flex items-end overflow-hidden pt-24"
    >
      <img
        src="/heroimage.png"
        alt="Serene natural landscape"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
          "linear-gradient(to top, rgba(23,37,42,0.88) 0%, rgba(23,37,42,0.45) 50%, rgba(23,37,42,0.08) 100%)",
        }}
      />
      <div className="relative z-10 px-[5%] pb-[18rem] md:pb-20 max-w-3xl w-full">
        <div className="scroll-reveal">
          <PillTag className="bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6">
            Mental Wellness, Reimagined
          </PillTag>
        </div>
        <h1 className="scroll-reveal font-syne font-extrabold text-white leading-[1.05] tracking-tight mb-6" style={{ fontSize: "clamp(2.75rem, 5vw, 4.5rem)" }}>
          Find Your{" "}
          <span className="text-taawa-lime/90 font-bold">
            Light 
          </span>{" "}
          Through
          <br />
          Compassionate Mental Care.
        </h1>
        <p className="scroll-reveal font-instrument font-light text-white/90 max-w-[440px] text-base md:text-lg leading-relaxed mb-12 min-h-[3rem]">
          <Typewriter text="Confidential, professional support to help you heal, grow, and move forward with clarity and strength." />
        </p>
        <div className="scroll-reveal flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Link
            to="/book-session"
            className="inline-flex items-center justify-center bg-taawa-lime text-taawa-green font-instrument font-bold rounded-xl px-6 py-3 outline-none hover:-translate-y-1 hover:shadow-lg hover:shadow-taawa-lime/40 active:scale-[0.98] transition-all duration-300"
          >
            Book a Session
          </Link>
          <a
            href="#services"
            className="inline-flex items-center justify-center text-white/80 hover:text-white font-instrument font-medium text-[1.05rem] border border-white/20 hover:border-white/50 rounded-xl px-6 py-3 transition-all duration-300 bg-white/5 backdrop-blur-sm"
          >
            Explore Support
          </a>
        </div>
      </div>

      {/* Right lower side floating stack */}
      <div className="absolute right-[5%] bottom-8 md:bottom-20 flex flex-col items-center z-20 scroll-reveal w-full max-w-[200px]">
        {/* Stat card */}
        <div className="flex flex-col items-center justify-center w-full backdrop-blur-md bg-white/10 border border-white/20 p-5 md:p-6 rounded-xl shadow-2xl">
          <span className="text-4xl md:text-5xl font-syne font-bold text-white mb-1">98%</span>
          <span className="text-white/80 text-xs md:text-sm font-medium text-center">
            client satisfaction<br/>and improvement
          </span>
        </div>
        
        {/* Testimonials */}
        <RightSideTestimonials />
      </div>
    </section>
  );
};

export default HeroSection;





