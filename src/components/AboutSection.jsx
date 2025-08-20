import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title Animation
    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      {
        y: -300,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Intro Animation
    gsap.fromTo(
      introRef.current,
      { y: 100, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen relative overflow-hidden bg-gradient-to-b from-black to-[#2e006e6e] flex items-center justify-center "
    >
      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center relative z-10">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold sm:mb-16 text-center text-white"
        >
          About Me
        </h1>
      </div>

      <div
        ref={introRef}
        className="absolute inset-0 flex md:flex-row flex-col items-center justify-between lg:px-24 px-5 mt-32 md:mt-0 z-10"
      >
        <div className="md:w-1/2 flex justify-center md:justify-start ">
          <img
            className="md:h-[35rem] h-[35rem] mix-blend-lighten "
            src="images/Person.png"
            alt="profile-img"
          />
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <h3 className="text-xl text-purple-200 max-w-2xl z-20 md:text-lg lg:text-2xl font-bold lg:max-w-[45rem]">
            Hi, I'm Nikhil Singh, a Full-Stack Developer focused on building
            scalable and intelligent web solutions. I craft robust applications
            using a versatile tech stack including Next.js, Spring Boot, and
            Angular, connecting them to scalable databases with tools like
            Prisma and PostgreSQL. Whether it's leveraging the Google Gemini API
            to generate dynamic content or automating workflows in wealth
            management, my goal is to write efficient code that delivers
            powerful and intuitive user experiences
          </h3>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
