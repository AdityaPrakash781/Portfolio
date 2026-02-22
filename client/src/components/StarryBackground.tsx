import { useEffect, useRef } from "react";

export const StarryBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: {
            x: number;
            y: number;
            radius: number;
            baseAlpha: number;
            twinkleSpeed: number;
            twinklePhase: number;
            speed: number;
            color: string;
        }[] = [];

        let shootingStars: {
            x: number;
            y: number;
            len: number;
            speed: number;
            vx: number;
            vy: number;
            opacity: number;
            fadingIn: boolean;
            thickness: number;
        }[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            stars = [];
            shootingStars = [];
            // High density for realistic starfield
            const numStars = Math.floor((canvas.width * canvas.height) / 1500);
            // Star colors based on actual spectral types (O, B, A, F, G, K, M)
            // Mostly white/blue-white, some yellow, rare red/orange
            const getStarColor = () => {
                const rand = Math.random();
                if (rand < 0.1) return "200, 220, 255"; // Light blue (B type)
                if (rand < 0.4) return "255, 255, 255"; // White (A/F type)
                if (rand < 0.7) return "255, 245, 230"; // Yellow-white (G type)
                if (rand < 0.9) return "255, 220, 180"; // Light orange (K type)
                return "255, 200, 150";                 // Red-orange (M type)
            };

            for (let i = 0; i < numStars; i++) {
                const size = Math.random();
                // Most stars are tiny, few are larger
                const radius = size < 0.9 ? Math.random() * 0.6 + 0.15 :
                    size < 0.97 ? Math.random() * 1.2 + 0.6 :
                        Math.random() * 2.0 + 0.8;

                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: radius,
                    baseAlpha: Math.random() * 0.5 + 0.2, // Slightly dimmer base for realism
                    twinkleSpeed: Math.random() * 0.02 + 0.005,
                    twinklePhase: Math.random() * Math.PI * 2,
                    speed: Math.random() * 0.02 + 0.002, // Slower movement
                    color: getStarColor(),
                });
            }
        };

        const drawStars = () => {
            // Dreamy, ethereal night sky gradient
            const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            bgGradient.addColorStop(0, "#01010b");   // Deep space black-blue
            bgGradient.addColorStop(0.3, "#040316"); // Deep midnight violet
            bgGradient.addColorStop(0.7, "#080629"); // Dreamy dark purple-blue
            bgGradient.addColorStop(1, "#110b36");   // Soft, dark twilight purple/blue near the bottom

            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const time = Date.now() * 0.001;

            stars.forEach((star) => {
                // Atmospheric twinkle (scintillation)
                // Combine multiple frequencies for a more erratic, realistic twinkle
                const twinkle1 = Math.sin(time * star.twinkleSpeed * 100 + star.twinklePhase);
                const twinkle2 = Math.cos(time * star.twinkleSpeed * 43 + star.twinklePhase * 2);
                const twinkle = (twinkle1 + twinkle2) * 0.5;

                // Real stars can sometimes almost disappear when they twinkle
                const alphaMod = 0.6 + 0.4 * twinkle;
                const currentAlpha = Math.max(0.1, Math.min(1, star.baseAlpha * alphaMod));

                // Pure white stars (softened slightly)
                ctx.fillStyle = `rgba(${star.color}, ${currentAlpha * 0.9})`;

                // Add softer, wider glow for larger dreamy stars
                if (star.radius > 1.2) {
                    ctx.shadowBlur = 12;
                    ctx.shadowColor = `rgba(${star.color}, ${currentAlpha})`;
                } else if (star.radius > 0.6) {
                    ctx.shadowBlur = 6;
                    ctx.shadowColor = `rgba(${star.color}, ${currentAlpha * 0.6})`;
                } else {
                    ctx.shadowBlur = 2; // Even tiny stars get a faint dreamy glow
                    ctx.shadowColor = `rgba(${star.color}, ${currentAlpha * 0.3})`;
                }

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();

                // Gentle drift
                star.y -= star.speed;
                if (star.y < -10) {
                    star.y = canvas.height + 10;
                    star.x = Math.random() * canvas.width;
                }
            });

            // Randomly create shooting stars
            if (Math.random() < 0.005) { // 0.5% chance per frame
                const startX = Math.random() * canvas.width * 1.5;
                const startY = Math.random() * canvas.height * 0.3; // mostly higher up
                const angle = Math.PI / 4 + Math.random() * 0.15; // approx 45 degrees
                const speed = Math.random() * 15 + 15; // much faster
                shootingStars.push({
                    x: startX,
                    y: startY,
                    len: Math.random() * 150 + 100, // longer trails
                    speed: speed,
                    vx: -Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    opacity: 0, // start invisible
                    fadingIn: true,
                    thickness: Math.random() * 1.2 + 0.3
                });
            }

            // Draw and update shooting stars
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const ss = shootingStars[i];

                // Opacity logic for fade in/out
                if (ss.fadingIn) {
                    ss.opacity += 0.08; // fade in quickly
                    if (ss.opacity >= 1) {
                        ss.opacity = 1;
                        ss.fadingIn = false;
                    }
                } else {
                    ss.opacity -= 0.015; // fade out slowly
                }

                if (ss.opacity <= 0 || ss.x < -ss.len || ss.y > canvas.height + ss.len) {
                    shootingStars.splice(i, 1);
                    continue;
                }

                ctx.shadowBlur = ss.thickness * 6;
                ctx.shadowColor = `rgba(200, 220, 255, ${ss.opacity * 0.8})`;

                const tailX = ss.x - ss.vx * (ss.len / ss.speed);
                const tailY = ss.y - ss.vy * (ss.len / ss.speed);

                const gradient = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
                // Silvery-blue tint to the meteor trail
                gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
                gradient.addColorStop(0.1, `rgba(200, 220, 255, ${ss.opacity * 0.8})`);
                gradient.addColorStop(1, `rgba(150, 180, 255, 0)`);

                ctx.beginPath();
                ctx.moveTo(ss.x, ss.y);
                ctx.lineTo(tailX, tailY);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = ss.thickness;
                ctx.lineCap = "round";
                ctx.stroke();

                // Bright glowing head
                ctx.beginPath();
                ctx.arc(ss.x, ss.y, ss.thickness * 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${ss.opacity})`;
                ctx.fill();

                ctx.shadowBlur = 0; // reset shadow

                // Update position
                ss.x += ss.vx;
                ss.y += ss.vy;
            }

            animationFrameId = requestAnimationFrame(drawStars);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        drawStars();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
        // Let the canvas drawing handle the background completely
        />
    );
};
