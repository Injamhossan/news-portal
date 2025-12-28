import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import News from "@/models/News";
import Logo from "@/assets/Logo-01.png";
import PrintActionButtons from "@/components/PrintActionButtons";

interface PrintPageProps {
  params: Promise<{ id: string }>;
}

async function getNewsDetail(id: string) {
  try {
    await connectDB();
    
    let news = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      news = await News.findById(id);
    }

    if (!news) {
      news = await News.findOne({ slug: id });
    }

    if (!news) return null;
    return JSON.parse(JSON.stringify(news));
  } catch (error) {
    return null;
  }
}

export default async function NewsPrintPage({ params }: PrintPageProps) {
  const resolvedParams = await params;
  const news = await getNewsDetail(resolvedParams.id);

  if (!news) {
    return notFound();
  }

  const currentDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-gray-100 min-h-screen py-8 font-anek">
      {/* Control Bar (Hidden when printing) */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-50 print:hidden">
        <Link href={`/news/${news._id}`} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800 font-bold transition">
          BACK TO NEWS
        </Link>
        <PrintActionButtons />
      </div>
      
      {/* Main Card */}
      <div id="newspaper-card" className="max-w-[800px] mx-auto bg-white p-8 md:p-12 shadow-lg print:shadow-none print:w-full print:max-w-none print:mx-0 print:p-0">
        
        {/* Newspaper Header */}
        <div className="text-center border-b-2 border-black pb-4 mb-6">
            <div className="flex justify-center mb-2">
                {/* Logo if available, or just text */}
                 <div className="flex items-center gap-2 justify-center">
                    <div className="w-12 h-12 relative">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img src={Logo.src} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                     <h1 className="text-4xl font-bold text-[#D32F2F]">দৈনিক সর্বশেষ সংবাদ</h1>
                 </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">দেশ ও জনগনের কথা বলে</p>
            <div className="text-sm bg-[#D32F2F] text-white py-1 px-4 inline-block rounded-full mb-2">
                www.dailylatestnews.news
            </div>
            <p className="text-sm text-gray-500 mt-2">
                প্রিন্ট এর তারিখঃ {currentDate} || প্রকাশের তারিখঃ {news.date}
            </p>
        </div>

        {/* Content */}
        <article>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6 leading-tight">
                {news.title}
            </h2>

            {/* Featured Image */}
             <div className="mb-6 w-full relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                <Image 
                    src={news.image || "https://placehold.co/1200x800/png"} 
                    alt={news.title} 
                    fill 
                    className="object-cover"
                    priority
                />
            </div>

            {/* Text Content */}
            <div className="prose prose-lg max-w-none text-justify text-gray-800 leading-relaxed print:text-sm">
                <div dangerouslySetInnerHTML={{ __html: news.content }} />
            </div>

             {/* Author and extra info */}
             <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
                <div>
                     <span className="font-bold text-gray-900">রিপোর্টার:</span> {news.author}
                </div>
                 <div>
                     <span className="font-bold text-gray-900">ক্যাটাগরি:</span> {news.category}
                </div>
             </div>
        </article>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t-2 border-black text-center text-xs text-gray-500">
            <p>সম্পাদক ও প্রকাশক: মাহবুব আলম | অফিস: তেজকুনি পাড়া, ফার্মগেট</p>
            <p>ইমেইল: info@doiniksorboshesh.com | ফোন: +8801345160892</p>
        </div>

      </div>
    </div>
  );
}
