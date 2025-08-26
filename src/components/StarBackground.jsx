import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const StarBackground = (props) => {
  const ref = useRef();
  const numPoints = 1500; // Good, divisible by nothing? Doesn't matter — we do *3
  const [positions] = useState(() => {
    const arr = random.inSphere(new Float32Array(numPoints * 3), {
      radius: 1.5,
    });
    // Optional: validate
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
    window.addEventListener("mousemove", handleMouseMove);
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
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#fff"
          size={0.0035}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 z-[1]">
    <Canvas camera={{ position: [1, 1, 0] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);

export default StarsCanvas;
