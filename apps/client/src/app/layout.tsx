import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Octo",
  description: "Dashboard for managing your repositories with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("bg-gradient-to-r from-[#1e0d35] to-[#0f101b]", inter.className)}>
          <div className="fixed w-32 h-32 bg-[#8f3b76] blur-[110px] top-[30%] left-[20%]" ></div>
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
