import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  { num: "150+", label: "Expert Sessions Weekly" },
  { num: "98%", label: "Client Satisfaction" },
  { num: "12+", label: "Certified Professionals" },
  { num: "16+", label: "Years of Experience" },
];

const values = ["Compassion", "Integrity", "Mindful Growth"];

const StatsSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-[#f2f4f1] py-20 px-[5%]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-7xl mx-auto">
        {/* Left Side: The 4-leaf clover intersecting circles */}
        <div className="scroll-reveal-left relative h-[450px] w-full max-w-[450px] mx-auto hidden sm:block opacity-90">
          {/* Top Left */}
          <div className="absolute top-0 left-0 w-[240px] h-[240px] bg-taawa-lime border-[4px] border-[#f2f4f1] rounded-[120px] rounded-br-[40px] flex flex-col items-center justify-center text-center">
            <span className="font-instrument font-medium text-white text-4xl mb-1">{stats[0].num}</span>
            <span className="text-white/90 font-instrument text-[0.85rem] max-w-[120px] leading-snug">{stats[0].label}</span>
          </div>
          {/* Top Right */}
          <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-taawa-lime border-[4px] border-[#f2f4f1] rounded-[120px] rounded-bl-[40px] flex flex-col items-center justify-center text-center">
            <span className="font-instrument font-medium text-white text-4xl mb-1">{stats[1].num}</span>
            <span className="text-white/90 font-instrument text-[0.85rem] max-w-[120px] leading-snug">{stats[1].label}</span>
          </div>
          {/* Bottom Left */}
          <div className="absolute bottom-0 left-0 w-[240px] h-[240px] bg-taawa-lime border-[4px] border-[#f2f4f1] rounded-[120px] rounded-tr-[40px] flex flex-col items-center justify-center text-center">
            <span className="font-instrument font-medium text-white text-4xl mb-1">{stats[2].num}</span>
            <span className="text-white/90 font-instrument text-[0.85rem] max-w-[120px] leading-snug">{stats[2].label}</span>
          </div>
          {/* Bottom Right */}
          <div className="absolute bottom-0 right-0 w-[240px] h-[240px] bg-taawa-lime border-[4px] border-[#f2f4f1] rounded-[120px] rounded-tl-[40px] flex flex-col items-center justify-center text-center">
            <span className="font-instrument font-medium text-white text-4xl mb-1">{stats[3].num}</span>
            <span className="text-white/90 font-instrument text-[0.85rem] max-w-[120px] leading-snug">{stats[3].label}</span>
          </div>
        </div>

        {/* Mobile Rotating Metric Strip */}
        <div className="sm:hidden w-[100vw] relative left-[50%] -translate-x-1/2 overflow-hidden bg-taawa-lime py-6 my-10 border-y-4 border-[#f2f4f1]">
          <div className="flex animate-marquee w-[200%]">
            {/* Array doubled for seamless continuous scrolling */}
            {[...stats, ...stats].map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center px-8 shrink-0 w-1/8 text-white">
                <span className="font-instrument font-bold text-3xl mb-1">{s.num}</span>
                <span className="font-instrument text-[0.8rem] whitespace-nowrap text-white/90 uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Typography & Badges */}
        <div className="scroll-reveal-right lg:pl-10">
          <blockquote className="font-instrument text-gray-800 leading-[1.4] mb-10 tracking-tight" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)" }}>
            "Taawa is devoted to guiding people toward calmer, more fulfilling lives. Our certified therapists provide, evidence-based care designed to help you grow."
          </blockquote>
          <div className="flex flex-wrap gap-4">
            {values.map((v) => (
              <span
                key={v}
                className="inline-flex items-center gap-3 rounded-full px-5 py-2 font-instrument font-medium text-[0.95rem] text-gray-800 border border-gray-200 bg-transparent"
              >
                <div className="w-[4px] h-[4px] rounded-full bg-gray-600" />
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

