'use client'
import Image from "next/image";
import { HiOutlineArchive } from "react-icons/hi";
import { IoLocationOutline, IoShirtOutline, IoTimerOutline } from "react-icons/io5";

function GamePage() {

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full h-[300px] relative">
                <Image
                    src="/image.jpg"
                    alt="Game 1"
                    fill
                    className="object-cover [mask-image:linear-gradient(to_bottom,white,white_40%,transparent_95%)]"
                    quality={100}
                    priority
                    style={{ objectPosition: 'center' }}
                />
            </div>
            <div className="flex flex-col gap-5 items-center w-full h-full px-12 md:px-24 pt-12 pb-24">
                <div className="flex px-3 py-1 rounded-full border border-white/20">
                    Sunday, 13 July
                </div>
                <div className="h-fit flex">
                    <h1 className="font-homevideo font-bold tracking-tight">The First Game</h1>
                </div>
                <div className="flex md:w-1/2 text-center font-light">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <p className="flex text-pretty mt-8 text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae nesciunt error harum magni in, excepturi voluptatem tempore veritatis quod distinctio sunt corporis! Similique in quasi tempore aperiam fugit, nisi impedit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae nesciunt error harum magni in, excepturi voluptatem tempore veritatis quod distinctio sunt corporis! Similique in quasi tempore aperiam fugit, nisi impedit!
                </p>
                <p className="flex text-pretty mt-8 text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae nesciunt error harum magni in, excepturi voluptatem tempore veritatis quod distinctio sunt corporis! Similique in quasi tempore aperiam fugit, nisi impedit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae nesciunt error harum magni in, excepturi voluptatem tempore veritatis quod distinctio sunt corporis! Similique in quasi tempore aperiam fugit, nisi impedit! Recusandae nesciunt error harum magni in, excepturi voluptatem tempore veritatis quod distinctio sunt corporis! Similique in quasi tempore aperiam fugit, nisi impedit!
                </p>
                <h2 className="w-full mt-6">More Information</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-x-12 gap-y-4 w-full mt-8 mb-12'>
                    <div className='flex items-center flex-row gap-6 w-full'>
                        <IoLocationOutline size={24} />
                        <div className='flex flex-col'>
                            <p className='flex font-semibold text-base'>Location</p>
                            <p className='font-light'>
                                Hall 2 - Block 141 Students Walk, Singapore 639549
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
                <Image
                    src="/map.png"
                    alt="Map"
                    width={800}
                    height={400}
                    className="w-full"
                    quality={100}
                    style={{ objectPosition: 'center' }}
                />
            </div>
        </div>
    )
}

export default GamePage