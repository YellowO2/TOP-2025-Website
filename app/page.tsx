import FeaturedGroups from "@/components/Main/FeaturedGroups";
import Leaderboard from "@/components/Main/Leaderboard";
import MainComponent from "@/components/Main/MainComponent";
import Scene from "@/components/3D/Scene";

export default function Home() {


  return (
    <>
      <div
        className="flex relative w-full h-screen z-1 items-center justify-center"
        style={{
          background: "radial-gradient(circle at center, rgba(255,0,0,0.07) 0%, rgba(255,0,0,0.03) 20%, rgba(0,0,0,1) 45%)"
        }}
      >
        <Scene />
        <MainComponent />
      </div>
      <Leaderboard />
      <FeaturedGroups />
    </>
  );
}
