"use client"
import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { useTransform, useScroll, motion } from 'framer-motion';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis'
import Link from 'next/link';


function Events() {
    const images = [
        "1.jpg",
        "2.jpg",
        "3.jpg",
    ]

    const Column = ({ images, y }) => {
        return (
            <motion.div
                className="column"
                style={{ y }}
            >
                {images.map((src, i) => {
                    return (
                        <div key={i} className="imageContainer">
                            <Link href={`/image/${src}`}>
                                <Image
                                    src={`/images/${src}`}
                                    alt={`image-${i + 1}`}
                                    width={500}
                                    height={500}
                                    className='object-cover h-full w-full'
                                />
                            </Link>
                        </div>
                    );
                })}
            </motion.div>
        );
    };

    const display = useRef(null);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    const { scrollYProgress } = useScroll({
        target: display,
        offset: ['start end', 'end start']
    })

    const { height } = dimension;
    const y = useTransform(scrollYProgress, [0, 1], [0, height * 0.9])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 0.8])
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 0.3])
    const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 0.6])

    useEffect(() => {
        const lenis = new Lenis()

        const raf = (time) => {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        const resize = () => {
            setDimension({ width: window.innerWidth, height: window.innerHeight })
        }

        window.addEventListener("resize", resize)
        requestAnimationFrame(raf);
        resize();

        return () => {
            window.removeEventListener("resize", resize);
        }
    }, [])

    return (
        <div className='flex flex-col items-center justify-between w-full h-screen bg-background'>
            <div className='flex w-full h-full items-end px-24'>
                <div className='flex justify-between w-full items-center mb-10'>
                    <h1 className='flex'>Events*</h1>
                    <p className='flex text-xs w-1/4 text-right'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut vulputate mauris sed quam tempus scelerisque.
                    </p>
                </div>
            </div>
            <div className='flex w-[90%] h-[70%] relative'>
                <div ref={display} className='display'>
                    <Column images={[images[0], images[1], images[2], images[1]]} y={y} />
                    <Column images={[images[2], images[0], images[1], images[2]]} y={y2} />
                    <Column images={[images[1], images[2], images[1], images[0]]} y={y3} />
                    <Column images={[images[0], images[1], images[0], images[2]]} y={y4} />
                </div>
            </div>
        </div>
    )
}

export default Events