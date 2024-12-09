import Hero from "@/components/Hero";
import {
  MantineProvider,
} from "@mantine/core";
import "@mantine/carousel/styles.css";
import Navbar from "@/components/NavBar";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import DownloadSection from "@/components/DownloadSection";

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
