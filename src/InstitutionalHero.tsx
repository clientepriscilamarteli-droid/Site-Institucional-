import { appointmentHref } from './clinic'
import { treatmentLabels } from './components/ui/martelli-slides'

export function InstitutionalHero() {
  return (
    <>
      <div className="hero-media institutional-hero-media">
        <img className="hero-photo institutional-hero-photo" src="/retratos/priscilla-hero-sofa.jpg" alt="Dra. Priscilla Martelli sentada no sofá, em um jardim" fetchPriority="high" />
      </div>
      <div className="hero-shade institutional-hero-shade" aria-hidden="true" />
      <div className="institutional-hero-copy">
        <p className="hero-manifesto">A arte de rejuvenescer <em>sem perder sua essência.</em></p>
        <div className="institutional-hero-actions">
          <a href="#procedimentos">Conhecer tratamento <span aria-hidden="true">↗</span></a>
          <a href={appointmentHref()} target="_blank" rel="noreferrer">Agendar minha avaliação <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <ul className="treatment-labels" aria-label="Destaques da clínica">
        {treatmentLabels.map(({ label, href }) => <li key={href}><a href={href}>{label}</a></li>)}
      </ul>
    </>
  )
}
