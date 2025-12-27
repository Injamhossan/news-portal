
"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/Logo-01.png";

export default function EditNews({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    excerpt: "",
    author: "",
    image: "",
    isBreaking: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (!resolvedParams?.id) return;
    
    // Auth check
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin");
      return;
    }

    const fetchNews = async () => {
      try {
        const res = await fetch(`/api/news/${resolvedParams.id}`);
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        setFormData({
          title: data.title,
          category: data.category,
          excerpt: data.excerpt,
          author: data.author,
          image: data.image || "",
          isBreaking: data.isBreaking || false,
        });
      } catch (err) {
        setError("খবর লোড করতে সমস্যা হয়েছে");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [resolvedParams, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvedParams?.id) return;

    try {
      const res = await fetch(`/api/news/${resolvedParams.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        alert("খবর আপডেট করতে সমস্যা হয়েছে");
      }
    } catch (error) {
      console.error("Error updating news:", error);
      alert("Something went wrong!");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
                <div className="text-white w-8 h-8 flex items-center justify-center font-bold text-lg rounded">
                    <Image src={Logo} alt="Logo" />
                </div>
                <span className="font-bold text-xl">অ্যাডমিন প্যানেল</span>
            </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 font-serif">
            খবর সম্পাদনা করুন
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                শিরোনাম
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ক্যাটাগরি
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                  required
                >
                  <option value="">নির্বাচন করুন</option>
                  <option value="জাতীয়">জাতীয়</option>
                  <option value="রাজনীতি">রাজনীতি</option>
                  <option value="খেলা">খেলা</option>
                  <option value="বিনোদন">বিনোদন</option>
                  <option value="আন্তর্জাতিক">আন্তর্জাতিক</option>
                  <option value="প্রযুক্তি">প্রযুক্তি</option>
                  <option value="শিক্ষা">শিক্ষা</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  লেখক
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ইমেজ URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">ImgBB বা Google Drive ইমেজ লিংক ব্যবহার করুন</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isBreaking"
                id="isBreaking"
                checked={formData.isBreaking}
                onChange={handleChange}
                className="w-5 h-5 text-[#D32F2F] border-gray-300 rounded focus:ring-[#D32F2F]"
              />
              <label htmlFor="isBreaking" className="text-sm font-medium text-gray-700">
                এটি কি ব্রেকিং নিউজ?
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                বিস্তারিত খবর
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={6}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                required
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Link
                href="/admin/dashboard"
                className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-medium"
              >
                বাতিল
              </Link>
              <button
                type="submit"
                className="px-6 py-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded font-medium transition-colors"
              >
                আপডেট করুন
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
