import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "CCDS Top",
  description: "Club website.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className="flex flex-row">
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
