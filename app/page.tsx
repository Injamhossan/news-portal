import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NewsCard from "@/components/NewsCard";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import News from "@/models/News";

import BreakingNews from "@/components/BreakingNews";

async function getNews() {
  try {
    await connectDB();
    const news = await News.find({}).sort({ createdAt: -1 });
    // Serialize to plain JSON to avoid "Only plain objects can be passed to Client Components" warning
    return JSON.parse(JSON.stringify(news));
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return [];
  }
}

export default async function Home() {
  const newsVideoData = await getNews();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header />
      <Navbar />

      {/* Breaking News Section */}
      <BreakingNews news={newsVideoData} />

      <main className="container mx-auto px-4 py-8">
        <HeroSection news={newsVideoData} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Column (News Grid) */}
          <div className="lg:col-span-3">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsVideoData.length > 0 ? (
                  newsVideoData.map((news: any, idx: number) => (
                     <NewsCard key={idx} {...news} />
                  ))
                ) : (
                  <p className="text-center text-gray-500 col-span-full py-10">কোনো খবর পাওয়া যায়নি</p>
                )}
            </div>
            
            {/* Pagination Placeholder */}
             <div className="mt-12 flex justify-center">
                 <button className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium transition-colors">আরও দেখুন</button>
             </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1">
             <Sidebar />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
