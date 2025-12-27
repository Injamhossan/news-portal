"use client";

import { useState } from "react";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail, 
  Link as LinkIcon, 
  Check
} from "lucide-react";

interface ShareButtonsProps {
  title: string;
  size?: "sm" | "lg";
}

export default function ShareButtons({ title, size = "sm" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined" && navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
             setCopied(true);
             setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
             // Fallback or alert if needed
        });
    }
  };

  const handleShare = (platform: string) => {
    if (typeof window === "undefined") return;
    
    // Construct absolute URL (window.location.href works best on client)
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${text}&body=${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  const btnClass = size === "lg" 
    ? "w-10 h-10" 
    : "w-8 h-8";
  
  const iconClass = size === "lg"
    ? "w-5 h-5"
    : "w-4 h-4";

  return (
    <div className="flex gap-2">
      <button 
        onClick={() => handleShare("facebook")}
        title="Share on Facebook"
        className={`${btnClass} flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#1877F2] hover:text-white transition-all text-gray-600`}
      >
        <Facebook className={iconClass} />
      </button>
      
      <button 
        onClick={() => handleShare("twitter")}
        title="Share on Twitter"
        className={`${btnClass} flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#1DA1F2] hover:text-white transition-all text-gray-600`}
      >
        <Twitter className={iconClass} />
      </button>
      
      <button 
        onClick={() => handleShare("linkedin")}
        title="Share on LinkedIn"
        className={`${btnClass} flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#0A66C2] hover:text-white transition-all text-gray-600`}
      >
        <Linkedin className={iconClass} />
      </button>
      
      <button 
        onClick={() => handleShare("email")}
        title="Share via Email"
        className={`${btnClass} flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-800 hover:text-white transition-all text-gray-600`}
      >
        <Mail className={iconClass} />
      </button>
      
      <div className="relative group">
        <button 
            onClick={handleCopy}
            title="Copy Link"
            className={`${btnClass} flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#D32F2F] hover:text-white transition-all text-gray-600 ${copied ? "!bg-green-500 !text-white" : ""}`}
        >
            {copied ? <Check className={iconClass} /> : <LinkIcon className={iconClass} />}
        </button>
        
        {/* Tooltip for Copy Feedback */}
        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg transition-opacity duration-200 pointer-events-none whitespace-nowrap ${copied ? "opacity-100" : "opacity-0"}`}>
            Link Copied!
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-800"></div>
        </div>
      </div>
    </div>
  );
}
