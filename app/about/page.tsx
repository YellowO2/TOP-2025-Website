import Image from 'next/image'
import React from 'react'
import { LuFlame } from 'react-icons/lu'

function About() {
    return (
        <div className='flex flex-col w-full items-center justify-center'>
            <div className='flex relative h-screen  w-full flex-col items-center justify-center gap-6 py-32 border-b border-white/10'>
                <div className='absolute grid grid-cols-4 grid-rows-1 divide-x divide-dashed divide-white/10 w-full h-full left-0 top-0 pointer-events-none'>
                    <div className='w-full h-full flex' />
                    <div className='w-full h-full flex' />
                    <div className='w-full h-full flex' />
                    <div className='w-full h-full flex' />
                </div>
                <div className="flex relative w-full items-center justify-center">
                    <Image
                        src={'/image.jpg'}
                        alt='About Us'
                        width={320}
                        height={320}
                        className="z-10 -mr-24 object-cover transition-all duration-300 blur-sm "
                    />
                    <Image
                        src={'/image.jpg'}
                        alt='About Us'
                        width={400}
                        height={400}
                        className="z-20 object-cover transition-all duration-300"
                    />
                    <Image
                        src={'/image.jpg'}
                        alt='About Us'
                        width={320}
                        height={320}
                        className="z-10 -ml-24 object-cover transition-all duration-300 blur-sm"
                    />
                </div>

                <h1 className='font-homevideo font-bold mt-4'>About Us</h1>
                <p className='w-1/2 md:w-1/3 flex text-pretty text-center mb-4'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit et similique nulla, quo ipsum in. At qui provident incidunt fugit quae illum rerum, nobis quidem, temporibus eum necessitatibus commodi voluptas.
                </p>
                {/* <div className='grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-10 md:gap-6 md:w-2/3 w-full px-16'>
                    <div className='flex items-center flex-row gap-6 w-full'>
                        <LuFlame size={54} />
                        <div className='flex flex-col'>
                            <p className='flex font-semibold text-base'>Hello</p>
                            <p className='font-light'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center flex-row gap-6 w-full'>
                        <LuFlame size={54} />
                        <div className='flex flex-col'>
                            <p className='flex font-semibold text-base'>Hello</p>
                            <p className='font-light'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center flex-row gap-6 w-full'>
                        <LuFlame size={54} />
                        <div className='flex flex-col'>
                            <p className='flex font-semibold text-base'>Hello</p>
                            <p className='font-light'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center flex-row gap-6 w-full'>
                        <LuFlame size={54} />
                        <div className='flex flex-col'>
                            <p className='flex font-semibold text-base'>Hello</p>
                            <p className='font-light'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                            </p>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default About