"use client"

import { useEffect, useRef } from "react"

/**
 * BackgroundScene
 *
 * 使い方:
 *   <BackgroundScene /> を任意のコンポーネントに置くだけで、
 *   画面全体を覆う固定背景として表示されます。
 *
 * 実装:
 *   position: fixed / inset-0 / -z-10 で他のコンテンツの背後に固定。
 *   Canvas に動くパーティクルを描画して視覚的なデモを示します。
 */
export default function BackgroundScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    // パーティクル定義
    const PARTICLE_COUNT = 80
    type Particle = {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      alpha: number
    }
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      resize()
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 背景グリッド線
      ctx.strokeStyle = "rgba(255,255,255,0.04)"
      ctx.lineWidth = 1
      const gridSize = 80
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // パーティクル間の接続線
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(99,179,255,${0.12 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // パーティクル描画
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(147,210,255,${p.alpha})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    init()
    draw()

    window.addEventListener("resize", () => {
      resize()
    })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full bg-[#060c14]"
    />
  )
}