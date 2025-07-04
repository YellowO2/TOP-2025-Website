'use client'
import React, { useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const events = [
    { time: '08:00 AM', name: 'Opening Ceremony', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { time: '08:45 AM', name: 'Welcome Speech', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { time: '09:15 AM', name: 'Icebreaker Games', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.' },
    { time: '10:00 AM', name: 'Campus Tour', description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.' },
    { time: '11:00 AM', name: 'Department Introductions', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa.' },
    { time: '12:00 PM', name: 'Lunch Break', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { time: '01:00 PM', name: 'Club Presentations', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { time: '02:00 PM', name: 'Sports Activities', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.' },
    { time: '03:00 PM', name: 'Workshops', description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.' },
    { time: '04:00 PM', name: 'Q&A Session', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa.' },
    { time: '04:45 PM', name: 'Closing Remarks', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { time: '05:00 PM', name: 'Networking & Snacks', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
]

function Schedule() {
    const { scrollYProgress } = useScroll();
    const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    // Pre-calculate all transforms using useMemo
    const eventTransforms = useMemo(() => {
        return events.map((_, idx) => {
            const threshold = idx / (events.length - 1);
            return {
                scale: useTransform(
                    scrollYProgress,
                    [threshold - 0.03, threshold, threshold + 0.03],
                    [1, 1.5, 1]
                ),
                bg: useTransform(
                    scrollYProgress,
                    [threshold - 0.03, threshold, threshold + 0.03],
                    ['#fff', '#fff', '#fff']
                ),
                threshold
            };
        });
    }, [scrollYProgress]);

    return (
        <div className='flex w-full py-32 justify-center px-24'>
            <div className='mr-32 my-12 flex-shrink-0 flex flex-col items-center relative'>
                <div className='w-[1px] bg-white/15 h-full rounded-full absolute' />
                <motion.div
                    className='w-[1px] bg-white rounded-full absolute origin-top'
                    style={{ height: progressHeight }}
                />
                {events.map((_, idx) => {
                    const { scale, bg, threshold } = eventTransforms[idx];
                    return (
                        <motion.div
                            key={idx}
                            style={{
                                position: 'absolute',
                                top: `calc(${threshold * 100}% - 0.5rem)`,
                                left: '50%',
                                x: '-50%',
                                scale,
                                background: bg,
                            }}
                            className="w-2 h-2 rounded-full shadow"
                        />
                    );
                })}
            </div>

            <div className='flex flex-col gap-20'>
                {events.map((event, idx) => (
                    <div key={idx} className='flex flex-col items-start gap-2'>
                        <span className='text-xs text-gray-400'>{event.time}</span>
                        <h2 className='font-homevideo'>{event.name}</h2>
                        <p className='text-base text-gray-400 font-light'>{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Schedule