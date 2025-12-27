import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import News from "@/models/News";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  User,
  Clock, 
  ArrowLeft 
} from "lucide-react";

import ShareButtons from "@/components/ShareButtons";
import NewsGallery from "@/components/NewsGallery";

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

async function getRelatedNews(category: string, currentId: string) {
  try {
    await connectDB();
    // Fetch 3 related news from same category, excluding current one
    const related = await News.find({ 
        category: category, 
        _id: { $ne: currentId } 
    })
    .sort({ createdAt: -1 })
    .limit(3);
    
    return JSON.parse(JSON.stringify(related));
  } catch (error) {
    console.error("Error fetching related news:", error);
    return [];
  }
}

export default async function NewsDetailsPage({ params }: NewsDetailsPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const news = await getNewsDetail(id);

  if (!news) {
    notFound();
  }

  const relatedNews = await getRelatedNews(news.category, id);

  return (
    <div className="min-h-screen bg-white font-anek text-gray-900">
      <Header />
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-gray-500 hover:text-[#D32F2F] transition-colors text-sm font-medium gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to News</span>
            </Link>
        </div>

        {/* Article Header */}
        <div className="mb-8 max-w-4xl">
           <span className={`inline-block px-3 py-1 text-white text-xs font-bold uppercase tracking-wider rounded mb-4 ${news.categoryColor || "bg-[#D32F2F]"}`}>
            {news.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {news.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
             {/* Using excerpt as subtitle/intro */}
            {news.excerpt}
          </p>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-y border-gray-100 py-4">
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#D32F2F]" />
                    <span className="font-medium text-gray-900">{news.author}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D32F2F]" />
                    <span>{news.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 mr-2">Share:</span>
                  <div className="flex gap-2">
                       <ShareButtons title={news.title} />
                  </div>
              </div>
          </div>
        </div>

        {/* Featured Image */}
        {/* Featured Image or Gallery */}
        {news.gallery && news.gallery.length > 0 ? (
           <NewsGallery images={news.gallery} title={news.title} />
        ) : (
          <div className="mb-10 w-full relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
              <Image 
                  src={news.image || "https://placehold.co/1200x800/png"} 
                  alt={news.title} 
                  fill 
                  className="object-cover"
                  priority
              />
          </div>
        )}

        {/* Article Body */}
        <div className="max-w-4xl">
            <div 
                className="prose prose-lg prose-red max-w-none text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: news.content || `<p>${news.excerpt}</p>` }}
            />

            {/* Tags */}
            <div className="mt-10 py-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                    {news.tags && news.tags.length > 0 ? (
                        news.tags.map((tag: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm rounded-full transition-colors cursor-pointer">
                            #{tag.replace(/^#/, '')}
                        </span>
                        ))
                    ) : (
                        ['#news', `#${news.category}`].map((tag, i) => (
                             <span key={i} className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm rounded-full transition-colors cursor-pointer">
                                {tag}
                            </span>
                        ))
                    )}
                </div>
            </div>

             {/* Bottom Share */}
             <div className="flex items-center gap-4 py-6 border-b border-gray-100">
                  <span className="font-bold text-gray-900">Share:</span>
                  <div className="flex gap-2">
                        <ShareButtons title={news.title} size="lg" />
                  </div>
              </div>
        </div>

        {/* Related News */}
        {relatedNews.length > 0 && (
            <div className="mt-16 pt-10 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-[#D32F2F] pl-3">
                    সম্পর্কিত খবর (Related News)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedNews.map((item: any) => (
                        <Link href={`/news/${item._id}`} key={item._id} className="group cursor-pointer">
                            <div className="relative aspect-[16/10] bg-gray-200 rounded-lg overflow-hidden mb-4">
                                <Image src={item.image || "https://placehold.co/600x400"} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="flex gap-2 text-xs text-gray-500 mb-2">
                                <span className="text-[#D32F2F] font-bold uppercase">{item.category}</span>
                                <span>•</span>
                                <span>{item.date}</span>
                            </div>
            <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#D32F2F] transition-colors leading-snug">
                                {item.title}
                            </h4>
                        </Link>
                    ))}
                </div>
            </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
