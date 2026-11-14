import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { appointmentHref } from './clinic'

const questions = [
  { question: 'Como é a primeira avaliação?', answer: 'A consulta começa com uma conversa sobre suas expectativas e seu histórico. A partir daí, avalio quais opções fazem sentido para você.' },
  { question: 'É possível preservar meus traços?', answer: 'Preservar seus traços orienta o planejamento. Conversamos sobre o que você gostaria de cuidar e como valorizar suas características.' },
  { question: 'Como escolhemos o procedimento?', answer: 'A escolha depende da avaliação, da sua anatomia e dos seus objetivos. Na consulta, explico as opções e o que considerar em cada uma.' },
  { question: 'O que preciso saber sobre a recuperação?', answer: 'O tempo de recuperação e os cuidados variam conforme o procedimento. Conversamos sobre essas orientações antes de decidir como seguir.' },
  { question: 'Como agendo uma consulta?', answer: 'Você pode falar com a equipe pelo WhatsApp da clínica para consultar os horários e marcar sua avaliação.' },
]

export function DoctorConversation() {
  const [active, setActive] = useState(0)
  const { answer } = questions[active]
  const typed = useRef<HTMLSpanElement>(null)
  const section = useRef<HTMLElement>(null)

  useGSAP(() => {
    const motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const text = typed.current!
      const count = { value: 0 }
      text.textContent = ''
      gsap.to(count, {
        value: answer.length,
        duration: Math.min(2.5, answer.length / 66),
        ease: 'none',
        onUpdate: () => { text.textContent = answer.slice(0, Math.round(count.value)) },
      })
      return () => { text.textContent = answer }
    })
    return () => motion.revert()
  }, { scope: section, dependencies: [answer], revertOnUpdate: true })

  return (
    <section ref={section} className="doctor-dialogue section-pad" id="especialista" aria-labelledby="specialist-title">
      <div className="editorial-wrap">
        <div className="doctor-profile">
          <img src="/retratos/priscilla-editorial.webp" alt="Retrato da Dra. Priscilla Martelli" loading="lazy" decoding="async" width={1000} height={1500} />
          <div>
            <h2 id="specialist-title">Dra. Priscilla <em>Martelli</em></h2>
            <p className="doctor-registration">Cirurgiã-dentista · Harmonização orofacial · CRO 121952</p>
            <p>Com formação na Universidade Estadual do Oeste do Paraná e especialização em harmonização orofacial pela NEOM, a Dra. Priscilla Martelli atua com rejuvenescimento facial na Martelli Care Clinic, em São Paulo.</p>
            <p>O atendimento começa com uma conversa sobre o que cada pessoa gostaria de cuidar. A partir da avaliação, ela propõe um plano que leva em conta a anatomia, os objetivos e os traços de cada rosto.</p>
          </div>
        </div>
        <h3 className="doctor-questions-title">Perguntas para a doutora</h3>
        <div className="doctor-questions" role="group" aria-label="Perguntas para a doutora">
          {questions.map(({ question }, index) => <button key={question} type="button" aria-controls="doctor-answer" aria-pressed={index === active} onClick={() => setActive(index)}>{question}</button>)}
        </div>
        <div className="doctor-response" id="doctor-answer">
            <p aria-live="polite"><span className="sr-only">{answer}</span><span className="doctor-answer-space" aria-hidden="true">{answer}</span><span ref={typed} aria-hidden="true">{answer}</span></p>
            <a className="editorial-link" href={appointmentHref()} target="_blank" rel="noreferrer">Falar com a equipe ↗</a>
        </div>
      </div>
    </section>
  )
}
