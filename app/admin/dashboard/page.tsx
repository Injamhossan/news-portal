"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface NewsItem {
  _id: string;
  title: string;
  category: string;
  date: string;
  image?: string;
}

export default function AdminDashboard() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Basic protection check
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin");
      return;
    }

    fetchNews();
  }, [router]);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const deleteNews = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিত যে আপনি এই খবরটি মুছে ফেলতে চান?")) return;

    try {
      const res = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setNews(news.filter((item) => item._id !== id));
      } else {
        alert("খবর মুছতে সমস্যা হয়েছে");
      }
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Admin Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-[#D32F2F] text-white w-8 h-8 flex items-center justify-center font-bold text-lg rounded">
              A
            </div>
            <span className="font-bold text-xl">অ্যাডমিন ড্যাশবোর্ড</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 font-medium text-sm"
          >
            লগআউট
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold font-serif">সকল খবর ({news.length})</h1>
          <Link
            href="/admin/add-news"
            className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-4 py-2 rounded font-medium transition-colors flex items-center gap-2"
          >
            <span>+</span> নতুন খবর যোগ করুন
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">ছবি</th>
                  <th className="px-6 py-4 font-semibold">শিরোনাম</th>
                  <th className="px-6 py-4 font-semibold">ক্যাটাগরি</th>
                  <th className="px-6 py-4 font-semibold">তারিখ</th>
                  <th className="px-6 py-4 font-semibold text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {news.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-10 relative bg-gray-200 rounded overflow-hidden">
                        {item.image && (
                           <Image src={item.image} alt={item.title} fill className="object-cover" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 line-clamp-2 max-w-xs block">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => deleteNews(item._id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                         ডিলিট
                      </button>
                    </td>
                  </tr>
                ))}
                {news.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-400">
                      কোনো খবর নেই
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
