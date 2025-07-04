import Image from "next/image"
import Link from "next/link"

function GameCard(
    {
        gameName,
    }: {
        gameName?: string
    } = {}
) {
    return (
        <div className="flex flex-col w-full h-[400px] rounded-md drop-shadow-sm drop-shadow-[#101010] border-[#212121] border overflow-hidden relative">
            <div className="w-full h-[200px] relative">
                <Image
                    src="/image.jpg"
                    alt="Game 1"
                    fill
                    className="object-cover [mask-image:linear-gradient(to_bottom,white,white_40%,transparent_95%)]"
                    quality={100}
                    style={{ objectPosition: 'center' }}
                />
                <div className="absolute top-4 right-4 text-xs font-medium">
                    Sunday, 13 July
                </div>
            </div>
            <div className="flex flex-col gap-3 w-full py-4 px-8">
                <p className="font-bold text-xl flex font-homevideo">
                    {gameName || "Game Name"}
                </p>
                <p className="text-xs font-light text-pretty line-clamp-2 w-full">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque eum quas ratione sit sequi, omnis quo aliquid aspernatur sed totam ea laboriosam officiis commodi molestias ut eligendi, quisquam nobis quaerat?
                </p>
                <div className="flex items-center gap-2 flex-wrap w-full">
                    <div className="px-3 py-1 rounded-full border border-white/30 bg-white/5">
                        Game Tag
                    </div>
                    <div className="px-3 py-1 rounded-full border border-white/30 bg-white/5">
                        Game Tag
                    </div>
                </div>
                <Link href={`/games/${gameName}`} className="flex w-full bg-white text-black font-homevideo rounded-md py-3 items-center justify-center font-bold my-3">
                    See More
                </Link>
            </div>
        </div>
    )
}

export default GameCard