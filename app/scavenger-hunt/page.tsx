import { Metadata } from "next";
import Image from "next/image"

export const metadata: Metadata = {
    metadataBase: new URL("https://ccdstop.com"),
    title: "Scavenger Hunt | CCDS TOP™",
    description: "Participate in the Scavenger Hunt at CCDS TOP™.",
    openGraph: {
        title: "Scavenger Hunt | CCDS TOP™",
        description:
            "Participate in the Scavenger Hunt at CCDS TOP™.",
        url: "https://ccdstop.com/scavenger-hunt",
        siteName: "CCDS TOP™",
        images: [
            {
                url: "/image.jpg",
                width: 800,
                height: 800,
                alt: "CCDS TOP™ Photo",
            },
        ],
        locale: "en_SG",
        type: "website",
    },
};

function ScavengerHunt() {
    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full h-[300px] relative">
                <Image
                    src='/faqs-about-us/img4.png'
                    alt={"Scavenger Hunt"}
                    fill
                    className="object-cover [mask-image:linear-gradient(to_bottom,white,white_40%,transparent_95%)]"
                    quality={100}
                    priority
                    style={{ objectPosition: 'center' }}
                />
            </div>
            <div className="flex flex-col gap-5 items-center w-full h-full px-8 md:px-24 pt-12 pb-24">
                <div className="flex w-full gap-2 items-center justify-center mb-2">
                    <span className="px-3 py-1 rounded-full border border-white/30 bg-white/5 text-sm font-medium">Open for All</span>
                </div>
                <div className="h-fit flex">
                    <h1 className="font-homevideo font-bold tracking-tight text-center"> Scavenger Hunt </h1>
                </div>
                <div className="flex md:w-1/2 text-center font-light items-center justify-center">
                    Participants will embark on a scavenger hunt, solving clues and completing challenges to find hidden treasures around the campus.
                </div>
                <p className="flex text-pretty mt-8 text-base w-full">
                    Rules: As you explore the campus on Day 1, keep an eye out for spots that match the photo prompts below. Get creative with your shots — the most imaginative entries stand a chance to win bonus resources that could give you an edge on Day 2! Submit your photo in the OG group with the prompt number, your OG and sub-OG name and number, and don&apos;t forget to tag @JaySg05
                </p>
                <h2 className="w-full mt-12 font-homevideo">Scavenger Hunt</h2>
                <ol className="list-decimal list-inside text-left w-full mt-2 space-y-6">
                    <li>Team selfie with an &quot;NTU&quot; sign.</li>
                    <li>Find and take a selfie with a group of students studying together.</li>
                    <li>Take a photo with a sculpture or art installation on campus.</li>
                    <li>Snap a photo of your team trying something at a canteen on campus.</li>
                    <li>Take a creative photo with the Hive building in the background.</li>
                    <li>Get a picture of a team member trying to teach at the lecture hall to other students</li>
                    <li>Capture all the team members posing with a friendly security guard or maintenance staff member.</li>
                    <li>Pose with another clan and do some couple poses with each other</li>
                    <li>Find and photograph a spot on campus where you can see the sunset.</li>
                    <li>Get a video of your team doing a group cheer with a student club or society banner.</li>
                    <li>Find a hidden garden or quiet corner on campus and take a photo there.</li>
                    <li>Get a picture of your team creating a human pyramid in front of any NTU building.</li>
                    <li>Snap a photo of a team member giving a thumbs-up to a campus</li>
                    <li>Take a group photo at the entrance of the CCDS Student Lounge.</li>
                    <li>Capture a group photo at the entrance of the CCDS</li>
                    <li>building, but everyone must strike their best superhero pose.</li>
                    <li>Snap a photo of a team member attempting to &quot;upgrade&quot; themselves with makeshift robotic enhancements (made from cardboard, foil, etc.).</li>
                    <li>Team selfie with a &quot;404 Error&quot; sign. Get creative :)</li>
                    <li>Get another team&apos;s GL to do something quirky.</li>
                    <li>Take a picture with the best dressed staff you can see</li>
                </ol>
            </div>
        </div>
    )
}

export default ScavengerHunt