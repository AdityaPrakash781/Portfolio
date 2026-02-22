import { useEffect, useRef } from "react";

export const TaurusConstellation: React.FC<{ className?: string }> = ({ className = "" }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Points defining the "Taurus" constellation shape
        const points = [
            { x: 0.15, y: 0.25 }, // 0: Upper horn tip
            { x: 0.40, y: 0.38 }, // 1: Upper horn mid
            { x: 0.52, y: 0.50 }, // 2: Upper face junction
            { x: 0.08, y: 0.40 }, // 3: Lower horn tip
            { x: 0.48, y: 0.53 }, // 4: Lower horn mid (Aldebaran)
            { x: 0.55, y: 0.55 }, // 5: Lower face junction
            { x: 0.65, y: 0.62 }, // 6: Body junction
            { x: 0.55, y: 0.70 }, // 7: Front leg mid
            { x: 0.62, y: 0.78 }, // 8: Front leg tip
            { x: 0.85, y: 0.58 }, // 9: Back mid
            { x: 0.88, y: 0.65 }, // 10: Back lower
            { x: 0.92, y: 0.70 }  // 11: Back tip
        ];

        // Connections defining the constellation lines
        const connections = [
            [0, 1], [1, 2], // Upper horn
            [3, 4], [4, 5], // Lower horn
            [2, 5], // V face
            [5, 6], // Body connect
            [6, 7], [7, 8], // Front leg
            [6, 9], [9, 10], [10, 11] // Back leg
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

            // Make it slightly smaller to fit
            const size = Math.min(canvas.width, canvas.height) * 0.7;
            // Shift towards the left
            const leftOffset = canvas.width > 700 ? canvas.width * 0.1 : (canvas.width - size) / 2;
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
            ctx.setLineDash([4, 6]);

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
            mappedPoints.forEach((p, index) => {
                // Make Aldebaran (index 4) slightly redder/brighter
                const isAldebaran = index === 4;

                // Realistic glow effect for stars
                ctx.shadowBlur = isAldebaran ? 10 + p.twinkle * 6 : 6 + p.twinkle * 6;
                ctx.shadowColor = isAldebaran
                    ? `rgba(255, 180, 150, ${0.5 + p.twinkle * 0.3})`
                    : `rgba(200, 220, 255, ${0.3 + p.twinkle * 0.3})`;

                ctx.beginPath();
                ctx.arc(p.x, p.y, (isAldebaran ? 2.2 : 1.5) + p.twinkle * 1.5, 0, Math.PI * 2);
                ctx.fillStyle = isAldebaran
                    ? `rgba(255, 220, 200, ${0.7 + p.twinkle * 0.2})`
                    : `rgba(255, 255, 255, ${0.5 + p.twinkle * 0.4})`;
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
