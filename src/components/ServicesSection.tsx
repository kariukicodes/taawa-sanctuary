import PillTag from "./PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Mindfulness Coaching",
    desc: "Gentle guidance to build daily mindfulness habits and improve emotional awareness effectively.",
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80",
  },
  {
    title: "Stress Management",
    desc: "Practical techniques to reduce tension, improve resilience, and restore mental calmness daily.",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
  },
  {
    title: "Therapy Sessions",
    desc: "Professional one-on-one support to navigate emotions, challenges, and personal mental struggles.",
    img: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=600&q=80",
  },
  {
    title: "Group Workshops",
    desc: "Join community discussions and collaborative emotional resilience building workshops.",
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80",
  },
];

const ServicesSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} id="services" className="bg-taawa-bg2 py-16 px-4 md:px-8">
      <div className="text-center mb-10 max-w-4xl mx-auto">
        <div className="scroll-reveal flex justify-center mb-4">
          <PillTag>What We Offer</PillTag>
        </div>
        <h2 className="scroll-reveal font-syne font-bold text-gray-900 leading-tight mb-4" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}>
          Personalized Wellness Programs Designed For Your Unique Mental Needs
        </h2>
        <p className="scroll-reveal font-instrument text-gray-600 max-w-2xl mx-auto leading-relaxed text-[0.95rem]">
          Choose from a variety of tailored services, including therapy sessions, mindfulness coaching, stress-management programs, guided meditations, and emotional resilience workshops. Every service is crafted to support your personal goals, whether you're seeking clarity, calmness, motivation, or growth in your everyday life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-10">
        {services.map((s, i) => (
          <div
            key={i}
            className="scroll-reveal bg-white/60 backdrop-blur-sm rounded-[32px] p-4 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            data-delay={`${i * 0.07}`}
          >
            <div className="w-full h-[240px] rounded-[24px] overflow-hidden mb-5">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="px-2 pb-2 flex-grow">
              <h3 className="font-syne font-bold text-gray-900 text-xl mb-2">{s.title}</h3>
              <p className="font-instrument text-gray-600 text-[0.9rem] leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="scroll-reveal flex justify-center">
        <Link 
          to="/services" 
          className="bg-taawa-salmon text-white font-instrument font-medium rounded-xl px-8 py-3 outline-none hover:-translate-y-1 hover:shadow-lg hover:shadow-taawa-salmon/30 active:scale-[0.98] transition-all duration-300"
        >
          Explore More
        </Link>
      </div>
    </section>
  );
};

export default ServicesSection;




