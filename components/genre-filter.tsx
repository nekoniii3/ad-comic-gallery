'use client'

import { useMemo, useState } from 'react'
import { MangaCard } from '@/components/manga-card'
import type { Manga, Tag } from '@/lib/manga-data'
import { getTagList } from '@/lib/manga-data'

type GenreFilterProps = {
  tagList: Tag[]
  mangaList: Manga[]
}

export function GenreFilter({ tagList, mangaList }: GenreFilterProps) {
  const [activeGenre, setActiveGenre] = useState<string | null>(null)

  // const allGenres = useMemo(() => {
  //   const genreSet = new Set<string>()
  //   mangaList.forEach((manga) => manga.genre.forEach((g) => genreSet.add(g)))
  //   return Array.from(genreSet).sort()
  // }, [mangaList])

  const filtered = useMemo(
    () =>
      activeGenre
        ? mangaList.filter((manga) => manga.genre.includes(activeGenre))
        : mangaList,
    [mangaList, activeGenre],
  )

  console.log(tagList[0].name)

  return (
    <section className="px-4 pb-16">
      
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        {/* <div className="flex items-center justify-between mb-5">
          <h2 className="text-foreground font-bold text-lg flex items-center gap-2">
            <span className="w-1 h-5 bg-primary rounded-full inline-block" />
            全作品
          </h2>
          <span className="text-muted-foreground text-sm">
            {filtered.length} / {mangaList.length} 作品
          </span>
        </div> */}
        <div className="flex justify-between">
        {/* Genre tags */}
          <div className="flex flex-wrap gap-2 mb-7" role="group" aria-label="ジャンルで絞り込む">
            <button
              onClick={() => setActiveGenre(null)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors duration-150 font-medium ${
                activeGenre === null
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground'
              }`}
              aria-pressed={activeGenre === null}
            >
              すべて
            </button>
            {tagList.map((tag) => (
              <button
                key={tag.name}
                onClick={() => setActiveGenre(activeGenre === tag.name ? null : tag.name)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors duration-150 font-medium ${
                  activeGenre === tag.name
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground'
                }`}
                aria-pressed={activeGenre === tag.name}
              >
                {tag.name}
              </button>
            ))}
          </div>
          <div>
            <span className="text-muted-foreground text-sm justify-end">
              {filtered.length} / {mangaList.length} 作品
            </span>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
            {filtered.map((manga) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-20 text-sm">
            該当する作品はありません
          </p>
        )}
      </div>
    </section>
  )
}
