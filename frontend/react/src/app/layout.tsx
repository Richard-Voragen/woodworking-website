import type { Metadata } from "next";
import localFont from "next/font/local";
import {Inter} from "next/font/google";
import {cn} from "@/lib/utils";
import "./globals.css";

const inter = Inter({subsets: ["latin"], variable: "--font-sans"});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Buy Custom Woodworking",
  description: "A marketplace to get in contact with other woodworkers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className= {cn(
          "bg-background min-h-screen font-sans antialiased", 
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
