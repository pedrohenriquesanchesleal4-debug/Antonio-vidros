/**
 * Ponto de composição do site Antônio Vidros.
 *
 * Orquestração de animação:
 * - `useLayoutEffect` (fase de layout, antes do paint): cria a intro do
 *   hero (aplica estados iniciais sem flash), init do scroll e da
 *   transição do header; tudo com cleanup completo (StrictMode-safe).
 * - `useEffect` (fase passive): assina `HERO_START_EVENT` + fallback por
 *   timeout — o listener fica registrado depois de qualquer dispatch de
 *   filho, então o gatilho nunca se perde.
 *
 * Ordem visual: hero sticky (145svh) → seções com `relative z-10
 * bg-zinc-950` sobem por cima enquanto o exit-scrub escurece a mídia.
 */

import { useEffect, useLayoutEffect, useRef } from 'react';

import {
  createHeroIntro,
  HERO_START_EVENT,
  type HeroIntroController,
} from './animations/heroAnimations';
import { initScrollAnimations } from './animations/scrollAnimations';
import { initHeaderTransition, type HeaderTransition } from './animations/transitions';
import CinematicHero from './components/CinematicHero';
import Footer from './components/Footer';
import Header from './components/Header';
import Manifesto from './components/Manifesto';
import Process from './components/Process';
import Projects from './components/Projects';
import QuoteForm from './components/QuoteForm';
import Solutions from './components/Solutions';
import WhatsAppButton from './components/WhatsAppButton';

/** Fallback: se nenhum gatilho chegar, a intro começa mesmo assim. */
const START_FALLBACK_MS = 2400;

export default function App(): React.JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HeroIntroController | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const hero = root.querySelector<HTMLElement>('[data-hero]');
    const header = root.querySelector<HTMLElement>('[data-header]');

    let intro: HeroIntroController | null = null;
    if (hero) {
      intro = createHeroIntro(hero, { header });
      introRef.current = intro;
    }

    const stopScroll = initScrollAnimations(root);
    let headerTransition: HeaderTransition | null = null;
    if (header) {
      headerTransition = initHeaderTransition(header);
    }

    return () => {
      stopScroll();
      headerTransition?.revert();
      intro?.revert();
      introRef.current = null;
    };
  }, []);

  useEffect(() => {
    const start = (): void => {
      introRef.current?.start();
    };
    window.addEventListener(HERO_START_EVENT, start);
    const safety = window.setTimeout(start, START_FALLBACK_MS);

    return () => {
      window.removeEventListener(HERO_START_EVENT, start);
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <div ref={rootRef} id="topo" className="min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-modal focus:rounded focus:border focus:border-brass-400 focus:bg-zinc-950 focus:px-4 focus:py-2 focus:text-sm"
      >
        Pular para o conteúdo
      </a>

      <CinematicHero />
      <Header />

      <main id="conteudo-principal" aria-label="Antônio Vidros — Soluções em Vidro">
        <Manifesto />
        <Solutions />
        <Projects />
        <Process />
        <QuoteForm />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
