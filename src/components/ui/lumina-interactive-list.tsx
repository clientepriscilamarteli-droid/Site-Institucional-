import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { playGlass } from './glass-transition'
import { slides, treatmentLabels } from './martelli-slides'

const motionQuery = '(prefers-reduced-motion: reduce)'
const interval = 7600

export function Component() {
  const [{ active, previous }, setFrame] = useState({ active: 0, previous: -1 })
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(() => !document.hidden)
  const [reduced, setReduced] = useState(() => matchMedia(motionQuery).matches)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const photos = useRef<(HTMLImageElement | null)[]>([])
  const renderedSlide = useRef(0)

  useLayoutEffect(() => {
    if (renderedSlide.current === active) return
    renderedSlide.current = active
    const canvas = canvasRef.current
    const from = photos.current[previous]
    const to = photos.current[active]
    if (!reduced && visible && canvas && from && to) return playGlass(canvas, from, to)
  }, [active, previous, reduced, visible])

  useEffect(() => {
    const media = matchMedia(motionQuery)
    const updateMotion = () => setReduced(media.matches)
    const updateVisibility = () => setVisible(!document.hidden)
    media.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => {
      media.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  useEffect(() => {
    if (paused || reduced || !visible) return
    const timer = window.setInterval(() => setFrame(({ active }) => ({ active: (active + 1) % slides.length, previous: active })), interval)
    return () => window.clearInterval(timer)
  }, [paused, reduced, visible])

  return (
    <>
      <div className="hero-media" role="group" aria-label="Fotos da Dra. Priscilla Martelli">
        {slides.map((slide, index) => (
          <div
            key={slide.photo}
            className={index === active ? 'hero-frame is-current' : 'hero-frame'}
            aria-hidden={index !== active}
          >
            <img
              ref={(image) => { photos.current[index] = image }}
              className="hero-photo"
              src={slide.photo}
              alt={slide.alt}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              style={{ objectPosition: slide.position }}
            />
          </div>
        ))}
        <canvas ref={canvasRef} className="hero-glass" aria-hidden="true" />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <p className="hero-manifesto">A arte de rejuvenescer <em>sem perder sua essência.</em></p>
      <ul className="treatment-labels" aria-label="Destaques da clínica">
        {treatmentLabels.map(({ label, href }) => <li key={href}><a href={href}>{label}</a></li>)}
      </ul>
      {!reduced && (
        <button className="playback" type="button" aria-label={paused ? 'Retomar fotos' : 'Pausar fotos'} onClick={() => setPaused(!paused)}>
          <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span>
        </button>
      )}
    </>
  )
}
