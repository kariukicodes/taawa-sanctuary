import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SubstackPost } from "@/hooks/useSubstack";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<SubstackPost | null>(null);
  const [related, setRelated] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const feedUrl = "https://taawacounselling.substack.com/feed";
        const key = import.meta.env.VITE_RSS2JSON_KEY;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&api_key=${key}&count=10`;

        const res = await fetch(apiUrl);
        const data = await res.json();

        if (data.status !== "ok") throw new Error("Feed error");

        const allPosts: SubstackPost[] = data.items.map((item: any) => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          excerpt: item.description
            ?.replace(/<[^>]*>/g, "")
            .slice(0, 180)
            .trim() + "...",
          thumbnail: item.thumbnail || item.enclosure?.link || "",
          author: item.author || "Taawa Counselling",
          content: item.content || item.description || "",
          slug: item.link.split("/").pop() || item.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-"),
        }));

        // Find matching post by slug
        const found = allPosts.find((p) => p.slug === slug);

        if (!found) {
          setError("Article not found.");
          return;
        }

        setPost(found);
        setRelated(allPosts.filter((p) => p.slug !== slug).slice(0, 3));
      } catch {
        setError("Could not load article.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <>
      <Navbar />
      <main className="bg-taawa-bg min-h-screen pt-32 pb-24 px-[5%]">
        <div className="max-w-3xl mx-auto">

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-taawa-muted text-sm mb-10 hover:text-taawa-green transition-colors"
          >
            ← Back to Articles
          </button>

          {/* Loading skeleton */}
          {loading && (
            <div className="space-y-4 animate-pulse">
              <div className="h-8 bg-taawa-bg2 rounded-full w-3/4" />
              <div className="h-4 bg-taawa-bg2 rounded-full w-1/4" />
              <div className="h-64 bg-taawa-bg2 rounded-[20px] w-full mt-6" />
              <div className="space-y-3 mt-6">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="h-4 bg-taawa-bg2 rounded-full w-full" />
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="text-center py-20">
              <p className="text-taawa-muted mb-4">{error}</p>
              <button
                onClick={() => navigate("/blog")}
                className="bg-taawa-green text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-taawa-sage transition-all"
              >
                Back to Blog
              </button>
            </div>
          )}

          {/* Article */}
          {post && !loading && (
            <>
              {/* Header */}
              <div className="mb-8">
                <div className="pill mb-5">
                  <span className="pill-dot" />
                  Taawa Insights
                </div>
                <h1
                  className="font-syne font-bold text-taawa-text mb-4 leading-tight"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.025em" }}
                >
                  {post.title}
                </h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-taawa-lime/20 border border-taawa-lime/30 flex items-center justify-center">
                      <span className="text-taawa-green text-xs font-bold">TC</span>
                    </div>
                    <span className="text-taawa-text text-sm font-medium">{post.author}</span>
                  </div>
                  <span className="text-taawa-muted text-sm">
                    {post.pubDate ? format(new Date(post.pubDate), "dd MMMM yyyy") : ""}
                  </span>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-taawa-sage text-xs underline ml-auto"
                  >
                    View on Substack ↗
                  </a>
                </div>
              </div>

              {/* Thumbnail 
              {post.thumbnail && (
                <div
                  className="w-full h-72 rounded-[20px] bg-cover bg-center mb-10 border border-taawa-lime/10"
                  style={{ backgroundImage: `url(${post.thumbnail})` }}
                />
              )} */}

              {/* Article content */}
              <article
                className="prose prose-lg max-w-none
                  prose-headings:font-syne prose-headings:text-taawa-text prose-headings:font-bold
                  prose-p:text-taawa-text prose-p:leading-relaxed prose-p:font-instrument
                  prose-a:text-taawa-sage prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-[16px] prose-img:w-full
                  prose-blockquote:border-l-taawa-lime prose-blockquote:text-taawa-muted
                  prose-strong:text-taawa-text
                  prose-li:text-taawa-text prose-li:font-instrument"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* CTA */}
              <div className="mt-16 bg-taawa-bg3 rounded-[20px] p-8 text-center border border-taawa-lime/15">
                <h3 className="font-syne font-bold text-taawa-text text-xl mb-2">
                  Ready to start your wellness journey?
                </h3>
                <p className="text-taawa-muted text-sm mb-5">
                  Book a session with one of our certified therapists today.
                </p>
                <a
                  href="/book-session"
                  className="bg-taawa-lime text-taawa-green font-semibold py-3 px-6 rounded-full hover:bg-taawa-lime2 transition-all inline-flex items-center gap-2"
                >
                  Book a Session →
                </a>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div className="mt-16">
                  <h3 className="font-syne font-bold text-taawa-text text-xl mb-6">
                    More Articles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {related.map((r) => (
                      <a
                        key={r.link}
                        href={`/blog/${r.slug}`}
                        className="bg-white rounded-[20px] overflow-hidden border border-taawa-lime/15 hover:-translate-y-1 transition-all hover:shadow-card block group"
                      >
                        {r.thumbnail ? (
                          <div
                            className="w-full h-36 bg-cover bg-center"
                            style={{ backgroundImage: `url(${r.thumbnail})` }}
                          />
                        ) : (
                          <div className="w-full h-36 bg-taawa-bg2" />
                        )}
                        <div className="p-4">
                          <p className="text-taawa-muted text-xs mb-1">
                            {r.pubDate ? format(new Date(r.pubDate), "dd MMM yyyy") : ""}
                          </p>
                          <h4 className="font-syne font-bold text-taawa-text text-sm leading-snug group-hover:text-taawa-sage transition-colors">
                            {r.title}
                          </h4>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}