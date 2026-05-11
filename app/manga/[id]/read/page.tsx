import { notFound } from 'next/navigation'
import { getMangaList, getMangaById } from '@/lib/manga-data'
import { MangaViewer } from '@/components/manga-viewer'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const manga = getMangaById(id)
  if (!manga) return {}
  return {
    title: `${manga.title} を読む | MANGA Gallery`,
  }
}

export function generateStaticParams() {
  return getMangaList().map((manga) => ({ id: manga.id }))
}

export default async function ReadPage({ params }: Props) {
  const { id } = await params
  const manga = getMangaById(id)

  if (!manga) notFound()

  return <MangaViewer manga={manga} />
}
