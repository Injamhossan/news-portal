"use client";

import React, { useState, useCallback } from "react";
import { Download, Loader2 } from "lucide-react";
import { toJpeg } from 'html-to-image';

export default function PrintActionButtons() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadImage = useCallback(async () => {
    const element = document.getElementById("newspaper-card");
    if (!element) return;

    try {
      setIsGenerating(true);
      
      // Force scroll to top to ensure clean capture if layout depends on scroll
      const originalScroll = window.scrollY;
      window.scrollTo(0, 0);

      // Wait a moment for any lazy loading/layout
      await new Promise(resolve => setTimeout(resolve, 500));

      const dataUrl = await toJpeg(element, { 
        quality: 0.95, 
        backgroundColor: "#ffffff",
        // Explicitly set width/height to avoid cutoff
        width: element.offsetWidth,
        height: element.offsetHeight,
        style: {
           // Reset margins for the capture clone so it starts at 0,0
           margin: '0', 
           transform: 'none',
           // Ensure it takes full width in the captured context
           maxWidth: '100%',
           width: '800px' // Enforce the width we want in the image
        }
      });
      
      // Restore scroll
      window.scrollTo(0, originalScroll);

      const link = document.createElement("a");
      link.download = `news-card-${Date.now()}.jpg`;
      link.href = dataUrl;
      link.click();
      
    } catch (error) {
      console.error("Failed to generate image", error);
      alert("ছবি ডাউনলোড করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return (
    <div className="flex gap-4">
        <button
          onClick={handleDownloadImage}
          disabled={isGenerating}
          className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-2 rounded font-bold transition flex items-center gap-2 shadow-sm"
        >
          {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
              <Download className="w-5 h-5" />
          )}
          {isGenerating ? "ডাউনলোড হচ্ছে..." : "ইমেজ হিসেবে ডাউনলোড করুন"}
        </button>
    </div>
  );
}
