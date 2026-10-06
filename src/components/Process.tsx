/**
 * Processo — 5 etapas com trilho vertical animado.
 *
 * Trilho (`data-process-rail`) desenha conforme o scroll (scrub);
 * etapas entram em cascata. Cada etapa expõe `outcome`: o concreto
 * que marca o fim dela — cliente sabe quando a fase terminou.
 */

import { PROCESS } from '../data/process';

export default function Process(): React.JSX.Element {
  return (
    <section
      id="processo"
      data-process
      aria-labelledby="processo-titulo"
      className="relative z-10 scroll-mt-24 border-t border-line bg-zinc-950 px-6 py-24 sm:px-10 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div data-process-intro className="mb-14 max-w-3xl md:mb-20">
          <p className="numerals mb-6 text-[0.62rem] uppercase tracking-[0.36em] text-brass-400">
            03 — Processo
          </p>
          <h2
            id="processo-titulo"
            className="font-display text-display-xl font-light text-zinc-50"
          >
            Da conversa à garantia, cinco etapas sem surpresa.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
            Nenhuma peça é cortada antes do desenho aprovado e nenhum prazo é
            prometido antes da medida real. O que muda de fase é evidência,
            não pressa.
          </p>
          <div className="brass-rule mt-8 max-w-[220px]" aria-hidden="true" />
        </div>

        <ol data-process-steps className="relative space-y-10 md:space-y-14">
          {/* Trilho: linha vertical que desenha com o scroll (scrub) */}
          <div
            aria-hidden="true"
            className="absolute inset-y-3 left-5 w-px bg-line md:left-7"
          >
            <div
              data-process-rail
              className="h-full w-px origin-top bg-gradient-to-b from-brass-400 via-brass-500/70 to-brass-400/0"
            />
          </div>

          {PROCESS.map((step) => {
            const Icon = step.icon;
            return (
              <li
                key={step.id}
                data-process-step
                className="relative pl-16 md:pl-24"
              >
                {/* Marcador da etapa */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface-raised text-brass-400 md:left-2 md:h-14 md:w-14"
                >
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </span>

                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span
                    data-process-number
                    className="numerals text-display-md font-light text-brass-400"
                  >
                    {step.number}
                  </span>
                  <h3 className="font-display text-display-md font-light text-zinc-50">
                    {step.title}
                  </h3>
                </div>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
                  {step.description}
                </p>

                <p className="mt-4 flex items-start gap-2.5 border-l-2 border-brass-400/60 pl-4 text-xs leading-relaxed text-zinc-300">
                  <span
                    className="numerals shrink-0 pt-0.5 text-[0.55rem] uppercase tracking-[0.24em] text-brass-400"
                    aria-hidden="true"
                  >
                    entrega
                  </span>
                  {step.outcome}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
