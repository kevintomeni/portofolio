import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio | Mobile Developer & UI/UX Designer",
    template: "%s | Portfolio",
  },
  description:
    "Crafting beautiful mobile experiences and intuitive interfaces that users love. Specializing in React Native, Flutter, and modern web development.",
  keywords: [
    "portfolio",
    "mobile developer",
    "UI/UX designer",
    "React Native",
    "Flutter",
    "Next.js",
    "TypeScript",
    "web development",
    "frontend",
    "mobile apps",
  ],
  authors: [{ name: "Kevin" }],
  creator: "Kevin",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monportofolio-395c4.web.app",
    siteName: "Portfolio",
    title: "Portfolio | Mobile Developer & UI/UX Designer",
    description:
      "Crafting beautiful mobile experiences and intuitive interfaces that users love.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Mobile Developer & UI/UX Designer",
    description:
      "Crafting beautiful mobile experiences and intuitive interfaces that users love.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${spaceMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
