import { useSubstack } from "@/hooks/useSubstack";
import { format } from "date-fns";

export default function BlogSection() {
  const { posts, loading, error } = useSubstack();

  return (
    <section id="blog" className="bg-taawa-peach py-28 px-[5%]">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="pill mx-auto mb-5">
          <span className="pill-dot" />
          Insights
        </div>
        <h2
          className="font-syne font-bold text-taawa-text"
          style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", letterSpacing: "-0.025em", lineHeight: "1.12" }}
        >
          Weekly Insights to Help You Strengthen<br/>
          Mindfulness and Emotional Health
        </h2>
        <p className="text-taawa-muted text-sm mt-4 max-w-xl mx-auto leading-relaxed">
          Practical guidance on stress management, relationships, and mental
          resilience — written with empathy and backed by expert knowledge.
        </p>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-taawa-bg3 rounded-[20px] overflow-hidden">
              <div className="w-[calc(100%-2rem)] mx-4 mt-4 h-44 rounded-[14px] bg-taawa-bg2 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-3 bg-taawa-bg2 rounded-full w-1/3 animate-pulse" />
                <div className="h-4 bg-taawa-bg2 rounded-full w-full animate-pulse" />
                <div className="h-4 bg-taawa-bg2 rounded-full w-4/5 animate-pulse" />
                <div className="h-3 bg-taawa-bg2 rounded-full w-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="text-center py-16">
          <p className="text-taawa-muted text-sm">{error}</p>
          <p className="text-taawa-muted text-xs mt-2">
            Check out our articles directly on{" "}
            
              href="https://taawacounselling.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-taawa-sage underline"
            >
              Substack
            </a>
          </p>
        </div>
      )}

      {/* Posts */}
      {!loading && !error && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {posts.slice(0, 3).map((post) => (
            
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-taawa-bg3 rounded-[20px] overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-card2 block group"
            >
              {/* Thumbnail */}
              {post.thumbnail ? (
                <div
                  className="w-[calc(100%-2rem)] mx-4 mt-4 h-44 rounded-[14px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.thumbnail})` }}
                />
              ) : (
                <div className="w-[calc(100%-2rem)] mx-4 mt-4 h-44 rounded-[14px] bg-taawa-bg2 flex items-center justify-center">
                  <span className="text-taawa-muted text-xs">Taawa Counselling</span>
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                <p className="text-taawa-muted text-xs mb-2">
                  {post.pubDate
                    ? format(new Date(post.pubDate), "dd MMMM, yyyy")
                    : ""}
                </p>
                <h3 className="font-syne font-bold text-taawa-text text-[1rem] leading-snug mb-2 group-hover:text-taawa-sage transition-colors">
                  {post.title}
                </h3>
                <p className="text-taawa-muted text-xs leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="text-taawa-sage text-xs font-medium mt-3 block">
                  Read on Substack →
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-taawa-muted text-sm">No articles published yet.</p>
          <p className="text-taawa-muted text-xs mt-2">
            Check back soon or visit{" "}
            
              href="https://taawacounselling.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-taawa-sage underline"
            >
              our Substack
            </a>
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="text-center">
        
          href="https://taawacounselling.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-taawa-salmon text-white font-medium py-3 px-6 rounded-full hover:bg-taawa-salmon2 transition-all inline-flex items-center gap-2 hover:-translate-y-0.5"
        >
          View All Articles →
        </a>
      </div>
    </section>
  );
}
```

---

## **3. Add key to Vercel**

In Vercel → Settings → Environment Variables add:
```
VITE_RSS2JSON_KEY = fai1bvyhceekkk9mwwpkakoafhls9cf89czkeqgg