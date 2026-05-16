"use client";

export default function AuroraBackground() {
  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: "#0a0a12" }}
    >
      {/* Aurora layers */}
      <div
        className="absolute"
        style={{
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          background: "radial-gradient(ellipse 80% 50% at 30% 40%, rgba(100,60,180,0.35) 0%, transparent 60%)",
          animation: "aurora1 12s ease-in-out infinite alternate",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          background: "radial-gradient(ellipse 70% 45% at 70% 60%, rgba(180,80,120,0.3) 0%, transparent 60%)",
          animation: "aurora2 15s ease-in-out infinite alternate",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          background: "radial-gradient(ellipse 60% 40% at 55% 30%, rgba(60,140,200,0.25) 0%, transparent 55%)",
          animation: "aurora3 18s ease-in-out infinite alternate",
          filter: "blur(45px)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          background: "radial-gradient(ellipse 90% 35% at 20% 70%, rgba(200,150,50,0.2) 0%, transparent 55%)",
          animation: "aurora4 20s ease-in-out infinite alternate",
          filter: "blur(60px)",
        }}
      />

      {/* Starfield */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
          opacity: 0.2,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "60px 73px",
          backgroundPosition: "30px 20px",
          opacity: 0.12,
        }}
      />

      <style>{`
        @keyframes aurora1 {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(8%, 5%) scale(1.1); }
          100% { transform: translate(-5%, -8%) scale(0.95); }
        }
        @keyframes aurora2 {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(-10%, -5%) scale(1.15); }
          100% { transform: translate(6%, 10%) scale(0.9); }
        }
        @keyframes aurora3 {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(5%, -10%) scale(1.08); }
          100% { transform: translate(-8%, 6%) scale(1.05); }
        }
        @keyframes aurora4 {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(-6%, 8%) scale(1.12); }
          100% { transform: translate(10%, -5%) scale(0.92); }
        }
      `}</style>

      {/* <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#a88ccc" }}>
          Limited Edition
        </p>
        <h2 className="text-5xl font-light mb-6 leading-tight text-balance" style={{ color: "#f0e8ff" }}>
          Aurora<br />Glow
        </h2>
        <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#c8b8e8" }}>
          オーロラが輝く幻想的なプレミアム背景
        </p>
        <button
          className="mt-8 px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-70"
          style={{ border: "1px solid #a88ccc", color: "#a88ccc", background: "transparent" }}
        >
          Shop Now
        </button>
      </div> */}
    </div>
  );
}
