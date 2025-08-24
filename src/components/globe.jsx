"use client";

import createGlobe from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.6,
  mapSamples: 16000,
  mapBrightness: 1.1,
  baseColor: [0.56, 0.27, 0.68], // violet-purple
  markerColor: [0.93, 0.2, 0.93], // magenta markers
  glowColor: [0.6, 0.2, 1], // soft violet glow
  markers: [
    { location: [19.076, 72.8777], size: 0.12 }, // Mumbai
    // Add more markers if needed
  ],
};

export function Globe({ className, config = GLOBE_CONFIG }) {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const r = useMotionValue(0);
  const rs = useSpring(r, { mass: 1, damping: 30, stiffness: 100 });

  // Handle pointer/touch interaction
  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    let phi = 0; // Declare phi inside useEffect so it's scoped per instance
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize(); // Initial size

    if (!canvasRef.current) return;

    // Create the globe with responsive size
    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        // Auto-rotate unless interacting
        if (!pointerInteracting.current) phi += 0.0035; // Slightly slower auto-rotation
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    // Fade in after render
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 100);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [config, rs]);

  return (
    <div
      className={twMerge(
        "relative mx-auto aspect-square w-full max-w-[480px] sm:max-w-[520px] md:max-w-[560px] lg:max-w-[600px]",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="size-full opacity-0 transition-opacity duration-700 ease-in-out cursor-grab active:cursor-grabbing [contain:layout_paint_size]"
        onPointerDown={(e) => {
          // Normalize touch/mouse
          const clientX =
            e.type === "touchstart" ? e.touches[0]?.clientX : e.clientX;
          if (clientX == null) return;
          pointerInteracting.current = clientX;
          updatePointerInteraction(clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => {
          e.preventDefault(); // Prevent scroll while touching
          if (e.touches[0]) updateMovement(e.touches[0].clientX);
        }}
        onWheel={(e) => e.preventDefault()} // Optional: prevent zooming
      />
    </div>
  );
}
