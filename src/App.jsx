import "./App.css";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomCursor from "./components/CustomCursor";
import Header from "./pages/Header";
import HeroSection from "./pages/HeroSection";
import StarsCanvas from "./components/StarBackground";
import About from "./pages/About";
import ProjectSection from "./pages/ProjectSection";
import Experiences from "./pages/Experiences";
import More from "./pages/More";
import ScrollToTop from "./components/ScrollToTop"; // Import the new component

function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <>
      <StarsCanvas />
      <Header />
      <HeroSection id="hero" /> {/* Add id for the scroll target */}
      <CustomCursor />
      <About />
      <ProjectSection />
      <Experiences />
      <More />
      <ScrollToTop /> {/* Add the scroll-to-top button */}
    </>
  );
}
export default App;