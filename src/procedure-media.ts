export type ProcedureMedia = {
  src: string
  caption: string
  video?: string
}

// Media supplied in the client's "Materiais para o site" Drive folders.
export const procedureMedia: Record<string, ProcedureMedia[]> = {
  'harmonizacao-facial': [
    { src: '/martelli/registros/frontal-original.jpg', caption: 'Registro frontal do acompanhamento' },
    { src: '/martelli/registros/perfil-original.jpg', caption: 'Registro de perfil do acompanhamento' },
    { src: '/martelli/planejamento.jpg', caption: 'Planejamento facial' },
  ],
  'bioestimuladores-de-colageno': [
    { src: '/bioestimuladores/registro-3887.webp', caption: 'Planejamento individual' },
    { src: '/bioestimuladores/registro-4203.webp', caption: 'Registro do acompanhamento' },
    { src: '/bioestimuladores/atendimento-poster.jpg', caption: 'Preparação do material', video: '/bioestimuladores/atendimento.mp4' },
  ],
  preenchimentos: [
    { src: '/martelli/registros/labial-original.jpg', caption: 'Registro do acompanhamento labial' },
    { src: '/martelli/registros/perfil-suave-original.jpg', caption: 'Registro de perfil' },
    { src: '/martelli/resultado-preenchimento.jpg', caption: 'Acompanhamento na clínica', video: '/martelli/resultado-preenchimento.mp4' },
  ],
  'tecnologias-para-pele': [
    { src: '/detalhes/ultraformer.webp', caption: 'Equipamento Ultraformer na clínica' },
    { src: '/detalhes/ultraformer-poster.jpg', caption: 'Tecnologia durante o atendimento', video: '/detalhes/ultraformer-atendimento.mp4' },
    { src: '/marquee/atendimento-laser.webp', caption: 'Atendimento com laser' },
  ],
}
