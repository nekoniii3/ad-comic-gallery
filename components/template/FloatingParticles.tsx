"use client";

import { useEffect, useRef } from "react";
export interface PartsColor {
    bgSelected: string
    borderCard: string
    shadowCard: string
}
export const partsColor: PartsColor = {
  bgSelected: "bg-amber-800",
  borderCard: "border-yellow-700",
  shadowCard: "hover:shadow-[0_0_30px_oklch(0.80_0.18_86_/_0.4)]"
};

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: "linear-gradient(135deg, #fdf6ec 0%, #f0e0c8 50%, #e8d0b0 100%)" }}>
      {/* <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" /> */}
    </div>
  );
}
