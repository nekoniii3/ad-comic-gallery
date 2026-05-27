"use client";

import { useEffect, useRef } from "react";

export default function Natural() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#f8f5ef] text-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply blur-2xl"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply blur-2xl"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply blur-2xl"></div>
      </div>
    </div>
  )
}