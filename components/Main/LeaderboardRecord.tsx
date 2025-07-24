import { GiEvilWings } from "react-icons/gi"

function LeaderboardRecord(
    {
        rank,
        groupName,
        score,
    }: {
        rank?: number,
        groupName?: string,
        score?: number,
    }
) {
    return (
        <div className={`flex w-full px-4 py-2 bg-gradient-to-r to-[#111111] rounded-lg border-l justify-between items-center ${rank === 1 ? "border-amber-300 from-amber-300/20" : rank === 2 ? "from-slate-100/20 border-slate-400" : rank === 3 ? "from-orange-300/15" : "border-none from-[#0a0a0a]"}`}>

            <GiEvilWings size={24} className={`${rank === 1 ? "text-amber-300" : rank === 2 ? "text-slate-100" : rank === 3 ? "text-orange-300" : "opacity-0"}`} />
            <p className="font-homevideo text-xs flex ml-2">{rank}</p>
            <div className=" flex w-full text-xs px-6 md:justify-start items-center justify-center">
                <p className="font-medium uppercase tracking-tight">
                    {groupName || "Group Name"}
                </p>
            </div>
            <div className="flex items-center justify-end pr-3">
                <p className="font-medium uppercase opacity-75">
                    {score || 0}
                </p>
            </div>
        </div>
    )
}

export default LeaderboardRecord