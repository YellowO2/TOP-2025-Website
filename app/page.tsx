import FeaturedGroups from "@/components/Main/FeaturedGroups";
import Leaderboard from "@/components/Main/Leaderboard";
import MainComponent from "@/components/Main/MainComponent";
import Scene from "@/components/3D/Scene";

export default function Home() {


  return (
    <>
      <div
        className="flex relative w-full h-screen z-1 items-center justify-center bg-[url('/bgfinal.jpg')] bg-cover bg-center md:bg-left transition-all duration-500 ease-in-out"
      >
        <Scene />
        <MainComponent />
      </div>
      <Leaderboard />
      <FeaturedGroups />
    </>
  );
}
