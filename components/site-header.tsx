import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="top-0 z-50 backdrop-blur-none">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3 group">
          {/* Logo mark */}
          {/* <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-black text-sm leading-none">漫</span>
          </div> */}
          <div className="flex flex-col leading-none">
            <span className="font-black text-blue-500 text-base text-center tracking-wide">BSC</span>
            {/* <span className="text-muted-foreground text-yellow-500 text-[9px] text-center tracking-[0.3em] uppercase">Gallery</span> */}
            <span className="text-blue-500 font-black text-[9px] text-center tracking-[0.3em] uppercase">Gallery</span>
          </div>
        </div>

        <nav className="flex items-center gap-6 text-blue-500">
          <Link
            href="/"
            className="font-bold hover:text-foreground text-sm transition-colors"
          >
            公式ページはこちら
          </Link>
          {/* <Link
            href="#about"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            About
          </Link> */}
        </nav>
      </div>
    </header>
  )
}
