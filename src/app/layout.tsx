import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Student Athlete Income - NIL Deal Tracking & Analysis",
  description: "AI-powered platform for tracking and analyzing Name, Image, and Likeness (NIL) deals in college sports. Real-time detection, comprehensive coverage, and in-depth analysis.",
  keywords: "NIL, college sports, student athlete income, name image likeness, college athletics, sports deals",
  authors: [{ name: "Student Athlete Income" }],
  openGraph: {
    title: "Student Athlete Income - NIL Deal Tracking",
    description: "Real-time NIL deal detection and analysis powered by AI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Athlete Income - NIL Deal Tracking",
    description: "Real-time NIL deal detection and analysis powered by AI",
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <div className="min-h-screen flex flex-col">
          {/* Navigation */}
          <nav className="bg-white border-b border-zinc-100 sticky top-0 z-50">
            <div className="container mx-auto px-8">
              <div className="flex items-center justify-between h-20">
                <div className="flex items-center">
                  <a href="/" className="flex items-center space-x-3">
                    <span className="text-xl font-light text-black tracking-tight">Student Athlete Income</span>
                  </a>
                </div>
                
                <div className="hidden md:flex items-center space-x-8">
                  <a href="/api/automation/detect-nil" className="text-sm text-zinc-600 hover:text-black transition-colors font-medium">
                    Status
                  </a>
                </div>
              </div>
            </div>
          </nav>
          
          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="bg-zinc-50 py-16">
            <div className="container mx-auto px-8">
              <div className="text-center">
                <div className="mb-6">
                  <span className="text-lg font-light text-black tracking-tight">Student Athlete Income</span>
                </div>
                <p className="text-sm text-zinc-600 mb-8 max-w-md mx-auto">
                  AI-powered NIL deal tracking and analysis for college sports
                </p>
                <div className="text-xs text-zinc-500">
                  © 2025 Student Athlete Income. All rights reserved.
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
