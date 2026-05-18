import type { Metadata } from 'next'
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-sans',
})

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'マンガギャラリー | MANGA GALLERY',
  description: '自作漫画の作品ギャラリーサイト。各作品をフルスクリーンでお楽しみください。',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="">
      <body className={`${notoSansJP.variable} ${notoSerifJP.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
