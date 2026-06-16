import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/Hero";
import RetreatIntro from "@/components/retreat/RetreatIntro";
import Memories from "@/components/retreat/Memories";
import Experience from "@/components/retreat/Experience";
import WhyJoin from "@/components/retreat/WhyJoin";
import NotForYou from "@/components/retreat/NotForYou";
import Coach from "@/components/retreat/Coach";
import Participants from "@/components/retreat/Participants";
import FinalCTA from "@/components/retreat/FinalCTA";
import Footer from "@/components/Footer";
import BackgroundAudio from "@/components/BackgroundAudio";
import StickyBookBar from "@/components/retreat/StickyBookBar";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <RetreatIntro />
      <Memories />
      <Experience />
      <WhyJoin />
      <NotForYou />
      <Coach />
      <Participants />
      <FinalCTA />
      <Footer />
      <BackgroundAudio />
      <StickyBookBar />
    </main>
  );
}
