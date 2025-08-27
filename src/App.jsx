import "./App.css";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import HeroSection from "./pages/HeroSection";
import StarsCanvas from "./components/StarBackground";
import About from "./pages/About";
import ProjectSection from "./pages/ProjectSection";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Experiences from "./pages/Experiences";

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
    </>
  );
}

export default App;
