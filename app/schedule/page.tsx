'use client'
import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SCHEDULE } from '@/app/lib/constants/schedule'


const events = SCHEDULE.flatMap(day =>
    day.activities.map(activity => ({
        time: activity.time,
        name: activity.activity,
        description: [day.day, activity.venue, activity.remarks].filter(Boolean).join(' | ')
    }))
);

function Schedule() {
    const { scrollYProgress } = useScroll();
    const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    const getScale = (progress: number, threshold: number) => {
        const delta = Math.abs(progress - threshold);
        if (delta < 0.03) {
            return 1.5 - (delta / 0.03) * 0.5;
        }
        return 1;
    };

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', v => setProgress(v));
        return unsubscribe;
    }, [scrollYProgress]);

    const thresholds = events.map((_, idx) => idx / (events.length - 1));

    return (
        <div className='flex w-full py-32 justify-center px-24'>
            <div className='mr-12 md:mr-32 my-12 flex-shrink-0 flex flex-col items-center relative'>
                <div className='w-[1px] bg-white/15 h-full rounded-full absolute' />
                <motion.div
                    className='w-[1px] bg-white rounded-full absolute origin-top'
                    style={{ height: progressHeight }}
                />
                {events.map((_, idx) => (
                    <motion.div
                        key={idx}
                        style={{
                            position: 'absolute',
                            top: `calc(${thresholds[idx] * 100}% - 0.5rem)`,
                            left: '50%',
                            x: '-50%',
                            scale: getScale(progress, thresholds[idx]),
                            background: '#fff',
                        }}
                        className="w-2 h-2 rounded-full shadow"
                    />
                ))}
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
    );
}

export default Schedule