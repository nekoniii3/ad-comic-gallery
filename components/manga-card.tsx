'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Manga } from '@/lib/manga-data'
// import { partsColor } from "@/components/template/FloatingParticles";
import { partsColor } from "@/components/template/Simple";
import { cn } from "@/lib/utils"

type MangaCardProps = {
  manga: Manga
}

const bgSelected = partsColor.bgSelected
const borderCard = partsColor.borderCard
const shadowCard = partsColor.shadowCard
const bgCard = partsColor.bgCard

export function MangaCard({ manga }: MangaCardProps) {
  return (
    <div className={cn("group relative overflow-hidden rounded-lg border border-border transition-all duration-300 hover:-translate-y-1", borderCard, shadowCard,  bgCard )}>
      {/* Cover image — clicking anywhere on the image goes straight to the reader */}
      <Link
        href={`/manga/${manga.id}/read`}
        className="relative block aspect-square overflow-hidden bg-muted"
        aria-label={`${manga.title}を開く`}
      >
        <Image
          src={manga.coverImage}
          alt={manga.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          // sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
          loading="eager"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover: Read button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className={cn("text-primary-foreground text-sm font-bold px-4 py-2 rounded-full", bgSelected)}>
            開く
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3">
        <h2 className="text-yellow-800 font-bold text-sm leading-tight mb-1 text-balance">
          {manga.title}
        </h2>
        <p className="text-muted-foreground text-xs mb-2">{manga.author}</p>
        <div className="flex flex-wrap gap-1">
          {manga.tag.slice(0, 2).map((g) => (
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
