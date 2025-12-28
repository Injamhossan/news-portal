import Link from "next/link";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center font-anek">
      <div className="bg-red-50 p-6 rounded-full mb-6 animate-pulse">
        <AlertTriangle className="w-16 h-16 text-[#D32F2F]" />
      </div>
      
      <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-2 font-serif">
        ৪০৪
      </h1>
      
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
      </h2>
      
      <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
        দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা হয়তো সরানো হয়েছে, নাম পরিবর্তন করা হয়েছে অথবা সাময়িকভাবে অনুপলব্ধ রয়েছে।
      </p>
      
      <Link 
        href="/"
        className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg transform hover:-translate-y-1"
      >
        <Home className="w-5 h-5" />
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
