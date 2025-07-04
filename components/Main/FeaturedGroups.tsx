'use client'
import React, { useEffect, useRef, useState } from 'react'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import OGCard from './OGCard';

function FeaturedGroups() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [maxOgs, setMaxOgs] = useState<number>(2);
    const [currOg, setCurrOg] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    const prevItem = () => {
        setCurrOg((prev) => (prev - 1) % maxOgs);
        console.log("prev", currOg);
    }

    const nextItem = () => {
        setCurrOg((prev) => (prev + 1) % maxOgs);
        console.log("next", currOg);
    }

    useEffect(() => {
        const updateContainerWidth = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                setContainerWidth(width);
            }
        };
        updateContainerWidth();
        window.addEventListener("resize", updateContainerWidth);
        return () => {
            window.removeEventListener("resize", updateContainerWidth);
        };
    }, [
        containerRef.current,
    ]);
    return (
        <div className="flex relative w-full py-24 items-center justify-center gap-5 px-10 md:px-20">
            <div className='absolute grid grid-cols-4 grid-rows-1 divide-x divide-dashed divide-white/10 w-full h-full left-0 top-0 pointer-events-none'>
                <div className='w-full h-full flex' />
                <div className='w-full h-full flex' />
                <div className='w-full h-full flex' />
                <div className='w-full h-full flex' />
            </div>
            <button
                onClick={prevItem}
                className="cursor-pointer"
            >
                <GoChevronLeft size={24} />
            </button>
            <div ref={containerRef} className="flex flex-row w-full overflow-hidden relative">
                <div
                    className="flex h-full transition-all ease-in-out duration-400"
                    style={
                        { transform: `translateX(-${currOg * containerWidth}px)` }
                    }
                >
                    <OGCard containerWidth={containerWidth} />
                    <OGCard containerWidth={containerWidth} />
                </div>
            </div>
            <button
                onClick={nextItem}
                className="cursor-pointer"
            >
                <GoChevronRight size={24} />
            </button>
        </div>
    )
}

export default FeaturedGroups