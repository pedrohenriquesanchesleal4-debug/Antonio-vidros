/**
 * Coreografia de entrada do Hero cinematográfico.
 *
 * Sequência: poster já visível (nunca tela preta) → vídeo inicia →
 * timeline revela header, headline (máscara), texto de apoio, CTAs e
 * indicador de scroll. Toda a timeline vive dentro de `gsap.context()`
 * com escopo no hero, para que `revert()` desfaça cada estilo inline
 * no unmount (StrictMode-safe).
 *
 * `prefers-reduced-motion: reduce` → nenhuma configuração inicial é
 * aplicada: o conteúdo permanece visível no DOM e a timeline fica vazia.
 */

import { gsap } from 'gsap';

/** Evento disparado quando o vídeo do Hero está pronto para a revelação. */
export const HERO_START_EVENT = 'antoniovidros:hero:start';

/** Preferência de movimento do usuário, lida de forma segura no cliente. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export interface HeroIntroOptions {
  /** Header fixo (fora do hero): itens `[data-header-reveal]` entram na coreografia. */
  readonly header?: HTMLElement | null;
}

export interface HeroIntroController {
  /** Dispara a coreografia uma única vez (idempotente). */
  start(): void;
  /** Kill da timeline + revert dos estilos inline aplicados pelo contexto. */
  revert(): void;
}

const isElement = (el: HTMLElement | null): el is HTMLElement => el !== null;

/**
 * Cria (pausada) a timeline de abertura do Hero.
 * Estados iniciais ficam aplicados antes do primeiro paint quando a
 * animação é permitida; sob reduced-motion nada é tocado.
 */
export function createHeroIntro(
  hero: HTMLElement,
  options: HeroIntroOptions = {},
): HeroIntroController {
  const reduced = prefersReducedMotion();
  const timeline = gsap.timeline({ paused: true });
  let started = false;

  const context = gsap.context(() => {
    const headerItems = options.header
      ? Array.from(options.header.querySelectorAll<HTMLElement>('[data-header-reveal]'))
      : [];
    const media = hero.querySelector<HTMLElement>('[data-hero-media]');
    const eyebrow = hero.querySelector<HTMLElement>('[data-hero-eyebrow]');
    const title = hero.querySelector<HTMLElement>('[data-hero-title]');
    const support = hero.querySelector<HTMLElement>('[data-hero-support]');
    const ctas = Array.from(hero.querySelectorAll<HTMLElement>('[data-hero-cta]'));
    const scroll = hero.querySelector<HTMLElement>('[data-hero-scroll]');
    const toggle = hero.querySelector<HTMLElement>('[data-hero-toggle]');

    // Reduced motion: sem gsap.set → conteúdo visível por padrão; timeline vazia.
    if (reduced) {
      return;
    }

    if (media) {
      gsap.set(media, { scale: 1.08, transformOrigin: '50% 45%' });
    }
    if (headerItems.length > 0) {
      gsap.set(headerItems, { y: -18, opacity: 0 });
    }
    if (eyebrow) {
      gsap.set(eyebrow, { y: 14, opacity: 0 });
    }
    if (title) {
      gsap.set(title, { yPercent: 112 });
    }
    if (support) {
      gsap.set(support, { y: 28, opacity: 0 });
    }
    if (ctas.length > 0) {
      gsap.set(ctas, { y: 22, opacity: 0 });
    }
    if (scroll) {
      gsap.set(scroll, { y: 10, opacity: 0 });
    }
    if (toggle) {
      gsap.set(toggle, { opacity: 0 });
    }

    // Poster → vídeo: zoom-out lento e contínuo do primeiro frame.
    if (media) {
      timeline.to(media, { scale: 1, duration: 2.8, ease: 'power2.out' }, 0);
    }
    // Header desce para a linha de cima sem piscar.
    if (headerItems.length > 0) {
      timeline.to(
        headerItems,
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.07, ease: 'power3.out' },
        0.2,
      );
    }
    // Headline sobe de dentro da máscara (overflow-hidden no JSX).
    if (title) {
      timeline.to(title, { yPercent: 0, duration: 1.15, ease: 'expo.out' }, 0.3);
    }
    if (eyebrow) {
      timeline.to(eyebrow, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.22);
    }
    if (support) {
      timeline.to(support, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, 0.6);
    }
    if (ctas.length > 0) {
      timeline.to(
        ctas,
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.09, ease: 'power3.out' },
        0.78,
      );
    }
    const chrome = [scroll, toggle].filter(isElement);
    if (chrome.length > 0) {
      timeline.to(chrome, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 1.05);
    }
  }, hero);

  return {
    start(): void {
      if (started) {
        return;
      }
      started = true;
      timeline.play(0);
    },
    revert(): void {
      timeline.kill();
      context.revert();
    },
  };
}
