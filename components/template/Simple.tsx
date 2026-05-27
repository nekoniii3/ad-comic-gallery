"use client"

export interface PartsColor {
    bgSelected: string
    borderCard: string
    shadowCard: string
    bgCard: string
}
export const partsColor: PartsColor = {
  bgSelected: "bg-amber-800",
  borderCard: "border-yellow-700",
  shadowCard: "hover:shadow-[0_0_30px_oklch(0.80_0.18_86_/_0.4)]",
  bgCard: "bg-amber-50",
};

export default function Simple() {
  return (
  // <div className="fixed inset-0 -z-10 bg-white bg-gradient-to-tr from-[#fbfbfa] via-[#f5f5f0] to-[#eaeae1]">
  <div className="fixed inset-0 -z-10 h-full w-full bg-gradient-to-tr from-[#fdfcf7] via-[#faf7ec] to-[#f5f0db]">
    {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/80"></div> */}
  </div>

  )
}
