import Link from "next/link";
import { RiArrowRightSFill } from "react-icons/ri";
import { TbClick } from "react-icons/tb";

function MainComponent() {
    return (
        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center pointer-events-none">
            <div className="flex relative w-[70%] h-[60%]">

                <div className="absolute w-full top-0 flex flex-col left-0 font-inter gap-y-2">
                    <h3 className="flex lg:text-6xl font-semibold text-3xl font-homevideo">CCDS TOP</h3>
                    <p className="flex text-[9px] w-2/3 font-light md:w-[12vw] md:text-xs tracking-wide">
                        Form your alliances. Earn your wins.
                    </p>
                </div>

                <div className="absolute w-full bottom-0 flex flex-col right-0 items-end font-inter gap-y-2">
                    <Link href='/about' className="group flex flex-row items-center justify-center transition-all duration-500 ease-in-out cursor-pointer pointer-events-auto uppercase  tracking-widest text-lg flex-no-wrap font-medium">
                        <TbClick className="mr-3  flex group-hover:opacity-0 opacity-100 transition-opacity duration-300 ease-in-out" size={16} />
                        Learn More
                        <span className="w-0 group-hover:w-5 transition-all duration-500 overflow-hidden">
                            <RiArrowRightSFill size={20} className=" transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
                        </span>
                    </Link>
                    <p className="flex text-[9px] md:text-xs w-fit text-right font-light tracking-wide">
                        Let the games begin.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default MainComponent