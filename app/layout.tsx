import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  Baloo_Da_2,
  Tiro_Bangla,
  Galada,
} from "next/font/google"; // Importing Bengali fonts
import "@/style/globals.css";


const balooDa2 = Baloo_Da_2({
  subsets: ["bengali"],
  variable: "--font-baloo-da-2",
  display: "swap",
});

const tiroBangla = Tiro_Bangla({
  weight: "400", // Tiro Bangla usually has limited weights
  subsets: ["bengali"],
  variable: "--font-tiro-bangla",
  display: "swap",
});

const galada = Galada({
  weight: "400",
  subsets: ["bengali"],
  variable: "--font-galada",
  display: "swap",
});


const banglaFont = localFont({
  src: "./fonts/AnekBangla-VariableFont_wdth,wght.ttf",
  variable: "--font-AnekBangla",
  display: "swap",
});


export const metadata: Metadata = {
  title: "দৈনিক সর্বশেষ সংবাদ - দেশ ও জনগনের কথা বলে",
  description: "দৈনিক সর্বশেষ সংবাদ",
    icons: {
    icon: "./fav-01.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body
        className={`${banglaFont.variable} ${balooDa2.variable} ${tiroBangla.variable} ${galada.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
