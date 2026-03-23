import { useEffect, useState } from "react";

export type SubstackPost = {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  thumbnail: string;
  author: string;
  content: string;
  slug: string;
};

export function useSubstack() {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeed() {
      try {
        const feedUrl = "https://taawacounselling.substack.com/feed";
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

        const res = await fetch(apiUrl);
        const data = await res.json();

        if (data.status !== "ok") throw new Error("Feed error");

        const parsed: SubstackPost[] = data.items.map((item: any) => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          excerpt: item.description
            ?.replace(/<[^>]*>/g, "")
            .slice(0, 180)
            .trim() + "...",
          thumbnail: item.thumbnail || item.enclosure?.link || "",
          author: item.author || "Taawa Counselling",
          content: item.content || item.description || "", // 👈 full HTML
          slug: item.link.split("/").pop() || item.title   // 👈 generate slug
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
        }));

        setPosts(parsed);
      } catch (err) {
        setError("Could not load articles.");
      } finally {
        setLoading(false);
      }
    }

    fetchFeed();
  }, []);

  return { posts, loading, error };
}