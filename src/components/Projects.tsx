/**
 * Projetos — portfólio editorial com grid assimétrico.
 *
 * Fallback aprovado (decisão registrada): enquanto as imagens do front
 * do Scout (`public/images/projects/*.webp`) não existirem, `onError`
 * troca o <img> por um painel de vidro técnico (gradiente + grid
 * blueprint + badge de proporção), sem layout shift (o contêiner já
 * reserva a proporção) e sem ícone de imagem quebrada.
 */

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { PROJECTS, type ProjectAspectRatio } from '../data/projects';

/** Proporção semântica → classe Tailwind (dado fora do data-layer). */
const ASPECT_CLASSES: Record<ProjectAspectRatio, string> = {
  '4/5': 'aspect-[4/5]',
  '3/2': 'aspect-[3/2]',
  '1/1': 'aspect-square',
  '16/9': 'aspect-video',
} as const;

function ProjectFigure({ project }: { readonly project: (typeof PROJECTS)[number] }): React.JSX.Element {
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className={`relative w-full overflow-hidden border border-line bg-surface-raised ${ASPECT_CLASSES[project.aspectRatio]}`}
    >
      {failed ? (
        /* Painel de vidro técnico — grade blueprint + brilho de borda */
        <div
          data-project-media
          className="absolute -inset-y-[7%] inset-x-0 flex items-center justify-center bg-[linear-gradient(160deg,#111113_0%,#18181b_48%,#0c141b_100%)]"
          role="img"
          aria-label={`${project.imageAlt} (imagem em preparação)`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(115,164,194,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(115,164,194,0.5)_1px,transparent_1px)] [background-size:44px_44px]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(244,244,245,0.08),transparent_55%)]"
          />
          <span className="numerals relative rounded border border-brass-400/50 bg-zinc-950/70 px-4 py-2 text-[0.6rem] uppercase tracking-[0.3em] text-brass-300 backdrop-blur-sm">
            {project.aspectRatio} — em preparação
          </span>
        </div>
      ) : (
        /* O transform (parallax) pertence ao GSAP; hover usa brilho */
        <img
          data-project-media
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute -inset-y-[7%] inset-x-0 h-[114%] w-full object-cover transition-[filter] duration-700 ease-out-expo group-hover:brightness-110"
        />
      )}

      {/* Leitura sempre legível */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-zinc-950/92 via-zinc-950/25 to-transparent"
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="numerals mb-1.5 text-[0.56rem] uppercase tracking-[0.3em] text-brass-300">
          {project.category} · {String(project.year)}
        </p>
        <h3 className="font-display text-display-md font-light text-zinc-50">
          {project.title}
        </h3>
        <p className="mt-1 text-xs text-zinc-400">{project.location}</p>
      </figcaption>
    </figure>
  );
}

export default function Projects(): React.JSX.Element {
  return (
    <section
      id="projetos"
      data-projects
      aria-labelledby="projetos-titulo"
      className="relative z-10 scroll-mt-24 border-t border-line bg-zinc-950 px-6 py-24 sm:px-10 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div data-projects-intro className="mb-14 max-w-3xl md:mb-20">
          <p className="numerals mb-6 text-[0.62rem] uppercase tracking-[0.36em] text-brass-400">
            02 — Projetos
          </p>
          <h2
            id="projetos-titulo"
            className="font-display text-display-xl font-light text-zinc-50"
          >
            Onde o vidro já virou estrutura.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
            Amostra de execuções com número, prazo e detalhe técnico — área de
            vidro, semanas de obra e o que torna cada peça específica demais
            para ser catálogo.
          </p>
          <div className="brass-rule mt-8 max-w-[220px]" aria-hidden="true" />
        </div>

        {/* Grid editorial assimétrico: ritmo de proporções, não cards iguais */}
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-12">
          {PROJECTS.map((project, index) => (
            <article
              key={project.id}
              data-project-card
              className={`group flex flex-col ${
                index % 3 === 0
                  ? 'md:col-span-7'
                  : index % 3 === 1
                    ? 'md:col-span-5 md:mt-16'
                    : index % 3 === 2
                      ? 'md:col-span-6'
                      : ''
              }`}
            >
              <ProjectFigure project={project} />

              <div className="mt-4 flex items-start justify-between gap-4 border-t border-line pt-4">
                <p className="max-w-md text-xs leading-relaxed text-zinc-400">
                  {project.highlight}
                </p>
                <a
                  href="#orcamento"
                  aria-label={`Solicitar orçamento — projeto ${project.title}`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-line text-zinc-400 transition-colors duration-300 hover:border-brass-400 hover:text-brass-300"
                >
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              {/* Métricas concretas — dado, não adjetivo */}
              <dl className="numerals mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[0.6rem] uppercase tracking-[0.18em] text-zinc-500">
                <div className="flex gap-1.5">
                  <dt>Área</dt>
                  <dd className="text-zinc-300">{String(project.glassAreaM2)} m²</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt>Obra</dt>
                  <dd className="text-zinc-300">{String(project.durationWeeks)} sem</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt>Especificação</dt>
                  <dd className="text-zinc-300">{project.tags.join(' · ')}</dd>
                </div>
              </dl>

              <p className="mt-3 text-sm leading-relaxed text-zinc-500 md:hidden">
                {project.description}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-14 max-w-2xl text-xs leading-relaxed text-zinc-600">
          Portfólio de demonstração com estrutura real de projeto — fotos,
          áreas e endereços serão substituídos pelo material do cliente.
        </p>
      </div>
    </section>
  );
}
