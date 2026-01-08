
import Link from "next/link";

interface BreakingNewsProps {
  news: any[];
}

export default function BreakingNews({ news }: BreakingNewsProps) {
  // Filter only breaking news that are within 2 days (48 hours)
  const breakingNews = news.filter((item) => {
    if (!item.isBreaking) return false;

    // Check if the news was updated/created within the last 48 hours
    const newsDate = new Date(item.updatedAt || item.createdAt);
    const now = new Date();
    const timeDiff = now.getTime() - newsDate.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);

    return hoursDiff <= 48;
  });

  if (breakingNews.length === 0) return null;

  return (
    <div className="bg-[#f0f0f0] border-b border-gray-200">
      <div className="container mx-auto px-4 flex items-center">
        {/* Label */}
        <div className="bg-[#D32F2F] text-white px-4 py-2 font-bold text-sm uppercase whitespace-nowrap z-10 relative">
          ব্রেকিং নিউজ
          <span className="absolute right-[-12px] top-0 border-l-[12px] border-l-[#D32F2F] border-t-[0px] border-t-transparent border-b-[36px] border-b-transparent"></span>
        </div>

        {/* Ticker */}
        <div className="flex-1 overflow-hidden relative h-10 flex items-center bg-gray-100">
          <div className="animate-marquee whitespace-nowrap flex gap-10">
            {breakingNews.map((item, index) => (
              <span key={index} className="inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-[#D32F2F] rounded-full inline-block"></span>
                <Link
                  href={`/news/${item.slug || item._id}`}
                  className="text-gray-800 hover:text-[#D32F2F] font-medium transition-colors"
                >
                  {item.title}
                </Link>
              </span>
            ))}
             {/* Duplicate for smooth loop if enough content, otherwise just single pass is fine or repeat manual */}
             {breakingNews.map((item, index) => (
              <span key={`dup-${index}`} className="inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-[#D32F2F] rounded-full inline-block"></span>
                <Link
                  href={`/news/${item.slug || item._id}`}
                  className="text-gray-800 hover:text-[#D32F2F] font-medium transition-colors"
                >
                  {item.title}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
