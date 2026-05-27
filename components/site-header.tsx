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
            <span className="font-black text-yellow-500 text-base text-center tracking-wider">CAT</span>
            <span className="text-muted-foreground text-yellow-500 text-[9px] tracking-[0.3em] uppercase">Gallery</span>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
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
