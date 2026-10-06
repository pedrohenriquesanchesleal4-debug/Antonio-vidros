/**
 * Formulário de orçamento — porta de entrada real do funil.
 *
 * Validação tipada sem dependência (erros por campo, aria-invalid,
 * foco no primeiro erro). Submit monta a mensagem via
 * `buildQuoteMessage` e abre o WhatsApp (`buildWhatsAppUrl`) —
 * envio real, sem backend fake.
 *
 * Escuta `QUOTE_EVENT_NAME` (despachado por <Solutions />) para
 * pré-selecionar a vertical de interesse.
 */

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

import {
  buildMailtoUrl,
  buildQuoteMessage,
  buildWhatsAppUrl,
  CONTACT,
} from '../config/contact';
import { SERVICES } from '../data/services';

/** Nome global do evento de pré-seleção de serviço. */
export const QUOTE_EVENT_NAME = 'antoniovidros:quote:service';

export interface QuoteEventDetail {
  readonly service: string;
}

interface FormState {
  nome: string;
  servico: string;
  mensagem: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = { nome: '', servico: '', mensagem: '' };

function validate(state: FormState): FormErrors {
  const errors: FormErrors = {};
  const nome = state.nome.trim();
  if (nome.length === 0) {
    errors.nome = 'Informe seu nome.';
  } else if (nome.length < 2) {
    errors.nome = 'Nome muito curto — mínimo de 2 caracteres.';
  }
  if (state.servico.length === 0) {
    errors.servico = 'Selecione a solução de interesse.';
  }
  if (state.mensagem.length > 1200) {
    errors.mensagem = 'Mensagem longa demais (máx. 1200 caracteres).';
  }
  return errors;
}

export default function QuoteForm(): React.JSX.Element {
  const [state, setState] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  /* Pré-seleção vinda do <Solutions /> */
  useEffect(() => {
    const onSelect = (event: Event): void => {
      const detail = (event as CustomEvent<QuoteEventDetail>).detail;
      if (!detail?.service) {
        return;
      }
      const match = SERVICES.find((service) => service.title === detail.service);
      if (match) {
        setState((previous) => ({ ...previous, servico: match.title }));
        setErrors((previous) => ({ ...previous, servico: undefined }));
        selectRef.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener(QUOTE_EVENT_NAME, onSelect);
    return () => window.removeEventListener(QUOTE_EVENT_NAME, onSelect);
  }, []);

  const update = (field: keyof FormState, value: string): void => {
    setState((previous) => ({ ...previous, [field]: value }));
    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    }
  };

  const submit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const found = validate(state);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = found.nome ? 'nome' : found.servico ? 'servico' : 'mensagem';
      const field = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      field?.focus();
      return;
    }
    const message = buildQuoteMessage({
      nome: state.nome.trim(),
      servico: state.servico,
      mensagem: state.mensagem,
    });
    setSubmitted(true);
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  const fieldClasses = (invalid: boolean): string =>
    `w-full rounded border bg-surface-raised/70 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition-colors duration-300 focus:outline-none ${
      invalid
        ? 'border-red-400/70 focus:border-red-400'
        : 'border-line focus:border-brass-400'
    }`;

  return (
    <section
      id="orcamento"
      data-quote
      aria-labelledby="orcamento-titulo"
      className="relative z-10 scroll-mt-24 bg-zinc-950 px-6 py-24 sm:px-10 md:px-16 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
        {/* Coluna editorial */}
        <div data-quote-reveal>
          <p className="numerals mb-6 text-[0.62rem] uppercase tracking-[0.36em] text-brass-400">
            04 — Orçamento
          </p>
          <h2
            id="orcamento-titulo"
            className="font-display text-display-xl font-light text-zinc-50"
          >
            Vamos transformar sua ideia em espaço?
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400">
            Descreva o que precisa resolver. A conversa é com quem executa: você
            recebe resposta com faixa de investimento, prazo e os próximos
            passos — sem formulário genérico engavetado.
          </p>

          <div className="brass-rule mt-8 max-w-[220px]" aria-hidden="true" />

          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="numerals text-[0.58rem] uppercase tracking-[0.28em] text-zinc-500">
                WhatsApp
              </dt>
              <dd className="mt-1 text-sm text-zinc-200">{CONTACT.whatsapp.display}</dd>
            </div>
            <div>
              <dt className="numerals text-[0.58rem] uppercase tracking-[0.28em] text-zinc-500">
                Telefone
              </dt>
              <dd className="mt-1 text-sm text-zinc-200">{CONTACT.phone.display}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="numerals text-[0.58rem] uppercase tracking-[0.28em] text-zinc-500">
                E-mail
              </dt>
              <dd className="mt-1 text-sm text-zinc-200">{CONTACT.email}</dd>
            </div>
          </dl>
        </div>

        {/* Formulário */}
        <div data-quote-reveal className="glass-panel rounded p-6 sm:p-8">
          {submitted ? (
            <div role="status" className="flex h-full min-h-72 flex-col justify-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brass-400 text-brass-300">
                <Check className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-display text-display-md font-light text-zinc-50">
                Conversa iniciada.
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                Abrimos o WhatsApp com sua solicitação preenchida. Se a janela
                não abriu,{' '}
                <a
                  className="text-brass-300 underline underline-offset-4"
                  href={buildWhatsAppUrl(
                    buildQuoteMessage({
                      nome: state.nome.trim(),
                      servico: state.servico,
                      mensagem: state.mensagem,
                    }),
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  clique aqui para enviar
                </a>{' '}
                ou escreva para{' '}
                <a
                  className="text-brass-300 underline underline-offset-4"
                  href={buildMailtoUrl()}
                >
                  {CONTACT.email}
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => {
                  setState(INITIAL);
                  setSubmitted(false);
                }}
                className="mt-2 self-start rounded border border-line-strong px-4 py-2 text-xs font-semibold text-zinc-300 transition-colors duration-300 hover:border-brass-400 hover:text-brass-300"
              >
                Enviar outra solicitação
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={submit} noValidate className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="quote-nome"
                  className="numerals mb-2 block text-[0.58rem] uppercase tracking-[0.28em] text-zinc-400"
                >
                  Nome *
                </label>
                <input
                  id="quote-nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  value={state.nome}
                  onChange={(event) => update('nome', event.target.value)}
                  aria-invalid={errors.nome !== undefined}
                  aria-describedby={errors.nome ? 'quote-nome-erro' : undefined}
                  placeholder="Como devemos te chamar"
                  className={fieldClasses(errors.nome !== undefined)}
                />
                {errors.nome && (
                  <p id="quote-nome-erro" role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.nome}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="quote-servico"
                  className="numerals mb-2 block text-[0.58rem] uppercase tracking-[0.28em] text-zinc-400"
                >
                  Solução de interesse *
                </label>
                <select
                  ref={selectRef}
                  id="quote-servico"
                  name="servico"
                  value={state.servico}
                  onChange={(event) => update('servico', event.target.value)}
                  aria-invalid={errors.servico !== undefined}
                  aria-describedby={errors.servico ? 'quote-servico-erro' : undefined}
                  className={fieldClasses(errors.servico !== undefined)}
                >
                  <option value="">Selecione uma vertical</option>
                  {SERVICES.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
                {errors.servico && (
                  <p
                    id="quote-servico-erro"
                    role="alert"
                    className="mt-1.5 text-xs text-red-400"
                  >
                    {errors.servico}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="quote-mensagem"
                  className="numerals mb-2 block text-[0.58rem] uppercase tracking-[0.28em] text-zinc-400"
                >
                  Detalhes do projeto
                </label>
                <textarea
                  id="quote-mensagem"
                  name="mensagem"
                  rows={5}
                  value={state.mensagem}
                  onChange={(event) => update('mensagem', event.target.value)}
                  aria-invalid={errors.mensagem !== undefined}
                  aria-describedby={errors.mensagem ? 'quote-mensagem-erro' : undefined}
                  placeholder="Espaço, medidas se tiver, prazo desejado…"
                  className={`${fieldClasses(errors.mensagem !== undefined)} resize-y`}
                />
                <div className="mt-1.5 flex items-start justify-between gap-4">
                  {errors.mensagem ? (
                    <p role="alert" className="text-xs text-red-400">
                      {errors.mensagem}
                    </p>
                  ) : (
                    <span className="text-xs text-zinc-600">Opcional</span>
                  )}
                  <span className="numerals text-[0.58rem] text-zinc-600">
                    {state.mensagem.length}/1200
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="group mt-1 flex items-center justify-center gap-2 rounded border border-brass-400 bg-brass-400 px-6 py-3.5 text-sm font-semibold tracking-wide text-zinc-950 transition-colors duration-300 hover:bg-brass-300"
              >
                Enviar pelo WhatsApp
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
              <p className="text-center text-[0.68rem] leading-relaxed text-zinc-600">
                Ao enviar, o WhatsApp abre com a mensagem pronta — nada é
                compartilhado sem você confirmar.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
