import React from "react";
import TitleHeader from "../components/TitleHeader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Timeline from "../components/Timeline";
import { experiences } from "../constants/index.js";

const Experiences = () => {
  const titleRef = React.useRef(null);
  const sectionRef = React.useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  // Title Animation
  gsap.fromTo(
    titleRef.current,
    { y: 200, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 30%",
        toggleActions: "play none none reverse",
      },
    }
  );
  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-l to-[#2e006e6e] from-black overflow-hidden"
      id="experience"
    >
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div ref={titleRef}>
          <TitleHeader
            title={"Experiences"}
            text={"My learning Place"}
            number={3}
          />
        </div>
        <div className="overflow-hidden">
          <Timeline data={experiences} />
        </div>
      </div>
    </section>
  );
};

export default Experiences;
