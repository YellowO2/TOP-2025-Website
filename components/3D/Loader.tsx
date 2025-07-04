import { useProgress } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'

interface LoaderProps {
  onFinish?: () => void
}

export default function Loader({ onFinish }: LoaderProps) {
  const { errors, progress } = useProgress()
  const [displayed, setDisplayed] = useState(0)
  const [fade, setFade] = useState(false)
  const raf = useRef<number | null>(null)
  const hasError = errors && errors.length > 0

  useEffect(() => {
    if (hasError) return

    let lastTime = performance.now()

    function animate(now: number) {
      const delta = now - lastTime
      lastTime = now

      if (displayed < progress) {
        setDisplayed(prev => {
          const next = Math.min(progress, prev + Math.max(1, delta * 0.05))
          return next
        })
        raf.current = requestAnimationFrame(animate)
      } else if (displayed > progress) {
        setDisplayed(progress)
      } else if (progress >= 100 && displayed >= 100) {
        setFade(true)
        if (onFinish) onFinish()
      }
    }

    raf.current = requestAnimationFrame(animate)
    return () => {
      if (raf.current !== null) {
        cancelAnimationFrame(raf.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, displayed, onFinish, hasError])

  return (
    <div
      className={`absolute flex flex-col items-center justify-center w-screen h-screen bg-black text-white transition-opacity duration-1000 z-50 ${fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
    >
      <div className="text-[9px] text-center w-64 font-medium uppercase tracking-widest">
        {hasError
          ? "Could not load on this browser: " + errors.join(', ')
          : progress === 0
            ? "Setting things up"
            : `${Math.round(displayed)}% loaded`}
      </div>

      {!hasError && (
        <div className="w-32 mt-3 mb-1 h-1.5 rounded-full overflow-hidden shadow-inner border border-white/10">
          <div
            className="h-full bg-white rounded-full"
            style={{ width: `${displayed}%` }}
          />
        </div>
      )}
    </div>
  )
}