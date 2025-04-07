import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subset: ["latin"] });
export const metadata = {
  title: "Welth",
  description: "One Stop finance Platform.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Header />
          {/*header */}
          <main className="min-h-screen">{children}</main>
          {/*footer*/}
          <footer className="bg-red-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Never spend your money before you have it.</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
