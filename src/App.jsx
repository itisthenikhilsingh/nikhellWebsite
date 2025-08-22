import "./App.css";
import CustomCursor from "./components/CustomCursor";

import Header from "./components/Header";
import HeroSection from "./pages/HeroSection";

import StarsCanvas from "./components/StarBackground";

import About from "./pages/About";
import IndiaDotCanvas from "./components/IndiaDotMap";

function App() {
  return (
    <>
      {/* <div className="container mx-auto max-w-7xl px-4"> */}
      <StarsCanvas />
      <Header />
      <HeroSection />
      <CustomCursor />
      {/* <AboutSection /> */}
      <About />
      {/* </div> */}
    </>
  );
}

export default App;
