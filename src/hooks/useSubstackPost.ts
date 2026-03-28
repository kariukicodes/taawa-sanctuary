import { useState, useEffect } from "react";
import { SubstackPost } from "./useSubstack";

export const useSubstackPost = (slug: string) => {
  const [post, setPost] = useState<SubstackPost & { contentHtml?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const feedUrl = "https://taawacounselling.substack.com/feed";
        const key = import.meta.env.VITE_RSS2JSON_KEY;
        // Need full content so we might request it directly
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&api_key=${key}`;

        const res = await fetch(apiUrl);
        const data = await res.json();

        if (data.status !== "ok") throw new Error("Feed error");

        const foundItem = data.items.find((item: Record<string, unknown>) => {
          const itemSlug = item.link.split('/').pop()?.split('?')[0] || item.guid;
          return itemSlug === slug;
        });

        if (!foundItem) {
           setPost(null);
           setLoading(false);
           return;
        }

        const formattedPost = {
          title: foundItem.title,
          excerpt: foundItem.description?.replace(/<[^>]*>/g, "").slice(0, 180).trim() + "...",
          slug: slug,
          thumbnail: foundItem.thumbnail || foundItem.enclosure?.link || "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&q=80",
          pubDate: foundItem.pubDate,
          contentHtml: foundItem.content,
          author: foundItem.author || "Taawa Counselling",
          link: foundItem.link
        };

        setPost(formattedPost);
      } catch (err: unknown) {
        setError("Could not load article.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [slug]);

  return { post, loading, error };
};
