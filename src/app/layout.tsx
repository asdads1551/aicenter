import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css";
import Navbar from "@/components/Navbar";  // 確保這行正確
import Footer from "../components/Footer";
import { NextAuthOptions } from "next-auth"
import { ConfigProvider, message } from "antd";

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
        "min-h-screen bg-[#FAFBFD] font-sans antialiased w-[100%]",
        fontSans.variable
      )}>
        <ConfigProvider theme={{
          token: {
            colorPrimary: "#1895F1",
          },
          components: {
            Menu: {
              activeBarBorderWidth: 0,
            }
          }
        }}>
          <Navbar />
          <main className="px-[14px] sm:px-[24px] lg:px-0 max-w-7xl w-[100%] mx-auto" style={{ flexGrow: 1 }}>
            {children}
          </main>
          <Footer />
        </ConfigProvider>
      </body>
    </html>
  );
}
