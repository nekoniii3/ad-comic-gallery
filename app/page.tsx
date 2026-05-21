import { GenreFilter } from '@/components/genre-filter'
import { SiteHeader } from '@/components/site-header'
import { getMangaList, getTagList } from '@/lib/manga-data'
import FloatingParticles from "@/components/backgrounds/FloatingParticles";
import AuroraBackground from "@/components/backgrounds/AuroraBackground"
import Natural from "@/components/backgrounds/Natural"
import WarmBeige from "@/components/backgrounds/WarmBeige"
import MinimalGrid from "@/components/template/MinimalGrid"
// import BackgroundScene from "@/components/backgrounds/background-scene"

export default async function HomePage() {
  const mangaList = await getMangaList()
  const tagList = getTagList()
 
  return (
    <div>
      {/* 背景指定 */}
      {/* <AuroraBackground /> */}
      {/* <Natural /> */}
      <MinimalGrid />
      {/* <WarmBeige /> */}
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative py-16 px-4 overflow-hidden">
          {/* Background decoration */}
          {/* <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 40px,
                oklch(0.65 0.22 25) 40px,
                oklch(0.65 0.22 25) 41px
              ), repeating-linear-gradient(
                90deg,
                transparent,
                transparent 40px,
                oklch(0.65 0.22 25) 40px,
                oklch(0.65 0.22 25) 41px
              )`,
            }}
          /> */}

          <div className="relative max-w-6xl mx-auto text-center">
            {/* <p className="text-primary text-xs tracking-[0.4em] uppercase font-bold mb-3">
              Original Works
            </p> */}
            <h1 className="font-black text-4xl md:text-6xl text-black leading-tight mb-4 text-balance">
              私のハンドメイド
              <br />
              <span className="text-primary">作品ギャラリー</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              オリジナル漫画作品をご覧ください。
              <br className="hidden md:block" />
              作品をクリックするとフルスクリーンで読めます。
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
        className="border-t border-border py-10 px-4"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-black text-xs">漫</span>
              </div>
              <span className="text-foreground font-bold text-sm">MANGA Gallery</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              自作漫画の個人ギャラリーサイトです。すべての作品の著作権は作者に帰属します。
            </p>
          </div>
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} MANGA Gallery. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
  )
}
