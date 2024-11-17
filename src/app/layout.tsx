import type { Metadata } from "next";
//import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/components/auth-context";

//const geistSans = localFont({
//  src: "./fonts/GeistVF.woff",
//  variable: "--font-geist-sans",
//  weight: "100 900",
//});
//
//const geistMono = localFont({
//  src: "./fonts/GeistMonoVF.woff",
//  variable: "--font-geist-mono",
//  weight: "100 900",
//});

export const metadata: Metadata = {
  title: "Chat Room",
  description: "Chat",
};

import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem  
            disableTransitionOnChange
          >
            <AuthProvider>
              <Navbar />
              {children}
            </AuthProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
