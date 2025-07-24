import Information from "@/components/About/Information"
import Introduction from "@/components/About/Introduction"
import { Metadata } from "next"

export const metadata: Metadata = {
    metadataBase: new URL("https://ccdstop.com"),
    title: "About Us | CCDS TOP™",
    description: "Learn more about CCDS TOP™ and its mission.",
    openGraph: {
        title: "About Us | CCDS TOP™",
        description:
            "Learn more about CCDS TOP™ and its mission.",
        url: "https://ccdstop.com/about",
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

function About() {
    return (
        <div className='flex flex-col w-full items-center justify-center'>
            <Introduction />
            <Information />
        </div>
    )
}

export default About