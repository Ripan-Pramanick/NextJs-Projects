"use client";

import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const trailRefs = useRef([]);
  const requestRef = useRef();

  // Physics and Position States
  const mouse = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const cursor = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const trailDots = useRef(Array.from({ length: 8 }).map(() => ({ x: 0, y: 0 })));
  
  // Interaction Flags
  const isHovering = useRef(false);
  const isIdle = useRef(false);
  const idleTimeout = useRef(null);
  const isMobile = useRef(false);

  useEffect(() => {
    // Check if device supports hover (ignores mobile/touch devices)
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
      isMobile.current = true;
      return;
    }

    // Center initial cursor position
    mouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    cursor.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e) => {
      clearTimeout(idleTimeout.current);
      isIdle.current = false;
      
      // Idle Pulse Trigger (after 2s of no movement)
      idleTimeout.current = setTimeout(() => {
        isIdle.current = true;
      }, 2000);

      const target = e.target.closest("[data-magnetic], button, a, input, select, textarea");
      
      if (target) {
        isHovering.current = true;
        
        // If element has data-magnetic, apply magnetic pull
        if (target.hasAttribute("data-magnetic")) {
          const rect = target.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          mouse.current.x = centerX + (e.clientX - centerX) * 0.3;
          mouse.current.y = centerY + (e.clientY - centerY) * 0.3;
        } else {
          // Normal hover (buttons, links)
          mouse.current.x = e.clientX;
          mouse.current.y = e.clientY;
        }
      } else {
        isHovering.current = false;
        mouse.current.x = e.clientX;
        mouse.current.y = e.clientY;
      }
    };

    const handleMouseDown = (e) => {
      createRipple(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    // Main 60 FPS Animation Loop
    const animate = () => {
      // 1. Spring Physics for smooth following
      cursor.current.x += (mouse.current.x - cursor.current.x) * 0.15;
      cursor.current.y += (mouse.current.y - cursor.current.y) * 0.15;

      // 2. Velocity and Direction calculation (for motion blur and tilt)
      const dx = mouse.current.x - cursor.current.x;
      const dy = mouse.current.y - cursor.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (cursorRef.current && glowRef.current) {
        // Dynamic scaling based on speed & hover state
        const scaleX = isHovering.current ? 1.4 : 1 + Math.min(speed * 0.005, 0.2);
        const scaleY = isHovering.current ? 1.4 : 1 - Math.min(speed * 0.002, 0.1);
        
        // Tilt slightly based on movement direction
        const tiltX = Math.max(-15, Math.min(15, dy * -0.5));
        const tiltY = Math.max(-15, Math.min(15, dx * 0.5));

        // Idle pulsing animation trigger via CSS class toggle
        if (isIdle.current) {
          glowRef.current.classList.add("animate-pulse-glow");
        } else {
          glowRef.current.classList.remove("animate-pulse-glow");
        }

        cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scaleX}, ${scaleY})`;
        
        // The glowing backdrop slightly lags behind the main cursor
        glowRef.current.style.transform = `translate3d(${cursor.current.x - 24}px, ${cursor.current.y - 24}px, 0) scale(${isHovering.current ? 1.8 : 1})`;
      }

      // 3. Particle Trail Logic
      let prevX = cursor.current.x;
      let prevY = cursor.current.y;

      trailRefs.current.forEach((dot, index) => {
        if (!dot) return;
        // Each particle follows the previous one
        trailDots.current[index].x += (prevX - trailDots.current[index].x) * 0.35;
        trailDots.current[index].y += (prevY - trailDots.current[index].y) * 0.35;
        
        prevX = trailDots.current[index].x;
        prevY = trailDots.current[index].y;

        // Scale down trails as they go further back
        const trailScale = Math.max(0, 1 - index * 0.12);
        dot.style.transform = `translate3d(${trailDots.current[index].x}px, ${trailDots.current[index].y}px, 0) scale(${trailScale})`;
        dot.style.opacity = speed > 1 || isHovering.current ? 1 - index * 0.1 : 0; // Hide trail when stopped
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      cancelAnimationFrame(requestRef.current);
      clearTimeout(idleTimeout.current);
    };
  }, []);

  // Click Ripple Effect Logic
  const createRipple = (x, y) => {
    const ripple = document.createElement("div");
    ripple.className = "ripple-effect";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  // Don't render anything on mobile
  if (isMobile.current) return null;

  return (
    <>
      {/* Global CSS for the cursor animations and hiding default cursor */}
      <style>{`
        /* Hide Default Cursor globally on devices with mouse */
        @media (pointer: fine) {
          body, * { cursor: none !important; }
        }
        
        /* Click Ripple Animation */
        .ripple-effect {
          position: fixed;
          border: 2px solid #00E5FF;
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%) scale(0.5);
          animation: ripple-anim 0.5s ease-out forwards;
          z-index: 99998;
        }

        @keyframes ripple-anim {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }

        /* Idle Pulse Keyframes */
        @keyframes pulse-glow {
          0%, 100% { filter: blur(20px) brightness(1); }
          50% { filter: blur(24px) brightness(1.5); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite ease-in-out;
        }
      `}</style>

      {/* 1. Trail Particles */}
      <div className="fixed top-0 left-0 z-[99997] pointer-events-none hidden md:block">
        {trailDots.current.map((_, i) => (
          <div
            key={i}
            ref={(el) => (trailRefs.current[i] = el)}
            className="absolute top-0 left-0 w-2 h-2 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#A855F7] opacity-0 transition-opacity duration-300"
            style={{
              boxShadow: "0 0 10px #4F46E5",
              transformOrigin: "center",
            }}
          />
        ))}
      </div>

      {/* 2. Dynamic Glow Background */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none hidden md:block z-[99998] transition-transform duration-300 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.4) 0%, rgba(79, 70, 229, 0.2) 50%, rgba(168, 85, 247, 0) 100%)",
          filter: "blur(20px)",
        }}
      />

      {/* 3. Main Glassmorphic Arrow Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none hidden md:block z-[99999]"
        style={{ transformOrigin: "top left" }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" className="drop-shadow-2xl">
          <defs>
            <linearGradient id="neon-outline" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="50%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
            <linearGradient id="glass-fill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
            </linearGradient>
          </defs>
          <path
            d="M0 0 V17.59 c0 .45 .54 .67 .85 .35 l4.86 -4.86 c.14 -.14 .33 -.22 .53 -.22 h6.22 c.45 0 .67 -.54 .35 -.85 L0 0 z"
            fill="url(#glass-fill)"
            stroke="url(#neon-outline)"
            strokeWidth="1.2"
            strokeLinejoin="round"
            style={{
              backdropFilter: "blur(8px)", 
            }}
          />
        </svg>
      </div>
    </>
  );
}