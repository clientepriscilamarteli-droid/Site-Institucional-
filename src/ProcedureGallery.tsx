import './ProcedureGallery.css'
import { appointmentHref, procedures } from './clinic'

export function ProcedureGallery() {
  return (
    <section className="procedures-section procedure-story section-pad" id="procedimentos" aria-labelledby="procedures-title">
      <div className="editorial-wrap">
        <header className="procedure-editorial-intro">
          <h2 id="procedures-title">Cuidar do rosto começa por <em>entender seus traços.</em></h2>
        </header>
        <div className="procedure-editorial-grid">
          {procedures.map((procedure) => (
            <article className="procedure-editorial-pair" key={procedure.slug} aria-labelledby={'editorial-' + procedure.slug}>
              <div className="procedure-editorial-copy">
                <h3 id={'editorial-' + procedure.slug}>{procedure.name}</h3>
                <p>{procedure.description}</p>
                <div className="procedure-editorial-links">
                  <a className="editorial-link" href={appointmentHref(procedure.name)} target="_blank" rel="noreferrer">Agendar ↗</a>
                </div>
              </div>
              <figure className="procedure-editorial-photo">
                <img src={procedure.image} alt={procedure.alt} loading="lazy" decoding="async" style={{ objectPosition: procedure.position }} />
                {'imageCaption' in procedure && <figcaption>{procedure.imageCaption}</figcaption>}
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
