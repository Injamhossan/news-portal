"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, Save, Send } from "lucide-react";

export default function AddNews() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "বিশ্ব", // Default to World (mapped to Bengali)
    author: "Admin",
    image: "",
    isBreaking: false,
    published: false,
    tags: "",
    gallery: [] as string[],
  });

  const categories = [
    { label: "Cover (প্রচ্ছদ)", value: "প্রচ্ছদ", color: "bg-gray-500" },
    { label: "Country (দেশের খবর)", value: "দেশের খবর", color: "bg-teal-500" },
    { label: "Politics (রাজনীতি)", value: "রাজনীতি", color: "bg-red-500" },
    { label: "Sports (খেলাধুলা)", value: "খেলাধুলা", color: "bg-green-500" },
    { label: "Technology (প্রযুক্তি)", value: "প্রযুক্তি", color: "bg-blue-500" },
    { label: "Business (বাণিজ্য)", value: "বাণিজ্য", color: "bg-orange-500" },
    { label: "Entertainment (বিনোদন)", value: "বিনোদন", color: "bg-pink-500" },
    { label: "Health (স্বাস্থ্য)", value: "স্বাস্থ্য", color: "bg-rose-400" },
    { label: "Education (শিক্ষা)", value: "শিক্ষা", color: "bg-yellow-500" },
    { label: "Crime (অপরাধ)", value: "অপরাধ", color: "bg-slate-700" },
    { label: "World (বিশ্ব)", value: "বিশ্ব", color: "bg-purple-500" },
  ];

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      };

      if (name === "title" && !prev.slug) {
        newData.slug = slugify(value);
      }

      return newData;
    });
  };

  const handleGalleryChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newGallery = [...prev.gallery];
      newGallery[index] = value;
      return { ...prev, gallery: newGallery };
    });
  };

  const addGalleryField = () => {
    setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, ""] }));
  };

  const removeGalleryField = (index: number) => {
    setFormData((prev) => {
      const newGallery = prev.gallery.filter((_, i) => i !== index);
      return { ...prev, gallery: newGallery };
    });
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, slug: slugify(e.target.value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const date = new Date().toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const selectedCat = categories.find((c) => c.value === formData.category);
    const categoryColor = selectedCat ? selectedCat.color : "bg-gray-500";

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/api/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date,
          categoryColor,
          tags: formData.tags.split(",").map((t) => t.trim()).filter((t) => t),
          gallery: formData.gallery.filter(url => url.trim() !== ""),
        }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to add news");
      }
    } catch (error) {
      console.error("Error adding news:", error);
      alert("Error adding news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-anek text-gray-900 pb-20">
      {/* Top Bar */}
      <nav className="bg-white sticky top-0 z-10 border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href="/admin/dashboard"
            className="text-gray-500 hover:text-gray-900 flex items-center gap-1 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="h-6 w-px bg-gray-300 mx-1 md:mx-2"></div>
          <h1 className="text-lg md:text-xl font-serif font-bold text-gray-900">New Article</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
            {/* Preview Button - Placeholder logic */}
          <button type="button" className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-xs md:text-sm font-medium transition-colors">
            <Eye className="w-4 h-4" />
            <span className="hidden md:inline">Preview</span>
          </button>
           {/* Submit Button triggers form */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-4 md:px-6 py-2 bg-[#0F172A] text-white rounded-lg hover:bg-black text-xs md:text-sm font-medium transition-colors disabled:opacity-50 shadow-sm"
          >
            {loading ? (
                <>Saving...</>
            ) : (
                <>
                    <Save className="w-4 h-4" />
                    <span>Publish</span>
                </>
            )}
            
          </button>
        </div>
      </nav>

      <div className="max-w-[1600px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 overflow-x-hidden">
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4 lg:gap-8">
          {/* Left Column (Main Content) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* Title */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter article title..."
                className="w-full text-lg px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                required
                />
            </div>

            {/* Slug */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-2">URL Slug</label>
                <div className="flex items-center">
                    <span className="px-4 py-3 bg-gray-50 border border-r-0 border-gray-200 text-gray-500 text-sm rounded-l-lg select-none">
                        /news/
                    </span>
                    <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleSlugChange}
                    placeholder="article-url-slug"
                    className="flex-1 w-full px-4 py-3 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm text-gray-600"
                    />
                </div>
            </div>

            {/* Short Description */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description *</label>
                <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                placeholder="Brief summary of the article..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-y text-sm"
                required
                />
            </div>

            {/* Full Content */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Content *</label>
                <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={15}
                placeholder="Write your article content here... (HTML supported)"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-y font-mono text-sm leading-relaxed"
                required
                />
                <p className="mt-2 text-xs text-gray-400">
                    You can use HTML tags for formatting (p, h3, ul, li, strong, em, etc.)
                </p>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* Publish Settings */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-4 font-serif">Publish Settings</h3>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600">Published</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="published"
                                checked={formData.published}
                                onChange={handleChange}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600">Breaking News</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="isBreaking"
                                checked={formData.isBreaking}
                                onChange={handleChange}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Category */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-4 font-serif">Category</h3>
                <div className="relative">
                    <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full appearance-none px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-sm text-gray-600 cursor-pointer"
                    >
                    {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                        {cat.label}
                        </option>
                    ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-4 font-serif">Featured Image</h3>
                <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
            </div>

            {/* Gallery Images */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-4 font-serif">Image Gallery</h3>
                <div className="space-y-3">
                  {formData.gallery.map((url, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => handleGalleryChange(index, e.target.value)}
                        placeholder={`Image URL ${index + 1}`}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      />
                       <button
                        type="button"
                        onClick={() => removeGalleryField(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove Image"
                      >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addGalleryField}
                    className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Add Gallery Image
                  </button>
                </div>
            </div>

            {/* Tags */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                 <h3 className="text-sm font-bold text-gray-900 mb-4 font-serif">Tags</h3>
                <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="tag1, tag2, tag3..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
                <p className="mt-2 text-xs text-gray-400">Separate tags with commas</p>
            </div>

            {/* Author */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                 <h3 className="text-sm font-bold text-gray-900 mb-4 font-serif">Author</h3>
                <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
