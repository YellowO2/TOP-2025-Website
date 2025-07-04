'use client'
import { useEffect, useState } from 'react';
import LeaderboardRecord from './LeaderboardRecord'

type LeaderboardRecordType = {
    name: string;
    score?: number;
    cardCount?: number;
};

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardRecordType[]>([]);
    const [loading, setLoading] = useState(false);
    const day2 = true;

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
        <div className="relative flex flex-col w-full border-y py-24 px-12 md:p-24 gap-6 bg-black border-white/10">
            <h1 className="font-homevideo font-bold">Leaderboard</h1>
            <p className="text-xs mb-4 w-full md:w-1/2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit et similique nulla, quo ipsum in. At qui provident incidunt fugit quae illum rerum, nobis quidem, temporibus eum necessitatibus commodi voluptas.
            </p>
            <div className="grid grid-rows-10 grid-cols-1 gap-3 w-full h-full">
                {leaderboardData.slice(0, 10).map((record, index) => (
                    <LeaderboardRecord key={index} rank={index + 1} groupName={record.name} score={day2 ? record.score ?? 0 : record.cardCount ?? 0} />
                ))}
            </div>
        </div>
    )
}

export default Leaderboard