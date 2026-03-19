import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PillTag from "@/components/PillTag";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "@/data/blogData";
import { useEffect } from "react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <>
        <Navbar />
        <section className="bg-taawa-bg pt-36 pb-28 px-[5%] min-h-screen text-center">
          <h1 className="font-syne font-bold text-taawa-text text-2xl mb-4">Post not found</h1>
          <Link to="/blog" className="font-instrument text-taawa-sage underline">
            ← Back to Blog
          </Link>
        </section>
        <Footer />
      </>
    );
  }

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <article className="bg-taawa-bg pt-36 pb-20 px-[5%]">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-instrument text-taawa-muted text-[0.85rem] hover:text-taawa-green transition-colors mb-8 no-underline"
          >
            ← Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <PillTag>{post.category}</PillTag>
            <span className="font-instrument text-taawa-muted text-[0.8rem]">{post.date}</span>
          </div>

          <h1
            className="font-syne font-bold text-taawa-text leading-tight mb-8"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            {post.title}
          </h1>

          <img
            src={post.img}
            alt={post.title}
            className="w-full h-[360px] object-cover rounded-card mb-10"
          />

          <div className="space-y-6">
            {post.content.map((paragraph, i) => (
              <p
                key={i}
                className="font-instrument text-taawa-text/80 text-[1.02rem] leading-[1.8]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {/* Related posts */}
      <section className="bg-taawa-bg3 py-20 px-[5%]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-syne font-bold text-taawa-text text-xl mb-8">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherPosts.map((b) => (
              <Link
                to={`/blog/${b.slug}`}
                key={b.slug}
                className="bg-white rounded-card overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group no-underline"
              >
                <div className="overflow-hidden">
                  <img
                    src={b.img}
                    alt={b.title}
                    className="w-full h-[180px] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <span className="font-instrument text-taawa-muted text-[0.72rem]">{b.date}</span>
                  <h3 className="font-syne font-bold text-taawa-text text-[0.95rem] leading-snug mt-2">
                    {b.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogPost;
