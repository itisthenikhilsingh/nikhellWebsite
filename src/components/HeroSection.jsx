import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const rotatingTexts = [
    "Nikhil",
    "Engineer",

    "Developer",
    "Nikhil",
    "Innovator",

    "Leader",
    "Nikhil",
    "Designer",

    "Problem Solver",
    "Nikhil",
    "Achiever",

    "Creator",
    "Nikhil",
    "Adventurer",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % rotatingTexts.length);
        setIsGlitching(false);
      }, 300);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <section className="h-screen bg-gradient-to-b from-[#2e006e6e] to-black flex xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-16 relative overflow-hidden">
      {/* Left Section - Content */}
      <div className="z-40 xl:mb-0 mb-[20%]">
        {/* Main Heading with Glitch Effect */}
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 20,
            delay: 1.3,
            duration: 1,
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold z-10 mb-6"
        >
          I'm
          <br />
          {/* Glitch/Swap Text Animation */}
          <motion.span
            key={currentIndex}
            initial={{ opacity: 1 }}
            animate={{
              opacity: isGlitching ? [1, 0, 1] : 1,
              x: isGlitching ? [0, -5, 5, 0] : 0,
            }}
            transition={{
              duration: isGlitching ? 0.3 : 0.5,
              times: isGlitching ? [0, 0.2, 0.8, 1] : undefined,
            }}
            className="text-violet-500 relative inline-block"
          >
            {rotatingTexts[currentIndex]}

            {/* Glitch effect layers for enhanced visual impact */}
            {isGlitching && (
              <>
                <span className="absolute top-0 left-0 text-red-500 opacity-70">
                  {rotatingTexts[currentIndex]}
                </span>
                <span className="absolute top-0 left-0 text-cyan-500 opacity-70 transform translate-x-1">
                  {rotatingTexts[currentIndex]}
                </span>
              </>
            )}
          </motion.span>
        </motion.h1>

        {/* Description Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 20,
            delay: 1.5,
            duration: 1,
          }}
          className="text-xl md:text-2xl lg:text-3xl text-purple-200 max-w-2xl z-20"
        >
          B.Tech graduate specializing in full-stack development with expertise
          in JavaScript, Python, React, and Next.js. Passionate about building
          scalable, user-focused applications and leveraging AI to deliver
          innovative digital solutions.
        </motion.p>
      </div>

      {/* Right Section - 3D Spline Model */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 20,
          delay: 0.2,
          duration: 1,
        }}
      >
        <Spline
          className="absolute xl:right-[-28%] right-0 top-[-20%] z-10 lg:top-0"
          scene="https://prod.spline.design/DO3v5GMfg7goUMCB/scene.splinecode"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
