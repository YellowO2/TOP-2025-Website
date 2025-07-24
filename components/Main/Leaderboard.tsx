'use client'
import { useEffect, useState } from 'react';
import LeaderboardRecord from './LeaderboardRecord'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';


type LeaderboardRecordType = {
    name: string;
    itemCount?: number;
};

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardRecordType[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState(false);
    const [range, setRange] = useState<number>(6);

    const fetchLeaderboardData = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/leaderboard');
            const data = await response.json();
            console.log('Leaderboard data:', data.leaderboard);
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
        <div className="relative flex flex-col w-full border-y py-24 px-12 md:p-24 gap-6 bg-black border-white/10">
            <h1 className="font-homevideo font-bold">Leaderboard</h1>
            <p className="text-xs mb-4 w-full md:w-1/2">
                Winning a game earns your team points. Points are awarded across all games on Day 1 and Day 2. At the end of Day 2, the team with the highest total points will be declared the overall winner.
            </p>
            <div className='w-full flex items-center justify-between'>
                <GoChevronLeft onClick={() => setRange(6)} />
                <div className='gap-2 flex'>
                    <span className='text-xs flex font-homevideo'>
                        Viewing Districts {range === 6 ? '1-6' : '7-13'}
                    </span>
                    <span className='text-xs font-homevideo text-white/50 flex'>
                        of 13
                    </span>
                </div>
                <GoChevronRight onClick={() => setRange(13)} />
            </div>
            {range === 6 && (
                <div className="grid grid-cols-1 gap-3 w-full h-full">
                    {loading
                        ? Array.from({ length: 10 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="animate-pulse flex items-center gap-4 px-6 py-4 rounded-md bg-white/5 border border-white/10 min-h-[56px]"
                            >
                                <div className="w-8 h-8 rounded-full bg-white/20" />
                                <div className="flex-1 h-4 bg-white/20 rounded" />
                                <div className="w-16 h-4 bg-white/20 rounded ml-4" />
                            </div>
                        ))
                        : leaderboardData
                            .filter(record => {
                                const match = record.name.match(/District\s*(\d+)/i);
                                const districtNum = match ? parseInt(match[1], 10) : null;
                                return districtNum !== null && districtNum >= 1 && districtNum <= 6;
                            })
                            .sort((a, b) => (b.itemCount ?? 0) - (a.itemCount ?? 0))
                            .map((record, index) => (
                                <LeaderboardRecord
                                    key={index}
                                    rank={index + 1}
                                    groupName={record.name}
                                    score={record.itemCount}
                                />
                            ))}
                </div>
            )}
            {range === 13 && (
                <div className="grid grid-cols-1 gap-3 w-full h-full">
                    {loading
                        ? Array.from({ length: 10 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="animate-pulse flex items-center gap-4 px-6 py-4 rounded-md bg-white/5 border border-white/10 min-h-[56px]"
                            >
                                <div className="w-8 h-8 rounded-full bg-white/20" />
                                <div className="flex-1 h-4 bg-white/20 rounded" />
                                <div className="w-16 h-4 bg-white/20 rounded ml-4" />
                            </div>
                        ))
                        : leaderboardData
                            .filter(record => {
                                const match = record.name.match(/District\s*(\d+)/i);
                                const districtNum = match ? parseInt(match[1], 10) : null;
                                return districtNum !== null && districtNum >= 7 && districtNum <= 13;
                            })
                            .sort((a, b) => (b.itemCount ?? 0) - (a.itemCount ?? 0))
                            .map((record, index) => (
                                <LeaderboardRecord
                                    key={index}
                                    rank={index + 1}
                                    groupName={record.name}
                                    score={record.itemCount}
                                />
                            ))}
                </div>
            )}
        </div>
    )
}

export default Leaderboard