import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  _id: string;
  slug?: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
}

export default function NewsCard({
  _id,
  slug,
  category,
  categoryColor,
  title,
  excerpt,
  author,
  date,
  image
}: NewsCardProps) {
  return (
    <Link href={`/news/${slug || _id}`} className="block h-full">
    <article className="flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group h-full font-anek">
      <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
        <Image
           src={image || "https://placehold.co/600x400/png"} 
           alt={title}
           fill
           className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <span
          className={`inline-block self-start px-2 py-1 text-[10px] font-bold text-white uppercase rounded mb-3 ${categoryColor}`}
        >
          {category}
        </span>
        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#D32F2F] transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">
          {excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
           <span className="font-medium text-gray-600">{author}</span>
           <span className="flex items-center gap-1">
             <span>🕒</span>
             {date}
           </span>
        </div>
      </div>
    </article>
    </Link>
  );
}
