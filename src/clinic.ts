export const clinic = {
  whatsapp: 'https://wa.me/5511970830949',
  phone: '(11) 97083-0949',
  instagram: 'https://www.instagram.com/martellicareclinic/',
  doctorInstagram: 'https://www.instagram.com/drapriscillamartelli/',
  maps: 'https://www.google.com/maps/search/?api=1&query=Rua+Bento+de+Andrade+319+Jardim+Paulista+Sao+Paulo',
}

export function appointmentHref(procedure?: string) {
  return procedure
    ? clinic.whatsapp + '?text=' + encodeURIComponent('Olá! Gostaria de agendar uma avaliação para ' + procedure + '.')
    : clinic.whatsapp
}

export const procedures = [
  {
    slug: 'harmonizacao-facial',
    name: 'Harmonização facial',
    image: '/procedimentos/avaliacao-facial-martelli.jpg',
    extraPhoto: { src: '/procedimentos/planejamento-facial-martelli.jpg', alt: 'Dra. Priscilla durante o planejamento facial', position: '50% 46%' },
    comparison: { before: '/procedimentos/harmonizacao-antes.jpg', after: '/procedimentos/harmonizacao-depois.jpg' },
    alt: 'Marcação facial durante a avaliação',
    position: '50% 39%',
    description: 'Um plano individual para cuidar das proporções e do contorno do rosto, preservando seus traços.',
    approach: 'O planejamento considera as proporções, os contornos e os pontos de sustentação. Na avaliação, a doutora explica quais recursos podem ser usados no seu caso.',
    indication: 'Para quem busca cuidar das proporções e do contorno facial.',
    duration: 'Definida na avaliação, conforme o plano de atendimento',
    evaluation: 'Na consulta, a Dra. Priscilla avalia suas proporções faciais e conversa sobre quais técnicas fazem sentido para seus objetivos.',
  },
  {
    slug: 'bioestimuladores-de-colageno',
    name: 'Bioestimuladores de colágeno',
    image: '/bioestimuladores/registro-5457.webp',
    alt: 'Paciente com marcações faciais durante o planejamento do tratamento',
    position: '50% 44%',
    description: 'Bioestimuladores ajudam a pele a produzir colágeno. As mudanças na firmeza são graduais.',
    approach: 'Na avaliação, a Dra. Priscilla observa a região a tratar e explica o que esperar, quantas sessões podem ser indicadas e quais cuidados seguir após a aplicação.',
    indication: 'Para quem busca tratar a perda de firmeza da pele.',
    duration: 'Definida na avaliação, conforme o plano de atendimento',
    evaluation: 'Na consulta, a equipe avalia a área a tratar e explica a escolha do produto, o plano de sessões e os cuidados após a aplicação.',
  },
  {
    slug: 'preenchimentos',
    name: 'Preenchimento facial',
    image: '/procedimentos/planejamento-labial.jpg',
    alt: 'Publicação da Martelli Care Clinic sobre planejamento e naturalidade dos lábios',
    position: '50% 50%',
    description: 'Aplicação planejada para tratar a perda de volume ou dar suporte a áreas específicas do rosto.',
    approach: 'O planejamento começa pela região a tratar e pelo objetivo, como repor volume ou dar suporte. A técnica é definida na avaliação.',
    indication: 'Para quem busca repor volume ou dar suporte a áreas específicas.',
    duration: 'Definida na avaliação, conforme o plano de atendimento',
    evaluation: 'A escolha da região e da técnica parte da anatomia facial, das suas expectativas e do histórico de procedimentos. A avaliação também cobre riscos e cuidados posteriores.',
  },
  {
    slug: 'tecnologias-para-pele',
    name: 'Tecnologias para pele',
    image: '/procedimentos/tecnologia-em-atendimento.jpg',
    alt: 'Dra. Priscilla usando um aplicador durante o atendimento facial',
    position: '50% 72%',
    description: 'Recursos como lasers e radiofrequência para tratar necessidades específicas de textura e qualidade da pele.',
    approach: 'A equipe avalia a textura e a qualidade da pele para decidir se recursos como laser ou radiofrequência são adequados.',
    indication: 'Para quem busca tratar textura e qualidade da pele.',
    duration: 'Definida na avaliação, conforme o plano de atendimento',
    evaluation: 'A equipe avalia seu tipo de pele, o histórico de tratamentos e o objetivo da consulta para discutir qual tecnologia pode ser indicada.',
  },
]

export const featuredProcedures = [
  {
    slug: 'ultraformer',
    name: 'Ultraformer',
    image: '/retratos/ultraformer-instagram.jpg',
    alt: 'Dra. Priscilla apresentando o Ultraformer',
    position: '50% 43%',
    description: 'Ultrassom focalizado para trabalhar a firmeza e o contorno de áreas selecionadas.',
    evaluation: 'Na avaliação, a equipe conversa sobre a área de interesse, a qualidade da pele e o histórico de tratamentos.',
  },
  {
    slug: 'elevare',
    name: 'Protocolo Elevare',
    image: '/retratos/elevare-instagram.jpg',
    alt: 'Dra. Priscilla apresentando o protocolo Elevare',
    position: '50% 56%',
    description: 'Protocolo facial da Dra. Priscilla para avaliar a sustentação e a harmonia dos traços.',
    evaluation: 'Na consulta, você pode conhecer a proposta do protocolo e discutir quais técnicas são indicadas para o seu caso.',
  },
  {
    slug: 'toxina-botulinica',
    name: 'Toxina Botulínica',
    image: '/retratos/toxina-instagram.jpg',
    alt: 'Frasco de toxina botulínica em mãos enluvadas',
    position: '50% 49%',
    description: 'Aplicação planejada para suavizar linhas de expressão, respeitando o movimento do rosto.',
    evaluation: 'A avaliação considera a musculatura facial em repouso e em movimento, os tratamentos anteriores e o resultado que você procura.',
  },
  {
    slug: 'blefaroplastia',
    name: 'Blefaroplastia',
    image: '/retratos/blefaroplastia-instagram.jpg',
    alt: 'Profissional com máscara e touca durante um procedimento',
    position: '50% 20%',
    description: 'Cirurgia das pálpebras para tratar excesso de pele e, conforme o caso, bolsas na região dos olhos.',
    evaluation: 'A consulta serve para avaliar as pálpebras e conversar sobre indicação, preparo, riscos e recuperação.',
  },
]

export const procedurePages = [...procedures, ...featuredProcedures]
export type Procedure = (typeof procedurePages)[number]
