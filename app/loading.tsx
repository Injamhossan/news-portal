export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Modern Spinner */}
        <div className="relative flex items-center justify-center">
            {/* Outer Ring */}
            <div className="w-16 h-16 border-4 border-[#f3f3f3] border-t-[#D32F2F] rounded-full animate-spin"></div>
            {/* Inner Dot (Optional for aesthetics) */}
            <div className="absolute w-3 h-3 bg-[#D32F2F] rounded-full animate-ping"></div>
        </div>
        
        {/* Text */}
        <div className="flex flex-col items-center gap-1">
            <h2 className="text-xl font-bold font-anek text-gray-800 tracking-wide">
                দৈনিক সর্বশেষ সংবাদ
            </h2>
            <p className="text-sm text-gray-400 font-anek animate-pulse">
                লোড হচ্ছে...
            </p>
        </div>
      </div>
    </div>
  );
}
