import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  news: any[];
}

export default function HeroSection({ news = [] }: HeroSectionProps) {
  const mainNews = news[0];
  const sideNews = news.slice(1, 6);

  if (!mainNews) {
    return (
      <section className="font-sans mb-12 text-center py-10 bg-gray-50 rounded-xl">
        <p className="text-gray-500">খবর লোড হচ্ছে অথবা কোনো খবর নেই...</p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 font-sans">
      {/* Main Hero Article */}
      <div className="lg:col-span-2 relative group overflow-hidden rounded-xl shadow-sm min-h-[400px]">
        {/* Dynamic Image */}
        <div className="absolute inset-0 bg-gray-300">
          <Image
            src={mainNews.image || "https://placehold.co/800x600/png"} 
            alt={mainNews.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 p-8 w-full">
          <span className={`inline-block px-3 py-1 text-white text-xs font-bold rounded mb-3 ${mainNews.categoryColor || "bg-[#7C3AED]"}`}>
            {mainNews.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight font-serif">
            {mainNews.title}
          </h1>
          <p className="text-gray-200 text-sm md:text-base mb-4 line-clamp-2">
            {mainNews.excerpt}
          </p>
          <div className="flex items-center text-gray-300 text-xs gap-4">
            <span className="font-medium">{mainNews.author}</span>
            <span>•</span>
            <span>{mainNews.date}</span>
          </div>
        </div>
      </div>

      {/* Top Stories List */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex flex-col gap-6">
          {sideNews.length > 0 ? (
            sideNews.map((item, idx) => (
              <div key={idx} className="flex gap-4 group cursor-pointer border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center text-sm group-hover:bg-[#D32F2F] group-hover:text-white transition-colors">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#D32F2F] leading-snug mb-1 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">আরও কোনো খবর নেই</p>
          )}
        </div>
      </div>
    </section>
  );
}
