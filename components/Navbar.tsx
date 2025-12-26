import Link from "next/link";

const categories = [
  "প্রচ্ছদ",
  "রাজনীতি",
  "খেলাধুলা",
  "প্রযুক্তি",
  "বিশ্ব",
  "বাণিজ্য",
  "বিনোদন",
];

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 font-sans">
      <div className="container mx-auto px-4 overflow-x-auto">
        <div className="flex items-center space-x-8 h-12 text-sm font-medium text-gray-600 mb-0.5">
          {categories.map((category) => (
            <Link
              key={category}
              href={category === "প্রচ্ছদ" ? "/" : `/category/${category}`}
              className="hover:text-[#D32F2F] whitespace-nowrap transition-colors border-b-2 border-transparent hover:border-[#D32F2F] py-3 uppercase text-xs tracking-wide"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
