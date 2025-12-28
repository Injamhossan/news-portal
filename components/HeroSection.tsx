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
      <section className="font-anek mb-8 md:mb-12 text-center py-10 bg-gray-50 rounded-xl">
        <p className="text-gray-500">খবর লোড হচ্ছে অথবা কোনো খবর নেই...</p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12 font-anek">
      {/* Main Hero Article */}
      <Link href={`/news/${mainNews.slug || mainNews._id}`} className="lg:col-span-2 relative group overflow-hidden rounded-xl shadow-sm h-[300px] sm:h-[400px] md:h-[500px] block">
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

        <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 w-full">
          <span className={`inline-block px-2 sm:px-3 py-1 text-white text-[10px] sm:text-xs font-bold rounded mb-2 sm:mb-3 ${mainNews.categoryColor || "bg-[#7C3AED]"}`}>
            {mainNews.category}
          </span>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 leading-tight line-clamp-2 md:line-clamp-3">
            {mainNews.title}
          </h1>
          <p className="text-gray-200 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 line-clamp-2 hidden sm:block">
            {mainNews.excerpt}
          </p>
          <div className="flex items-center text-gray-300 text-[10px] sm:text-xs gap-3 sm:gap-4">
            <span className="font-medium">{mainNews.author}</span>
            <span>•</span>
            <span>{mainNews.date}</span>
          </div>
        </div>
      </Link>

      {/* Top Stories List */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6 shadow-sm h-full overflow-y-auto max-h-[400px] lg:max-h-full">
        <div className="flex flex-col gap-4 sm:gap-6">
          {sideNews.length > 0 ? (
            sideNews.map((item, idx) => (
              <Link key={idx} href={`/news/${item.slug || item._id}`} className="flex gap-3 sm:gap-4 group cursor-pointer border-b border-gray-50 pb-3 sm:pb-4 last:border-0 last:pb-0">
                <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center text-xs sm:text-sm group-hover:bg-[#D32F2F] group-hover:text-white transition-colors">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#D32F2F] leading-snug mb-1 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500">আরও কোনো খবর নেই</p>
          )}
        </div>
      </div>
    </section>
  );
}
