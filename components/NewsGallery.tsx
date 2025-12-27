"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface NewsGalleryProps {
  images: string[];
  title: string;
}

export default function NewsGallery({ images, title }: NewsGalleryProps) {
  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="mb-10 w-full relative aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
    );
  }

  return (
    <div className="mb-10 w-full relative aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-sm group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <Image
              src={img}
              alt={`${title} - Image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom styles to override Swiper defaults if needed */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: rgba(0, 0, 0, 0.5);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
        .swiper-pagination-bullet-active {
          background-color: #D32F2F;
        }
      `}</style>
    </div>
  );
}
