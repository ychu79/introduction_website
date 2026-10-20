import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig, siteContent } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.companyName,
  description: siteContent.hero.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
