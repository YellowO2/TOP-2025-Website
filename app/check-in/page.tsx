import { Metadata } from "next";
import CheckInPage from "./CheckInPage";

export const metadata: Metadata = {
  title: "Check In | CCDS TOP™",
  description: "Check in to a room and manage your resources in CCDS TOP™.",
  openGraph: {
    title: "Check In | CCDS TOP™",
    description:
      "Check in to a room and manage your resources in CCDS TOP™.",
    url: "https://ccdstop.com/check-in",
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

function CheckInLayout() {
  return (
    <CheckInPage />
  )
}

export default CheckInLayout;