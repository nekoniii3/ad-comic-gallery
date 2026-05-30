"use client"

import { PartsColor } from "@/components/template/Template"

export const partsColorMinimalGrid: PartsColor = {
  bgSelected: "bg-blue-400",
  borderCard: "border-sky-700",
  shadowCard: "hover:shadow-[0_0_30px_oklch(0.82_0.11_230_/_0.4)]",
  // bgCard: "bg-lime-50",
  // bgTag: "bg-emerald-400",
  // title: "text-lime-500",
  bgButton: "bg-sky-500",
  bgCard: "bg-slate-50",
  bgTag: "bg-sky-400",
  title: "text-blue-500",
};


export function MinimalGrid() {
  return (
    // <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
  // <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(90%_90%_at_50%_50%,rgba(254,215,170,1)_5px,transparent_5px)] bg-[size:60px_60px]"></div>
  <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(90%_90%_at_50%_50%,rgba(147,197,253,1)_2px,transparent_2px)] bg-[size:25px_25px]"></div>
  )
}
