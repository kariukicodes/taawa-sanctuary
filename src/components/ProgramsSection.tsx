import PillTag from "./PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const programs = [
  { icon: "🌊", title: "Anxiety Relief Program", desc: "Structured sessions to help manage anxiety through breathing exercises, cognitive techniques, and guided support." },
  { icon: "🎯", title: "Burnout Recovery Plan", desc: "Reclaim your energy and purpose with a comprehensive plan addressing work-life balance and stress reduction." },
  { icon: "🌸", title: "Self-Esteem Builder", desc: "Build lasting confidence through therapeutic exercises designed to reshape negative self-perceptions." },
  { icon: "⏳", title: "Emotional Resilience Track", desc: "Develop tools to navigate emotional challenges with strength, clarity, and a growth-oriented mindset." },
];

const ProgramsSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} id="programs" className="bg-taawa-bg2 py-28 px-[5%] relative overflow-hidden">
      <span className="absolute bottom-4 right-8 font-syne font-extrabold text-[12rem] text-taawa-green/[0.06] pointer-events-none select-none leading-none hidden md:block">
        Taawa
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 mb-14 max-w-6xl mx-auto relative z-10">
        <div>
          <div className="scroll-reveal mb-5"><PillTag>Our Programs</PillTag></div>
          <h2 className="scroll-reveal font-syne font-bold text-taawa-text leading-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            Structured Programs Tailored To Your Growth Journey
          </h2>
        </div>
        <div className="scroll-reveal flex items-end">
          <p className="font-instrument text-taawa-muted leading-relaxed text-[0.95rem]">
            Each program is designed by certified professionals to address specific mental health needs, combining proven methodologies with personalized care.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto relative z-10">
        {programs.map((p, i) => (
          <div
            key={i}
            className="scroll-reveal bg-white rounded-card p-8 border-2 border-transparent hover:border-taawa-lime hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            data-delay={`${i * 0.07}`}
          >
            <div className="w-[44px] h-[44px] rounded-[10px] bg-taawa-lime/20 flex items-center justify-center text-[1.25rem] mb-10">
              {p.icon}
            </div>
            <h4 className="font-syne font-bold text-taawa-text text-[1rem] mb-3">{p.title}</h4>
            <p className="font-instrument text-taawa-muted text-[0.85rem] leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgramsSection;
