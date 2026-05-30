"use client"

import { MinimalGrid, partsColorMinimalGrid } from "@/components/template/MinimalGrid"

export interface PartsColor {
    bgSelected: string
    borderCard: string
    shadowCard: string
    bgCard: string
    bgButton: string
    bgTag: string
    title: string
}

export const partsColor: PartsColor = {
  bgSelected: partsColorMinimalGrid.bgSelected,
  borderCard: partsColorMinimalGrid.borderCard,
  shadowCard: partsColorMinimalGrid.shadowCard,
  bgCard: partsColorMinimalGrid.bgCard,
  bgButton: partsColorMinimalGrid.bgButton,
  bgTag: partsColorMinimalGrid.bgTag,
  title: partsColorMinimalGrid.title
};

export function Template() {
  return (
    <MinimalGrid/>
  )
}
