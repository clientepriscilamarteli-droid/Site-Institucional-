import { createElement } from 'react'
import 'img-comparison-slider'
import 'img-comparison-slider/dist/styles.css'

export function BeforeAfter({ before, after }: { before: string; after: string }) {
  return (
    <div className="brand-comparison">
      {createElement(
        'img-comparison-slider',
        { 'aria-label': 'Comparar antes e depois da harmonização facial' },
        <img slot="first" src={before} alt="Antes da harmonização facial" width={535} height={760} loading="lazy" />,
        <img slot="second" src={after} alt="Depois da harmonização facial" width={535} height={760} loading="lazy" />,
        <span slot="handle" className="brand-comparison-handle" aria-hidden="true">‹ ›</span>,
      )}
      <div className="brand-comparison-labels" aria-hidden="true"><span>Antes</span><span>Depois</span></div>
    </div>
  )
}
