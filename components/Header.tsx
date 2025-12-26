import Link from "next/link";
import Image from 'next/image';
import Logo from "@/assets/Logo-01.png";
export default function Header() {
  const currentDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="font-sans">
      {/* Top Bar */}
      <div className="bg-[#111827] text-white text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>🕒</span>
            <span>{currentDate}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-gray-300">
              অ্যাডমিন
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white py-4 border-b border-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#D32F2F] text-white w-10 h-10 flex items-center justify-center font-bold text-xl rounded">
              <Image src={Logo} alt="alt" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 group-hover:text-[#D32F2F] transition-colors">
                দৈনিক সর্বশেষ সংবাদ 
              </span>
              <span className="text-[10px] text-gray-500 tracking-wider">
                দেশ ও জনগনের কথা বলে
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="w-full md:w-1/3 relative">
            <input
              type="text"
              placeholder="খবর খুঁজুন..."
              className="w-full bg-gray-100 border-none rounded-md py-2 px-4 pl-10 text-sm focus:ring-2 focus:ring-[#D32F2F] outline-none"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Right Action (Admin Panel Button again as per image?) */}
          <div className="hidden md:block text-sm font-medium text-gray-600">
            <Link href="/admin" className="hover:text-[#D32F2F]">
              অ্যাডমিন প্যানেল
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
