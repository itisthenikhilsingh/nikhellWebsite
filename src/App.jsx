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
      <HeroSection />
      <CustomCursor />
      <About />
      <ProjectSection />
      <Experiences />
      <More />
    </>
  );
}

export default App;
