/**
 * Contato central — fonte única da verdade para WhatsApp, telefone e e-mail.
 *
 * Qualquer componente (WhatsAppButton, QuoteForm, Footer) consome daqui;
 * nunca duplica número inline. Mensagens são configuráveis por template.
 */

export interface WhatsAppContact {
  /** Formato E.164 sem '+' (ex.: 5511999999999) — usado em wa.me/<numero> */
  readonly e164: string;
  /** Formato exibido ao humano (ex.: '(11) 99999-9999') */
  readonly display: string;
}

export interface PhoneContact {
  readonly e164: string;
  readonly display: string;
}

export interface ContactConfig {
  readonly whatsapp: WhatsAppContact;
  readonly phone: PhoneContact;
  readonly email: string;
  /** Mensagem-base do WhatsApp, usada como default em links wa.me */
  readonly baseMessage: string;
  /** Assunto-base do e-mail */
  readonly emailSubject: string;
  readonly social: {
    readonly instagram: string | null;
  };
}

/**
 * ⚠️ PLACEHOLDER REGISTRADO (ver .agents/memoria/decisoes.md):
 * dados de contato reais ainda não foram fornecidos pelo cliente.
 * Trocar por: +55 <DDD> <número real> e e-mail real antes do deploy.
 */
export const CONTACT: ContactConfig = {
  whatsapp: {
    e164: '5511999999999',
    display: '(11) 99999-9999',
  },
  phone: {
    e164: '551133333333',
    display: '(11) 3333-3333',
  },
  email: 'contato@antoniovidros.com.br',
  baseMessage:
    'Olá! Vim pelo site da Antônio Vidros e gostaria de solicitar um orçamento.',
  emailSubject: 'Solicitação de orçamento — site Antônio Vidros',
  social: {
    instagram: null,
  },
} as const;

/** Monta link wa.me com a mensagem informada (ou a base). */
export function buildWhatsAppUrl(message: string = CONTACT.baseMessage): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CONTACT.whatsapp.e164}?text=${encoded}`;
}

/** Monta link tel: para discagem direta. */
export function buildPhoneUrl(): string {
  return `tel:+${CONTACT.phone.e164}`;
}

/** Monta link mailto: com assunto opcional e corpo opcional. */
export function buildMailtoUrl(
  subject: string = CONTACT.emailSubject,
  body?: string,
): string {
  const params = new URLSearchParams({ subject });
  if (body !== undefined && body.length > 0) {
    params.set('body', body);
  }
  return `mailto:${CONTACT.email}?${params.toString()}`;
}

/** Mensagem de orçamento parametrizada — usada pelo QuoteForm e CTAs. */
export function buildQuoteMessage(params: {
  readonly nome: string;
  readonly servico: string;
  readonly mensagem?: string;
}): string {
  const linhas = [
    CONTACT.baseMessage,
    '',
    `Nome: ${params.nome}`,
    `Serviço de interesse: ${params.servico}`,
  ];
  if (params.mensagem !== undefined && params.mensagem.trim().length > 0) {
    linhas.push(`Detalhes: ${params.mensagem.trim()}`);
  }
  return linhas.join('\n');
}
