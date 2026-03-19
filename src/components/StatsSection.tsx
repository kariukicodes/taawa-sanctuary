import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  { num: "150+", label: "Expert Sessions Weekly", top: "0%", left: "5%" },
  { num: "98%", label: "Client Satisfaction", top: "0%", left: "45%" },
  { num: "12+", label: "Certified Professionals", top: "48%", left: "5%" },
  { num: "16+", label: "Years of Experience", top: "48%", left: "45%" },
];

const values = ["Compassion", "Integrity", "Mindful Growth"];

const StatsSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-taawa-bg3 py-24 px-[5%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center max-w-6xl mx-auto">
        <div className="scroll-reveal-left relative h-[340px] mx-auto w-full max-w-[400px]">
          {stats.map((s, i) => (
            <div
              key={i}
              className="absolute w-[185px] h-[185px] rounded-full flex flex-col items-center justify-center text-center"
              style={{
                top: s.top,
                left: s.left,
                backgroundColor: `rgba(45,61,30,${[0.75, 0.60, 0.50, 0.65][i]})`,
              }}
            >
              <span className="font-syne font-extrabold text-taawa-lime text-[2rem]">{s.num}</span>
              <span className="text-white font-instrument text-[0.75rem] max-w-[100px] leading-tight mt-1">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="scroll-reveal-right">
          <blockquote className="font-syne font-medium text-taawa-text leading-[1.55] mb-8" style={{ fontSize: "clamp(1.1rem, 2vw, 1.45rem)" }}>
            "Taawa is devoted to guiding people toward calmer, more fulfilling lives through compassionate support, expert care, and evidence-driven wellness practices."
          </blockquote>
          <div className="flex flex-wrap gap-3">
            {values.map((v) => (
              <span
                key={v}
                className="inline-flex items-center gap-2 rounded-pill px-5 py-2 font-instrument font-medium text-[0.82rem] text-taawa-sage border border-taawa-green/[0.15] bg-white/60"
              >
                <span className="w-[6px] h-[6px] rounded-full bg-taawa-lime border border-taawa-green" />
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
