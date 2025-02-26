import Events from "@/components/Events";
import EventsMobile from "@/components/EventsMobile";
import Footer from "@/components/Footer";
import Leaderboard from "@/components/Leaderboard";
import Title from "@/components/Title";

export default function Home() {

  return (
    <div className="flex w-screen flex-col">
      <Title />
      <Leaderboard />
      <div className='md:flex hidden'>
        <Events />
      </div>
      <div className='flex md:hidden'>
        <EventsMobile />
      </div>
      <Footer />
    </div>
  );
}
