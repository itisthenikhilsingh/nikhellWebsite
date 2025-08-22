"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Globe } from "../components/globe";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const rotatingTexts = [
    "Nikhil",
    "Engineer",
    "Developer",
    "Coder",
    "Innovator",
    "Leader",
    "Designer",
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
  }, [rotatingTexts.length]);

  return (
    <section
      id="home"
      className="min-h-screen bg-gradient-to-r from-[#2e006e6e] to-black relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse xl:flex-row items-center justify-between min-h-screen">
        {/* Left Section - Content */}
        <div className="z-40 xl:mb-0 mb-10 max-w-2xl text-center xl:text-left">
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
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold z-10 mb-6 leading-tight"
          >
            I'm
            <br />
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

          {/* Description */}
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
            className="text-lg md:text-xl lg:text-2xl text-purple-200 z-20 leading-relaxed"
          >
            B.Tech graduate specializing in full-stack development with
            expertise in JavaScript, Python, React, and Next.js. Passionate
            about building scalable, user-focused applications and leveraging AI
            to deliver innovative digital solutions.
          </motion.p>
        </div>

        {/* Right Section - Globe */}
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
          className="z-30 w-full flex items-center justify-center xl:justify-end mb-10 xl:mb-0"
        >
          <div className="w-[280px] sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[500px] xl:mr-0">
            <Globe />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
