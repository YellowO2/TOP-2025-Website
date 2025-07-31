import { OG_INFO } from "@/lib/constants/oginfo"
import Image from "next/image"
import Link from "next/link"

function OGCard(
    {
        containerWidth,
        ogInfo
    }: {
        containerWidth: number
        ogInfo: typeof OG_INFO[number]
    }
) {
    return (
        <div
            className={`transition-all ease-in-out duration-300 h-full flex flex-col items-center justify-center md:p-12 text-center`}
            style={
                { width: `${containerWidth}px` }
            }
        >
            <Image
                src={ogInfo.logo || '/crest-1.png'}
                alt="Crest"
                width={200}
                height={144}
                quality={100}
                className="mb-8 [mask-image:linear-gradient(to_bottom_right,white,black)]"
                loading="lazy"
            />
            <p className=" flex text-xs font-homevideo mb-2">
                {ogInfo.district}
            </p>
            <h1 className="font-homevideo font-bold flex mb-8">
                {ogInfo.name}
            </h1>
            <p className="w-full md:w-1/2 flex text-xs mb-8">
                {ogInfo.description}
            </p>
            <Link href={`/district?district=${ogInfo.district}`} className="flex rounded-full px-4 py-2 bg-gradient-to-r from-[#111111] to-transparent border-white/10 border">
                Visit {ogInfo.district}
            </Link>
        </div>
    )
}

export default OGCard