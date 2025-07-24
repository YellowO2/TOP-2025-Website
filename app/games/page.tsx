import GameCard from "@/components/Game/GameCard"
import { PROGRAMS } from "@/lib/constants/programs";
import { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://ccdstop.com"),
    title: "Games | CCDS TOP™",
    description: "Explore the games offered by CCDS TOP™.",
    openGraph: {
        title: "Games | CCDS TOP™",
        description:
            "Explore the games offered by CCDS TOP™.",
        url: "https://ccdstop.com/games",
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

function Games() {
    return (
        <div className="flex w-full py-24 px-8">
            <div className="grid w-full gap-10 grid-cols-1 lg:grid-cols-3 ">
                {PROGRAMS.map((program, idx) => (
                    <GameCard key={idx} gameName={program.name} />
                ))}
            </div>
        </div>
    )
}

export default Games