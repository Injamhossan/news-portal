import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import News from "@/models/News";
import Image from "next/image";
import { notFound } from "next/navigation";

interface NewsDetailsPageProps {
  params: Promise<{ id: string }>;
}

async function getNewsDetail(id: string) {
  try {
    await connectDB();
    const news = await News.findById(id);
    if (!news) return null;
    return JSON.parse(JSON.stringify(news));
  } catch (error) {
    return null;
  }
}

export default async function NewsDetailsPage({ params }: NewsDetailsPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const news = await getNewsDetail(id);

  if (!news) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header />
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
           <span className={`inline-block px-3 py-1 text-white text-sm font-bold rounded mb-4 ${news.categoryColor || "bg-gray-500"}`}>
            {news.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight font-serif">
            {news.title}
          </h1>
          <div className="flex items-center text-gray-500 text-sm gap-4 border-b border-gray-100 pb-6 mb-6">
            <span className="font-bold text-[#D32F2F]">{news.author}</span>
            <span>•</span>
            <span>{news.date}</span>
          </div>
        </div>

        <div className="mb-8 relative w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden bg-gray-100">
            <Image 
                src={news.image || "https://placehold.co/800x600/png"} 
                alt={news.title} 
                fill 
                className="object-cover"
            />
        </div>

        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6">
             {/* Render excerpt as first paragraph for now */}
            <p className="font-medium text-xl text-gray-700">
                {news.excerpt}
            </p>
            {/* 
               In a real app, content would be rich text. 
               Here we are simulating body content since our model only has excerpt for now.
               We can just repeat the excerpt or display a placeholder text.
            */}
             <p>
                বিস্তারিত খবর শীঘ্রই আসছে... (এটি একটি ডেমো কন্টেন্ট। ডাটাবেসে 'fullContent' ফিল্ড যোগ করে এখানে পূর্ণাঙ্গ সংবাদ প্রদর্শন করা যেতে পারে।)
            </p>
            <p>
                লরেম ইপসাম ডলর সিট আমেত, কনসেকটেচার এডিপিস্কিং এলিট। নাল্লাম অ্যাকিউমসান লরেম ইন দুই টিসিডুন্ট কনডিমেন্টাম।
            </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
