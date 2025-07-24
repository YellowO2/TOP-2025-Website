import { Metadata } from "next";
import FAQs from "./FAQs";

export const metadata: Metadata = {
    metadataBase: new URL("https://ccdstop.com"),
    title: "FAQs | CCDS TOP™",
    description: "Find answers to frequently asked questions about CCDS TOP™.",
    openGraph: {
        title: "FAQs | CCDS TOP™",
        description:
            "Find answers to frequently asked questions about CCDS TOP™.",
        url: "https://ccdstop.com/faqs",
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

function FAQsLayout() {
    return (
        <FAQs />
    )
}

export default FAQsLayout