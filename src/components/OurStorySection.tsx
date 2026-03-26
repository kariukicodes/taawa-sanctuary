import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect } from "react";
import PillTag from "./PillTag";

const stats = [
  { 
    num: "12+", 
    label: "Certified Professionals",
    desc: "Empowering clients with evidence-based tools and compassionate care."
  },
  { 
    num: "98%", 
    label: "Satisfaction Rate",
    desc: "Clients report meaningful progress within their first few sessions."
  },
  { 
    num: "7+", 
    label: "Years of Experience",
    desc: "Equipping our practice with deep, research-backed therapies."
  },
  { 
    num: "150+", 
    label: "Expert Sessions Weekly",
    desc: "Providing consistent, reliable care to our community every day."
  },
];

const OurStorySection = () => {
  const ref = useScrollReveal();
  const [activeStatIndex, setActiveStatIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStatIndex((current) => (current + 1) % stats.length);
    }, 8000); // Rotates every 8 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} id="about-us" className="bg-taawa-bg2 py-16 px-[5%] lg:py-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 xl:gap-14">
        
        {/* Top Section: Text & Image Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-20 items-center">
          {/* Left Side Content */}
          <div className="scroll-reveal-left flex flex-col items-start justify-center">
            <PillTag className="mb-6">About Taawa</PillTag>

            <h2 className="font-syne font-bold text-taawa-text leading-[1.12] mb-6" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              A New Light for Your Mental <span className="font-instrument italic font-normal text-[#2a382f]">Wellbeing</span>
            </h2>

            <p className="font-instrument text-taawa-muted text-[1.05rem] leading-relaxed mb-6 max-w-[540px]">
              Taawa is devoted to guiding people toward calmer, more fulfilling lives. Our certified therapists provide, evidence-based care designed to help you grow.
            </p>
            <p className="font-instrument text-taawa-muted text-[1.05rem] leading-relaxed max-w-[540px]">
              We combine clinical expertise with compassionate care to help you take control of your mental health. <strong className="font-semibold text-taawa-text">All sessions use an Eclectic & Integrative approach — tailored specifically to you.</strong> Whether managing stress, navigating anxiety, or simply improving daily wellbeing — we're here every step of the way.
            </p>
          </div>

          {/* Right Side Image */}
          <div className="scroll-reveal-right relative">
            <div className="relative h-[350px] md:h-[550px] w-full rounded-[32px] overflow-hidden shadow-sm">
              <img 
                src="munene3.png" 
                alt="Care Illustration" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

{/* Bottom Section: Rotating Stats Strip (Mobile & Tablet) */}
        <div className="scroll-reveal lg:hidden relative w-full h-[180px] rounded-2xl bg-white/70 backdrop-blur-xl border border-taawa-green/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 p-6 flex flex-col justify-center transition-opacity duration-1000 ease-in-out ${
                i === activeStatIndex
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="font-syne font-bold text-taawa-text text-4xl">{s.num}</span>
                <span className="font-instrument font-semibold text-taawa-text text-[1.1rem] leading-tight">{s.label}</span>
              </div>
              <span className="font-instrument text-taawa-muted text-[0.95rem] leading-[1.5]">{s.desc}</span>
            </div>
          ))}
          {/* Progress Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {stats.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === activeStatIndex ? "w-6 bg-taawa-lime" : "w-1.5 bg-taawa-green/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section: Glassmorphic Stats Grid (Desktop) */}
        <div className="scroll-reveal hidden lg:grid grid-cols-4 gap-5 w-full">
          {stats.map((s, i) => (
            <div 
              key={i} 
              className="flex flex-col p-5 md:p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-taawa-green/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:border-taawa-green hover:shadow-[0_15px_40px_rgba(33,59,49,0.12)] transition-all duration-500"
            >
              <span className="font-syne font-bold text-taawa-text text-3xl mb-2">{s.num}</span>
              <span className="font-instrument font-semibold text-taawa-text text-[0.95rem] mb-1.5">{s.label}</span>
              <span className="font-instrument text-taawa-muted text-[0.85rem] leading-[1.5]">{s.desc}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurStorySection;

