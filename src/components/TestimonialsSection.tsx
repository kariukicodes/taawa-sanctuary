import PillTag from "./PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useRef, useState } from "react";

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
  {
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    quote: "Their mindfulness coaching completely shifted my perspective on stress.",
    body: "I used to dread Mondays, but now I approach each week with clarity and calm. The breathing techniques alone have been transformative for my daily routine.",
    name: "Marcus Chen",
  },
];

const TestimonialsSection = () => {
  const ref = useScrollReveal();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <section ref={ref} className="bg-taawa-bg py-16 px-[5%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 mb-14 max-w-6xl mx-auto">
        <div>
          <div className="scroll-reveal mb-5"><PillTag>Testimonials</PillTag></div>
          <h2 className="scroll-reveal font-syne font-bold text-taawa-text leading-tight" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}>
            What Our Clients Say About Their Experience
          </h2>
        </div>
        <div className="scroll-reveal flex items-end justify-between gap-4">
          <p className="font-instrument text-taawa-muted leading-relaxed text-[0.95rem]">
            Real stories from real people who have transformed their lives through our personalized wellness programs and expert guidance.
          </p>
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-taawa-green/20 flex items-center justify-center text-taawa-green hover:bg-taawa-green hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-taawa-green/20 flex items-center justify-center text-taawa-green hover:bg-taawa-green hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-[1.4rem] max-w-6xl mx-auto overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="scroll-reveal bg-taawa-bg3 rounded-card p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex-shrink-0 w-[85vw] sm:w-[320px] md:w-[calc(33.333%-0.7rem)] snap-start"
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

