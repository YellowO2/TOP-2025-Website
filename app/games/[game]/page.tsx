import { Metadata } from "next";
import GamePage from "./GamePage";
import { PROGRAMS } from "@/lib/constants/programs";

export async function generateMetadata({ params }: { params: Promise<{ game: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const gameParamRaw = typeof resolvedParams.game === 'string' ? resolvedParams.game : Array.isArray(resolvedParams.game) ? resolvedParams.game[0] : '';
    const gameParam = decodeURIComponent(gameParamRaw);
    const program = PROGRAMS.find(p => p.name === gameParam);
    return {
        metadataBase: new URL("https://ccdstop.com"),
        title: program ? `${program.name} | CCDS TOP™` : "Game | CCDS TOP™",
        description: program?.caption || "Learn more about the game in CCDS TOP™.",
        openGraph: {
            title: program ? `${program.name} | CCDS TOP™` : "Game | CCDS TOP™",
            description:
                program?.caption || "Learn more about the game in CCDS TOP™.",
            url: "https://ccdstop.com/games/" + gameParam,
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
}

function GameLayout() {
    return (
        <GamePage />
    )
}

export default GameLayout;