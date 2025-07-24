import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/General/Footer";
import Navbar from "@/components/General/Navbar";
import Smooth from "@/components/General/Smooth";

export const metadata: Metadata = {
  title: "Home | CCDS TOP™",
  description:
    "Official Website of CCDS TOP™. Our CCDS freshman orientation program is designed to help you transition smoothly into university life at NTU. Explore our resources, events, and community support to make the most of your first year.",
  openGraph: {
    title: "Home | CCDS TOP™",
    description:
      "Official Website of CCDS TOP™. Our CCDS freshman orientation program is designed to help you transition smoothly into university life at NTU. Explore our resources, events, and community support to make the most of your first year.",
    url: "https://ccdstop.com/",
    siteName: "CCDS TOP™",
    images: [
      {
        url: "/image.jpg",
        width: 800,
        height: 800,
        alt: "CCDS TOP™ Photo",
      },
    ],
    locale: "en_SG",
    type: "website",
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
