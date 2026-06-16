import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import BackgroundAudio from "@/components/BackgroundAudio";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
      <BackgroundAudio />
    </main>
  );
}
