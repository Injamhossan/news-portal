import type { Metadata } from "next";
import localFont from "next/font/local";
import {} from "next/font/google"; // Importing Bengali fonts
import "@/style/globals.css";

const banglaFont = localFont({
  src: "./fonts/AnekBangla.ttf",
  variable: "--font-anekBangla",
  display: "swap",
});


export const metadata: Metadata = {
  title: "দৈনিক সর্বশেষ সংবাদ - দেশ ও জনগনের কথা বলে",
  description: "দৈনিক সর্বশেষ সংবাদ",
    icons: {
    icon: "/favicon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
<body className={`${banglaFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
