import { useEffect, useRef } from "react";

// The futuristic primary color requested: violet/purple (#9a8cff)
const PRIMARY_COLOR = { r: 154, g: 140, b: 255 };

// The soft purplish-white for triangular faces: #c6b8ff
const FACE_COLOR = { r: 198, g: 184, b: 255 };

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  z: number; // For depth/parallax
  isFillable: boolean; // Determines if this node helps form a solid face
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false }); // Better performance if we draw our own background
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Config for dense, geometric mesh
    const CONNECTION_DISTANCE = 150; // Slightly tighter connections
    const PARTICLE_COUNT = 150; // Reduced density target
    const SPEED_FACTOR = 0.3; // Slower, minimal drift

    // Handle Resize
    const resizeCanvas = () => {
      // Use parent container dimensions
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        initParticles();
      }
    };

    const initParticles = () => {
      particles = [];
      const { width, height } = canvas;

      // Calculate realistic particle count based on screen area to maintain consistent density
      const area = width * height;
      const adaptiveCount = Math.min(PARTICLE_COUNT, Math.floor(area / 6000)); // Lower density limits

      for (let i = 0; i < adaptiveCount; i++) {
        // Bias clustering towards the upper right quadrant
        // Math.pow(..., 0.8) skews slightly towards 1 (right)
        // Math.pow(..., 1.1) skews slightly towards 0 (top)
        const biasX = Math.pow(Math.random(), 0.8);
        const biasY = Math.pow(Math.random(), 1.1);

        const z = Math.random() * 0.8 + 0.2; // Depth layer from 0.2 to 1.0

        particles.push({
          x: biasX * width,
          y: biasY * height,
          vx: (Math.random() - 0.5) * SPEED_FACTOR * z, // Parallax: closer (bigger z) moves faster
          vy: (Math.random() - 0.5) * SPEED_FACTOR * z,
          size: (Math.random() * 2 + 1.5) * z, // Parallax: closer is larger
          z: z,
          isFillable: Math.random() > 0.15, // 85% of nodes can form solid faces, resulting in more filled triangles
        });
      }
    };

    // Track mouse for interactivity
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouse = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      const { width, height } = canvas;

      // Draw pure black/dark navy background
      ctx.fillStyle = "#0a0a0c"; // Very dark navy/black
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p, index) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges smoothly
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Repel from mouse slightly
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) {
          const force = (150 - distMouse) / 150;
          p.x -= (dxMouse / distMouse) * force * p.z * 2;
          p.y -= (dyMouse / distMouse) * force * p.z * 2;
        }

        // Keep inside bounds after interaction
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        // Soft bloom/glow base
        const alpha = Math.min(p.z * 0.9, 1.0);
        ctx.fillStyle = `rgba(${PRIMARY_COLOR.r}, ${PRIMARY_COLOR.g}, ${PRIMARY_COLOR.b}, ${alpha})`;

        // Pronounced bloom
        ctx.shadowBlur = 15 * p.z;
        ctx.shadowColor = `rgba(${PRIMARY_COLOR.r}, ${PRIMARY_COLOR.g}, ${PRIMARY_COLOR.b}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      // Optimization: Fast adjacency matrix instead of string hashing
      const len = particles.length;
      const isConnected = new Uint8Array(len * len);
      
      ctx.lineWidth = 1.0;

      // Pass 1: Draw Lines and build adjacency matrix
      for (let i = 0; i < len; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
            isConnected[i * len + j] = 1;
            isConnected[j * len + i] = 1;

            const dist = Math.sqrt(distSq);
            const opacity = 1 - dist / CONNECTION_DISTANCE;
            const zAvg = (p1.z + p2.z) / 2;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Render line without shadowBloom to save massive rasterization cost per frame
            ctx.strokeStyle = `rgba(${PRIMARY_COLOR.r}, ${PRIMARY_COLOR.g}, ${PRIMARY_COLOR.b}, ${opacity * 0.4 * zAvg})`;
            ctx.stroke();
          }
        }
      }

      // Pass 2: Draw Faces (O(N^3) deeply pruned by O(1) matrix lookup)
      for (let i = 0; i < len; i++) {
        const p1 = particles[i];
        if (!p1.isFillable) continue;

        for (let j = i + 1; j < len; j++) {
          if (isConnected[i * len + j] === 0) continue;
          const p2 = particles[j];
          if (!p2.isFillable) continue;

          for (let k = j + 1; k < len; k++) {
            // Instant integer check instead of Set string allocation
            if (isConnected[i * len + k] === 1 && isConnected[j * len + k] === 1) {
              const p3 = particles[k];
              if (!p3.isFillable) continue;

              const dx1 = p1.x - p2.x;
              const dy1 = p1.y - p2.y;
              const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
              
              const dx2 = p2.x - p3.x;
              const dy2 = p2.y - p3.y;
              const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
              
              const dx3 = p3.x - p1.x;
              const dy3 = p3.y - p1.y;
              const dist3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);

              const avgDist = (dist1 + dist2 + dist3) / 3;
              const faceOpacity = (1 - avgDist / CONNECTION_DISTANCE) * 0.35; // Increased max opacity to balance density drop

              if (faceOpacity > 0) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.lineTo(p3.x, p3.y);
                ctx.closePath();

                ctx.fillStyle = `rgba(${FACE_COLOR.r}, ${FACE_COLOR.g}, ${FACE_COLOR.b}, ${faceOpacity})`;
                ctx.fill();
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Initialization
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    draw();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-y-0 right-0 w-full md:w-2/3 lg:w-1/2 z-0 pointer-events-auto opacity-70"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 30%, black 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%, black 100%)",
      }}
    />
  );
}
