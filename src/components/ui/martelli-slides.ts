import { featuredProcedures } from '../../clinic'

export const treatmentLabels = [
  ...featuredProcedures.map(({ name, slug, landingPage }) => ({
    label: slug === 'elevare' ? 'Elevare' : name,
    href: landingPage ?? '#/procedimentos/' + slug,
  })),
  { label: 'A Especialista', href: '#especialista' },
  { label: 'A Experiência', href: '#atendimento' },
]

export const slides = [
  { photo: '/retratos/retrato-rose.jpg', position: '50% 15%', alt: 'Retrato da Dra. Priscilla Martelli em blusa rosé' },
  { photo: '/retratos/img-1-1.png', position: '50% 24%', alt: 'Dra. Priscilla Martelli apontando para as maçãs do rosto' },
  { photo: '/retratos/blefaroplastia-instagram.jpg', position: '50% 20%', alt: 'Dra. Priscilla de máscara e touca durante um procedimento' },
]
