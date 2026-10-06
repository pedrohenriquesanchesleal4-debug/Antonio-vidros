/**
 * Linhas de serviço — contratos consumidos por <Solutions />.
 * Cinco verticais do negócio, com ícone lucide tipado (LucideIcon).
 */

import type { LucideIcon } from 'lucide-react';
import { Building2, DoorOpen, Frame, GlassWater, PanelsTopLeft } from 'lucide-react';

export type ServiceId =
  | 'vidros'
  | 'espelhos'
  | 'fechamentos'
  | 'divisorias'
  | 'arquitetonicas';

export interface Service {
  readonly id: ServiceId;
  readonly icon: LucideIcon;
  /** Título curto da vertical */
  readonly title: string;
  /** Uma linha de posicionamento, tom editorial */
  readonly tagline: string;
  /** Descrição completa (2–3 frases), sem genérico de IA */
  readonly description: string;
  /** Entregáveis/técnicas concretas — o que entra no orçamento */
  readonly highlights: readonly string[];
}

export const SERVICES: readonly Service[] = [
  {
    id: 'vidros',
    icon: GlassWater,
    title: 'Vidros',
    tagline: 'Transparência calculada, estrutura invisível.',
    description:
      'Vidros temperados e laminados cortados sob medida para fachadas, sacadas, coberturas e esquadrias. Cada peça sai da fábrica com especificação de espessura, tratamento e encaixe conferida contra o projeto, não contra a régua do dia.',
    highlights: [
      'Vidro temperado incolor, fosco e jateado',
      'Laminado de segurança para sacadas e guardas',
      'Fachadas em peçaria única com furação industrial',
      'Coberturas e marquises em vidro estrutural',
    ],
  },
  {
    id: 'espelhos',
    icon: Frame,
    title: 'Espelhos',
    tagline: 'Área dobrada com precisão de borda.',
    description:
      'Espelhos sob medida para closets, academias, salões e revestimentos murais. Bordas polidas, furação para suportes e acabamento de topo — aplicação que não entrega ondulação nem reflexo desalinhado.',
    highlights: [
      'Revestimento mural contínuo, sem emenda aparente',
      'Espelhos com corte de prateleira e furação técnica',
      'Acabamento bronze, fumê e cristal',
      'Aplicação em closets, academias e salões',
    ],
  },
  {
    id: 'fechamentos',
    icon: DoorOpen,
    title: 'Fechamentos',
    tagline: 'Divisão que some quando não precisa estar.',
    description:
      'Portas, box e fechamentos em vidro que organizam o espaço sem cortar a luz. Perfis alumínio de linha fina, ferragens selecionadas e regulagem de nível na instalação — a folha fecha sem arrastar.',
    highlights: [
      'Portas pivotantes e correr em trilho embutido',
      'Box de banheiro em vidro temperado 8–12 mm',
      'Perfis de alumínio line, anodizado ou pintado',
      'Ferragens de marcas com garantia de fabricante',
    ],
  },
  {
    id: 'divisorias',
    icon: PanelsTopLeft,
    title: 'Divisórias',
    tagline: 'Ambientes que se reorganizam por planta.',
    description:
      'Divisórias corporativas e residenciais que separam funções sem murar o plano livre. Do painel fixo ao sistema de dobrar e empilhar, dimensionado conforme o espaço de circulação real.',
    highlights: [
      'Painéis fixos com estrutura de topo e contrapiso',
      'Sistemas dobráveis e articulados',
      'Vidro duplo com vedação acústica',
      'Aplicação em escritórios, clínicas e residências',
    ],
  },
  {
    id: 'arquitetonicas',
    icon: Building2,
    title: 'Soluções arquitetônicas',
    tagline: 'O vidro entra na planta antes do primeiro corte.',
    description:
      'Consultoria direta com escritórios e construtoras: viabilidade de peçaria, detalhamento de encaixes, cálculo de cargas em guarda-corpos e compatibilização com esquadria metálica. A especificação nasce com o projeto — não na obra.',
    highlights: [
      'Detalhamento executivo compatibilizado com o projeto',
      'Viabilidade técnica de furação e peçaria',
      'Guarda-corpos e rampas com cálculo de carga',
      'Acompanhamento de obra até a última peça',
    ],
  },
] as const;
