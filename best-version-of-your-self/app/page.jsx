import {
  MantineProvider,
} from "@mantine/core";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/NavBar";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Pricing from "@/components/landing/Pricing";
import DownloadSection from "@/components/landing/DownloadSection";

const Home = () => {

  return (
    <MantineProvider>
        <Navbar />
        <Hero />
        <Features />
        <Pricing />
        <DownloadSection />
        <Footer />
    </MantineProvider>
  );
};

export default Home;
