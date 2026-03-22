import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PillTag from "@/components/PillTag";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useHashnode from "@/hooks/useHashnode"; // Import the hook

const Blog = () => {
  const ref = useScrollReveal("multiple");
  const { posts: blogPosts, loading, error } = useHashnode("taawa"); // Use the hook

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

        {loading && <p>Loading...</p>}
        {error && <p>Error fetching posts: {error.message}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {blogPosts &&
            blogPosts.map((b, i) => (
              <Link
                to={`/blog/${b.slug}`}
                key={b.slug}
                className="scroll-reveal bg-taawa-bg3 rounded-card overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group no-underline"
                data-delay={`${i * 0.07}`}
              >
                <div className="overflow-hidden">
                  <img
                    src={b.coverImage}
                    alt={b.title}
                    className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-instrument text-taawa-muted text-[0.72rem]">
                      {new Date(b.dateAdded).toLocaleDateString()}
                    </span>
                    <span className="inline-block bg-taawa-lime/20 text-taawa-green font-instrument font-medium text-[0.7rem] rounded-pill px-3 py-0.5">
                      Wellness
                    </span>
                  </div>
                  <h3 className="font-syne font-bold text-taawa-text text-[1.05rem] leading-snug mb-2">
                    {b.title}
                  </h3>
                  <p className="font-instrument text-taawa-muted text-[0.85rem] leading-relaxed">
                    {b.brief}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blog;
