'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MangaCard } from '@/components/manga-card'
import type { Manga } from '@/lib/manga-data'
import WarmBeige, { partsColor } from "@/components/backgrounds/WarmBeige"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 12

const colorTagSelected = partsColor.tagSelected

console.log(colorTagSelected)

type GenreFilterProps = {
  mangaList: Manga[]
  tagList: string[]
}

export function GenreFilter({ mangaList, tagList }: GenreFilterProps) {
  const [activeGenre, setActiveGenre] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  console.log(tagList)

  // const allGenres = useMemo(() => {
  //   const genreSet = new Set<string>()
  //   mangaList.forEach((manga) => manga.tag.forEach((g) => genreSet.add(g)))
  //   return Array.from(genreSet).sort()
  // }, [mangaList])

  const filtered = useMemo(
    () =>
      activeGenre
        ? mangaList.filter((manga) => manga.tag.includes(activeGenre))
        : mangaList,
    [mangaList, activeGenre],
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, currentPage])

  function handleGenreChange(genre: string | null) {
    setActiveGenre(genre)
    setCurrentPage(1)
  }

  function handlePage(page: number) {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pageNumbers = useMemo(() => {
    if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages: (number | '...')[] = [1]
    if (currentPage > 3) pages.push('...')
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    if (currentPage < totalPages - 2) pages.push('...')
    pages.push(totalPages)
    return pages
  }, [totalPages, currentPage])

  return (
    <section className="px-4 pb-16 z-1000">
      <div className="max-w-6xl mx-auto">
        {/* Genre tags */}
        <div className="flex flex-wrap gap-2 mb-7" role="group" aria-label="ジャンルで絞り込む">
          <button
            onClick={() => handleGenreChange(null)}
            className={cn(`text-xs px-3 py-1.5 rounded-full border transition-colors duration-150 font-medium`
              , activeGenre === null 
              ? colorTagSelected : "bg-white text-black hover:border-primary hover:text-foreground")}
            aria-pressed={activeGenre === null}
          >
            すべて
          </button>
          {tagList.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreChange(activeGenre === genre ? null : genre)}
              className={cn(`text-xs px-3 py-1.5 rounded-full border transition-colors duration-150 font-medium`
              , activeGenre === genre 
              ? colorTagSelected : "bg-white text-black hover:border-primary hover:text-foreground")}
              //   activeGenre === genre
              //     ? 'bg-primary text-primary-foreground border-primary'
              //     : 'bg-white text-black border-border hover:text-foreground'
              // }`}
              aria-pressed={activeGenre === genre}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
            {paginated.map((manga) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-20 text-sm">
            該当する作品はありません
          </p>
        )}
        <div className="flex items-center justify-end my-5">
          <span className="text-muted-foreground text-sm">
            {/* {filtered.length} / {mangaList.length} 作品 */}
            全 {filtered.length} 作品
          </span>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            className="flex items-center justify-center gap-1 mt-10"
            aria-label="ページ切り替え"
          >
            <button
              onClick={() => handlePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-foreground disabled:opacity-30 cursor-pointer disabled:cursor-default transition-colors duration-150"
              aria-label="前のページ"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {pageNumbers.map((p, i) =>
              p === '...' ? (
                <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-muted-foreground text-sm select-none">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => handlePage(p)}
                  aria-current={p === currentPage ? 'page' : undefined}
                  className={`w-9 h-9 rounded-lg border text-sm font-medium transition-colors duration-150 ${
                    p === currentPage
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-black text-muted-foreground hover:border-primary hover:text-foreground cursor-pointer'
                  }`}
                >
                  {p}
                </button>
              ),
            )}

            <button
              onClick={() => handlePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-foreground disabled:opacity-30 cursor-pointer disabled:cursor-default transition-colors duration-150"
              aria-label="次のページ"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>
        )}

        {/* Page indicator */}
        {totalPages > 1 && (
          <p className="text-center text-muted-foreground text-xs mt-3">
            {currentPage} / {totalPages} ページ
          </p>
        )}
      </div>
    </section>
  )
}
