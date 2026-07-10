import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { OpportunityProvider } from '@/context/OpportunityContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KaarYab Afghanistan - Opportunity Finder',
  description: 'Discover jobs, internships, scholarships, and more in Afghanistan',
  keywords: 'jobs, internships, scholarships, opportunities, Afghanistan, career',
  authors: [{ name: 'KaarYab Team' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <OpportunityProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </OpportunityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}