import GameCard from "@/components/Game/GameCard"
import { PROGRAMS } from "../lib/constants/programs"

function Games() {
    return (
        <div className="flex w-full py-24 px-12">
            <div className="grid w-full gap-10 grid-cols-1 lg:grid-cols-3 ">
                {PROGRAMS.map((program, idx) => (
                    <GameCard key={program.name} gameName={program.name} />
                ))}
            </div>
        </div>
    )
}

export default Games