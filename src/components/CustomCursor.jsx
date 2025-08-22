import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorRef1 = useRef(null);
  const cursorBorderRef = useRef(null);

  //hide Cursor on touch devices
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;
  if (isMobile) {
    return null;
  }

  useEffect(() => {
    // Get cursor elements
    const cursor = cursorRef.current;
    const cursor1 = cursorRef1.current;
    const cursorBorder = cursorBorderRef.current;

    // Set initial position
    gsap.set([cursor, cursorBorder, cursor1], { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.2,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.2,
      ease: "power3.out",
    });

    const xTo1 = gsap.quickTo(cursor1, "x", {
      duration: 0.25,
      ease: "power3.out",
    });
    const yTo1 = gsap.quickTo(cursor1, "y", {
      duration: 0.25,
      ease: "power3.out",
    });

    const xToBorder = gsap.quickTo(cursorBorder, "x", {
      duration: 0.3,
      ease: "power3.out",
    });
    const yToBorder = gsap.quickTo(cursorBorder, "y", {
      duration: 0.3,
      ease: "power3.out",
    });

    // Mouse move event
    const onMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xTo1(e.clientX);
      yTo1(e.clientY);
      xToBorder(e.clientX);
      yToBorder(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    // click event
    const handleMouseDown = () => {
      gsap.to([cursor, cursorBorder, cursor1], {
        scale: 0.5,
        duration: 0.2,
      });
    };

    const handleMouseUp = () => {
      gsap.to([cursor, cursorBorder, cursor1], {
        scale: 1,
        duration: 0.2,
      });
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Main Cursor Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[15px] h-[15px] bg-white rounded-full pointer-events-none z-[999] mix-blend-difference"
      />
      <div
        ref={cursorRef1}
        className="fixed top-0 left-0 w-[25px] h-[25px] border rounded-full border-white pointer-events-none z-[999] mix-blend-difference opacity-50"
      />
      <div
        ref={cursorBorderRef}
        className="fixed top-0 left-0 w-[40px] h-[40px] border rounded-full border-white pointer-events-none z-[999] mix-blend-difference opacity-50"
      />
    </>
  );
};

export default CustomCursor;
