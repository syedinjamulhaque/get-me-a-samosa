import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SessionWrapper from "@/components/SessionWrapper"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata = {
  title: "Get Me a Samosa - Fund your projects with samosas",
  description: "A crowdfunding platform where fans can buy creators a samosa.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}>
      <body className="flex min-h-dvh flex-col overflow-x-clip bg-black bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white">
        <SessionWrapper>
          <Navbar />
          <main className="relative flex-1">{children}</main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  )
}