import { useScrollReveal } from "@/hooks/useScrollReveal";
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
            
            {/* Floating Card snippet mimicking the one from your reference */}
            <div className="font-instrument absolute -bottom-6 md:bottom-8 left-4 md:-left-8 bg-white p-5 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] flex flex-col gap-1.5 z-10 min-w-[180px] border border-gray-100">
              <span className="text-[#a0aab2] text-xs font-medium">Growth Rate</span>
              <div className="flex items-baseline gap-1">
                <span className="font-syne font-bold text-taawa-text text-[1.65rem] leading-none">98.5</span>
                <span className="text-taawa-text text-xs font-bold">%</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-[#618264]"></span>
                <span className="text-[#618264] text-[0.7rem] font-medium uppercase tracking-wider">Optimal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Glassmorphic Stats Grid */}
        <div className="scroll-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full">
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

