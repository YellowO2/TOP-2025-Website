import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/General/Footer";
import Navbar from "@/components/General/Navbar";
import Smooth from "@/components/General/Smooth";

export const metadata: Metadata = {
  title: "CCDS Top",
  description: "Official Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <Smooth>
          <div className="flex w-screen items-center justify-center">
            <div className="flex flex-col w-screen max-w-[1350px] border-l border-r border-white/10 md:w-[85vw] overflow-hidden">
              <Navbar />
              {children}
              <Footer />
            </div>
          </div>
        </Smooth>
      </body>
    </html>
  );
}
