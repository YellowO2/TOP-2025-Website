import { Metadata } from "next";
import Schedule from "./Schedule"

export const metadata: Metadata = {
    metadataBase: new URL("https://ccdstop.com"),
    title: "Schedule | CCDS TOP™",
    description: "Check out the schedule for CCDS TOP™ 2025, featuring exciting events and activities.",
    openGraph: {
        title: "Schedule | CCDS TOP™",
        description:
            "Check out the schedule for CCDS TOP™ 2025, featuring exciting events and activities.",
        url: "https://ccdstop.com/schedule",
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

function ScheduleLayout() {
    return (
        <Schedule />
    )
}

export default ScheduleLayout