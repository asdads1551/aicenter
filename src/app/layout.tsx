import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css";
import { NextAuthOptions } from "next-auth"
import { ConfigProvider } from "antd";
import { Layout } from "@/components/Layout";

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
          <Layout>
            {children}
          </Layout>
        </ConfigProvider>
      </body>
    </html>
  );
}
