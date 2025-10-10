/** @format */

import type React from 'react';
import type { Metadata } from 'next';
import { Outfit, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Fombina Tower - Abuja's Next Landmark of Luxury",
  description:
    "Premium offices, shops, and banking halls now selling in Fombina Tower, Abuja's most prestigious skyscraper development.",
  keywords:
    'Fombina Tower, Abuja, Nigeria, office space, mall space, shops, banking halls, luxury real estate, skyscraper, property for sale',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${outfit.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
