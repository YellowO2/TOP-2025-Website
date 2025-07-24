'use client'
import { useEffect, useState } from 'react';
import LeaderboardRecord from './LeaderboardRecord'

type SubOGType = {
    name: string;
    itemCount: number;
    lastItemEarnedAt: string;
    items: Record<string, number>;
};

type LeaderboardRecordType = {
    name: string;
    score?: number;
    cardCount?: number;
    subOGs?: SubOGType[];
};

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardRecordType[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <div className="relative flex flex-col w-full border-y py-24 px-12 md:p-24 gap-6 bg-black border-white/10">
            <h1 className="font-homevideo font-bold">Leaderboard</h1>
            <p className="text-xs mb-4 w-full md:w-1/2">
                Winning a game earns your team points. Points are awarded across all games on Day 1 and Day 2. At the end of Day 2, the team with the highest total points will be declared the overall winner.
            </p>
            <div className="grid grid-rows-10 grid-cols-1 gap-3 w-full h-full">
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
                    : leaderboardData.slice(0, 10).map((record, index) => {
                        const totalResources = record.subOGs
                            ? record.subOGs.reduce((sum: number, subog: SubOGType) => {
                                if (!subog.items) return sum;
                                return sum + Object.values(subog.items).reduce((a, b) => Number(a) + Number(b), 0);
                            }, 0)
                            : 0;
                        return (
                            <LeaderboardRecord
                                key={index}
                                rank={index + 1}
                                groupName={record.name}
                                score={totalResources}
                            />
                        );
                    })}
            </div>
        </div>
    )
}

export default Leaderboard