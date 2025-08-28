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
    }, 1500);

    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

  return (
    <section
      id="home"
      className="min-h-screen  relative overflow-hidden"
    >
      {/* Container with increased mobile padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between min-h-screen pt-20 pb-16 lg:pt-0 lg:pb-0">
        {/* Left - Text Content */}
        <div className="z-40 lg:mb-0 mb-8 max-w-2xl w-full text-center lg:text-left">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 20,
              delay: 1.2,
              duration: 1,
            }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            I'm
            <br />
            <motion.span
              key={currentIndex}
              initial={{ opacity: 1 }}
              animate={{
                opacity: isGlitching ? [1, 0, 1] : 1,
                x: isGlitching ? [0, -6, 6, 0] : 0,
              }}
              transition={{
                duration: isGlitching ? 0.3 : 0.5,
                times: isGlitching ? [0, 0.2, 0.8, 1] : undefined,
              }}
              className="text-violet-400 relative inline-block"
            >
              {rotatingTexts[currentIndex]}
              {isGlitching && (
                <>
                  <span className="absolute top-0 left-0 text-red-500 opacity-70 transform -translate-x-px">
                    {rotatingTexts[currentIndex]}
                  </span>
                  <span className="absolute top-0 left-0 text-cyan-400 opacity-70 transform translate-x-px">
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
              delay: 1.4,
              duration: 1,
            }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-purple-200 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8"
          >
            B.Tech graduate specializing in full-stack development with
            expertise in JavaScript, Python, React, and Next.js. Passionate
            about building scalable, user-focused applications and leveraging AI
            to deliver innovative digital solutions.
          </motion.p>
        </div>

        {/* Right - Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 20,
            delay: 0.3,
            duration: 1,
          }}
          className="z-30 w-full flex justify-center lg:justify-end"
        >
          <Globe className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[460px]" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
