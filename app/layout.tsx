import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { OpportunityProvider } from "@/context/OpportunityContext";
import { CVProvider } from "@/context/CVContext";
import AppLoader from "@/components/AppLoader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KaarYab Afghanistan - Opportunity Finder",
  description:
    "Discover jobs, internships, scholarships, and more in Afghanistan",
  keywords:
    "jobs, internships, scholarships, opportunities, Afghanistan, career",
  authors: [{ name: "KaarYab Team" }],
  openGraph: {
    title: "KaarYab Afghanistan",
    description: "Empowering Afghan youth through opportunities",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#FFFFFF",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#000000",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AppLoader>
          <ThemeProvider>
          <OpportunityProvider>
            <CVProvider>
              <div className="min-h-screen flex flex-col bg-bg text-text-primary transition-colors duration-300">
                <Navbar />

                <main className="flex-1">{children}</main>

                <Footer />
              </div>
            </CVProvider>
          </OpportunityProvider>
        </ThemeProvider>
        </AppLoader>
      </body>
    </html>
  );
}
