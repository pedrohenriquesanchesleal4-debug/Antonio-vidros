/**
 * Soluções — 5 verticais de serviço em grid assimétrico.
 *
 * Cada card é funcional: "Solicitar orçamento" despacha
 * `QUOTE_EVENT_NAME` pré-selecionando o serviço no <QuoteForm />
 * (rolagem nativa até #orcamento via âncora).
 */

import { ArrowRight } from 'lucide-react';

import { SERVICES } from '../data/services';
import { QUOTE_EVENT_NAME, type QuoteEventDetail } from './QuoteForm';

export default function Solutions(): React.JSX.Element {
  const requestQuote = (serviceTitle: string): void => {
    window.dispatchEvent(
      new CustomEvent<QuoteEventDetail>(QUOTE_EVENT_NAME, {
        detail: { service: serviceTitle },
      }),
    );
  };

  return (
    <section
      id="solucoes"
      data-solutions
      aria-labelledby="solucoes-titulo"
      className="relative z-10 scroll-mt-24 bg-zinc-950 px-6 py-24 sm:px-10 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Intro editorial */}
        <div data-solutions-intro className="mb-14 max-w-3xl md:mb-20">
          <p className="numerals mb-6 text-[0.62rem] uppercase tracking-[0.36em] text-brass-400">
            01 — Soluções
          </p>
          <h2
            id="solucoes-titulo"
            className="font-display text-display-xl font-light text-zinc-50"
          >
            Cinco frentes, um mesmo padrão de execução.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
            Do corte industrial à regulagem em obra: a vertical que você escolher
            recebe a mesma especificação detalhada, o mesmo prazo combinado e a
            mesma equipe na instalação.
          </p>
          <div className="brass-rule mt-8 max-w-[220px]" aria-hidden="true" />
        </div>

        {/* Grid assimétrico: primeira vertical ocupa a linha inteira */}
        <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const isFirst = index === 0;
            return (
              <article
                key={service.id}
                data-solution-card
                className={`group relative flex flex-col bg-zinc-950 p-7 transition-colors duration-500 hover:bg-surface-raised md:p-9 ${
                  isFirst ? 'md:col-span-2' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <span
                      data-solution-icon
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-line bg-surface-raised text-brass-400 transition-colors duration-500 group-hover:border-brass-400/60 group-hover:text-brass-300"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="numerals text-[0.58rem] uppercase tracking-[0.3em] text-zinc-500">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <h3 className="font-display text-display-md font-light text-zinc-50">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <p className="hidden max-w-[240px] text-right text-xs leading-relaxed text-brass-300/90 md:block">
                    {service.tagline}
                  </p>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-zinc-400 md:max-w-2xl">
                  {service.description}
                </p>

                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {service.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-zinc-300"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-px w-3 shrink-0 bg-brass-400"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-xs italic text-zinc-500 md:hidden">
                  {service.tagline}
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-line pt-5">
                  <a
                    href="#orcamento"
                    onClick={() => requestQuote(service.title)}
                    className="group/cta flex items-center gap-2 text-sm font-semibold text-zinc-100 transition-colors duration-300 hover:text-brass-300"
                  >
                    Solicitar orçamento
                    <ArrowRight
                      className="h-4 w-4 text-brass-400 transition-transform duration-300 group-hover/cta:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                  <span className="numerals text-[0.58rem] uppercase tracking-[0.24em] text-zinc-600">
                    sob medida
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
