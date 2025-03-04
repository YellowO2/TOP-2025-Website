import Image from 'next/image';
import React from 'react'
import { BiSolidChevronRight } from "react-icons/bi";

function Title() {
  return (
    <div className='relative flex w-full h-screen justify-center items-center flex-col'>
      <div className='absolute w-full h-full left-0 z-0 top-0 flex px-8 pb-8 md:px-20 md:pb-12'>
        <div className='relative flex w-full h-full rounded-b-3xl md:rounded-b-[60px] overflow-hidden'>

          <Image
            src='/images/bg.png'
            width={1920}
            height={1080}
            alt='Background'
            quality={100}
            className='flex h-full w-full object-cover object-left md:object-bottom'
          />
          <div className="md:hidden flex absolute h-32 left-0 top-0 w-full overflow-hidden items-center bg-black/50 fade-mask">
            <div className="flex whitespace-nowrap animate-marquee">
              <p className="text-white text-sm mx-2">
                There are currently no events happening at CCDS Top, but be sure to check back in the future for exciting opportunities, activities, and announcements!
              </p>
            </div>
            <div className="flex whitespace-nowrap animate-marquee" aria-hidden="true">
              <p className="text-white text-sm mx-2">
                There are currently no events happening at CCDS Top, but be sure to check back in the future for exciting opportunities, activities, and announcements!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Image
        src='/images/title.png'
        width={1360}
        height={465}
        alt='Title'
        quality={100}
        className='flex w-64 md:w-[500px] lg:w-[600px] z-10'
      />
      <div className='flex text-xs w-1/2 md:w-[20vw] lg:w-[16vw] text-center mr-0 md:mr-8 lg:mr-10 md:mt-[-50px] mb-6 z-10'>
        The official website for NTU CCDS TOP is here. Want to play? Join us now.
      </div>

      <Link href='/play' className='flex buttonMain'>
        POKER
        <BiSolidChevronRight size={20} className='ml-2 inline' />
      </Link>
    </div>
  )
}

export default Title