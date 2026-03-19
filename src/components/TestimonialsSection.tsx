import PillTag from "./PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    quote: "Taawa gave me the tools to manage my anxiety in ways I never thought possible.",
    body: "After just a few sessions, I noticed a significant change in how I handle stress. The personalized approach made all the difference in my recovery journey.",
    name: "Amara Thompson",
  },
  {
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    quote: "The most supportive and professional counselling experience I've ever had.",
    body: "Every session felt safe and productive. My counsellor truly listened and helped me develop strategies that fit my lifestyle and personal challenges.",
    name: "David Okonkwo",
  },
  {
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    quote: "I finally feel like myself again, thanks to their compassionate guidance.",
    body: "The burnout recovery program was life-changing. I went from feeling completely depleted to rediscovering my passion and energy for life.",
    name: "Elena Vasquez",
  },
];

const TestimonialsSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-taawa-peach py-28 px-[5%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 mb-14 max-w-6xl mx-auto">
        <div>
          <div className="scroll-reveal mb-5"><PillTag>Testimonials</PillTag></div>
          <h2 className="scroll-reveal font-syne font-bold text-taawa-text leading-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            What Our Clients Say About Their Experience
          </h2>
        </div>
        <div className="scroll-reveal flex items-end">
          <p className="font-instrument text-taawa-muted leading-relaxed text-[0.95rem]">
            Real stories from real people who have transformed their lives through our personalized wellness programs and expert guidance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.4rem] max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="scroll-reveal bg-taawa-bg3 rounded-card p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            data-delay={`${i * 0.07}`}
          >
            <img
              src={t.avatar}
              alt={t.name}
              className="w-[54px] h-[54px] rounded-full border-[3px] border-white shadow-md object-cover mb-5"
              loading="lazy"
            />
            <p className="font-syne font-semibold text-taawa-text text-[1.05rem] leading-snug mb-3">"{t.quote}"</p>
            <p className="font-instrument text-taawa-muted text-[0.82rem] leading-relaxed mb-4">{t.body}</p>
            <span className="font-syne font-semibold text-taawa-text text-[0.85rem]">{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
