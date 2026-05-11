import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          {/* Logo mark */}
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-black text-sm leading-none">漫</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-foreground font-black text-base tracking-wider">MANGA</span>
            <span className="text-muted-foreground text-[9px] tracking-[0.3em] uppercase">Gallery</span>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            作品一覧
          </Link>
          <Link
            href="#about"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
