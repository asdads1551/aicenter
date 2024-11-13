import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { Inter  } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css";
import Navbar from "@/components/Navbar";  // 確保這行正確
import Footer from "../components/Footer";
import { NextAuthOptions } from "next-auth"

const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "AI center",
  icons: {
    icon: '/favicon.ico',
  },
  description: "集結了所有AI有關的任何工具與資訊, 更公開透明的了解AI工具的好與壞",
};

export const nextauthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: []
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}> 
        <Navbar/>
        <main style={{ flexGrow: 1 }}>
            {children}
          </main>
        <Footer />
      </body>
    </html>
  );
}
