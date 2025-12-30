import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import "@/style/globals.css";
import StoreProvider from "./StoreProvider";


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
    <html lang="bn" suppressHydrationWarning>
      <body className={`${banglaFont.variable} font-anek antialiased`} suppressHydrationWarning={true}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
        <GoogleAnalytics gaId="G-LDC5ZD9S53"/>
        <GoogleTagManager gtmId="GTM-WDNCFQS5"/>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5098961807637378"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
    </html>
  );
}
