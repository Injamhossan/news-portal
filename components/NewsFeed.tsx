"use client";

import { useState } from "react";
import NewsCard from "./NewsCard";

interface NewsFeedProps {
  initialNews: any[];
}

export default function NewsFeed({ initialNews }: NewsFeedProps) {
  const [news, setNews] = useState(initialNews);
  const [page, setPage] = useState(3);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/news?page=${page}&limit=4`);
      const newNews = await res.json();

      if (newNews.length === 0) {
        setHasMore(false);
      } else {
        setNews([...news, ...newNews]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error("Failed to load more news", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {news.length > 0 ? (
          news.map((item: any, idx: number) => (
            <NewsCard key={`${item._id}-${idx}`} {...item} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full py-10">
            কোনো খবর পাওয়া যায়নি
          </p>
        )}
      </div>

      {hasMore && news.length > 0 && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium transition-colors disabled:opacity-50"
          >
            {loading ? "লোড হচ্ছে..." : "আরও দেখুন"}
          </button>
        </div>
      )}
    </>
  );
}
