import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "James Dimonaco | Full Stack Developer",
  description: "Full stack developer from the UK with 8 years of experience. Specializing in TypeScript, React, Next.js, React Native, and infrastructure. Available for contract work.",
  keywords: [
    "James Dimonaco",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "React Native Developer",
    "DevOps",
    "Kubernetes",
    "Freelance Developer",
    "Contract Developer",
    "UK Developer",
  ],
  authors: [{ name: "James Dimonaco" }],
  creator: "James Dimonaco",
  openGraph: {
    type: "website",
    locale: "en_GB",
    title: "James Dimonaco | Full Stack Developer",
    description: "Full stack developer with 8 years of experience. Available for contract work. Specializing in TypeScript, React, Next.js, and infrastructure.",
    siteName: "James Dimonaco",
  },
  twitter: {
    card: "summary_large_image",
    title: "James Dimonaco | Full Stack Developer",
    description: "Full stack developer with 8 years of experience. Available for contract work.",
    creator: "@jamesdimonaco",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} dark`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
