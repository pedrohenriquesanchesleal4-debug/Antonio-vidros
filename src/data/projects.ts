/**
 * Portfólio — contratos consumidos por <Projects />.
 *
 * `aspectRatio` é dado (semântico), não classe Tailwind: o componente mapeia
 * para a classe correspondente, mantendo o data-layer livre de CSS.
 */

export type ProjectCategory =
  | 'Residencial'
  | 'Comercial'
  | 'Institucional'
  | 'Corporativo';

export type ProjectAspectRatio = '4/5' | '3/2' | '1/1' | '16/9';

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly location: string;
  readonly year: number;
  readonly category: ProjectCategory;
  readonly description: string;
  /** Proporção editorial da imagem — define o ritmo do grid */
  readonly aspectRatio: ProjectAspectRatio;
  /** Área construída envolvida em vidro, m² */
  readonly glassAreaM2: number;
  /** Duração da execução, em semanas */
  readonly durationWeeks: number;
  /** Detalhe técnico que diferencia o projeto */
  readonly highlight: string;
  /** Caminho em public/ — assets preparados pelo agente Scout */
  readonly image: string;
  readonly imageAlt: string;
  readonly tags: readonly string[];
}

/**
 * ⚠️ PLACEHOLDER REGISTRADO (ver .agents/memoria/decisoes.md):
 * portfólio de demonstração com estrutura real. Substituir por projetos
 * reais (fotos, áreas, endereços) assim que o cliente enviar o material.
 */
export const PROJECTS: readonly Project[] = [
  {
    id: 'residencia-berrini',
    title: 'Residência Berrini',
    location: 'São Paulo, SP',
    year: 2025,
    category: 'Residencial',
    description:
      'Pé-direito duplo com guarda-corpo integral em vidro laminado, sem montantes verticais. A peçaria foi faturada em três chapas para preservar o alinhamento do reflexo no piso espelhado.',
    aspectRatio: '4/5',
    glassAreaM2: 86,
    durationWeeks: 6,
    highlight: 'Guarda-corpo contínuo de 6,2 m sem coluna aparente',
    image: '/images/projects/residencia-berrini.webp',
    imageAlt: 'Guarda-corpo em vidro laminado em sala de pé-direito duplo',
    tags: ['Temperado 12 mm', 'Laminado', 'Guarda-corpo'],
  },
  {
    id: 'escritorio-faria-lima',
    title: 'Escritório Faria Lima',
    location: 'São Paulo, SP',
    year: 2025,
    category: 'Corporativo',
    description:
      'Divisórias de vidro duplo com vedação acústica em 14 salas de reunião. Trilho embutido no forro e no piso desde a fase de projeto elétrico — zero reforço improvisado na obra.',
    aspectRatio: '3/2',
    glassAreaM2: 210,
    durationWeeks: 8,
    highlight: 'STC 38 com perfil de topo embutido no contrapiso',
    image: '/images/projects/escritorio-faria-lima.webp',
    imageAlt: 'Corredor de escritório com divisórias de vidro e perfis de alumínio',
    tags: ['Divisórias', 'Vidro duplo', 'Corporativo'],
  },
  {
    id: 'loja-clubes-jardins',
    title: 'Loja Clubes Jardins',
    location: 'São Paulo, SP',
    year: 2024,
    category: 'Comercial',
    description:
      'Fachada em peçaria única com furação industrial para fixação estrutural em pontos. O temperado incolor de 19 mm dispensa montante central e mantém a vitrine livre entre colunas.',
    aspectRatio: '1/1',
    glassAreaM2: 64,
    durationWeeks: 5,
    highlight: 'Fachada de 7,8 m em vidro 19 mm fixado estruturalmente',
    image: '/images/projects/loja-clubes-jardins.webp',
    imageAlt: 'Fachada comercial em vidro temperado incolor com fixação estrutural',
    tags: ['Fachada', 'Temperado 19 mm', 'Fixação estrutural'],
  },
  {
    id: 'cobertura-jardins',
    title: 'Cobertura Jardins',
    location: 'São Paulo, SP',
    year: 2024,
    category: 'Residencial',
    description:
      'Marquise e cobertura em vidro laminado com baguete de alumínio, drenagem calculada para vazão de chuva extrema. O pé-direito aberto segue iluminado mesmo em dia encoberto.',
    aspectRatio: '3/2',
    glassAreaM2: 48,
    durationWeeks: 4,
    highlight: 'Laminado com interlayer PVB e caimento de 3% para drenagem',
    image: '/images/projects/cobertura-jardins.webp',
    imageAlt: 'Cobertura em vidro laminado sobre área gourmet externa',
    tags: ['Cobertura', 'Laminado PVB', 'Marquise'],
  },
  {
    id: 'clinica-planet-saude',
    title: 'Clínica Planeta Saúde',
    location: 'Guarulhos, SP',
    year: 2024,
    category: 'Institucional',
    description:
      'Box e fechamentos em vidro fosco jateado para consultórios, combinando privacidade e luz natural. Peças numeradas por planta para montagem em ordem, sem retrabalho no andar.',
    aspectRatio: '4/5',
    glassAreaM2: 92,
    durationWeeks: 6,
    highlight: 'Fosco jateado em faixa de privacidade à altura do paciente',
    image: '/images/projects/clinica-planet-saude.webp',
    imageAlt: 'Consultório com fechamento em vidro fosco jateado',
    tags: ['Fosco', 'Box', 'Institucional'],
  },
  {
    id: 'loft-vila-madalena',
    title: 'Loft Vila Madalena',
    location: 'São Paulo, SP',
    year: 2023,
    category: 'Residencial',
    description:
      'Divisória pivotante entre quarto e home office em vidro incolor de 10 mm, com batente metálico embutido. A folha gira 180° e elimina o vão morto da planta original.',
    aspectRatio: '1/1',
    glassAreaM2: 22,
    durationWeeks: 3,
    highlight: 'Porta pivotante 180° com eixo embutido no piso',
    image: '/images/projects/loft-vila-madalena.webp',
    imageAlt: 'Loft com divisória pivotante em vidro incolor entre quarto e escritório',
    tags: ['Porta pivotante', 'Divisória', 'Temperado 10 mm'],
  },
] as const;
