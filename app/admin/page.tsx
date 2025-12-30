"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        const text = await res.text();
        console.error("Failed to parse JSON response:", text);
        throw new Error(`Invalid server response: ${text.substring(0, 100)}...`);
      }

      if (res.ok) {
        localStorage.setItem("admin_token", data.token);
        document.cookie = `admin_token=${data.token}; path=/`; 
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "লগইন ব্যর্থ হয়েছে");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.message || "সার্ভার সমস্যা। অনুগ্রহ করে পরে আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-anek p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 font-serif">
          অ্যাডমিন প্যানেল লগইন
        </h2>
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ইমেইল
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D32F2F] text-gray-900"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D32F2F] text-gray-900"
              placeholder="admin123"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold py-2 rounded transition-colors"
          >
            লগইন করুন
          </button>
        </form>
      </div>
    </div>
  );
}
