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
        <body className={cn("bg-gradient-to-t from-[#030303] to-[#060606] antialiased", inter.className)}>
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
