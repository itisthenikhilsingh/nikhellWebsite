import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import { SlShareAlt } from "react-icons/sl";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const pinContainerRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const titleRef = useRef(null);
  const backgroundRef = useRef(null);

  const projectImage = [
    {
      id: 1,
      title: "Quiz Easy",
      imageSrc: "/images/project-1.png",
      link: "https://quizeasy-hazel.vercel.app/",
    },
    {
      id: 2,
      title: "3-D Portfolio Website",
      imageSrc: "/images/project-2.png",
      link: "https://nikhell-website.vercel.app/",
    },
    {
      id: 3,
      title: "Portfolio Dashboard",
      imageSrc: "/images/project-3.png",
      link: "#",
    },
    {
      id: 4,
      title: "Fitness Tracking App",
      imageSrc: "/images/project-4.png",
      link: "#",
    },
  ];

  const sectionsCount = projectImage.length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance animation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Background parallax
      gsap.to(backgroundRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Horizontal scrolling
      const horizontalScroll = gsap.to(horizontalSectionRef.current, {
        x: () =>
          `-${horizontalSectionRef.current.scrollWidth - window.innerWidth}`,
        ease: "none",
        scrollTrigger: {
          trigger: pinContainerRef.current,
          pin: true,
          start: "top top",
          end: () =>
            `+=${horizontalSectionRef.current.scrollWidth - window.innerWidth}`,
          scrub: 0.8,
          snap: {
            snapTo: 1 / (sectionsCount - 1),
            duration: { min: 0.3, max: 0.5 },
          },
          invalidateOnRefresh: true,
        },
      });

      // Panels animations
      const panels = gsap.utils.toArray(".panel");

      panels.forEach((panel, index) => {
        const image = panel.querySelector(".project-image");
        const imageTitle = panel.querySelector(".project-title");

        if (index === 0) {
          // Special entrance for first image
          gsap.fromTo(
            image,
            { opacity: 0, y: 100, scale: 0.5 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              delay: 0.6,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        } else {
          // Normal scroll animations
          gsap.fromTo(
            image,
            { scale: 0.8, opacity: 0, rotation: 20 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalScroll,
                start: "left 90%", // earlier
                end: "left 20%", // later
                scrub: 2, // slower + smoother
              },
            }
          );
        }

        if (imageTitle) {
          if (index === 0) {
            // First title joins entrance
            gsap.fromTo(
              imageTitle,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          } else {
            // Other titles follow horizontal scroll
            gsap.fromTo(
              imageTitle,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontalScroll,
                  start: "left 85%", // earlier
                  end: "left 25%", // later
                  scrub: 2, // smoother
                },
              }
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="overflow-hidden">
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/parallax-bg.jpg')",
          height: "130%",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-l to-[#2e006e6e] from-black opacity-90" />

      <div
        ref={pinContainerRef}
        className="relative z-10 h-screen flex flex-col"
      >
        <div
          ref={titleRef}
          className="container mx-auto px-4 pt-6 sm:px-6 lg:px-10"
        >
          <TitleHeader
            title={"PROJECTS"}
            text={"Featured Projects"}
            number={2}
          />
        </div>

        <div className="flex-1 relative overflow-hidden">
          <div
            ref={horizontalSectionRef}
            className="horizontal-section absolute top-0 left-0 flex items-center h-full pr-12 md:pr-24"
            style={{ width: `${sectionsCount * 100}%` }}
          >
            {projectImage.map((project) => (
              <div
                key={project.id}
                className="panel relative flex-shrink-0 w-screen h-full flex items-center justify-center"
              >
                <div className="relative w-full flex flex-col items-center justify-center">
                  <img
                    className="project-image w-[80vw] md:w-[60vw] max-h-[60%] rounded-2xl object-contain shadow-2xl"
                    src={project.imageSrc}
                    alt={project.title}
                  />
                  <h2 className="project-title flex items-center gap-3 md:text-3xl text-lg font-semibold mt-6 text-white">
                    <a className="cursor-grab" href={project.link}>
                      {project.title}
                    </a>

                    <SlShareAlt className="text-xl" />
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
