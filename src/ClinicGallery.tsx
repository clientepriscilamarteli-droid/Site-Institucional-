import { useRef, useState } from 'react'
import { clinic } from './clinic'

const photos = [
  { src: '/retratos/consultorio-martelli.jpg', title: 'Consultório', position: '50% 52%' },
]

export function ClinicGallery() {
  const dialog = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState(0)
  const photo = photos[active]

  return (
    <div className="clinic-gallery">
      <div className={photos.length === 1 ? 'clinic-gallery-grid clinic-gallery-grid--single' : 'clinic-gallery-grid'}>
        {photos.map(({ src, title, position }, index) => (
          <button key={src} type="button" aria-label={'Ampliar: ' + title} onClick={() => {
            setActive(index)
            dialog.current?.showModal()
          }}>
            <img src={src} alt="" loading="lazy" decoding="async" style={{ objectPosition: position }} />
            <span className="clinic-gallery-label">{title}</span>
            <span className="clinic-gallery-zoom" aria-hidden="true">+</span>
          </button>
        ))}
        <article className="clinic-location">
          <iframe title="Mapa da Martelli Care Clinic" loading="lazy" src="https://maps.google.com/maps?q=Rua%20Bento%20de%20Andrade%2C%20319%2C%20S%C3%A3o%20Paulo&z=15&output=embed" />
          <div>
            <h3>Visite a Care Clinic</h3>
            <address>Rua Bento de Andrade, 319<br />Jardim Paulista, São Paulo · SP</address>
            <a className="editorial-link" href={clinic.maps} target="_blank" rel="noreferrer">Ver no Maps ↗</a>
          </div>
        </article>
      </div>
      <dialog ref={dialog} className="clinic-gallery-dialog" aria-labelledby="clinic-gallery-title" aria-describedby="clinic-gallery-location" onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close()
      }}>
        <div>
          <button type="button" aria-label="Fechar foto" onClick={() => dialog.current?.close()}>×</button>
          <img src={photo.src} alt={photo.title} loading="lazy" />
          <div className="clinic-gallery-caption">
            <h3 id="clinic-gallery-title">{photo.title}</h3>
            <p id="clinic-gallery-location">Martelli Care Clinic · Jardim Paulista</p>
          </div>
        </div>
      </dialog>
    </div>
  )
}
