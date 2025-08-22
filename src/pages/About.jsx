import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import Frameworks from "../components/Frameworks";
import { motion } from "framer-motion";
import IndiaDotCanvas from "../components/IndiaDotMap";

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const aboutCardRef = useRef(null);
  const skillsCardRef = useRef(null);
  const frameworksRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title Animation
    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // About Card Animation
    gsap.fromTo(
      aboutCardRef.current,
      { y: 100, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        delay: 0.4,
        filter: "blur(0px)",
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Skills Card Animation
    gsap.fromTo(
      skillsCardRef.current,
      { y: 100, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        delay: 0.6,
        filter: "blur(0px)",
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );
    // Frameworks Animation
    gsap.fromTo(
      frameworksRef.current,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: frameworksRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className=" bg-gradient-to-l to-[#2e006e6e] from-black overflow-hidden"
      id="about"
    >
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 z-10">
        <div ref={titleRef}>
          <TitleHeader
            title={"ABOUT ME"}
            text={"Passionate Creator, Lifelong Learner"}
            number={1}
          />
        </div>

        {/* Content Grid */}
        <div className="mt-4 grid grid-cols-12 gap-5 md:mt-8 ">
          {/* About Me Card */}
          <div className="col-span-12 md:col-span-7" ref={aboutCardRef}>
            <div className="h-full rounded-2xl bg-[#111111] p-7 ">
              <div className="flex flex-col md:flex-row items-center gap-6 h-full ">
                {/* Profile Photo */}
                <div className="flex-shrink-0 ">
                  <img
                    className="w-32 md:w-40 rounded-lg object-cover  shadow-md"
                    src="images/Person.png"
                    alt="profile-img"
                  />
                </div>
                {/* Info */}
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-50">
                    Nikhil Singh
                  </h2>
                  <p className="mt-2 text-blue-100 md:text-lg">
                    Hi,I am a Full-Stack Developer focused on building scalable
                    and intelligent web solutions. I craft robust applications
                    using a versatile tech stack including Next.js, Spring Boot,
                    and Angular, connecting them to scalable databases with
                    tools like Prisma and PostgreSQL. My goal is to write
                    efficient code that delivers powerful and intuitive user
                    experiences
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Skills Card */}
          <div className="col-span-12 md:col-span-5" ref={skillsCardRef}>
            <div className="h-full rounded-2xl bg-[#111111] p-7 relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center h-full">
                {/* Left Column */}
                <div>
                  <h2 className="text-2xl text-blue-50 md:text-3xl">
                    Tech Stack
                  </h2>
                  <p className="mt-2 md:text-xl">
                    I specialize in a variety of languages, frameworks, and
                    tools that allow me to build robust and scalable
                    applications.
                  </p>
                </div>

                {/* Right Column */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  ref={frameworksRef}
                  className="relative flex justify-end"
                >
                  <div className="relative translate-x-1/2">
                    <Frameworks />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <div className="grid grid-cols-[2fr_2fr_1fr] gap-6 items-start h-full">
              {/* Column 1 */}
              <div className="bg-[#111111] rounded-xl p-5 grid grid-cols-[1fr_2fr]">
                <div>
                  <h3 className="text-xl text-blue-50">Time Zone</h3>
                  <p className="mt-2 text-blue-100">
                    I'm based in Mars, and open to remote work worldwide
                  </p>
                </div>
                <div className="relative flex justify-end items-center">
                  {/* Responsive wrapper */}
                  <div className="relative w-full max-w-[220px] aspect-[11/12] overflow-hidden">
                    <div className="absolute inset-0 top-0  overflow-hidden">
                      <IndiaDotCanvas className="w-full h-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="bg-[#111111] rounded-xl p-5">
                <h3 className="text-xl text-blue-50">Column 2</h3>
                <p className="mt-2 text-blue-100">
                  Content for the second column goes here.
                </p>
              </div>

              {/* Column 3 */}
              <div className="bg-[#111111] rounded-xl p-5">
                <h3 className="text-xl text-blue-50">Column 3</h3>
                <p className="mt-2 text-blue-100">
                  Content for the third column goes here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
