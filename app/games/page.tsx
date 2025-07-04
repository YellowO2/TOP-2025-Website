import GameCard from "@/components/Game/GameCard"
import Image from "next/image"

function Games() {
    return (
        <div className="flex w-full py-24 px-12">
            <div className="grid w-full gap-10 grid-cols-1 lg:grid-cols-3 ">
                <GameCard gameName="Game One" />
                <GameCard gameName="Game Two" />
                <GameCard gameName="Game Three" />
                <GameCard gameName="Game Four" />
                <GameCard gameName="Game Five" />
                <GameCard gameName="Game Six" />
                <GameCard gameName="Game Seven" />
                <GameCard gameName="Game Eight" />
                <GameCard gameName="Game Nine" />
            </div>

        </div>
    )
}

export default Games