import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GoChevronRight } from 'react-icons/go'

function Introduction() {
    return (
        <div className='flex relative  w-full flex-col items-center justify-center gap-6 pt-32 py-16 px-12'>
            <div className='absolute grid grid-cols-4 grid-rows-1 divide-x divide-dashed divide-white/10 w-full h-full left-0 top-0 pointer-events-none'>
                <div className='w-full h-full flex' />
                <div className='w-full h-full flex' />
                <div className='w-full h-full flex' />
                <div className='w-full h-full flex' />
            </div>
            <div className="flex relative w-full items-center justify-center">
                <Image
                    src={'/faqs-about-us/img1.png'}
                    alt='About Us'
                    width={160}
                    height={160}
                    priority
                    className="flex z-10 -mr-12 md:-mr-24 object-cover transition-all duration-300 blur-xs w-28 h-28 md:w-60 md:h-60 rounded-md"
                />
                <Image
                    src={'/faqs-about-us/img1.png'}
                    alt='About Us'
                    width={200}
                    height={200}
                    priority
                    className="z-20 object-cover transition-all duration-300 w-32 h-32 md:w-[300px] md:h-[300px] rounded-md"
                />
                <Image
                    src={'/faqs-about-us/img1.png'}
                    alt='About Us'
                    width={160}
                    height={160}
                    priority
                    className="z-10 -ml-12 md:-ml-24 object-cover transition-all duration-300 blur-xs w-28 h-28 md:w-60 md:h-60 rounded-md"
                />
            </div>
            <Link href='/games' className="group flex items-center gap-4 p-1 rounded-full border border-white/10 text-xs hover:border-white/15 transition duration-300 ease-out mt-4">
                <div className="justify-between flex gap-4 items-center mask-flare-loop">
                    <span className="py-1 px-2 font-normal rounded-full bg-white/5 transition-colors ease-in-out duration-200" >
                        New
                    </span>
                    <span className="font-medium text-sm">
                        Check out our games
                    </span>
                </div>
                <div className="p-1 text-sm rounded-full bg-white/20">
                    <GoChevronRight />
                </div>
            </Link>
            <h1 className='font-semibold w-full max-w-2xl text-center items-center justify-center'>
                Welcome to CCDS TOP 2025: Outwit. Outlast. Outplay.
            </h1>
            <p className='max-w-xl md:text-sm text-xs flex text-pretty text-center mt-2'>
                Inspired by the Hunger Games, our freshman orientation throws you into three days of strategy, teamwork, and friendly rivalry. From August 4th to 6th, you&apos;ll join one of thirteen unique districts, each with its own traditions and spirit, and compete in challenges designed to test your wit and determination.
            </p>
        </div>
    )
}

export default Introduction