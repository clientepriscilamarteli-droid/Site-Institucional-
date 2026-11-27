import { useEffect, useRef, useState } from 'react'
import type { ProcedureMedia } from './procedure-media'

function LoopVideo({ item }: { item: ProcedureMedia }) {
  const video = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const element = video.current!
    let visible = false
    const update = () => {
      if (visible && !paused && !document.hidden) {
        element.muted = true
        void element.play().catch(() => {
          // Native controls remain available if the browser blocks autoplay.
        })
      } else element.pause()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      update()
    }, { threshold: 0.25 })
    observer.observe(element)
    document.addEventListener('visibilitychange', update)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', update)
      element.pause()
    }
  }, [paused])

  return (
    <div className="procedure-video">
      <video ref={video} autoPlay={!paused} muted loop playsInline controls preload="metadata" poster={item.src} aria-label={item.caption}>
        <source src={item.video} type="video/mp4" />
      </video>
      <button type="button" className="procedure-video-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>
        {paused ? 'Reproduzir vídeo' : 'Pausar vídeo'}
      </button>
    </div>
  )
}

export function ProcedureMediaGallery({ media }: { media: ProcedureMedia[] }) {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const move = (direction: number) => {
    const next = Math.max(0, Math.min(media.length - 1, active + direction))
    const container = track.current!
    const slide = container.children[next] as HTMLElement
    container.scrollTo({
      left: slide.offsetLeft,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

  return (
    <div className="procedure-carousel" role="region" aria-roledescription="carrossel" aria-label="Fotos e vídeos do tratamento">
      <div className="procedure-carousel-track" ref={track} tabIndex={0} aria-label="Deslize para explorar as mídias" onKeyDown={(event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault()
          move(event.key === 'ArrowRight' ? 1 : -1)
        }
      }} onScroll={() => {
        const container = track.current!
        const positions = Array.from(container.children, (child) => Math.abs((child as HTMLElement).offsetLeft - container.scrollLeft))
        setActive(positions.indexOf(Math.min(...positions)))
      }}>
        {media.map((item, index) => (
          <figure className="procedure-carousel-slide" key={item.src} role="group" aria-roledescription="slide" aria-label={(index + 1) + ' de ' + media.length}>
            {item.video ? <LoopVideo item={item} /> : <img src={item.src} alt={item.caption} loading="lazy" decoding="async" />}
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="procedure-carousel-controls">
        <span aria-live="polite">{active + 1} / {media.length}</span>
        <button type="button" onClick={() => move(-1)} disabled={active === 0} aria-label="Mídia anterior">←</button>
        <button type="button" onClick={() => move(1)} disabled={active === media.length - 1} aria-label="Próxima mídia">→</button>
      </div>
    </div>
  )
}
