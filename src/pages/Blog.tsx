import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PillTag from "@/components/PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect } from "react";

const allBlogs = [
  {
    date: "March 12, 2026",
    title: "5 Daily Mindfulness Habits That Can Transform Your Mental Health",
    excerpt: "Discover simple yet powerful mindfulness practices you can incorporate into your daily routine to reduce stress, improve focus, and cultivate inner peace.",
    img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&q=80",
    category: "Mindfulness",
  },
  {
    date: "March 5, 2026",
    title: "Understanding Burnout: Signs, Causes, and Recovery Strategies",
    excerpt: "Learn to recognize the warning signs of burnout before it takes hold, and explore evidence-based strategies for recovery and prevention.",
    img: "https://images.unsplash.com/photo-1507120410856-1f35574c3b45?w=600&q=80",
    category: "Wellness",
  },
  {
    date: "February 28, 2026",
    title: "How Therapy Can Help You Build Stronger Relationships",
    excerpt: "Explore how therapeutic techniques can improve communication, deepen empathy, and strengthen the bonds with those you care about most.",
    img: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&q=80",
    category: "Therapy",
  },
  {
    date: "February 20, 2026",
    title: "The Science Behind Breathing Exercises for Anxiety Relief",
    excerpt: "Understand how controlled breathing activates your parasympathetic nervous system and learn three techniques you can use anywhere.",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    category: "Anxiety",
  },
  {
    date: "February 14, 2026",
    title: "Setting Healthy Boundaries Without Guilt",
    excerpt: "Boundaries are essential for mental health. Learn practical ways to communicate your needs clearly while maintaining compassion for yourself and others.",
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80",
    category: "Self-Care",
  },
  {
    date: "February 7, 2026",
    title: "Journaling for Mental Clarity: A Beginner's Guide",
    excerpt: "Discover how putting pen to paper can help you process emotions, gain perspective, and track your personal growth journey.",
    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&q=80",
    category: "Mindfulness",
  },
];

const Blog = () => {
  const ref = useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <section ref={ref} className="bg-taawa-bg pt-36 pb-28 px-[5%] min-h-screen">
        <div className="text-center mb-14">
          <div className="scroll-reveal flex justify-center mb-5">
            <PillTag>Insights</PillTag>
          </div>
          <h1
            className="scroll-reveal font-syne font-bold text-taawa-text max-w-[720px] mx-auto leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            Our Wellness Blog
          </h1>
          <p className="scroll-reveal font-instrument text-taawa-muted max-w-[580px] mx-auto text-[0.95rem] leading-relaxed">
            Expert insights, practical tips, and inspiring stories to support your mental health journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {allBlogs.map((b, i) => (
            <article
              key={i}
              className="scroll-reveal bg-taawa-bg3 rounded-card overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              data-delay={`${i * 0.07}`}
            >
              <div className="overflow-hidden">
                <img
                  src={b.img}
                  alt={b.title}
                  className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-instrument text-taawa-muted text-[0.72rem]">{b.date}</span>
                  <span className="inline-block bg-taawa-lime/20 text-taawa-green font-instrument font-medium text-[0.7rem] rounded-pill px-3 py-0.5">
                    {b.category}
                  </span>
                </div>
                <h3 className="font-syne font-bold text-taawa-text text-[1.05rem] leading-snug mb-2">
                  {b.title}
                </h3>
                <p className="font-instrument text-taawa-muted text-[0.85rem] leading-relaxed">
                  {b.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blog;
