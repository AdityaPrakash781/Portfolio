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
        }[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            stars = [];
            // High density for realistic starfield
            const numStars = Math.floor((canvas.width * canvas.height) / 1500);
            for (let i = 0; i < numStars; i++) {
                const size = Math.random();
                // Most stars are tiny, few are larger
                const radius = size < 0.9 ? Math.random() * 0.6 + 0.15 :
                    size < 0.97 ? Math.random() * 1.2 + 0.6 :
                        Math.random() * 2.5 + 1;

                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: radius,
                    baseAlpha: Math.random() * 0.5 + 0.5, // Brighter base
                    twinkleSpeed: Math.random() * 0.03 + 0.01,
                    twinklePhase: Math.random() * Math.PI * 2,
                    speed: Math.random() * 0.03 + 0.005, // Slower movement
                });
            }
        };

        const drawStars = () => {
            // Pure black background
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const time = Date.now() * 0.001;

            stars.forEach((star) => {
                // Subtle twinkle
                const twinkle = Math.sin(time * 3 + star.twinklePhase);
                const alphaMod = 0.7 + 0.3 * twinkle;
                const currentAlpha = star.baseAlpha * alphaMod;

                // Pure white stars
                ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;

                // Add crisp glow for larger stars with cross-hatch sparkle
                if (star.radius > 1.5) {
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = `rgba(255, 255, 255, ${currentAlpha * 0.6})`;
                } else if (star.radius > 0.8) {
                    ctx.shadowBlur = 3;
                    ctx.shadowColor = `rgba(255, 255, 255, ${currentAlpha * 0.4})`;
                } else {
                    ctx.shadowBlur = 0;
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
            style={{ background: "#000000" }}
        />
    );
};
