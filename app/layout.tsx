import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  variable: "--font-instrument-serif",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "tuck - The Modern Dotfiles Manager",
    template: "%s | tuck",
  },
  description: "Simple, fast, and built in TypeScript. Manage your dotfiles with Git, sync across machines, and never lose your configs again.",
  keywords: ["dotfiles", "dotfiles manager", "config manager", "git", "typescript", "cli", "configuration", "sync", "backup"],
  authors: [{ name: "Pranav Karra" }],
  creator: "Pranav Karra",
  metadataBase: new URL("https://tuck.sh"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tuck.sh",
    siteName: "tuck",
    title: "tuck - The Modern Dotfiles Manager",
    description: "Simple, fast, and built in TypeScript. Manage your dotfiles with Git, sync across machines, and never lose your configs again.",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "tuck - The Modern Dotfiles Manager",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "tuck - The Modern Dotfiles Manager",
    description: "Simple, fast, and built in TypeScript. Manage your dotfiles with Git, sync across machines, and never lose your configs again.",
    creator: "@pranavkarra",
    images: ["/preview.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
