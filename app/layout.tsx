import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link"; // Link 컴포넌트 추가
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Design Patterns Practice",
  description: "Frontend Design Patterns Implementation Examples",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Link
                      href="/"
                      className="text-xl font-bold hover:text-gray-700"
                    >
                      Design Patterns
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <main className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
