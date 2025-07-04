import Image from 'next/image'
import React from 'react'

function About() {
    return (
        <div className='flex flex-col w-full items-center justify-center'>
            <div className='flex relative h-screen  w-full flex-col items-center justify-center gap-6 py-32 border-b border-white/10 px-12'>
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
                        width={160}
                        height={160}
                        priority
                        className="flex z-10 -mr-12 md:-mr-24 object-cover transition-all duration-300 blur-sm w-32 h-32 md:w-80 md:h-80"
                    />
                    <Image
                        src={'/image.jpg'}
                        alt='About Us'
                        width={200}
                        height={200}
                        priority
                        className="z-20 object-cover transition-all duration-300 w-40 h-40 md:w-[400px] md:h-[400px]"
                    />
                    <Image
                        src={'/image.jpg'}
                        alt='About Us'
                        width={160}
                        height={160}
                        priority
                        className="z-10 -ml-12 md:-ml-24 object-cover transition-all duration-300 blur-sm w-32 h-32 md:w-80 md:h-80"
                    />
                </div>

                <h1 className='font-homevideo font-bold mt-4'>About Us</h1>
                <p className='w-full md:w-1/3 md:text-sm text-xs flex text-pretty text-center mb-4'>
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