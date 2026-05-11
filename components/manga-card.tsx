'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Manga } from '@/lib/manga-data'

type MangaCardProps = {
  manga: Manga
}

export function MangaCard({ manga }: MangaCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_oklch(0.65_0.22_25_/_0.3)]">
      {/* Cover image — clicking anywhere on the image goes straight to the reader */}
      <Link
        href={`/manga/${manga.id}/read`}
        className="relative block aspect-square overflow-hidden bg-muted"
        aria-label={`${manga.title}を読む`}
      >
        <Image
          src={manga.coverImage}
          alt={manga.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          // sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Page count badge */}
        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground text-xs px-2 py-1 rounded-full border border-border">
          {manga.pageCount}P
        </div>

        {/* Hover: Read button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-full">
            読む
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3">
        <h2 className="text-foreground font-bold text-sm leading-tight mb-1 text-balance">
          {manga.title}
        </h2>
        <p className="text-muted-foreground text-xs mb-2">{manga.author}</p>
        <div className="flex flex-wrap gap-1">
          {manga.genre.slice(0, 2).map((g) => (
            <span
              key={g}
              className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border"
            >
              {g}
            </span>
          ))}
        </div>
        {/* <p className="text-muted-foreground text-[10px] mt-2">{manga.updatedAt}</p> */}
      </div>
    </div>
  )
}
