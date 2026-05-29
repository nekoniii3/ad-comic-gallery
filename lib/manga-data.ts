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
  additional: string
  coverImage:string
  itemPage: string
  tag: string[]
  imageData: MangaPage[]
}

export type Tag = {
  name: string
}

/**
 * public/data/manga.json からデータを読み込む（サーバーサイド専用）。
 * JSON ファイルを直接編集することで作品を追加・更新できます。
 */
export async function getMangaList(): Promise<Manga[]> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'manga.json')
  // const jsonPath = "https://gist.githubusercontent.com/nekoniii3/b545557be3f84ee11ad751d598af29c0/raw"

  // var raw;

  // await fetch(jsonPath)
  //   .then(response => response.json())
  //   .then(data => {
  //     raw = data
  //   })
  //   .catch(error => {
  //     console.error('エラー:', error);
  //   });
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as Manga[]
  
    return raw as unknown as Manga[]
}

export async function getMangaById(id: string): Promise<Manga | undefined> {
  const mangaList = await getMangaList()
  return mangaList.find((m) => m.id === id)
}

export function getTagList(): string[] {
  const filePath = path.join(process.cwd(), 'public', 'data', 'tag.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  // console.log(JSON.parse(raw))
  // const tagList = JSON.parse(raw).map(function(item: any){
  //     return item["name"];
  // })
  const tagList = JSON.parse(raw).tags
  console.log(tagList)
  return tagList
}