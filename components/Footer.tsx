import Image from "next/image";
import Link from "next/link";
import FotLogo from '@/assets/Logo-01.png';

export default function Footer() {
  return (
    <footer className="bg-[#0B1120] text-gray-300 pt-10 pb-8 mt-10 font-anek">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 flex items-center justify-center font-bold text-xl rounded">
              <Image src={FotLogo} alt="alt" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white-900 group-hover:text-[#D32F2F] transition-colors">
                দৈনিক সর্বশেষ সংবাদ 
              </span>
              <span className="text-[10px] text-white-500 tracking-wider">
                দেশ ও জনগনের কথা বলে
              </span>
            </div>
          </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              আপনার বিশ্বস্ত খবরের সঙ্গী। আমরা পৌঁছে দিই রাজনীতি, অর্থনীতি, খেলাধুলা এবং বিনোদনের তাজা খবর, সবার আগে।
            </p>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="font-bold text-white text-lg mb-6">ক্যাটাগরি</h4>
            <ul className="text-sm space-y-3">
              <li><Link href="/" className="hover:text-[#D32F2F] transition-colors">রাজনীতি</Link></li>
              <li><Link href="/" className="hover:text-[#D32F2F] transition-colors">খেলাধুলা</Link></li>
              <li><Link href="/" className="hover:text-[#D32F2F] transition-colors">প্রযুক্তি</Link></li>
              <li><Link href="/" className="hover:text-[#D32F2F] transition-colors">বিশ্ব</Link></li>
              <li><Link href="/" className="hover:text-[#D32F2F] transition-colors">বাণিজ্য</Link></li>
              <li><Link href="/" className="hover:text-[#D32F2F] transition-colors">বিনোদন</Link></li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-bold text-white text-lg mb-6">দ্রুত লিঙ্ক</h4>
            <ul className="text-sm space-y-3">
              <li><Link href="/" className="hover:text-[#D32F2F] transition-colors">প্রচ্ছদ</Link></li>
              <li><Link href="/admin" className="hover:text-[#D32F2F] transition-colors">অ্যাডমিন প্যানেল</Link></li>
              <li><Link href="/" className="hover:text-[#D32F2F] transition-colors">আমাদের সম্পর্কে</Link></li>
              <li><Link href="/" className="hover:text-[#D32F2F] transition-colors">যোগাযোগ</Link></li>
              <li><Link href="/" className="hover:text-[#D32F2F] transition-colors">গোপনীয়তা নীতি</Link></li>
            </ul>
          </div>

          {/* Connect Column */}
          {/* Connect Column */}
          <div className="flex flex-col gap-6">
             {/* Newsletter Widget */}
            <div className="bg-[#111827] rounded-xl shadow-lg p-6 text-white relative overflow-hidden border border-gray-800">
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

            <div className="flex gap-4 justify-center md:justify-start">
              {/* Facebook */}
              <a href="https://www.facebook.com/profile.php?id=61581782068911" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all transform hover:-translate-y-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              {/* Twitter */}
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all transform hover:-translate-y-1">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all transform hover:-translate-y-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.373c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
               {/* Youtube */}
               <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all transform hover:-translate-y-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
            
             <a href="mailto:contact@newsportal.com" className="flex items-center gap-2 hover:text-white transition-colors group justify-center md:justify-start">
              <svg className="w-5 h-5 text-gray-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>contact@doiniksorboshesh.com</span>
             </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; ২০২৫ দৈনিক সর্বশেষ সংবাদ। সর্বস্বত্ব সংরক্ষিত।</p>
            <div className="flex gap-4 mt-4 md:mt-0">
               <a href="#" className="hover:text-gray-300">Terms</a>
               <a href="#" className="hover:text-gray-300">Privacy</a>
               <a href="#" className="hover:text-gray-300">Cookies</a>
            </div>
        </div>
      </div>
    </footer>
  );
}
