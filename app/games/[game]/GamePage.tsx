'use client'
import Image from "next/image";
import { HiOutlineArchive } from "react-icons/hi";
import { IoLocationOutline, IoShirtOutline, IoTimerOutline } from "react-icons/io5";
import { useParams } from "next/navigation";
import { PROGRAMS } from "@/lib/constants/programs";

function GamePage() {
    const params = useParams();
    const gameParamRaw = typeof params.game === 'string' ? params.game : Array.isArray(params.game) ? params.game[0] : '';
    const gameParam = decodeURIComponent(gameParamRaw);
    const program = PROGRAMS.find(p => p.name === gameParam);

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full h-[300px] relative">
                <Image
                    src={program?.image || "/image.jpg"}
                    alt={program?.name || "Game"}
                    fill
                    className="object-cover [mask-image:linear-gradient(to_bottom,white,white_40%,transparent_95%)]"
                    quality={100}
                    priority
                    style={{ objectPosition: 'center 25%' }}
                />
            </div>
            <div className="flex flex-col gap-5 items-center w-full h-full px-8 md:px-24 pt-12 pb-24">
                <div className="flex w-full gap-2 items-center justify-center mb-2">
                    {program?.tags?.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full border border-white/30 bg-white/5 text-sm font-medium">{tag}</span>
                    ))}
                </div>
                <div className="h-fit flex">
                    <h1 className="font-homevideo font-bold tracking-tight text-center">{program?.name || 'Game Not Found'}</h1>
                </div>
                <div className="flex md:w-1/2 text-center font-light items-center justify-center">
                    {program?.caption || 'No description available.'}
                </div>
                {program?.paragraphs?.map((para, idx) => (
                    <p key={idx} className="flex text-pretty mt-8 text-sm w-full">{para}</p>
                ))}

                <h2 className="w-full mt-12 mb-4">More Information</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-x-12 gap-y-4 w-full mb-12'>
                    <div className='flex items-center flex-row gap-6 w-full'>
                        <IoLocationOutline size={24} />
                        <div className='flex flex-col'>
                            <p className='flex font-semibold text-base'>Location</p>
                            <p className='font-light'>
                                {program?.location || 'Respecting OG venues. Please check with your OG for details.'}
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center flex-row gap-6 w-full'>
                        <IoShirtOutline size={24} />
                        <div className='flex flex-col'>
                            <p className='flex font-semibold text-base'>Dress Code</p>
                            <p className='font-light'>
                                Light, comfortable clothing and covered shoes.
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center flex-row gap-6 w-full'>
                        <IoTimerOutline size={24} />
                        <div className='flex flex-col'>
                            <p className='flex font-semibold text-base'>Schedule</p>
                            <p className='font-light'>
                                10:00 AM – 11:30 AM
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center flex-row gap-6 w-full'>
                        <HiOutlineArchive size={24} />
                        <div className='flex flex-col'>
                            <p className='flex font-semibold text-base'>What to bring</p>
                            <p className='font-light'>
                                Bring a water bottle to beat the heat.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GamePage