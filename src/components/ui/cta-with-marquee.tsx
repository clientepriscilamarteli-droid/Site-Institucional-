import './cta-with-marquee.css'

const photos = [
  [
    ['/marquee/comparativo-tablet.webp', '50% 52%'],
    ['/retratos/clinica-5.png', '50% 26%'],
  ],
  [
    ['/procedimentos/harmonizacao-depois.jpg', '50% 52%'],
    ['/marquee/atendimento-laser.webp', '67% 50%'],
  ],
]

export function ClinicMarquee() {
  return (
    <section className="clinic-marquee section-pad" aria-labelledby="clinic-marquee-title">
      <div className="editorial-wrap clinic-marquee-layout">
        <div>
          <h2 id="clinic-marquee-title">Centenas de rostos <em>rejuvenescidos</em></h2>
          <p>Cada rosto tem seus próprios traços. O cuidado começa por respeitá-los.</p>
          <a className="appointment-link" href="#especialista">Conheça a Dra. Priscilla <span aria-hidden="true">↗</span></a>
        </div>
        <div className="clinic-marquee-media">
          <div className="clinic-marquee-window" aria-hidden="true">
            {photos.map((row) => (
              <div className="clinic-marquee-track" key={row[0][0]}>
                {[0, 1, 2, 3].map((copy) => (
                  <div className="clinic-marquee-strip" key={copy}>
                    {row.map(([src, position]) => (
                      <img key={src} src={src} alt="" loading="lazy" decoding="async" width={192} height={192} style={{ objectPosition: position }} />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
