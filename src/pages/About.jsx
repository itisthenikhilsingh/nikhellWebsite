import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import Frameworks from "../components/Frameworks";
import { motion } from "framer-motion";
import IndiaDotCanvas from "../components/IndiaDotMap";
import { FiAward, FiCode, FiBook, FiDownload } from "react-icons/fi";

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const aboutCardRef = useRef(null);
  const skillsCardRef = useRef(null);
  const frameworksRef = useRef(null);
  const timeZoneCardRef = useRef(null);
  const indiaCardRef = useRef(null);
  const highlightCardRef = useRef(null);
  const resumeCardRef = useRef(null);
  const resumePreviewRef = useRef(null);

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
          start: "top 40%",
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
          start: "top 40%",
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
        delay: 0.6,
        duration: 0.8,
        scrollTrigger: {
          trigger: frameworksRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
    // Time Zone Card Animation
    gsap.fromTo(
      timeZoneCardRef.current,
      { y: 100, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        delay: 0.8,
        filter: "blur(0px)",
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    );
    // India Card Animation
    gsap.fromTo(
      indiaCardRef.current,
      { y: 100, opacity: 0, scale: 2, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        delay: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );
    // Highlight Card Animation
    gsap.fromTo(
      highlightCardRef.current,
      { y: 100, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        delay: 0.8,
        filter: "blur(0px)",
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    );
    // Resume Card Animation
    gsap.fromTo(
      resumeCardRef.current,
      { y: 100, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        delay: 0.8,
        filter: "blur(0px)",
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className=" overflow-hidden"
      id="about"
    >
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div ref={titleRef}>
          <TitleHeader
            title={"ABOUT ME"}
            text={"Passionate Creator, Lifelong Learner"}
            number={1}
          />
        </div>

        {/* Content Grid */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:mt-8">
          {/* About Me Card */}
          <div className="col-span-12 z-[10] lg:col-span-7" ref={aboutCardRef}>
            <div className="h-full rounded-2xl bg-[#111111] p-7">
              <div className="h-full">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl lg:text-3xl font-bold text-white">
                    Nikhil Singh
                  </h2>
                  <p className="mt-2 text-purple-100 lg:text-lg">
                    I am a Software Engineer at Mphasis, building backend
                    services for the VFS Global Visa Processing Platform. I
                    specialize in Java, Spring Boot, REST APIs, SQL,
                    microservices, and backend development, with experience
                    across appointment workflows, notifications, reporting, and
                    application processing.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Skills Card */}
          <div className="col-span-12 z-[10] lg:col-span-5" ref={skillsCardRef}>
            <div className="h-full rounded-2xl bg-[#111111] p-7 relative overflow-hidden">
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 items-center h-full">
                {/* Left Column */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white">
                    Tech Stack
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-purple-100 lg:text-base">
                    Java, C++, SQL, Spring Boot, Spring Security, REST APIs,
                    Microservices, Hibernate, JPA, JDBC, SQL Server, MySQL,
                    MongoDB, Azure, Azure DevOps, AWS, Docker, Git, Postman,
                    Jira, JUnit, and Mockito.
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
          {/* Time Zone, Highlights, Resume */}
          <div className="col-span-12">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr_1fr] gap-6 items-start h-full">
              {/* Column 1: Time Zone */}
              <div
                className="bg-[#111111] rounded-xl z-[10] grid grid-cols-[1fr_1fr] items-center h-full"
                ref={timeZoneCardRef}
              >
                <div className="flex-col flex justify-center pl-6">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    Time Zone
                  </h3>
                  <p className="mt-2 lg:text-xl text-purple-100">
                    I'm in <span className="text-[#9257ff]">Noida, India</span>{" "}
                    and open to remote work worldwide
                  </p>
                </div>

                <div className="relative flex justify-end items-center">
                  <div
                    className="relative w-full aspect-[11/12] overflow-hidden rounded-lg"
                    ref={indiaCardRef}
                  >
                    <IndiaDotCanvas
                      width={400}
                      height={450}
                      className="absolute xl:-right-[52%] z-10"
                    />
                  </div>
                </div>
              </div>

              {/* Column 2: Highlights */}
              <div
                className="bg-[#111111] rounded-xl p-5 lg:p-7 z-[10]"
                ref={highlightCardRef}
              >
                <h3 className="text-2xl lg:text-3xl font-bold text-blue-50 mb-4">
                  Highlights
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Education */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <FiBook className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-blue-50 font-semibold">B.Tech in IT</p>
                      <p className="text-blue-100 text-sm lg:text-base">
                        Dr. B. R. Ambedkar National Institute of Technology
                        Jalandhar (NIT Jalandhar / NITJ)
                      </p>
                    </div>
                  </div>

                  {/* Placement Representative */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <FiAward className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-blue-50 font-semibold">
                        Placement Representative
                      </p>
                      <p className="text-blue-100 text-sm lg:text-base">
                        Secured 10+ companies for NITJ campus recruitment
                      </p>
                    </div>
                  </div>

                  {/* GATE Qualified */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <FiAward className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-blue-50 font-semibold">
                        GATE 2025 (Computer Science)
                      </p>
                      <p className="text-blue-100 text-sm lg:text-base">
                        Qualified
                      </p>
                    </div>
                  </div>

                  {/* DSA */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <FiCode className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-blue-50 font-semibold">
                        Data Structures & Algorithms
                      </p>
                      <p className="text-blue-100 text-sm lg:text-base">
                        Solved 750+ problems
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3: Resume */}
              <div
                className="bg-[#111111] rounded-xl p-5 z-[10]"
                ref={resumeCardRef}
              >
                <h3 className="text-2xl lg:text-3xl font-bold text-blue-50 flex items-center gap-2">
                  <FiBook className="text-[#9257ff]" /> MORE ?
                </h3>
                <p className="mt-2 text-blue-100 lg:text-lg">
                  Preview my resume and explore my skills, projects, and
                  experience.
                </p>
                <div className="mt-4 z-[10]">
                  <button
                    onClick={() => resumePreviewRef.current?.showModal()}
                    className="bg-[#9257ff] hover:bg-[#7a45e0] text-white font-semibold rounded-lg p-2 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <FiBook className="h-5 w-5" />
                    Preview Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <dialog
        ref={resumePreviewRef}
        aria-labelledby="resume-preview-title"
        className="fixed inset-0 m-auto h-[90dvh] max-h-[90dvh] w-[min(96vw,900px)] max-w-none rounded-xl border border-white/20 bg-[#111111] p-0 text-white shadow-2xl backdrop:bg-black/80"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-white/15 p-4">
            <h2 id="resume-preview-title" className="text-lg font-semibold">
              Resume Preview
            </h2>
            <div className="flex items-center gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-300 hover:text-purple-200"
              >
                Open in new tab
              </a>
              <form method="dialog">
                <button
                  className="rounded-lg px-3 py-1 text-sm hover:bg-white/10"
                  aria-label="Close resume preview"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
          <iframe
            src="/resume.pdf"
            title="Resume PDF preview"
            className="min-h-0 w-full flex-1 bg-white"
          />
        </div>
      </dialog>
    </section>
  );
};

export default About;
