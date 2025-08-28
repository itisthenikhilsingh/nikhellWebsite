import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";

const StarBackground = (props) => {
  const ref = useRef();
  const numPoints = 1500;
  const [positions] = useState(() => {
    const arr = random.inSphere(new Float32Array(numPoints * 3), {
      radius: 1.5,
    });
    const hasNaN = arr.some((v) => isNaN(v));
    if (hasNaN) console.error("positions array contains NaN!");
    return arr;
  });
  const mouseOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseOffset.current.x = x * 0.2;
      mouseOffset.current.y = y * 0.2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta / 20;
      ref.current.rotation.y += delta / 20;
      ref.current.rotation.x += mouseOffset.current.y * delta;
      ref.current.rotation.y += mouseOffset.current.x * delta;
      mouseOffset.current.x *= 0.95;
      mouseOffset.current.y *= 0.95;

      if (ref.current.material) {
        // keep color consistent
        ref.current.material.color = new THREE.Color("#8a6fff");
      }
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#8a6fff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={1}
        />
      </Points>
    </group>
  );
};

/**
 * Use this component as a global visual layer.
 *
 * Key fixes:
 * - wrapper div has pointer-events-none so it never captures mouse/touch events
 * - Canvas itself also has pointerEvents: 'none' style (extra safety)
 * - Use z-0 to keep the layer beneath UI; ensure your interactive container uses a higher z-index (z-50 / z-60)
 */
const StarsCanvas = () => (
  <div
    // fixed full-screen background layer
    className="fixed inset-0 w-full h-full pointer-events-none z-0"
    style={{ pointerEvents: "none", zIndex: 0 }}
    aria-hidden="true"
  >
    <Canvas
      // camera may be adjusted for desired look
      camera={{ position: [1, 1, 0] }}
      // make the canvas itself non-interactive so events pass through
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);

export default StarsCanvas;
