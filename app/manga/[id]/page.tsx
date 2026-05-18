import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getMangaList, getMangaById } from '@/lib/manga-data'
import { SiteHeader } from '@/components/site-header'
import { ChevronLeft, BookOpen } from 'lucide-react'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const manga = getMangaById(id)
  if (!manga) return {}
  return {
    title: `${manga.title} | MANGA Gallery`,
    description: manga.description,
  }
}

export function generateStaticParams() {
  return getMangaList().map((manga) => ({ id: manga.id }))
}

export default async function MangaDetailPage({ params }: Props) {
  const { id } = await params
  const manga = getMangaById(id)

  if (!manga) notFound()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          作品一覧に戻る
        </Link>

        {/* Manga info */}
        <div className="flex flex-col sm:flex-row gap-8 mb-10">
          {/* Cover */}
          <div className="relative w-44 aspect-[2/3] flex-shrink-0 rounded-lg overflow-hidden border border-border shadow-lg shadow-black/50">
            <Image
              src={manga.coverImage}
              alt={manga.title}
              fill
              className="object-cover"
              sizes="176px"
              priority
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-end gap-3">
            <div>
              <p className="text-primary text-xs tracking-widest uppercase font-bold mb-1">
                {manga.titleEn}
              </p>
              <h1 className="text-foreground font-black text-3xl md:text-4xl leading-tight text-balance mb-2">
                {manga.title}
              </h1>
              <p className="text-muted-foreground text-sm">{manga.author}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {manga.tag.map((g) => (
                <span
                  key={g}
                  className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border"
                >
                  {g}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              {manga.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{manga.imageCount}ページ</span>
              <span>最終更新: {manga.updatedAt}</span>
            </div>

            {/* Read button */}
            <Link
              href={`/manga/${manga.id}/read`}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors w-fit mt-2"
            >
              <BookOpen className="w-4 h-4" />
              フルスクリーンで読む
            </Link>
          </div>
        </div>

        {/* Page preview thumbnails */}
        <div>
          <h2 className="text-foreground font-bold text-base mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full inline-block" />
            ページ一覧
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {manga.imageData.map((page, i) => (
              <Link
                key={page.id}
                href={`/manga/${manga.id}/read?page=${i + 1}`}
                className="group relative aspect-[2/3] rounded overflow-hidden border border-border hover:border-primary transition-all"
              >
                <Image
                  src={page.imgPath}
                  alt={page.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="120px"
                />
                {/* Page number overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-center py-1">
                  <span className="text-[10px] text-white font-bold">{i + 1}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
