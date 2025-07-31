import Image from "next/image"
import Link from "next/link"
import { PROGRAMS } from "@/lib/constants/programs"

function GameCard(
    {
        gameName,
    }: {
        gameName?: string
    } = {}
) {
    const program = PROGRAMS.find(p => p.name === gameName);
    return (
        <div className="flex flex-col w-full h-[400px] rounded-md drop-shadow-sm drop-shadow-[#101010] border-[#212121] border overflow-hidden relative">
            <div className="w-full h-[200px] relative">
                <Image
                    src={program?.image || "/image.jpg"}
                    alt={gameName || "Game"}
                    fill
                    className="object-cover [mask-image:linear-gradient(to_bottom,white,white_40%,transparent_95%)]"
                    quality={100}
                    style={{ objectPosition: 'center' }}
                />
                <div className="absolute top-4 right-4 text-xs font-medium">
                    {program?.date || "Unknown date"}
                </div>
            </div>
            <div className="flex flex-col gap-3 w-full py-4 px-8">
                <p className="font-bold text-xl flex font-homevideo">
                    {program?.name || gameName || "Game Name"}
                </p>
                <p className="text-xs font-light text-pretty line-clamp-2 w-full">
                    {program?.caption || "No description available."}
                </p>
                <div className="flex items-center gap-2 flex-wrap w-full">
                    {program?.tags?.map(tag => (
                        <div key={tag} className="px-3 py-1 rounded-full border text-xs border-white/30 bg-white/5">
                            {tag}
                        </div>
                    ))}
                </div>

                <Link href={`/games/${program?.name || gameName}`} className="flex w-full bg-white text-black font-homevideo rounded-md py-3 items-center justify-center font-bold my-3">
                    See More
                </Link>
            </div>
        </div>
    )
}

export default GameCard