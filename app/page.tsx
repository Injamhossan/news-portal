import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import HeroSection from "@/components/HeroSection";
// import NewsCard from "@/components/NewsCard"; // Removed as it is used inside NewsFeed
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import News from "@/models/News";

import BreakingNews from "@/components/BreakingNews";
import NewsFeed from "@/components/NewsFeed";

async function getNews() {
  try {
    const conn = await connectDB();
    // Fetch only latest 8 for the initial view
    const news = await News.find({}).sort({ createdAt: -1 }).limit(8);
    return JSON.parse(JSON.stringify(news));
  } catch (error: any) {
    console.error("Failed to fetch news:", error);
    return [];
  }
}

export default async function Home() {
  const newsVideoData = await getNews();

  return (
    <div className="min-h-screen bg-white font-anek  text-gray-900">
      <Header />
      <Navbar />

      {/* Breaking News Section */}
      <BreakingNews news={Array.isArray(newsVideoData) ? newsVideoData : []} />

      <main className="container mx-auto px-4 py-8">
        <HeroSection news={Array.isArray(newsVideoData) ? newsVideoData : []} />

        {/* News Feed with Pagination */}
        <NewsFeed initialNews={Array.isArray(newsVideoData) ? newsVideoData : []} />
      </main>
      
      <Footer />
    </div>
  );
}
