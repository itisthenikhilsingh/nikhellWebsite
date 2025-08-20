import "./App.css";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutSection from "./components/AboutSection";
import CustomCursor from "./components/CustomCursor";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";

import StarsCanvas from "./components/StarBackground";

function App() {
  useEffect(() => {
    // Register Scroll Trigger plugin
    gsap.registerPlugin(ScrollTrigger);
    // Refresh Scroll Trigger when the page is fully Loaded
    ScrollTrigger.refresh();
    // Clean up Scroll Trigger on component unmount
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
      <AboutSection />
    </>
  );
}

export default App;
