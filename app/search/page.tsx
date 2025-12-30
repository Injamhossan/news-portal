"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`/api/news?query=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
        setResults([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-anek">
      <Header />
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-[#D32F2F] pl-3">
          অনুসন্ধানের ফলাফল: "{query}"
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="text-gray-500">খুঁজছে...</div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item: any) => (
              <Link href={`/news/${item.slug || item._id}`} key={item._id} className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative aspect-video bg-gray-200">
                    <Image 
                        src={item.image || "https://placehold.co/600x400"} 
                        alt={item.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                </div>
                <div className="p-4">
                     <div className="flex gap-2 text-xs text-gray-500 mb-2">
                        <span className="text-[#D32F2F] font-bold uppercase">{item.category}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#D32F2F] transition-colors line-clamp-2">
                        {item.title}
                    </h2>
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                        {item.excerpt}
                    </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-white rounded-lg border border-gray-100 p-8">
            <p className="text-lg mb-2">কোনো ফলাফল পাওয়া যায়নি</p>
            <p className="text-sm">অন্য কোনো কিওয়ার্ড দিয়ে চেষ্টা করুন</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchContent />
        </Suspense>
    );
}
