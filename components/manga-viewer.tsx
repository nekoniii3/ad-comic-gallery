'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Manga } from '@/lib/manga-data'
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, BookOpen } from 'lucide-react'

type MangaViewerProps = {
  manga: Manga
}

export function MangaViewer({ manga }: MangaViewerProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [showUI, setShowUI] = useState(true)
  const [uiTimeout, setUiTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)

  const totalPages = manga.pages.length

  const goToPrev = useCallback(() => {
    setCurrentPage((p) => Math.max(0, p - 1))
    setIsZoomed(false)
  }, [])

  const goToNext = useCallback(() => {
    setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
    setIsZoomed(false)
  }, [totalPages])

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

  const page = manga.pages[currentPage]

  return (
    <div
      className="relative w-full h-screen bg-[oklch(0.06_0_0)] overflow-hidden select-none"
      onMouseMove={revealUI}
      onTouchStart={revealUI}
    >
      {/* Page image */}
      <div
        // className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 `}
        // onClick={() => setIsZoomed((z) => !z)}   // 画像クリック時のイベント
      >
        <div
          className={`relative transition-all duration-300 ease-in-out ${
            isZoomed
              ? 'w-full h-full max-w-none overflow-auto'
              : 'max-w-2xl w-full h-full'
          }`}
        >
          <Image
            key={page.src}
            src={page.src}
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
          <a
            href="/"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            aria-label="一覧に戻る"
          >
            <X className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline flex-1">閉じる</span>
          </a>

          <div className="absolute left-1/2 -translate-x-1/2 gap-2">
            {/* <BookOpen className="w-4 h-4 text-muted-foreground" /> */}
            {/* タイトルのリンク */}
            <Link
              href={`${manga.itemPage}`}
              aria-label="商品ページ"
              target="_blank"
            >
              <h1 className="text-sm font-bold text-foreground">{manga.title}</h1>
            </Link>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); setIsZoomed((z) => !z) }}
            className="text-foreground hover:text-primary transition-colors p-1 ml-auto"
            aria-label={isZoomed ? 'ズームアウト' : 'ズームイン'}
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
        </div>
      </div>


      {/* Bottom bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-300 ${showUI ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
      >
        <div className="flex flex-col gap-3 px-4 py-4 bg-gradient-to-t from-black/80 to-transparent">

          {/* Page info label */}
          <div
            className={`flex justify-center pointer-events-none transition-all duration-300 ${showUI ? 'opacity-100' : 'opacity-0'}`}
          >
            <p className="text-xs text-white/70 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full max-w-xs sm:max-w-sm text-center leading-relaxed">
              {page.alt}
            </p>
          </div>

          {/* Page thumbnails */}
          <div className="flex justify-center gap-2 overflow-x-auto pb-1">
            {manga.pages.map((p, i) => (
              <button
                key={p.id}
                onClick={(e) => { e.stopPropagation(); setCurrentPage(i); setIsZoomed(false) }}
                className={`relative flex-shrink-0 w-10 h-14 rounded overflow-hidden border-2 transition-all ${
                  i === currentPage ? 'border-primary scale-110' : 'border-border opacity-60 hover:opacity-100'
                }`}
                aria-label={`${i + 1}ページ目`}
              >
                <Image
                  src={p.src}
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
