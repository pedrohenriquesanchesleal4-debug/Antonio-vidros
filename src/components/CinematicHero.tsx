/**
 * Hero cinematográfico — vídeo em tela cheia com poster já visível.
 *
 * Frame de 145svh com miolo sticky (100svh): as seções seguintes sobem
 * por cima (`relative z-10 bg-zinc-950` no App) enquanto o exit-scrub
 * escurece a mídia (scrollAnimations).
 *
 * Sinaliza prontidão da coreografia via `HERO_START_EVENT` — despachado
 * no primeiro frame possível (canplay ou tick seguinte ao mount) com
 * fallback de segurança: o ouvinte (App) nunca fica sem gatilho.
 * Toggle de play/pause é controle real do <video>, com aria-pressed.
 */

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

import { HERO_START_EVENT } from '../animations/heroAnimations';

/** Copy exata aprovada pelo Maestro. */
const HEADLINE = 'Seu espaço começa na transparência.';
const SUPPORT =
  'Soluções em vidro pensadas para transformar ambientes, valorizar a arquitetura e criar espaços que impressionam.';

export default function CinematicHero(): React.JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  /* Despacha o gatilho da intro do hero de forma idempotente. */
  useEffect(() => {
    const video = videoRef.current;
    let dispatched = false;
    const dispatch = (): void => {
      if (dispatched) {
        return;
      }
      dispatched = true;
      // setTimeout(0): o listener do App (useEffect, passive) fica registrado
      // antes do timer — effects filhos rodam antes, mas timers são posteriores.
      window.setTimeout(() => {
        window.dispatchEvent(new Event(HERO_START_EVENT));
      }, 0);
    };

    if (video && video.readyState >= 2) {
      dispatch();
    }
    video?.addEventListener('canplay', dispatch, { once: true });
    // Fallback de segurança caso o vídeo nunca dispare canplay (rede lenta).
    const safety = window.setTimeout(dispatch, 2200);

    return () => {
      window.clearTimeout(safety);
      video?.removeEventListener('canplay', dispatch);
    };
  }, []);

  const togglePlayback = (): void => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    if (video.paused) {
      void video.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      data-hero
      aria-label="Abertura Antônio Vidros"
      className="relative h-[145svh]"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Mídia: poster já renderiza antes do vídeo; zoom é da intro (heroAnimations) */}
        <div data-hero-media className="absolute inset-0 will-change-transform">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster="/images/hero-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/videos/antonio-vidros-hero-mobile.mp4" media="(max-width: 767px)" />
            <source src="/videos/antonio-vidros-hero.webm" type="video/webm" />
            <source src="/videos/antonio-vidros-hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Camada de leitura + exit overlay (escurece no scroll) */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/35 to-zinc-950/85"
          aria-hidden="true"
        />
        <div
          data-hero-overlay
          aria-hidden="true"
          className="absolute inset-0 bg-zinc-950 opacity-0"
        />

        {/* Conteúdo */}
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-14 sm:px-10 md:px-16 md:pb-20">
          <p
            data-hero-eyebrow
            className="numerals mb-5 text-[0.68rem] uppercase tracking-[0.34em] text-brass-400"
          >
            Vidros sob medida — São Paulo
          </p>

          <div className="max-w-5xl overflow-hidden">
            <h1
              data-hero-title
              className="font-display text-display-2xl font-light text-zinc-50"
            >
              {HEADLINE}
            </h1>
          </div>

          <p
            data-hero-support
            className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg"
          >
            {SUPPORT}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              data-hero-cta
              href="#orcamento"
              className="rounded border border-brass-400 bg-brass-400 px-6 py-3 text-sm font-semibold tracking-wide text-zinc-950 transition-colors duration-300 hover:bg-brass-300"
            >
              Solicitar orçamento
            </a>
            <a
              data-hero-cta
              href="#solucoes"
              className="rounded border border-line-strong px-6 py-3 text-sm font-semibold tracking-wide text-zinc-100 backdrop-blur-sm transition-colors duration-300 hover:border-zinc-100/50 hover:bg-zinc-100/10"
            >
              Conhecer soluções
            </a>
          </div>
        </div>

        {/* Chrome: indicador de scroll + controle de vídeo */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-6 pb-5 sm:px-10 md:px-16">
          <span
            data-hero-scroll
            aria-hidden="true"
            className="numerals hidden text-[0.65rem] uppercase tracking-[0.3em] text-zinc-400 sm:block"
          >
            ↓ explorar
          </span>
          <button
            type="button"
            data-hero-toggle
            onClick={togglePlayback}
            aria-pressed={playing}
            aria-label={playing ? 'Pausar vídeo de fundo' : 'Reproduzir vídeo de fundo'}
            className="pointer-events-auto ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-zinc-950/60 text-zinc-200 backdrop-blur-sm transition-colors duration-300 hover:border-brass-400 hover:text-brass-300"
          >
            {playing ? (
              <Pause className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Play className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
