'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MangaCard } from '@/components/manga-card'
import type { Manga } from '@/lib/manga-data'

const PAGE_SIZE = 12

type GenreFilterProps = {
  mangaList: Manga[]
}

export function GenreFilter({ mangaList }: GenreFilterProps) {
  const [activeGenre, setActiveGenre] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const allGenres = useMemo(() => {
    const genreSet = new Set<string>()
    mangaList.forEach((manga) => manga.tag.forEach((g) => genreSet.add(g)))
    return Array.from(genreSet).sort()
  }, [mangaList])

  const filtered = useMemo(
    () =>
      activeGenre
        ? mangaList.filter((manga) => manga.tag.includes(activeGenre))
        : mangaList,
    [mangaList, activeGenre],
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))

  console.log(totalPages)

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

  // Generate page number buttons: always show first, last, current ±1, with ellipsis
  // const pageNumbers = useMemo(() => {
  //   if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1)
  //   const pages: (number | '...')[] = []
  //   const range = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1].filter((p) => p >= 1 && p <= totalPages))
  //   const sorted = Array.from(range).sort((a, b) => a - b)
  //   sorted.forEach((p, i) => {
  //     if (i > 0 && p - sorted[i - 1] > 1) pages.push('...')
  //     pages.push(p)
  //   })
  //   return pages
  // }, [totalPages, currentPage])

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
    <section className="px-4 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-foreground font-bold text-lg flex items-center gap-2">
            <span className="w-1 h-5 bg-primary rounded-full inline-block" />
            全作品
          </h2>
          <span className="text-muted-foreground text-sm">
            {filtered.length} / {mangaList.length} 作品
          </span>
        </div>

        {/* Genre tags */}
        <div className="flex flex-wrap gap-2 mb-7" role="group" aria-label="ジャンルで絞り込む">
          <button
            onClick={() => handleGenreChange(null)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors duration-150 font-medium ${
              activeGenre === null
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground'
            }`}
            aria-pressed={activeGenre === null}
          >
            すべて
          </button>
          {allGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreChange(activeGenre === genre ? null : genre)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors duration-150 font-medium ${
                activeGenre === genre
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground'
              }`}
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
                      : 'border-border text-muted-foreground hover:border-primary hover:text-foreground cursor-pointer'
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
