import PillTag from "./PillTag";
import { RightSideTestimonials } from "./RightSideTestimonials";
import { Typewriter } from "./Typewriter";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-[100dvh] md:h-[100dvh] flex items-end overflow-hidden pt-24"
    >
      <img
        src="/heroimage.png"
        alt="Serene natural landscape"
        className="absolute inset-0 w-full h-full object-cover object-top"
        fetchPriority="high"
        loading="eager"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(23,37,42,0.88) 0%, rgba(23,37,42,0.45) 50%, rgba(23,37,42,0.08) 100%)",
        }}
      />

      <div className="relative z-10 px-5 sm:px-[5%] pb-40 sm:pb-48 md:pb-20 max-w-3xl w-full">
        <div className="">
          <PillTag className="bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6">
            Mental Wellness, Reimagined
          </PillTag>
        </div>

        <h1
          className=" font-syne font-extrabold text-white leading-[0.98] sm:leading-[1.02] tracking-tight mb-5 sm:mb-6 max-w-[11ch] sm:max-w-none"
          style={{ fontSize: "clamp(2.35rem, 8vw, 4.5rem)" }}
        >
          Find Your{" "}
          <span className="text-taawa-lime/90 font-bold">
            Light
          </span>{" "}
          Through
          <br />
          Compassionate Mental Care.
        </h1>

        <p className=" font-instrument font-light text-white/90 max-w-[34ch] sm:max-w-[440px] text-[0.98rem] md:text-lg leading-relaxed mb-8 sm:mb-12 min-h-[4.5rem] sm:min-h-[3rem]">
          <Typewriter text="Confidential, professional support to help you heal, grow, and move forward with clarity and strength." />
        </p>

        <div className=" flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 w-full sm:w-auto max-w-sm">
          <Link
            to="/book-session"
            className="inline-flex w-full sm:w-auto items-center justify-center bg-taawa-lime text-taawa-green font-instrument font-bold rounded-xl px-6 py-3.5 outline-none hover:-translate-y-1 hover:shadow-lg hover:shadow-taawa-lime/40 active:scale-[0.98] transition-all duration-300"
          >
            Book a Session
          </Link>

          <a
            href="#services"
            className="inline-flex w-full sm:w-auto items-center justify-center text-white/80 hover:text-white font-instrument font-medium text-[1.05rem] border border-white/20 hover:border-white/50 rounded-xl px-6 py-3.5 transition-all duration-300 bg-white/5 backdrop-blur-sm"
          >
            Explore Support
          </a>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto right-auto md:right-[5%] bottom-8 md:bottom-20 flex flex-col items-center z-20  w-[85%] max-w-[220px]">
        <div className="flex flex-col items-center justify-center w-full backdrop-blur-md bg-white/10 border border-white/20 p-4 sm:p-5 md:p-6 rounded-xl shadow-2xl">
          <span className="text-3xl sm:text-4xl md:text-5xl font-syne font-bold text-white mb-1">
            98%
          </span>
          <span className="text-white/80 text-xs md:text-sm font-medium text-center">
            client satisfaction
            <br />
            and improvement
          </span>
        </div>

        <RightSideTestimonials />
      </div>
    </section>
  );
};

export default HeroSection;
