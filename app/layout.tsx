import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "tuck",
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
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "tuck - The Modern Dotfiles Manager",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "tuck - The Modern Dotfiles Manager",
    description: "Simple, fast, and built in TypeScript. Manage your dotfiles with Git, sync across machines, and never lose your configs again.",
    creator: "@pranavkarra",
    images: ["/og-image.jpg"],
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme-preference');
                  const theme = stored || 'system';
                  const resolvedTheme = theme === 'system' 
                    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                    : theme;
                  document.documentElement.setAttribute('data-theme', resolvedTheme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
