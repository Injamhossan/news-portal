"use client";

import { useEffect } from "react";
import NewsCard from "./NewsCard";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setInitialNews, fetchMoreNews } from "@/lib/features/newsSlice";

interface NewsFeedProps {
  initialNews: any[];
}

export default function NewsFeed({ initialNews }: NewsFeedProps) {
  const dispatch = useAppDispatch();
  const { items: news, page, hasMore, loading } = useAppSelector((state) => state.news);

  // Initialize Redux state with prop data on mount if empty
  useEffect(() => {
    // Only set if we have no news in store, or you could force update it
    // For this example, we'll ensure we at least start with what the server gave us
    if (news.length === 0 && initialNews.length > 0) {
      dispatch(setInitialNews(initialNews));
    }
  }, [initialNews, dispatch, news.length]);

  const loadMore = () => {
    dispatch(fetchMoreNews(page));
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // If Redux is empty (initial render before effect), fall back to initialNews temporarily to avoid flash
  const displayNews = news.length > 0 ? news : initialNews;

  return (
    <>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {displayNews.length > 0 ? (
          displayNews.map((item: any, idx: number) => (
            <NewsCard key={`${item._id}-${idx}`} {...item} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full py-10">
            কোনো খবর পাওয়া যায়নি
          </p>
        )}
      </motion.div>

      {/* Show button if we have more, or if we are using initialNews (assuming there might be more) */}
      {hasMore && displayNews.length > 0 && (
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
