import { Suspense } from "react";
import DistrictPage from "./DistrictPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "District | CCDS TOP™",
    description: "Learn more about the districts in CCDS TOP™.",
    openGraph: {
        title: "District | CCDS TOP™",
        description:
            "Learn more about the districts in CCDS TOP™.",
        url: "https://ccdstop.com/district",
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


function DistrictPageWrapper() {
    return (
        <Suspense fallback={<div className="flex w-full h-screen items-center justify-center">Loading...</div>}>
            <DistrictPage />
        </Suspense>
    );
}

export default DistrictPageWrapper;