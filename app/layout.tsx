import type { Metadata } from "next";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { ThemeScript } from "@/components/theme-script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crescent Design | Editorial Interior Design Studio",
  description:
    "Crescent Design is a premium interior design studio for calm modern homes, kitchens, bedrooms, baths, and commercial spaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <CursorSpotlight />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
