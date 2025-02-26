'use client'
import React, { useEffect, useState } from 'react';

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await fetch('/api/leaderboard');
                const data = await response.json();
                setLeaderboardData(data.leaderboard);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };

        fetchLeaderboardData();
    }, []);

    return (
        <div className='flex w-full h-screen bg-primary items-center md:items-end'>
            <div className='flex items-center md:items-start flex-col w-full h-5/6 bg-background rounded-[50px] md:rounded-b-none md:rounded-t-[100px] py-24 px-10 md:px-24'>
                <h1 className='flex h-[40px] mb-8 md:mb-16'>Leaderboard*</h1>
                <div className='w-full grid grid-cols-1 gap-2 md:px-0'>
                    {leaderboardData.slice(0, 10).map((item, index) => (
                        <div key={index} className={`flex w-full overflow-hidden h-8 ${index < 3 ? "bg-primary" : "bg-secondary"} rounded-xl justify-between items-center px-10`}>
                            <div className='flex'>{item.name}</div>
                            <div>
                                <ul className='justify-between flex gap-12'>
                                    <li className='cardCount text-center'>{item.cardCount}</li>
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
