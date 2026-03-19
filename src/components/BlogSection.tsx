import PillTag from "./PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const blogs = [
  {
    date: "March 12, 2026",
    title: "5 Daily Mindfulness Habits That Can Transform Your Mental Health",
    img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&q=80",
  },
  {
    date: "March 5, 2026",
    title: "Understanding Burnout: Signs, Causes, and Recovery Strategies",
    img: "https://images.unsplash.com/photo-1507120410856-1f35574c3b45?w=600&q=80",
  },
  {
    date: "February 28, 2026",
    title: "How Therapy Can Help You Build Stronger Relationships",
    img: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&q=80",
  },
];

const BlogSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} id="blogs" className="bg-taawa-peach py-28 px-[5%]">
      <div className="text-center mb-14">
        <div className="scroll-reveal flex justify-center mb-5"><PillTag>Insights</PillTag></div>
        <h2 className="scroll-reveal font-syne font-bold text-taawa-text max-w-[680px] mx-auto leading-tight mb-5" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
          Latest From Our Wellness Blog
        </h2>
        <p className="scroll-reveal font-instrument text-taawa-muted max-w-[560px] mx-auto text-[0.95rem] leading-relaxed">
          Expert insights, practical tips, and inspiring stories to support your mental health journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.4rem] max-w-5xl mx-auto mb-12">
        {blogs.map((b, i) => (
          <div
            key={i}
            className="scroll-reveal bg-taawa-bg3 rounded-card overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
            data-delay={`${i * 0.07}`}
          >
            <div className="p-[1.4rem_1.6rem_0.4rem]">
              <span className="font-instrument text-taawa-muted text-[0.72rem]">{b.date}</span>
              <h4 className="font-syne font-bold text-taawa-text text-[1rem] mt-2 leading-snug">{b.title}</h4>
            </div>
            <div className="px-4 pb-[1.4rem] pt-3">
              <img
                src={b.img}
                alt={b.title}
                className="w-full h-[180px] object-cover rounded-[14px]"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="scroll-reveal flex justify-center">
        <a href="/blog" className="bg-taawa-salmon text-white font-instrument font-medium rounded-pill px-7 py-[0.78rem] hover:-translate-y-0.5 transition-transform duration-300">
          Explore More
        </a>
      </div>
    </section>
  );
};

export default BlogSection;
