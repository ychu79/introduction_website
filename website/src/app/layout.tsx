import type { Metadata } from "next";
import type { ReactNode } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { siteConfig, siteContent } from "@/content/site";
import "./globals.css";

const title = `${siteConfig.companyName} | Websites, Apps & Custom Software`;
const sharingImage = {
  url: "/social-preview.png",
  width: 1200,
  height: 630,
  alt: `${siteConfig.companyName}: ${siteContent.hero.heading}`,
};

export const metadata: Metadata = {
  title,
  description: siteContent.hero.description,
  icons: { icon: "/favicon.svg" },
  // Do not emit localhost or invented production URLs during development.
  ...(siteConfig.url ? {
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: siteConfig.url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.companyName,
      title,
      description: siteContent.hero.description,
      url: siteConfig.url,
      images: [sharingImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: siteContent.hero.description,
      images: [sharingImage],
    },
  } : {}),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
