import path from 'path'
import fs from 'fs'

export type MangaPage = {
  id: number
  imgPath: string
  alt: string
}

export type Manga = {
  id: string
  title: string
  titleEn: string
  author: string
  tag: string[]
  description: string
  coverImage: string
  itemPage: string
  imageCount: number
  imageData: MangaPage[]
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

export function getTagList(): string[] {
  const filePath = path.join(process.cwd(), 'public', 'data', 'tag.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  // console.log(JSON.parse(raw))
  const tagList = JSON.parse(raw).map(function(item: any){
      return item["name"];
  })
  // console.log(tagList)
  return tagList
}