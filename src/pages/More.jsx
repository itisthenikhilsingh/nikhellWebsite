"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function More() {
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const circleRef = useRef(null);
  const initialTextRef = useRef(null);
  const finalTextRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const materialRef = useRef(null);
  const stateRef = useRef({ warp: 0, time: 0 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = wrapperRef.current;
    if (!container) return;

    // Basic entrance animation
    gsap.fromTo(
      wrapperRef.current,
      { y: 100, opacity: 0, filter: "blur(5px)", scale: 0.5 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        delay: 0.4,
        filter: "blur(0px)",
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.zIndex = "0";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    // Scene + Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 2000);
    camera.position.z = 300;

    // Lights (kept subtle)
    const ambientLight = new THREE.AmbientLight(0x4040ff, 0.3);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0x8a6fff, 0.5);
    directionalLight.position.set(100, 100, 100);
    scene.add(directionalLight);

    // Performance-adaptive counts
    const deviceMemory = navigator.deviceMemory || 4;
    const hwConcurrency = navigator.hardwareConcurrency || 4;
    const RADIUS = 800;
    let STAR_COUNT = isMobile ? 2000 : (deviceMemory <= 1 ? 2500 : (hwConcurrency <= 2 ? 3500 : 6000));

    // Small star texture (canvas) - reused in shader
    const createStarTexture = () => {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.3, 'rgba(220,200,255,0.8)');
      gradient.addColorStop(0.6, 'rgba(150,130,255,0.4)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
      return tex;
    };
    const starTexture = createStarTexture();

    // Geometry + attributes
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(STAR_COUNT * 3);
    const basePositions = new Float32Array(STAR_COUNT * 3);
    const sizeMult = new Float32Array(STAR_COUNT);
    const rand = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      const u = Math.random() * 2 - 1;
      const theta = Math.random() * Math.PI * 2;
      const r = Math.cbrt(Math.random()) * RADIUS;
      const x = r * Math.sqrt(1 - u * u) * Math.cos(theta);
      const y = r * Math.sqrt(1 - u * u) * Math.sin(theta);
      const z = r * u;
      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      sizeMult[i] = 0.6 + Math.random() * 1.8;
      rand[i] = Math.random() * Math.PI * 0.8;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('basePos', new THREE.BufferAttribute(basePositions, 3));
    geometry.setAttribute('sizeMult', new THREE.BufferAttribute(sizeMult, 1));
    geometry.setAttribute('rand', new THREE.BufferAttribute(rand, 1));

    // ShaderMaterial (GPU-based animation)
    const vertexShader = `
      attribute vec3 basePos;
      attribute float sizeMult;
      attribute float rand;
      uniform float time;
      uniform float warp;
      varying float vAlpha;
      void main() {
        vec3 bp = basePos;
        float r = length(bp) + 0.0001;
        vec3 n = bp / r;
        float outwardStrength = warp * 100.0;
        float speed = 40.0 + warp * 1200.0;
        vec3 pos = bp + n * outwardStrength;
        pos.z -= warp * speed * time * (0.5 + rand*0.5);
        if (pos.z < -600.0) pos.z += 1400.0;
        float flickerSpeed = 2.0 + warp * 8.0;
        float flick = (1.0 + sin(time * flickerSpeed + rand) * 0.5) * (1.0 + warp * 3.0);
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        float size = (2.5 + warp * 8.0) * flick * sizeMult;
        gl_PointSize = size * (300.0 / -mvPosition.z);
        vAlpha = smoothstep(0.0, 1.0, flick);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform sampler2D starMap;
      varying float vAlpha;
      void main() {
        vec2 uv = gl_PointCoord;
        vec4 tex = texture2D(starMap, uv);
        vec4 col = vec4(tex.rgb, tex.a * vAlpha);
        if (col.a < 0.02) discard;
        gl_FragColor = col;
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        warp: { value: 0 },
        starMap: { value: starTexture },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    materialRef.current = material;

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    // GSAP setup for circle and text
    gsap.set(circleRef.current, {
      scale: 1,
      background: "radial-gradient(circle,rgba(0,0,0,1) 60%  , rgba(138,102,255,0.9) )",
      boxShadow: "0 0 60px 15px rgba(138, 102, 255, 0.2)"
    });
    gsap.set(initialTextRef.current, { opacity: 1 });
    gsap.set(finalTextRef.current, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=250%",
        pin: true,
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    const computeScaleToFill = (el) => {
      if (!el) return 2;
      const rect = el.getBoundingClientRect();
      const diagonal = Math.hypot(window.innerWidth, window.innerHeight);
      return Math.max((diagonal * 1.15) / rect.width, 2);
    };

    tl.to(circleRef.current, {
      scale: () => computeScaleToFill(circleRef.current),
      backgroundColor: "#000000",
      boxShadow: "0 0 160px 80px rgba(138, 102, 255, 0.4)",
      ease: "power3.out",
      duration: 1,
    }, 0)
      .to(initialTextRef.current, { opacity: 0, duration: 0.3 }, 0.1)
      .to(finalTextRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" }, 0.6)
      .fromTo(
        finalTextRef.current?.children[0]?.children || [],
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.5 },
        0.7
      )
      .to(stateRef.current, {
        warp: 1, ease: "none",
        onUpdate: () => {
          // sync material uniform to keep GPU animation in step
          if (materialRef.current) materialRef.current.uniforms.warp.value = stateRef.current.warp;
        }
      }, 0);

    // mouse handling (throttled)
    let lastMouseUpdate = 0;
    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - lastMouseUpdate < 30) return;
      lastMouseUpdate = now;
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // visibility observer to pause when out of view
    let running = true;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        running = en.isIntersecting;
        if (!running) cancelAnimationFrame(rafId);
        else rafId = requestAnimationFrame(animate);
      });
    }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);

    // animation loop - only update uniforms and a few camera params
    let rafId;
    let lastTime = performance.now();
    const animate = (now) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      stateRef.current.time += dt;
      if (materialRef.current) {
        materialRef.current.uniforms.time.value += dt;
        materialRef.current.uniforms.warp.value = stateRef.current.warp;
      }
      // camera subtle parallax
      camera.position.x = mouseRef.current.x * stateRef.current.warp * 40;
      camera.position.y = -mouseRef.current.y * stateRef.current.warp * 40;
      camera.position.z = 300 - stateRef.current.warp * 160;
      camera.rotation.z = stateRef.current.warp * 0.02 * Math.sin(stateRef.current.time * 0.6);
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    // resize handler
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // cleanup
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (sectionRef.current) obs.disconnect();
      geometry.dispose();
      material.dispose();
      starTexture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
      id="contact"
      style={{ overscrollBehavior: "none" }}
    >
      <div ref={wrapperRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent pointer-events-none " />
      <div className="relative  w-full h-full flex items-center justify-center">


        <div
          ref={circleRef}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 sm:w-32 md:w-40 h-28 sm:h-32 md:h-40 rounded-full will-change-transform "
          style={{
            background: "radial-gradient(circle,rgba(0,0,0,1) 60%  , rgba(138,102,255,0.9) )",
            boxShadow: "0 0 40px 15px rgba(138, 102, 255, 0.2)",
          }}
        >
          <p
            ref={initialTextRef}
            className="absolute inset-0 flex items-center text-center justify-center text-white font-bold text-lg sm:text-xl md:text-2xl tracking-wider drop-shadow-lg"
          >
            SCROLL
            DOWN
          </p>
        </div>

        <div
          ref={finalTextRef}
          className="relative opacity-0 text-center px-6 max-w-2xl mx-auto "
        >

          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
            Step Into the Future
            <br />
            <span className="text-transparent bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text">with NikhiL</span>
          </h1>
          <p className="text-gray-200 text-sm md:text-base lg:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Front-end developer crafting modern, responsive, and animated web experiences with React, Tailwind, and advanced UI techniques.
          </p>
          <button className="px-8 py-4 z-40 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/30">
            <a href="mailto:nikhilsingh672001@gmail.com">Contact me</a>
          </button>

        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-1/4 left-10 w-1 h-1 rounded-full animate-pulse opacity-50" />
        <div className="absolute bottom-1/3 right-12 w-0.5 h-0.5 rounded-full animate-pulse opacity-40" style={{ animationDelay: "1s" }} />
      </div>
    </section>
  );
}
