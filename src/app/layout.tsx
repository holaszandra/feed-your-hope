import type { Metadata, Viewport } from "next";
import { DM_Sans, Crimson_Text } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
});

const crimson = Crimson_Text({
  subsets: ["latin", "latin-ext"],
  variable: "--font-crimson",
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Feed Your Hope — Scripture for your moment",
  description:
    "Find the right scripture for what you're carrying. AI-powered personalized scripture for your specific situation.",
  keywords: ["scripture", "Bible", "Christian", "faith", "encouragement", "hope"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FDF8F3",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${crimson.variable} antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
