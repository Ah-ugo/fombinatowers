import type React from "react"
import type { Metadata } from "next"
import { Outfit, Cormorant_Garamond } from "next/font/google"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Fombina Tower - Abuja's Next Landmark of Luxury",
  description:
    "Pre-lease premium office and mall spaces in Fombina Tower, Abuja's most prestigious skyscraper development.",
  keywords: "Fombina Tower, Abuja, Nigeria, office space, mall space, pre-lease, luxury real estate, skyscraper",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  )
}
