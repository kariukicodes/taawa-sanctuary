import PillTag from "./PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const photos = [
  { src: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=500&q=80", h: 340, mt: 0, tint: "rgba(253,200,200,0.25)" },
  { src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&q=80", h: 300, mt: 60, tint: "rgba(190,200,230,0.25)" },
  { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80", h: 280, mt: 90, tint: "rgba(240,235,225,0.15)" },
  { src: "https://images.unsplash.com/photo-1500099817043-86d46000d58f?w=500&q=80", h: 300, mt: 60, tint: "rgba(190,170,150,0.2)" },
  { src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80", h: 340, mt: 0, tint: "rgba(220,215,200,0.15)" },
];

const OurStorySection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} id="about-us" className="relative bg-taawa-bg py-28 px-[5%] overflow-hidden">
      {/* Decorative watermark circles */}
      <div
        className="absolute top-16 left-0 w-[220px] h-[220px] rounded-full border-[30px] opacity-[0.06] pointer-events-none"
        style={{ borderColor: "#2d3d1e" }}
      />
      <div
        className="absolute top-0 right-0 w-[180px] h-[180px] rounded-full border-[25px] opacity-[0.06] pointer-events-none translate-x-1/3 -translate-y-1/4"
        style={{ borderColor: "#2d3d1e" }}
      />

      <div className="text-center mb-14">
        <div className="scroll-reveal flex justify-center mb-6">
          <PillTag>Our Story</PillTag>
        </div>
        <h2
          className="scroll-reveal font-syne font-bold text-taawa-text max-w-[820px] mx-auto leading-tight mb-5"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
        >
          Empowering Minds With Compassionate, Evidence-Driven Wellness Support
        </h2>
        <p className="scroll-reveal font-instrument text-taawa-muted max-w-[680px] mx-auto leading-relaxed text-[0.95rem]">
          We created this platform to make mental wellness approachable, modern, and stigma-free. Our team includes certified therapists, mindfulness coaches, and wellness experts who combine clinical knowledge with compassionate care. We believe everyone deserves a safe place to heal, grow, and find the tools to create a healthier, more fulfilling life.
        </p>
      </div>

      <div className="flex justify-center items-start gap-5">
        {photos.map((p, i) => (
          <div
            key={i}
            className="scroll-reveal relative flex-shrink-0 overflow-hidden"
            data-delay={`${i * 0.07}`}
            style={{ marginTop: p.mt, borderRadius: 24, width: "min(220px, 18vw)" }}
          >
            <img
              src={p.src}
              alt="Wellness"
              className="w-full object-cover"
              style={{ height: p.h, borderRadius: 24 }}
              loading="lazy"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundColor: p.tint, borderRadius: 24 }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurStorySection;
