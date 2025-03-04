'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BiRefresh } from "react-icons/bi";

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLeaderboardData = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/leaderboard');
            const data = await response.json();
            setTimeout(() => {
                setLeaderboardData(data.leaderboard);
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboardData();
    }, []);

    return (
        <div className='w-full h-screen flex px-8 pb-8 md:px-20 md:pb-12'>
            <div className='flex w-full h-full rounded-b-3xl md:rounded-b-[60px] overflow-hidden'>
                <Image
                    src='/images/bg.png'
                    width={1920}
                    height={1080}
                    alt='Background'
                    quality={100}
                    className='object-cover object-left md:object-bottom'
                />
            </div>
            <div className='absolute z-20 left-0 right-0 h-screen flex items-center justify-center flex-col'>
                <div className='w-[75vw] mb-8 flex justify-between items-center'>
                    <div className='flex text-[24px] md:text-[54px] tracking-[-2px]'>LEADERBOARD</div>
                    <button 
                        onClick={fetchLeaderboardData} 
                        className='buttonMain2 flex flex-row gap-2 items-center'
                        disabled={loading}
                    >
                        Refresh
                        <BiRefresh className={`transition-transform ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
                <div className='w-[75vw] h-[60vh] grid grid-cols-1 gap-2'>
                    {leaderboardData.slice(0, 10).map((item, index) => (
                        <div
                            key={index}
                            className='flex w-full overflow-hidden backdrop-blur-sm bg-black/70 border rounded-xl justify-between items-center px-4'
                        >
                            <div className='flex text-sm'>{item.name}</div>
                            <div>
                                <ul className='justify-between flex'>
                                    <li className='cardCount text-sm text-center'>{item.cardCount}</li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;
