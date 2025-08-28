"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const circleRefs = useRef([]);

  // Initialize glow states for each circle
  const [glowStates, setGlowStates] = useState(data.map(() => false));

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Track which circles should glow based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      // Calculate current position of the highlighted line
      const currentHeight = latest * height;

      // Update glow states for each circle
      const newGlowStates = data.map((_, index) => {
        if (circleRefs.current[index]) {
          const circleTop = circleRefs.current[index].getBoundingClientRect().top -
            ref.current.getBoundingClientRect().top;
          return currentHeight >= circleTop;
        }
        return false;
      });

      setGlowStates(newGlowStates);
    });

    return unsubscribe;
  }, [height, scrollYProgress, data]);

  useEffect(() => {
    const elements = gsap.utils.toArray(".animate-text");
    elements.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [data]);

  return (
    <motion.div
      className="c-space ml-6 section-spacing"
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            {/* Left side */}
            <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
              <div
                ref={el => circleRefs.current[index] = el}
                className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px] bg-midnight"
              >
                <motion.div
                  className={`w-4 h-4 p-2 border rounded-full ${glowStates[index]
                    ? 'bg-purple-500 border-purple-300'
                    : 'bg-neutral-800 border-neutral-700'
                    }`}
                  animate={{
                    scale: glowStates[index] ? 1.2 : 1,
                    boxShadow: glowStates[index]
                      ? "0 0 15px 5px rgba(139, 92, 246, 0.9)"
                      : "0 0 0 0 rgba(139, 92, 246, 0)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex-col hidden gap-2 text-xl font-bold text-white md:flex md:pl-20 md:text-3xl">
                <h3 className="animate-text">{item.date}</h3>
                <h3 className="text-2xl animate-text">{item.title}</h3>
                <h3 className="text-2xl animate-text">{item.job}</h3>
              </div>
            </div>
            {/* Right side */}
            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <div className="block mb-4 text-2xl font-bold text-left text-white md:hidden">
                <h3 className="animate-text">{item.date}</h3>
                <h3 className="animate-text">{item.job}</h3>
              </div>
              {item.contents.map((content, idx) => (
                <p
                  key={idx}
                  className="mb-3 text-xl font-normal text-white animate-text"
                >
                  {content}
                </p>
              ))}
            </div>
          </div>
        ))}
        {/* Timeline line with enhanced glow */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-1 left-1 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-lavender/50 to-transparent from-[0%] via-[10%] rounded-full"
          />
          {/* Glowing overlay effect that follows the line */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[6px] bg-gradient-to-t from-purple-400 to-transparent rounded-full blur-[2px]"
          />
        </div>
      </div>
    </motion.div>
  );
};
export default Timeline;