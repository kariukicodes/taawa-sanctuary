import PillTag from "./PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    title: "Mindfulness Coaching",
    desc: "Learn techniques to stay present and cultivate inner peace through guided mindfulness practices.",
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80",
  },
  {
    title: "Stress Management",
    desc: "Develop effective coping strategies and build resilience against life's everyday pressures.",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
  },
  {
    title: "Therapy Sessions",
    desc: "One-on-one sessions with certified therapists tailored to your unique emotional needs.",
    img: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=600&q=80",
  },
];

const ServicesSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} id="services" className="bg-taawa-peach py-28 px-[5%]">
      <div className="text-center mb-14">
        <div className="scroll-reveal flex justify-center mb-5">
          <PillTag>What We Offer</PillTag>
        </div>
        <h2 className="scroll-reveal font-syne font-bold text-taawa-text max-w-[780px] mx-auto leading-tight mb-5" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
          Personalized Wellness Programs Designed For Your Unique Mental Needs
        </h2>
        <p className="scroll-reveal font-instrument text-taawa-muted max-w-[640px] mx-auto leading-relaxed text-[0.95rem]">
          Our evidence-based approach combines modern therapeutic techniques with compassionate care to support your mental health journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
        {services.map((s, i) => (
          <div
            key={i}
            className="scroll-reveal bg-white rounded-card overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
            data-delay={`${i * 0.07}`}
          >
            <img src={s.img} alt={s.title} className="w-full h-[220px] object-cover" loading="lazy" />
            <div className="p-[1.4rem_1.6rem_1.8rem]">
              <h3 className="font-syne font-bold text-taawa-text text-[1.1rem] mb-2">{s.title}</h3>
              <p className="font-instrument text-taawa-muted text-[0.88rem] leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="scroll-reveal flex justify-center">
        <a href="#services" className="bg-taawa-salmon text-white font-instrument font-medium rounded-pill px-7 py-[0.78rem] hover:-translate-y-0.5 transition-transform duration-300">
          Explore More
        </a>
      </div>
    </section>
  );
};

export default ServicesSection;
