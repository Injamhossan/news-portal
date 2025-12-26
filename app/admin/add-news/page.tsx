"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddNews() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "রাজনীতি",
    excerpt: "",
    author: "অ্যাডমিন",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Auto-generate date in Bangla format
    const date = new Date().toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Auto-assign color based on category (simple logic)
    let categoryColor = "bg-gray-500";
    switch(formData.category) {
        case "রাজনীতি": categoryColor = "bg-red-500"; break;
        case "খেলাধুলা": categoryColor = "bg-green-500"; break;
        case "প্রযুক্তি": categoryColor = "bg-blue-500"; break;
        case "বিশ্ব": categoryColor = "bg-purple-500"; break;
        case "বাণিজ্য": categoryColor = "bg-orange-500"; break;
        case "বিনোদন": categoryColor = "bg-pink-500"; break;
    }

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date,
          categoryColor
        }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        alert("খবর যোগ করতে ব্যর্থ হয়েছে");
      }
    } catch (error) {
      console.error("Error adding news:", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-10">
      <nav className="bg-white shadow-sm border-b border-gray-200 mb-8">
        <div className="container mx-auto px-4 h-16 flex items-center">
            <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-900 mr-4">
                 &larr; ফিরে যান
            </Link>
          <span className="font-bold text-xl">নতুন খবর যোগ করুন</span>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">খবরের শিরোনাম</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#D32F2F] outline-none"
              placeholder="শিরোনাম লিখুন..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ক্যাটাগরি</label>
                <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#D32F2F] outline-none bg-white"
                >
                    <option value="রাজনীতি">রাজনীতি</option>
                    <option value="খেলাধুলা">খেলাধুলা</option>
                    <option value="প্রযুক্তি">প্রযুক্তি</option>
                    <option value="বিশ্ব">বিশ্ব</option>
                    <option value="বাণিজ্য">বাণিজ্য</option>
                    <option value="বিনোদন">বিনোদন</option>
                    <option value="প্রচ্ছদ">প্রচ্ছদ</option>
                </select>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">লেখক</label>
                <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#D32F2F] outline-none"
                required
                />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">সারসংক্ষেপ (Excerpt)</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#D32F2F] outline-none"
              placeholder="সংক্ষিপ্ত বিবরণ..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ছবির লিঙ্ক (Image URL)</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              type="text" // Using text for URL for simplicity as per user request context
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#D32F2F] outline-none"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">আপাতত ছবির ডিরেক্ট লিঙ্ক ব্যবহার করুন (যেমন imgur বা অন্য কোনো হোস্ট থেকে)</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold py-3 rounded-md transition-colors disabled:opacity-50"
          >
            {loading ? "পোস্ট করা হচ্ছে..." : "খবর প্রকাশ করুন"}
          </button>

        </form>
      </div>
    </div>
  );
}
