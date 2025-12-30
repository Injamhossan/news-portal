const postNews = async () => {
  const date = new Date().toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const newsData = {
    title: "সমাজে স্বেচ্ছাসেবী কাজের গুরুত্ব এবং তরুণ সমাজের ভূমিকা",
    slug: "importance-of-volunteer-work-and-youth-role",
    excerpt: "বর্তমান সময়ে সামাজিক উন্নয়নে স্বেচ্ছাসেবী সংগঠনের ভূমিকা অত্যন্ত গুরুত্বপূর্ণ। তরুণ সমাজ কীভাবে এতে অবদান রাখতে পারে? আসুন জেনে নিই বিস্তারিত।",
    content: `
      <p>সামাজিক উন্নয়ন ও মানবিক মূল্যবোধ প্রতিষ্ঠায় স্বেচ্ছাসেবী কাজের গুরুত্ব অপরিসীম। একটি সুস্থ ও সুন্দর সমাজ বিনির্মাণে সরকারি উদ্যোগের পাশাপাশি ব্যক্তিগত ও সমষ্টিগত স্বেচ্ছাশ্রমের ভূমিকা অনস্বীকার্য।</p>
      
      <h3>স্বেচ্ছাসেবী কাজ কী?</h3>
      <p>স্বেচ্ছাসেবী কাজ হলো এমন এক ধরনের সেবা যা কোনো আর্থিক প্রতিদান ছাড়াই করা হয়। এটি মানুষের প্রতি মানুষের মমত্ববোধ ও দায়িত্ববোধ থেকে উৎসারিত হয়।</p>

      <h3>তরুণ সমাজের ভূমিকা</h3>
      <p>দেশের মোট জনসংখ্যার একটি বড় অংশ তরুণ। তাদের শক্তি, মেধা ও সময় যদি সঠিক পথে ব্যয় করা যায়, তবে তা দেশের উন্নয়নে বৈপ্লবিক পরিবর্তন আনতে পারে। রক্তদান কর্মসূচি, বৃক্ষরোপণ, অসহায়দের মাঝে ত্রাণ বিতরণ, এবং বিনামূল্যে শিক্ষা প্রদানের মতো কাজগুলোতে তরুণরা অগ্রণী ভূমিকা পালন করতে পারে।</p>

      <h3>উপসংহার</h3>
      <p>পরিশেষে বলা যায়, আত্মকেন্দ্রিকতা পরিহার করে আমাদের সকলকে সমাজের কল্যাণে এগিয়ে আসতে হবে। বিশেষ করে তরুণ প্রজন্মকে এই মহৎ কাজে উদ্বুদ্ধ করতে হবে।</p>
    `,
    category: "সামাজিক",
    categoryColor: "bg-indigo-500",
    author: "সম্পাদক",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    isBreaking: false,
    published: true,
    tags: ["সমাজ", "স্বেচ্ছাসেবা", "তরুণ"],
    gallery: [],
    date: date
  };

  try {
    const response = await fetch('http://localhost:3000/api/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newsData),
    });

    if (response.ok) {
        const data = await response.json();
        console.log('News posted successfully:', data);
    } else {
        console.error('Failed to post news:', response.statusText);
        const text = await response.text();
        console.error('Response:', text);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

postNews();
