import { useState } from 'react'

type MarqueeImage = { image: string; position: string }

export function AnimatedMarqueeHero({ images }: { images: MarqueeImage[] }) {
  const [paused, setPaused] = useState(false)

  return (
    <div className="procedure-marquee">
      <div className="procedure-marquee-track" data-paused={paused} aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="procedure-marquee-strip" key={copy}>
            {images.map(({ image, position }) => (
              <img key={image} src={image} alt="" loading="lazy" style={{ objectPosition: position }} />
            ))}
          </div>
        ))}
      </div>
      <button type="button" onClick={() => setPaused(!paused)}>{paused ? 'Retomar imagens' : 'Pausar imagens'}</button>
    </div>
  )
}
