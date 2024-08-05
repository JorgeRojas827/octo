import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/cn";
import { getServerSession } from "next-auth";
import Provider from "@/common/helpers/client-provider";
import { setupAxios } from "@/common/helpers/axios-helper";
import { apiInstance } from "@/lib/axios/instances";
import { Toaster } from "@/common/components/ui/toaster";
import { authOptions } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Octo",
  description: "Dashboard for managing your repositories with AI",
  icons: {
    icon: "/octo-ico.svg",
  },
};

setupAxios(apiInstance);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <Provider session={session}>
      <html lang="en">
        <body
          className={cn(
            "bg-gradient-to-t from-[#030303] to-[#060606] overflow-x-hidden bg-no-repeat min-h-screen antialiased",
            inter.className
          )}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </Provider>
  );
}
