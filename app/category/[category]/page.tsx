import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import News from "@/models/News";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

async function getNewsByCategory(category: string) {
  try {
    await connectDB();
    // Decode the category because it might be URL encoded (e.g. %E0%A6%...)
    const decodedCategory = decodeURIComponent(category);
    const news = await News.find({ category: decodedCategory }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(news));
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return [];
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const { category } = resolvedParams;
  const decodedCategory = decodeURIComponent(category);
  const newsVideoData = await getNewsByCategory(category);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header />
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 border-b-2 border-gray-100 pb-2">
            <h1 className="text-3xl font-bold text-[#D32F2F] inline-block border-b-4 border-[#D32F2F] pb-2 -mb-3.5">
                {decodedCategory}
            </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsVideoData.length > 0 ? (
                newsVideoData.map((news: any, idx: number) => (
                    <NewsCard key={idx} {...news} />
                ))
            ) : (
                <div className="col-span-full py-20 text-center">
                    <p className="text-xl text-gray-400">এই বিভাগে এখনো কোনো খবর নেই</p>
                    <p className="text-sm text-gray-300 mt-2">অ্যাডমিন প্যানেল থেকে খবর যোগ করুন</p>
                </div>
            )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
