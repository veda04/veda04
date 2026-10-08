import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import { PROFILE, SITE } from "@/app/constants";
import { BING_VERIFICATION_CODE, buildCosmokodeJsonLd, buildPersonJsonLd, buildWebSiteJsonLd, sanitizeJsonLd, SITE_DESCRIPTION, SITE_KEYWORDS } from "@/app/seo";
import ScrollToTopButton from "@/components/scroll-to-top-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(PROFILE.websiteUrl),
  title: {
    default: SITE.ownerName,
    template: `%s | ${SITE.ownerName}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE.brandName,
  category: "portfolio",
  authors: [{ name: SITE.ownerName, url: PROFILE.websiteUrl }],
  creator: SITE.ownerName,
  publisher: SITE.ownerName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    other: {
      "msvalidate.01": BING_VERIFICATION_CODE,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: PROFILE.websiteUrl,
    siteName: SITE.ownerName,
    locale: "en_GB",
    title: SITE.ownerName,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/seo_image.jpg",
        alt: "Veda Salkar portfolio and research profile",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: PROFILE.twitterHandle,
    creator: PROFILE.twitterHandle,
    title: SITE.ownerName,
    description: SITE_DESCRIPTION,
    images: ["/images/seo_image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  try {
    const stored = localStorage.getItem("theme");
    const theme =
      stored === "light" || stored === "dark"
        ? stored
        : "light";

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
  } catch {}
})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: sanitizeJsonLd(buildWebSiteJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: sanitizeJsonLd(buildPersonJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: sanitizeJsonLd(buildCosmokodeJsonLd()),
          }}
        />
      </head>
      <body className="min-h-full bg-background mx-auto text-foreground transition-colors duration-200">
        <ThemeProvider>
          <div className="flex flex-col">
            <Navigation />
            <main className="w-full flex-1 mx-auto">
              {children}
            </main>
            <Footer />
          </div>
			    <ScrollToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
