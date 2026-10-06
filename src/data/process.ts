/**
 * Processo em 5 etapas — contratos consumidos por <Process />.
 * Numeração é string ('01'…'05') para preservar zero à esquerda no render.
 */

import type { LucideIcon } from 'lucide-react';
import { Check, Compass, Hammer, MessageCircle, Ruler } from 'lucide-react';

export type ProcessStepId =
  | 'conversa'
  | 'entendimento'
  | 'projeto'
  | 'execucao'
  | 'entrega';

export interface ProcessStep {
  readonly id: ProcessStepId;
  /** Numeração editorial exibida ('01' … '05') */
  readonly number: string;
  readonly icon: LucideIcon;
  readonly title: string;
  readonly description: string;
  /** Concreto que sai da etapa — o cliente sabe quando ela terminou */
  readonly outcome: string;
}

export const PROCESS: readonly ProcessStep[] = [
  {
    id: 'conversa',
    number: '01',
    icon: MessageCircle,
    title: 'Conversa',
    description:
      'Você descreve o espaço e o que precisa resolver — uma porta que não fecha, uma sacada sem guarda-corpo, um plano que precisa de luz sem perder privacidade. Sem formulário genérico: a conversa é com quem executa.',
    outcome: 'Escopo inicial entendido e faixa de investimento alinhada',
  },
  {
    id: 'entendimento',
    number: '02',
    icon: Compass,
    title: 'Entendimento',
    description:
      'Visita técnica ou envio de planta com medidas reais. Conferimos vãos, níveis, tipo de esquadria e condições de fixação no local — cada variável que decide espessura, ferragem e prazo.',
    outcome: 'Levantamento dimensional e especificação técnica preliminar',
  },
  {
    id: 'projeto',
    number: '03',
    icon: Ruler,
    title: 'Projeto',
    description:
      'Detalhamento executivo com corte, furação e encaixes desenhados antes de qualquer peça sair da fábrica. Você aprova desenho e amostra de acabamento; só então o material é cortado.',
    outcome: 'Desenho executivo aprovado e orçamento fechado por peça',
  },
  {
    id: 'execucao',
    number: '04',
    icon: Hammer,
    title: 'Execução',
    description:
      'Fabricação com temperagem controlada, corte de precisão e montagem em obra na data combinada. Equipe própria, proteção de piso e mobiliário, e regulagem de nível em cada folha instalada.',
    outcome: 'Peças instaladas, reguladas e área liberada para uso',
  },
  {
    id: 'entrega',
    number: '05',
    icon: Check,
    title: 'Entrega',
    description:
      'Vistoria conjunta, orientação de limpeza e cuidados com o material, e garantia registrada por nota. O canal de contato continua aberto — manutenção e ajustes futuros falam com a mesma equipe.',
    outcome: 'Garantia documentada e canal direto de pós-venda',
  },
] as const;
