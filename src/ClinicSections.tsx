import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { appointmentHref, clinic, procedures, type Procedure } from './clinic'
import { ProcedureGallery } from './ProcedureGallery'
import { ClinicMarquee } from './components/ui/cta-with-marquee'
import { ClinicGallery } from './ClinicGallery'
import { DoctorConversation } from './DoctorConversation'
import MoltenMetal from './components/ui/MoltenMetal'
import { BeforeAfter } from './components/ui/BeforeAfter'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function AppointmentLink({ procedure }: { procedure?: string }) {
  return <a className="appointment-link" href={appointmentHref(procedure)} target="_blank" rel="noreferrer">Agendar avaliação <span aria-hidden="true">↗</span></a>
}

export function SiteFooter() {
  return (
    <footer className="clinic-footer" id="contato">
      <div className="editorial-wrap footer-grid">
        <div>
          <strong>Martelli Care Clinic</strong>
          <p>Dra. Priscilla Martelli</p>
        </div>
        <address>
          <a href={clinic.maps} target="_blank" rel="noreferrer">Rua Bento de Andrade, 319<br />Jardim Paulista · São Paulo, SP</a>
          <a href={clinic.whatsapp} target="_blank" rel="noreferrer">{clinic.phone}</a>
        </address>
        <div className="footer-links">
          <a href={clinic.instagram} target="_blank" rel="noreferrer">Instagram da clínica ↗</a>
          <a href={clinic.doctorInstagram} target="_blank" rel="noreferrer">Instagram da Dra. Priscilla ↗</a>
          <a href="#/privacidade">Privacidade</a>
        </div>
      </div>
    </footer>
  )
}

export function Manifesto() {
  return (
      <section id="manifesto" className="manifesto-section section-pad" aria-labelledby="manifesto-title">
        <div className="manifesto-metal" aria-hidden="true">
          <MoltenMetal
            colors={['#000000', '#d9d5d3']}
            coreColor="#ffffff"
            backgroundColor="#080808"
            speed={0.17}
            scale={4}
            detail={3}
            glow={1.6}
            thickness={1}
            haze={0.75}
            brightness={1.12}
            mouseInteraction={false}
            flareOnClick={false}
            dpr={1.25}
          />
        </div>
        <div className="editorial-wrap manifesto-wrap">
          <h2 id="manifesto-title">
            <span>Regenerar não é se transformar.</span>{' '}
            <em>É revelar a beleza de continuar sendo você.</em>
          </h2>
          <p>Na Martelli Care Clinic, tecnologia, conhecimento e sensibilidade se encontram para valorizar sua beleza natural.</p>
        </div>
      </section>
  )
}

export function HomeSections() {
  const editorial = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const reveal = (target: Element, from: gsap.TweenVars, end: string) => {
        gsap.from(target, {
          ...from,
          ease: 'none',
          scrollTrigger: { trigger: target, start: 'top 98%', end, scrub: 0.3 },
        })
      }

      editorial.current?.querySelectorAll('.editorial-heading > span > *, .philosophy-grid dl > div, .invitation-section p').forEach((element) => {
        reveal(element, { opacity: 0.16, y: 36 }, 'top 56%')
      })
    }, editorial)

    return () => motion.revert()
  }, { scope: editorial })

  return (
    <div className="clinic-editorial" ref={editorial}>
      <ProcedureGallery />
      <ClinicMarquee />

      <DoctorConversation />

      <section className="experience-section section-pad" id="atendimento" aria-labelledby="experience-title">
        <div className="editorial-wrap">
          <div className="editorial-intro experience-intro">
            <div>
              <h2 className="editorial-heading" id="experience-title"><span><span>Um espaço pensado para</span></span>{' '}<span><em>você se sentir bem.</em></span></h2>
            </div>
          </div>
          <ClinicGallery />
        </div>
      </section>

      <section className="philosophy-section section-pad" aria-labelledby="philosophy-title">
        <div className="editorial-wrap philosophy-grid">
          <div>
            <h2 className="editorial-heading" id="philosophy-title"><span><em>O cuidado</em></span>{' '}<span><span>está nos</span></span>{' '}<span><span>detalhes.</span></span></h2>
          </div>
          <dl>
            <div><dt>Naturalidade</dt><dd>Valorizar os traços que tornam sua aparência única.</dd></div>
            <div><dt>Tecnologia</dt><dd>Escolher recursos e equipamentos de acordo com as necessidades de cada paciente.</dd></div>
            <div><dt>Individualidade</dt><dd>Ouvir suas expectativas e avaliar seu histórico antes de definir uma conduta.</dd></div>
          </dl>
        </div>
      </section>

      <section className="invitation-section section-pad" aria-labelledby="invitation-title">
        <div className="editorial-wrap">
          <h2 id="invitation-title" className="editorial-heading"><span><span>Seu cuidado merece ser</span></span>{' '}<span><em>tão único quanto você.</em></span></h2>
          <p>Converse com nossa equipe e descubra o próximo passo para uma avaliação individualizada.</p>
          <AppointmentLink />
        </div>
      </section>
    </div>
  )
}

export function ProcedurePage({ procedure }: { procedure: Procedure }) {
  const comparison = procedures.find(({ slug }) => slug === procedure.slug)?.comparison
  return (
    <main className="detail-page section-pad" id="conteudo" tabIndex={-1}>
      <div className="editorial-wrap">
        <a className="editorial-link" href="#procedimentos">← Todos os procedimentos</a>
        <div className="detail-grid">
          <div>
            <p className="editorial-label">Martelli Care Clinic</p>
            <h1>{procedure.name}</h1>
            <p>{procedure.description}</p>
            <h2>O que conversar na avaliação</h2>
            <p>{procedure.evaluation}</p>
            <AppointmentLink procedure={procedure.name} />
          </div>
          {comparison ? <BeforeAfter {...comparison} /> : (
          <figure className={'illustrative' in procedure ? 'detail-illustration' : 'detail-photo'}>
            <img src={procedure.image} alt={procedure.alt} style={{ objectPosition: procedure.position }} />
            {'illustrative' in procedure && <figcaption>Imagem ilustrativa</figcaption>}
          </figure>
          )}
        </div>
      </div>
    </main>
  )
}
