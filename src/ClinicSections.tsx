import { useRef, type MouseEvent } from 'react'
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
import { procedureMedia } from './procedure-media'
import { ProcedureMediaGallery } from './ProcedureMediaGallery'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function AppointmentLink({ procedure, label = 'Agendar avaliação' }: { procedure?: string; label?: string }) {
  return <a className="appointment-link" href={appointmentHref(procedure)} target="_blank" rel="noreferrer">{label} <span aria-hidden="true">↗</span></a>
}

export function SiteFooter() {
  return (
    <footer className="clinic-footer" id="contato">
      <div className="editorial-wrap footer-grid">
        <div>
          <strong>MARTELLI CARE CLINIC</strong>
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
      const root = editorial.current
      if (!root) return

      const listeners = new AbortController()
      const reveal = (trigger: HTMLElement, targets: gsap.TweenTarget, start: string | (() => string) = 'top 92%', end: string | (() => string) = 'top 62%') => {
        const timeline = gsap.timeline({
          scrollTrigger: { trigger, start, end, scrub: 0.25, once: true },
        })
        timeline.from(targets, { y: 42, opacity: 0, duration: 0.65, stagger: 0.16, ease: 'power2.out' })
        trigger.addEventListener('focusin', () => {
          timeline.scrollTrigger?.kill(false, true)
          timeline.progress(1).pause()
        }, { signal: listeners.signal })
        return timeline
      }

      const intro = root.querySelector<HTMLElement>('.procedure-editorial-intro')!
      reveal(intro, intro.querySelectorAll('h2 > span'), 'top 94%', 'top 56%')

      root.querySelectorAll('.procedure-editorial-pair').forEach((pair, index) => {
        // The article has no layout box at the desktop grid breakpoint.
        const photo = pair.querySelector<HTMLElement>('.procedure-editorial-photo')!
        const copy = pair.querySelector<HTMLElement>('.procedure-editorial-copy')!
        const desktop = () => window.matchMedia('(min-width: 901px)').matches
        const photoTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: photo,
            start: () => desktop() && index === 1 ? 'top 76%' : 'top 94%',
            end: () => desktop() && index === 1 ? 'top 43%' : 'top 58%',
            scrub: 0.25,
            once: true,
          },
        })
        photoTimeline
          .fromTo(photo, { clipPath: 'inset(0% 0% 100% 0% round 8px)' }, {
            clipPath: 'inset(0% 0% 0% 0% round 8px)', clearProps: 'clipPath', duration: 1, ease: 'none',
          }, 0)
          .from(photo.querySelector('img'), { scale: 1.12, duration: 1, ease: 'power2.out' }, 0)

        const secondInRow = index === 1
        reveal(copy, copy.children,
          () => desktop() && secondInRow ? 'top 68%' : 'top 87%',
          () => desktop() && secondInRow ? 'top 36%' : 'top 54%',
        )
      })

      root.querySelectorAll<HTMLElement>([
        '.clinic-marquee-layout > :first-child',
        '.doctor-profile',
        '.doctor-questions-title',
        '.doctor-questions',
        '.doctor-response',
        '.experience-intro',
        '.clinic-gallery-grid',
        '.philosophy-grid',
        '.invitation-section > .editorial-wrap',
      ].join(', ')).forEach((block) => {
        const targets = block.matches('.doctor-questions-title') ? block : block.children
        reveal(block, targets)
      })
      const refresh = () => ScrollTrigger.refresh()
      document.fonts.addEventListener('loadingdone', refresh, { signal: listeners.signal })
      return () => listeners.abort()
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
  const media = procedureMedia[procedure.slug] ?? []
  const showTreatment = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const heading = document.getElementById('treatment-title')
    heading?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
    heading?.focus({ preventScroll: true })
  }
  return (
    <main className="detail-page procedure-detail-page section-pad" id="conteudo" tabIndex={-1}>
      <div className="editorial-wrap">
        <a className="editorial-link" href="#procedimentos">← Todos os procedimentos</a>
        <div className="detail-grid">
          <div>
            <p className="editorial-label">Martelli Care Clinic</p>
            <h1>{procedure.name}</h1>
            <p>{procedure.description}</p>
            <h2>O que conversar na avaliação</h2>
            <p>{procedure.evaluation}</p>
            <div className="procedure-detail-actions">
              <AppointmentLink procedure={procedure.name} label="Agendar a minha avaliação" />
              {media.length > 0 && <a className="editorial-link" href={'#/procedimentos/' + procedure.slug} onClick={showTreatment}>Conhecer o tratamento ↓</a>}
            </div>
          </div>
          {comparison ? <BeforeAfter {...comparison} /> : (
          <figure className={'illustrative' in procedure ? 'detail-illustration' : 'detail-photo'}>
            <img src={procedure.image} alt={procedure.alt} style={{ objectPosition: procedure.position }} />
            {'illustrative' in procedure && <figcaption>Imagem ilustrativa</figcaption>}
          </figure>
          )}
        </div>
        {media.length > 0 && (
          <section className="bio-media-section" aria-labelledby="bio-media-title">
            <h2 id="treatment-title" tabIndex={-1}>Conhecer o tratamento</h2>
            <p>{'approach' in procedure && typeof procedure.approach === 'string' ? procedure.approach : procedure.evaluation}</p>
            <h2 id="bio-media-title">Um olhar sobre o cuidado</h2>
            <p>Conheça o atendimento e os registros de acompanhamento de {procedure.name.toLocaleLowerCase('pt-BR')}.</p>
            <ProcedureMediaGallery key={procedure.slug} media={media} />
            <div className="procedure-detail-cta">
              <h2>Seu próximo passo começa com uma conversa.</h2>
              <p>Fale com a equipe para agendar sua avaliação e entender o plano de cuidado para você.</p>
              <div className="procedure-detail-actions">
                <AppointmentLink procedure={procedure.name} label="Agendar a minha avaliação" />
                <a className="editorial-link" href={'#/procedimentos/' + procedure.slug} onClick={showTreatment}>Conhecer o tratamento ↑</a>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
