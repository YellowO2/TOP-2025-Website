import Image from "next/image"
import Link from "next/link"

function OGCard(
    {
        containerWidth,
    }: {
        containerWidth: number
    }
) {
    return (
        <div
            className={`transition-all ease-in-out duration-300 h-full flex flex-col items-center justify-center gap-8 p-12 text-center`}
            style={
                { width: `${containerWidth}px` }
            }
        >
            <Image
                src={"/crest-1.png"}
                alt="Crest"
                width={200}
                height={144}
                quality={100}
                style={{ imageRendering: "pixelated" }}
                className="[mask-image:linear-gradient(to_bottom_right,white,black)]"
            />
            <h1 className="font-homevideo font-bold flex">
                Group Name
            </h1>
            <p className="w-full md:w-1/2 flex text-xs">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum earum enim consectetur nihil, distinctio aliquid neque cupiditate aperiam tempora soluta. Eius quo id quasi ullam ipsum! Repellendus in quis soluta?
            </p>
            <Link href='/' className="flex rounded-full px-4 py-2 bg-gradient-to-r from-[#111111] to-transparent border-white/10 border">
                Join Telegram Group
            </Link>
        </div>
    )
}

export default OGCard