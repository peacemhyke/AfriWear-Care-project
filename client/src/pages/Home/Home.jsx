import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import DemoQR from "../../components/DemoQR/DemoQR";
import Features from "../../components/Features/Features";
import Textiles from "../../components/Textiles/Textiles";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <DemoQR />
      <Features />
      <Textiles />
      <HowItWorks />
      <Footer />
    </>
  );
}

export default Home;