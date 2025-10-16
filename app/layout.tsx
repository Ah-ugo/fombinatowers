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
  authors: [{ name: 'Uloaku Ekwuribe' }, { name: 'Ahuekwe Prince' }],
  creator: 'Ahuekwe Prince',
  publisher: 'Ahuekwe Prince',
  metadataBase: new URL('https://fombinatower.vercel.app'),
  openGraph: {
    title: "Fombina Tower - Abuja's Next Landmark of Luxury",
    description:
      "Premium offices, shops, and banking halls now selling in Fombina Tower, Abuja's most prestigious skyscraper development.",
    url: 'https://fombinatower.vercel.app',
    siteName: 'Fombina Tower',
    images: [
      {
        url: '/fombina_logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Fombina Tower Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Fombina Tower - Abuja/'s Next Landmark of Luxury`,
    description:
      'Premium offices, shops, and banking halls now selling in Fombina Tower, Abujas most prestigious skyscraper development.',
    creator: '@fombinatower',
    images: ['/fombina_logo.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: [
    { rel: 'icon', url: '/fombina_logo.jpeg', sizes: '32x32' },
    { rel: 'apple-touch-icon', url: '/fombina_logo.jpeg', sizes: '180x180' },
  ],
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
