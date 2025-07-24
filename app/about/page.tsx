import Introduction from "@/components/About/Introduction"
import { FaPeopleCarryBox } from "react-icons/fa6"
import { GiPublicSpeaker } from "react-icons/gi"
import { LuFlame } from "react-icons/lu"

function About() {
    return (
        <div className='flex flex-col w-full items-center justify-center'>
            <Introduction />
            <div className="border border-white/20 rounded-xl grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:w-2/3 w-full mb-32">

                <div className='flex items-center border-r border-b border-white/20 flex-row w-full font-medium text-4xl justify-center p-8'>
                    What to Expect.
                </div>

                <div className='flex items-center border-b border-white/20 flex-row justify-center gap-4 w-full p-8'>
                    <GiPublicSpeaker size={24} className="shrink-0" />
                    <div className='flex flex-col gap-1'>
                        <p className='flex font-mediium text-base'>Insider talks </p>
                        <p className='font-light text-xs'>
                            from faculty to arm you for your academic journey.
                        </p>
                    </div>
                </div>

                <div className='flex items-center border-r border-white/20 flex-row justify-center gap-4 w-full p-8'>
                    <LuFlame size={24} className="shrink-0" />
                    <div className='flex flex-col gap-1'>
                        <p className='flex font-mediium text-base'>Adrenaline-fueled activities </p>
                        <p className='font-light text-xs'>
                            and mind-bending games that push you to outwit, outlast, and outplay.
                        </p>
                    </div>
                </div>

                <div className='flex items-center flex-row justify-center gap-4 w-full p-8'>
                    <FaPeopleCarryBox size={24} className="shrink-0" />
                    <div className='flex flex-col gap-1'>
                        <p className='flex font-mediium text-base'>Community</p>
                        <p className='font-light text-xs'>
                            The chance to build alliances and friendships that will support you throughout your time at CCDS.
                        </p>
                    </div>
                </div>

                <div className='flex items-center border-t border-white/20 col-span-2 row-span-1 flex-row justify-center gap-4 w-full p-8'>
                    <div className='flex flex-col'>
                        <p className='flex font-mediium text-base'>More Than Just an Orientation</p>
                        <p className='font-light'>
                            CCDS TOP is the start of your story here. You’ll bond with fellow freshmen, connect with passionate seniors, and join a community that will back you throughout university. Expect laughter, competition, and memories that last.
                        </p>
                    </div>
                </div>

                <div className='flex items-center border-t border-white/20 col-span-2 row-span-1 flex-row justify-center gap-4 w-full p-8'>
                    <div className='flex flex-col'>
                        <p className='flex font-mediium text-base'>Meet the Main Committee</p>
                        <p className='font-light'>
                            Our Main Committee—made up of dedicated seniors—is the force behind the games. From designing challenges to ensuring everyone feels included, our team is committed to making your first days at CCDS unforgettable. We set the stage, you make your mark.
                        </p>
                    </div>
                </div>

                <div className='flex items-center border-t border-white/20 col-span-2 row-span-1 flex-row justify-center gap-4 w-full p-8'>
                    <div className='flex flex-col'>
                        <p className='flex font-mediium text-base'>Join the Legacy</p>
                        <p className='font-light'>
                            Ready to step into the arena? Join this <a href="https://t.me/+xdm37tL4wtA1YjY1" target="_blank" rel="noopener noreferrer" className="underline">telegram group</a> for updates and follow us on Instagram. Gear up, join the games, and ignite your legacy at CCDS TOP 2025. The odds are in your favor.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About