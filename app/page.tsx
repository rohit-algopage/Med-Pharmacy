import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
// import LifeTicker from "@/components/home/LifeTicker";
import AboutQnq from "@/components/home/AboutQnq";
import Purpose from "@/components/home/Purpose";
import Achievments from "@/components/home/Achievments";
import Dna from "@/components/home/Dna";
import Journey from "@/components/home/Journey";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-78px)]">
        <HeroSection />
        {/* <LifeTicker /> */}
        <AboutQnq />
        <Purpose />
        <Achievments />
        <Dna />
        <Journey />
        {/* <LifeTicker /> */}
      </main>
      <Footer />
    </>
  );
}