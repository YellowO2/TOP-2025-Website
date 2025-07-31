import FeaturedGroups from "@/components/Main/FeaturedGroups";
import Leaderboard from "@/components/Main/Leaderboard";
import MainComponent from "@/components/Main/MainComponent";
import Scene from "@/components/3D/Scene";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div
        className="flex relative w-full h-screen z-1 items-center justify-center overflow-hidden"
      >
        <Image
          src="/bgfinal.jpg"
          alt="Background"
          fill
          className="object-cover object-center md:object-left transition-all duration-500 ease-in-out -z-10"
          priority
          quality={100}
          sizes="100vw"
        />
        <Scene />
        <MainComponent />
      </div>
      <Leaderboard />
      <FeaturedGroups />
    </>
  );
}
