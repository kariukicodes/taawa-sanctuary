import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PillTag from "@/components/PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSubstack } from "@/hooks/useSubstack";

const Blog = () => {
  const ref = useScrollReveal();
  const { posts: blogPosts, loading, error } = useSubstack();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <section
        ref={ref}
        className="bg-taawa-bg pt-36 pb-28 px-[5%] min-h-screen"
      >
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
            Expert insights, practical tips, and inspiring stories to support
            your mental health journey.
          </p>
        </div>

        {loading && <p className="text-center text-taawa-muted">Loading...</p>}
        {error && <p className="text-center text-taawa-muted">Error fetching posts: {error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {blogPosts &&
            blogPosts.map((b, i) => (
              <a
                href={`/blog/${b.slug}`}
                key={b.slug}
                className="bg-taawa-bg3 rounded-[20px] overflow-hidden hover:-translate-y-1 hover:shadow-card2 transition-all duration-300 group block border border-taawa-lime/10 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="overflow-hidden">
                  <img
                    src={b.thumbnail || "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&q=80"}
                    alt={b.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-instrument text-taawa-muted text-[0.72rem]">
                      {new Date(b.pubDate).toLocaleDateString()}
                    </span>
                    <span className="inline-block bg-taawa-lime text-taawa-green font-instrument font-medium text-[0.7rem] rounded-full px-3 py-1">
                      Insights
                    </span>
                  </div>
                  <h3 className="font-syne font-bold text-taawa-text text-[1.1rem] leading-snug mb-2 group-hover:text-taawa-sage transition-colors">
                    {b.title}
                  </h3>
                  <p className="font-instrument text-taawa-muted text-[0.85rem] leading-relaxed line-clamp-3">
                    {b.excerpt}
                  </p>
                </div>
              </a>
            ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blog;
