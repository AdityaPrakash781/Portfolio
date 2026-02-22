import { useEffect, useRef } from "react";

export const CatConstellation: React.FC<{ className?: string }> = ({ className = "" }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Points defining the "Felis" constellation shape
        // Based on the reference image provided
        const points = [
            { x: 0.85, y: 0.4 },  // 0: Nose / Head front
            { x: 0.75, y: 0.3 },  // 1: Head / Ear base
            { x: 0.65, y: 0.4 },  // 2: Neck/Shoulder
            { x: 0.65, y: 0.5 },  // 3: Lower shoulder / chest point
            { x: 0.4, y: 0.5 },   // 4: Middle back
            { x: 0.35, y: 0.6 },  // 5: Lower middle back / hip area
            { x: 0.15, y: 0.75 }, // 6: Tail tip / Flank
            { x: 0.25, y: 0.45 }, // 7: Upper back / spine
            { x: 0.8, y: 0.6 }    // 8: Front paw (separate node if needed, mostly for visual connection)
        ];

        // Connections defining the constellation lines
        const connections = [
            [0, 1], // Head to Ear
            [1, 2], // Ear to Shoulder
            [2, 3], // Shoulder to lower shoulder
            [2, 4], // Shoulder to middle back
            [3, 8], // Lower shoulder to paw
            [4, 5], // Middle back to lower back
            [4, 7], // Middle back to upper back
            [5, 6]  // Lower back to tail tip
        ];

        let animationFrameId: number;

        const draw = () => {
            // Handle Dims & resize
            const parent = canvas.parentElement;
            if (parent) {
                if (canvas.width !== parent.clientWidth || canvas.height !== parent.clientHeight) {
                    canvas.width = parent.clientWidth;
                    canvas.height = parent.clientHeight;
                }
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const time = Date.now() * 0.001;

            // Make it smaller to fit on the right side
            const size = Math.min(canvas.width, canvas.height) * 0.6;
            // Shift towards the right: instead of centering, place it mostly on the right side
            // e.g. at 70% of canvas width or clamped to standard margin
            const leftOffset = canvas.width > 700 ? canvas.width * 0.6 : (canvas.width - size) / 2;
            const offsetX = leftOffset;
            const offsetY = (canvas.height - size) / 2;

            const mappedPoints = points.map((p, i) => {
                // Subtle floating animation for each point
                const floatX = Math.sin(time + i) * 3;
                const floatY = Math.cos(time + i * 1.5) * 3;

                return {
                    x: offsetX + p.x * size + floatX,
                    y: offsetY + p.y * size + floatY,
                    // Twinkle variation per star
                    twinkle: Math.sin(time * 2 + i) * 0.5 + 0.5
                };
            });

            // Draw connecting lines with a subtle, dashed realistic look
            ctx.lineWidth = 1.0;
            ctx.strokeStyle = "rgba(200, 220, 255, 0.15)"; // Very faint
            ctx.setLineDash([4, 6]); // Dashed lines look more like an abstract connection

            // Subtle glow
            ctx.shadowBlur = 2;
            ctx.shadowColor = "rgba(200, 220, 255, 0.2)";

            ctx.beginPath();
            connections.forEach(([i, j]) => {
                const p1 = mappedPoints[i];
                const p2 = mappedPoints[j];
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
            });
            ctx.stroke();
            ctx.setLineDash([]); // Reset dash for the stars

            // Draw "stars" at each point
            mappedPoints.forEach((p) => {
                // Realistic glow effect for constellation stars
                ctx.shadowBlur = 6 + p.twinkle * 6;
                ctx.shadowColor = `rgba(200, 220, 255, ${0.4 + p.twinkle * 0.4})`;

                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5 + p.twinkle * 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${0.6 + p.twinkle * 0.4})`;
                ctx.fill();
            });

            ctx.shadowBlur = 0; // reset

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`pointer-events-none ${className}`}
            style={{ width: '100%', height: '100%' }}
        />
    );
};
