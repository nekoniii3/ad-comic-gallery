"use client";

import { useEffect, useRef } from "react";

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Particle = {
      x: number; y: number; r: number;
      vx: number; vy: number; alpha: number; color: string;
    };

    const colors = ["#c9a27e", "#e8d5b7", "#b07d5a", "#f5ece0", "#d4a574"];
    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.2,
      alpha: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "linear-gradient(135deg, #fdf6ec 0%, #f0e0c8 50%, #e8d0b0 100%)" }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#9a7355" }}>New Collection</p>
        <h2 className="text-5xl font-light mb-6 leading-tight text-balance" style={{ color: "#3d2b1f" }}>
          Floating<br />Particles
        </h2>
        <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#7a5c45" }}>
          柔らかな粒子が漂うナチュラルな背景
        </p>
        <button
          className="mt-8 px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-70"
          style={{ border: "1px solid #9a7355", color: "#9a7355", background: "transparent" }}
        >
          Shop Now
        </button>
      </div> */}
    </div>
  );
}
