'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Manga } from '@/lib/manga-data'
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, BookOpen } from 'lucide-react'
import { partsColor } from "@/components/template/FloatingParticles";
import Link from 'next/link'

type MangaViewerProps = {
  manga: Manga
}

export function MangaViewer({ manga }: MangaViewerProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [displayPage, setDisplayPage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [showUI, setShowUI] = useState(true)
  const [uiTimeout, setUiTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)
  const touchStartX = useRef<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const totalPages = manga.imageData.length

  // Preload adjacent images
  useEffect(() => {
    const preload = (index: number) => {
      if (index >= 0 && index < totalPages) {
        const img = new window.Image()
        img.src = manga.imageData[index].imgPath
      }
    }
    preload(currentPage - 1)
    preload(currentPage + 1)
    preload(currentPage + 2)
  }, [currentPage, manga.imageData, totalPages])

  // Delayed display update for smooth crossfade
  useEffect(() => {
    if (currentPage !== displayPage) {
      setIsTransitioning(true)
      const timer = setTimeout(() => {
        setDisplayPage(currentPage)
        setIsTransitioning(false)
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [currentPage, displayPage])

  const goToPrev = useCallback(() => {
    if (isTransitioning) return
    setCurrentPage((p) => Math.max(0, p - 1))
    setIsZoomed(false)
  }, [isTransitioning])

  const goToNext = useCallback(() => {
    if (isTransitioning) return
    setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
    setIsZoomed(false)
  }, [totalPages, isTransitioning])

  const jumpToPage = useCallback((index: number) => {
    if (isTransitioning) return
    setCurrentPage(index)
    setIsZoomed(false)
  }, [isTransitioning])

  const revealUI = useCallback(() => {
    setShowUI(true)
    if (uiTimeout) clearTimeout(uiTimeout)
    const t = setTimeout(() => setShowUI(false), 3000)
    setUiTimeout(t)
  }, [uiTimeout])

  useEffect(() => {
    const t = setTimeout(() => setShowUI(false), 3000)
    setUiTimeout(t)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goToPrev()
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goToNext()
      if (e.key === 'Escape') window.location.href = '/'
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goToPrev, goToNext])

  const SWIPE_THRESHOLD = 50

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    revealUI()
  }, [revealUI])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) >= SWIPE_THRESHOLD) {
      if (diff > 0) goToNext()
      else goToPrev()
    }
    touchStartX.current = null
  }, [goToNext, goToPrev])

  const page = manga.imageData[displayPage]

  return (
    <div
      className="relative w-full h-screen bg-[oklch(0.06_0_0)] overflow-hidden select-none"
      onMouseMove={revealUI}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Page image with crossfade */}
      <div
        // className={`absolute inset-0 flex items-center justify-center ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        className={`absolute inset-0 flex items-center justify-center `}
        // onClick={() => setIsZoomed((z) => !z)}
      >
        <div
          className={`relative transition-opacity duration-500 ease-out ${
            isZoomed ? 'w-full h-full max-w-none overflow-auto' : 'max-w-2xl w-full h-full'
          } ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        >
          <Image
            src={page.imgPath}
            alt={page.alt}
            fill={!isZoomed}
            width={isZoomed ? 1200 : undefined}
            height={isZoomed ? 1800 : undefined}
            className={`${isZoomed ? 'w-full h-auto object-contain' : 'object-contain'}`}
            priority
            draggable={false}
          />
        </div>
      </div>

      {/* Page info label */}
      <div
        className={`absolute top-14 left-0 right-0 z-20 flex justify-center pointer-events-none transition-all duration-300 ${showUI ? 'opacity-100' : 'opacity-0'}`}
      >
        <p className="text-xs text-white/70 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full max-w-xs sm:max-w-sm text-center leading-relaxed">
          {page.alt}
        </p>
      </div>

      {/* Left arrow tap zone */}
      <button
        className="absolute left-0 top-0 w-1/3 h-full z-10 flex items-center justify-start pl-4"
        onClick={(e) => { e.stopPropagation(); goToPrev() }}
        aria-label="前のページ"
        disabled={currentPage === 0}
      >
        <div
          className={`transition-all duration-300 ${showUI && currentPage > 0 ? 'opacity-100' : 'opacity-0'} bg-background/60 backdrop-blur-sm rounded-full p-2 border border-border`}
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </div>
      </button>

      {/* Right arrow tap zone */}
      <button
        className="absolute right-0 top-0 w-1/3 h-full z-10 flex items-center justify-end pr-4"
        onClick={(e) => { e.stopPropagation(); goToNext() }}
        aria-label="次のページ"
        disabled={currentPage === totalPages - 1}
      >
        <div
          className={`transition-all duration-300 ${showUI && currentPage < totalPages - 1 ? 'opacity-100' : 'opacity-0'} bg-background/60 backdrop-blur-sm rounded-full p-2 border border-border`}
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </div>
      </button>

      {/* Top bar */}
      <div
        className={`absolute top-0 left-0 right-0 z-20 transition-all duration-300 ${showUI ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}
      >
        <div className="flex items-center px-4 py-3 bg-gradient-to-b from-black/80 to-transparent">
        {/* <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent"> */}
          <div className="absolute left-1/2 -translate-x-1/2 gap-2 max-md:mt-2">
            {/* <BookOpen className="w-4 h-4 text-muted-foreground" /> */}
            {/* タイトルのリンク */}
            {manga.itemPage === "" ? <h1 className="text-sm md:text-base font-bold text-foreground">{manga.title}</h1>
            : <Link
              href={`${manga.itemPage}`}
              aria-label="商品ページ"
              target="_blank"
            >
              <h1 className="text-sm md:text-base font-bold text-foreground">{manga.title}</h1>
            </Link>}
          </div>
          <a
            href="/"
            className="ml-auto gap-2 text-foreground hover:text-primary transition-colors"
            aria-label="一覧に戻る"
          >
            <X className="w-7 h-7" />
            {/* <span className="text-sm font-medium hidden sm:inline flex-1">閉じる</span> */}
          </a>
          {/* <button
            onClick={(e) => { e.stopPropagation(); setIsZoomed((z) => !z) }}
            className="text-foreground hover:text-primary transition-colors p-1 ml-auto max-md:hidden"
            aria-label={isZoomed ? 'ズームアウト' : 'ズームイン'}
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button> */}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-300 ${showUI ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
      >
        <div className="flex flex-col gap-3 px-4 py-4 bg-gradient-to-t from-black/80 to-transparent">
          {/* Page info label */}
          {page.alt != "" && <div
            className={`flex justify-center pointer-events-none transition-all duration-300 ${showUI ? 'opacity-100' : 'opacity-0'}`}
          >
            <p className="text-xs text-white/70 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full max-w-xs sm:max-w-sm text-center leading-relaxed">
              {page.alt}
            </p>
          </div>}

          {/* Page thumbnails */}
          <div className="flex justify-center gap-2 overflow-x-auto pb-1">
            {manga.imageData.map((p, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); jumpToPage(i) }}
                className={`relative flex-shrink-0 w-10 h-14 rounded overflow-hidden border-2 transition-all ${
                  i === currentPage ? 'border-primary scale-110' : 'border-border opacity-60 hover:opacity-100'
                }`}
                aria-label={`${i + 1}ページ目`}
              >
                <Image
                  src={p.imgPath}
                  alt={p.alt}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </button>
            ))}
          </div>

          {/* Page counter */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev() }}
              disabled={currentPage === 0}
              className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors p-1"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-foreground font-mono">
              <span className="text-primary font-bold">{currentPage + 1}</span>
              <span className="text-muted-foreground"> / {totalPages}</span>
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); goToNext() }}
              disabled={currentPage === totalPages - 1}
              className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors p-1"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
