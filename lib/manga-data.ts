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
  tags: string[]
}

/**
 * public/data/manga.json からデータを読み込む（サーバーサイド専用）。
 * JSON ファイルを直接編集することで作品を追加・更新できます。
 */
export async function getMangaList(): Promise<Manga[]> {
  // const filePath = path.join(process.cwd(), 'public', 'data', 'manga.json')
  // const raw = fs.readFileSync(filePath, 'utf-8')
  // return JSON.parse(raw) as Manga[]

  const jsonPath = "https://gist.githubusercontent.com/settaro-001/e0d12279f3e0f7193d7019c41f624b51/raw"

  var raw;

  await fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
      raw = data
    })
    .catch(error => {
      console.error('エラー:', error);
    });

  return raw as unknown as Manga[]
}

export async function getMangaById(id: string): Promise<Manga | undefined> {
  const mangaList = await getMangaList()
  return mangaList.find((m) => m.id === id)
}

export async function getTagList(): Promise<string[]> {
  // const filePath = path.join(process.cwd(), 'public', 'data', 'tag.json')
  const jsonPath = "https://gist.githubusercontent.com/settaro-001/1980b7e6511474ba36eea63616248cd1/raw"
  // const raw = fs.readFileSync(filePath, 'utf-8')
  // console.log(JSON.parse(raw))
  // const tagList = JSON.parse(raw).map(function(item: any){
  //     return item["name"];
  // })
  // const tagList = JSON.parse(raw).tags
  // return tagList

  var raw;

  await fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
      raw = data
    })
    .catch(error => {
      console.error('エラー:', error);
    });

  const rowAsTag = raw as unknown as Tag

  return rowAsTag.tags
}