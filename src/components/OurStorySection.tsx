import PillTag from "./PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const photos = [
  { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80", h: 290 },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", h: 255, mt: 38 },
  { src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80", h: 272 },
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80", h: 255, mt: 38 },
  { src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80", h: 290 },
];

const OurStorySection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} id="about-us" className="bg-taawa-bg py-28 px-[5%]">
      <div className="text-center mb-14">
        <div className="scroll-reveal flex justify-center mb-5">
          <PillTag>Our Story</PillTag>
        </div>
        <h2
          className="scroll-reveal font-syne font-bold text-taawa-text max-w-[780px] mx-auto leading-tight mb-5"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
        >
          Empowering Minds With Compassionate, Evidence-Driven Wellness Support
        </h2>
        <p className="scroll-reveal font-instrument text-taawa-muted max-w-[620px] mx-auto leading-relaxed text-[0.95rem]">
          Founded on the belief that everyone deserves access to quality mental health care, Taawa Counselling has been transforming lives through personalized, compassionate guidance.
        </p>
      </div>

      <div className="flex justify-center gap-4 flex-wrap">
        {photos.map((p, i) => (
          <div
            key={i}
            className="scroll-reveal"
            data-delay={`${i * 0.07}`}
            style={{ marginTop: p.mt || 0 }}
          >
            <img
              src={p.src}
              alt="Team member"
              className="rounded-[24px] border-[3px] border-white object-cover w-[200px]"
              style={{ height: p.h }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurStorySection;
