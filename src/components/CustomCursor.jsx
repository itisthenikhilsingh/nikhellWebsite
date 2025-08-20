import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorBorderRef = useRef(null);
  //hide Cursor on touch devices
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia(" (max-width: 768px)").matches;
  if (isMobile) {
    return null;
  }

  useEffect(() => {
    // Get cursor elements
    const cursor = cursorRef.current;
    const cursorBorder = cursorBorderRef.current;
    // Set initial position
    gsap.set([cursor, cursorBorder], { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.2,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.2,
      ease: "power3.out",
    });
    const xToBorder = gsap.quickTo(cursorBorder, "x", {
      duration: 0.5,
      ease: "power3.out",
    });
    const yToBorder = gsap.quickTo(cursorBorder, "y", {
      duration: 0.5,
      ease: "power3.out",
    });
    // Mouse move event
    const onMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToBorder(e.clientX);
      yToBorder(e.clientY);
    };
    window.addEventListener("mousemove", onMouseMove);

    // click event
    document.addEventListener("mousedown", () => {
      gsap.to([cursor, cursorBorder], {
        scale: 0.3,
        duration: 0.1,
      });
    });
    document.addEventListener("mouseup", () => {
      gsap.to([cursor, cursorBorder], {
        scale: 1,
        duration: 0.1,
      });
    });
  }, []);
  return (
    <>
      {/* Main Cursor Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[30px] h-[30px] bg-white rounded-full pointer-events-none z-[999] mix-blend-difference"
      />
      <div
        ref={cursorBorderRef}
        className="fixed top-0 left-0 w-[60px] h-[60px] border rounded-full border-white pointer-events-none z-[999] mix-blend-difference opacity-50"
      />
    </>
  );
};

export default CustomCursor;
