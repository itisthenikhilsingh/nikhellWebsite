"use client";

import { useEffect, useRef, useState } from "react";
import { cordinates as INDIA_POLYGON } from "../constants/cordinates";

const VIEW_W = 1600;
const VIEW_H = 1500;

function pointInPolygon(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0];
    const yi = poly[i][1];
    const xj = poly[j][0];
    const yj = poly[j][1];
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi || 1e-7) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export default function IndiaDotCanvas({
  width = 550,
  height = 605,
  spacing = 22,
  dotRadius = 1,
  maxDotRadius = 10,
  influenceRadius = 150,
  dotColor = "#fff",
  className = "",
}) {
  const canvasRef = useRef(null);
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const particles = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  // keep mouse in a ref (no re-render)
  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  // build dots once
  useEffect(() => {
    const pts = [];
    const pad = spacing * 0.6;
    for (let y = pad; y <= VIEW_H - pad; y += spacing) {
      const xOffset = Math.floor((y / spacing) % 2) ? spacing * 0.5 : 0;
      for (let x = pad + xOffset; x <= VIEW_W - pad; x += spacing) {
        if (pointInPolygon(x, y, INDIA_POLYGON)) {
          pts.push({
            originalX: x,
            originalY: y,
            x,
            y,
            r: dotRadius,
          });
        }
      }
    }
    particles.current = pts;
  }, [spacing, dotRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame;
    const scale = width / VIEW_W;

    const animationSpeed = 0.12; // easing factor
    const pullStrength = 0.2; // << adjust this to control how far dots move toward cursor

    function draw() {
      ctx.clearRect(0, 0, width, height); // transparent background

      const currentMouse = mouseRef.current;

      particles.current.forEach((p) => {
        const dx = currentMouse.x - p.originalX;
        const dy = currentMouse.y - p.originalY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = p.originalX;
        let targetY = p.originalY;
        let targetR = dotRadius;

        if (dist < influenceRadius) {
          const strength = 1 - dist / influenceRadius;

          // pull toward cursor
          targetX = p.originalX + dx * strength * pullStrength;
          targetY = p.originalY + dy * strength * pullStrength;

          // radius grows
          targetR = dotRadius + strength * (maxDotRadius - dotRadius) * 0.2;
        }

        // interpolate smoothly
        p.x += (targetX - p.x) * animationSpeed;
        p.y += (targetY - p.y) * animationSpeed;
        p.r += (targetR - p.r) * animationSpeed;

        ctx.beginPath();
        ctx.arc(p.x * scale, p.y * scale, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor; // same color always
        ctx.fill();
      });

      frame = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(frame);
  }, [width, height, dotColor, dotRadius, maxDotRadius, influenceRadius]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      style={{
        display: "block",
        borderRadius: "16px",
        background: "transparent", // no bg
      }}
      onMouseMove={(e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * VIEW_W;
        const y = ((e.clientY - rect.top) / rect.height) * VIEW_H;
        setMouse({ x, y });
      }}
      onMouseLeave={() => setMouse({ x: -9999, y: -9999 })}
    />
  );
}
