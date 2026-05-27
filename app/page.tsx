import { GenreFilter } from '@/components/genre-filter'
import { SiteHeader } from '@/components/site-header'
import { getMangaList, getTagList } from '@/lib/manga-data'
import { FloatingParticles } from "@/components/template/FloatingParticles";
import AuroraBackground from "@/components/backgrounds/AuroraBackground"
import Natural from "@/components/backgrounds/Natural"
import WarmBeige from "@/components/backgrounds/WarmBeige"
import MinimalGrid from "@/components/template/MinimalGrid"
import ArchitectCross from "@/components/template/ArchitectCross"
// import BackgroundScene from "@/components/backgrounds/background-scene"
import Simple from "@/components/template/Simple"

export default async function HomePage() {
  const mangaList = await getMangaList()
  const tagList = getTagList()
 
  return (
    <div>
      {/* 背景指定 */}
      {/* <AuroraBackground /> */}
      {/* <Natural /> */}
      {/* <MinimalGrid /> */}
      {/* <WarmBeige /> */}
      {/* <FloatingParticles /> */}
      <Simple />
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative py-16 px-4 overflow-hidden">
          <div className="relative max-w-6xl mx-auto text-center">
            {/* 社会人サークル */}
            {/* <h1 className="text-4xl md:text-6xl leading-tight font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 pb-2">
                文京区社会人サークル<br />{"「BSC」写真館"}
            </h1> 
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              オリジナル漫画作品をご覧ください。
              <br className="hidden md:block" />
              作品をクリックするとフルスクリーンで読めます。
            </p>
            */}
            {/* 私のハンドメイド */}
            {/* 猫 */}
            <h1 className="text-4xl md:text-6xl leading-tight font-extrabold text-yellow-600 tracking-tight pb-6">
                複数ページ時のサンプル<br />
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              15項目を超えて複数ページに渡った際のサンプルです。
              <br className="hidden md:block" />
              最下部のボタンで前後のページに移動できます。
            </p>
          </div>
        </section>

        {/* Manga Grid with genre filter */}
        {/* <GenreFilter tagList={tagList} mangaList={mangaList} /> */}
        <GenreFilter mangaList={mangaList} tagList={tagList}/>
      </main>

      {/* Footer */}
      <footer
        id="about"
        className="border-t border-border py-8 px-4 mb-8"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-6">
          {/* <div> */}
            <div className="text-muted-foreground text-sm max-w-xs text-center leading-relaxed">
              画像は全てPexelsから利用したものです。<br/>
              &copy; {new Date().getFullYear()} All rights reserved.
            </div>
        </div>
      </footer>
      </div>
  )
}
