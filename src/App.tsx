import { useEffect, useState } from 'react'
import { InstitutionalHero } from './InstitutionalHero'
import { LiquidGlassSurface } from '@/components/ui/liquid-glass-surface'
import { HomeSections, Manifesto, ProcedurePage, SiteFooter } from './ClinicSections'
import { clinic, procedurePages } from './clinic'
import './institutional-brand.css'

const siteTitle = 'Martelli Care Clinic · Dra. Priscilla Martelli'

function SiteHeader() {
  return (
    <header className="site-header">
      <LiquidGlassSurface />
      <a className="site-brand" href="#inicio" aria-label="Martelli Care Clinic, início">
        <img className="brand-monogram" src="/martelli-monograma.png" width="52" height="40" alt="" />
        <span><strong>MARTELLI CARE CLINIC</strong><small>Dra. Priscilla Martelli</small></span>
      </a>
      <nav aria-label="Menu principal">
        <ul className="site-menu">
          <li><a href="#procedimentos">Procedimentos</a></li>
          <li><a href="#atendimento">Atendimento</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
      </nav>
    </header>
  )
}

export function App() {
  const [hash, setHash] = useState(() => location.hash)
  const procedure = procedurePages.find((item) => hash === '#/procedimentos/' + item.slug)
  const privacy = hash === '#/privacidade'
  const isDetail = Boolean(procedure || privacy)

  useEffect(() => {
    const syncHash = () => setHash(location.hash)
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  useEffect(() => {
    document.title = procedure ? procedure.name + ' · Martelli Care Clinic' : privacy ? 'Privacidade · Martelli Care Clinic' : siteTitle
    if (isDetail) {
      window.scrollTo(0, 0)
      document.getElementById('conteudo')?.focus({ preventScroll: true })
      return
    }
    const target = document.getElementById(hash.slice(1))
    target?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    })
  }, [hash, isDetail, privacy, procedure])

  return (
    <div id="institucional" className="institutional-site">
      <a
        className="skip-link"
        href={isDetail ? '#conteudo' : '#manifesto'}
        onClick={(event) => {
          if (!isDetail) return
          event.preventDefault()
          document.getElementById('conteudo')?.focus()
        }}
      >Pular para o conteúdo</a>
      {isDetail ? (
        <>
          <div className="detail-header"><SiteHeader /></div>
          {procedure ? <ProcedurePage procedure={procedure} /> : (
            <main id="conteudo" tabIndex={-1} className="detail-page section-pad">
              <div className="editorial-wrap privacy-copy">
                <a className="editorial-link" href="#inicio">← Voltar ao início</a>
                <h1>Privacidade</h1>
                <p>Esta página institucional não solicita dados em formulários. Ao abrir os links de WhatsApp, Instagram ou mapas, você acessa serviços externos com suas próprias políticas de privacidade.</p>
                <p>Para dúvidas sobre dados compartilhados no atendimento, <a href={clinic.whatsapp} target="_blank" rel="noreferrer">fale com a clínica pelo WhatsApp</a>.</p>
              </div>
            </main>
          )}
        </>
      ) : (
        <main>
          <div className="opening-stack">
            <div className="hero" id="inicio">
              <SiteHeader />
              <h1 className="sr-only">{siteTitle}</h1>
              <InstitutionalHero />
            </div>
            <Manifesto />
          </div>
          <HomeSections />
        </main>
      )}
      <SiteFooter />
    </div>
  )
}
