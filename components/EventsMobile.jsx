import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function EventsMobile() {
    const images = [
        "1.jpg",
        "2.jpg",
        "3.jpg",
    ]

    return (
        <div className='flex flex-col w-full bg-primary'>
            <div className='flex flex-col items-center bg-background py-16 rounded-t-[50px] mb-[-1px]'>
                <h1 className='flex px-10 mb-4'>Events*</h1>
                <p className='flex text-xs px-10'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Ut vulputate mauris sed quam tempus scelerisque.
                </p>
            </div>
            <div className='flex flex-col w-full justify-center items-center bg-background'>
                {images.map((src, i) => {
                    return (
                        <div key={i} className="flex p-8">
                            <Link href={`/image/${src}`}>
                                <Image
                                    src={`/images/${src}`}
                                    alt={`image-${i + 1}`}
                                    width={400}
                                    height={400}
                                    className="object-cover"
                                />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default EventsMobile