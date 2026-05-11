import path from 'path'
import fs from 'fs'

export type MangaPage = {
  id: number
  src: string
  alt: string
}

export type Manga = {
  id: string
  title: string
  titleEn: string
  author: string
  genre: string[]
  description: string
  coverImage: string
  pageCount: number
  pages: MangaPage[]
  updatedAt: string
}

export type Tag = {
  name: string
}

/**
 * public/data/manga.json からデータを読み込む（サーバーサイド専用）。
 * JSON ファイルを直接編集することで作品を追加・更新できます。
 */
export function getMangaList(): Manga[] {
  const filePath = path.join(process.cwd(), 'public', 'data', 'manga.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as Manga[]
}

export function getMangaById(id: string): Manga | undefined {
  return getMangaList().find((m) => m.id === id)
}

export function getTagList(): Tag[] {
  const filePath = path.join(process.cwd(), 'public', 'data', 'tag.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as Tag[]
}