import connectDB from "@/lib/db";
import News from "@/models/News";

async function getCategoryCounts() {
    try {
        await connectDB();
        const counts = await News.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);
        
        // Define all possible categories to ensure they show up even with 0 count
        const allCategories = ["জাতীয়", "রাজনীতি", "খেলা", "বিনোদন", "আন্তর্জাতিক", "প্রযুক্তি", "শিক্ষা", "বাণিজ্য"];
        
        return allCategories.map(cat => {
            const found = counts.find(c => c._id === cat);
            return { name: cat, count: found ? found.count : 0 };
        });
    } catch (error) {
        console.error("Error fetching category counts:", error);
        return [];
    }
}

export default async function Sidebar() {
  const categories = await getCategoryCounts();

  return (
    <aside className="space-y-8 font-anek">
      {/* Categories Widget */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
          ক্যাটাগরি
        </h3>
        <div className="flex flex-col">
          {categories.map((cat, idx) => (
            <a
              key={idx}
              href="#"
              className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0 group"
            >
              <span className="text-sm font-medium text-gray-600 group-hover:text-[#D32F2F] transition-colors">
                {cat.name}
              </span>
              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full group-hover:bg-[#D32F2F]/10 group-hover:text-[#D32F2F] transition-colors">
                {cat.count}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Newsletter Widget */}
      <div className="bg-[#111827] rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">যুক্ত থাকুন</h3>
            <p className="text-gray-400 text-xs mb-6">
            প্রতিদিন সব খবর পেতে আপনার ইমেইল দিন
            </p>
            <div className="flex flex-col gap-3">
            <input
                type="email"
                placeholder="আপনার ইমেইল লিখুন"
                className="w-full bg-[#1F2937] border border-[#374151] rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#D32F2F] transition-colors"
            />
            <button className="w-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold py-2.5 rounded text-sm transition-colors uppercase tracking-wide">
                সাবস্ক্রাইব
            </button>
            </div>
        </div>
      </div>
    </aside>
  );
}
