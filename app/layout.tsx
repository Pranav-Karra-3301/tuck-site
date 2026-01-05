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
  title: "tuck the modern dotfiles manager",
  description: "tuck - the modern dotfiles manager. Manage your dotfiles with ease and elegance.",
  metadataBase: new URL("https://tuck.sh"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "tuck the modern dotfiles manager",
    description: "tuck - the modern dotfiles manager. Manage your dotfiles with ease and elegance.",
    url: "https://tuck.sh",
    siteName: "tuck",
    type: "website",
    images: [
      {
        url: "/tuck.png",
        width: 1200,
        height: 630,
        alt: "tuck - the modern dotfiles manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "tuck the modern dotfiles manager",
    description: "tuck - the modern dotfiles manager. Manage your dotfiles with ease and elegance.",
    images: ["/tuck.png"],
  },
  icons: {
    icon: "/tuck.png",
    apple: "/tuck.png",
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
