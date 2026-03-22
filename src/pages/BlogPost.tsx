import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PillTag from "@/components/PillTag";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import useHashnodePost from "@/hooks/useHashnodePost";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = useHashnodePost(
    slug || "",
    "taawa.hashnode.dev"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <section className="bg-taawa-bg pt-36 pb-28 px-[5%] min-h-screen text-center">
          <p>Loading...</p>
        </section>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <section className="bg-taawa-bg pt-36 pb-28 px-[5%] min-h-screen text-center">
          <p>Error fetching post: {error.message}</p>
        </section>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <section className="bg-taawa-bg pt-36 pb-28 px-[5%] min-h-screen text-center">
          <h1 className="font-syne font-bold text-taawa-text text-2xl mb-4">
            Post not found
          </h1>
          <Link
            to="/blog"
            className="font-instrument text-taawa-sage underline"
          >
            ← Back to Blog
          </Link>
        </section>
        <Footer />
      </>
    );
  }

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
            <PillTag>Wellness</PillTag>
            <span className="font-instrument text-taawa-muted text-[0.8rem]">
              {new Date(post.publishedAt).toLocaleDateString()}
            </span>
          </div>

          <h1
            className="font-syne font-bold text-taawa-text leading-tight mb-8"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            {post.title}
          </h1>

          <img
            src={post.coverImage.url}
            alt={post.title}
            className="w-full h-[360px] object-cover rounded-card mb-10"
          />

          <div
            className="prose lg:prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          />
        </div>
      </article>

      <Footer />
    </>
  );
};

export default BlogPost;

