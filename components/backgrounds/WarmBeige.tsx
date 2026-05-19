"use client";

import { useEffect, useRef } from "react";

const bgStyle = {
      backgroundColor: "#fdf7f0",
      backgroundImage:
        "repeating-linear-gradient(45deg, rgba(210,185,155,.13) 0px, rgba(210,185,155,.13) 1px, transparent 1px, transparent 14px), repeating-linear-gradient(-45deg, rgba(210,185,155,.13) 0px, rgba(210,185,155,.13) 1px, transparent 1px, transparent 14px)",
    }

export interface PartsColor {
    tagSelected:string
}

export const partsColor: PartsColor = {
  tagSelected: "bg-amber-800",
};

export default function WarmBeige() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full"
      style={{ backgroundColor: "#fdf7f0"
      , backgroundImage: "repeating-linear-gradient(45deg, rgba(210,185,155,.13) 0px, rgba(210,185,155,.13) 1px, transparent 1px, transparent 14px), repeating-linear-gradient(-45deg, rgba(210,185,155,.13) 0px, rgba(210,185,155,.13) 1px, transparent 1px, transparent 14px)"
      , borderRadius: "var(--border-radius-lg)", padding: "2.5rem 2rem 2rem", overflow: "hidden", border: "0.5px solid var(--color-border-tertiary)", minHeight: "360px" }}>
    </div>
  )
}