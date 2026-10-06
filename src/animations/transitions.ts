/**
 * Header + menu mobile.
 *
 * Header fixo: `data-scrolled` liga o estado compacto (fundo/backdrop) e
 * um ScrollTrigger de direção o esconde ao rolar para baixo, mostra ao
 * rolar para cima. Menu mobile: timeline GSAP de abertura/fechamento
 * com `gsap.context()` e retorno de promise para sincronizar aria-expanded.
 *
 * Sob reduced-motion o header só alterna `data-scrolled` (sem tweens de
 * transform) e o menu abre/fecha por classe CSS, nunca por animação.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { prefersReducedMotion } from './heroAnimations';

gsap.registerPlugin(ScrollTrigger);

/** Distância mínima de scroll (px) antes de o header reagir. */
const SCROLL_THRESHOLD = 24;
/** Percentual de deslocamento do header quando recolhido. */
const HIDDEN_PERCENT = -110;

export interface HeaderTransition {
  /** Kill do listener de scroll e do ScrollTrigger. */
  revert(): void;
}

/**
 * Liga o header ao scroll da página. `header` precisa ter
 * `[data-header]` e `[data-scrolled]` no próprio elemento (atributo booleano).
 */
export function initHeaderTransition(header: HTMLElement): HeaderTransition {
  const reduced = prefersReducedMotion();
  let lastY = window.scrollY;
  let hidden = false;

  const applyState = (y: number): void => {
    header.toggleAttribute('data-scrolled', y > 8);

    const goingDown = y > lastY;
    const past = y > SCROLL_THRESHOLD;
    const shouldHide = past && goingDown && !reduced && !header.hasAttribute('data-menu-open');

    if (shouldHide !== hidden) {
      hidden = shouldHide;
      if (reduced) {
        header.style.visibility = hidden ? 'hidden' : '';
      } else {
        gsap.to(header, {
          yPercent: hidden ? HIDDEN_PERCENT : 0,
          duration: hidden ? 0.35 : 0.45,
          ease: hidden ? 'power2.in' : 'power3.out',
          overwrite: 'auto',
        });
      }
    }
    lastY = y;
  };

  const onScroll = (): void => applyState(window.scrollY);
  window.addEventListener('scroll', onScroll, { passive: true });
  applyState(window.scrollY);

  return {
    revert(): void {
      window.removeEventListener('scroll', onScroll);
      gsap.killTweensOf(header);
      header.style.visibility = '';
      header.style.transform = '';
    },
  };
}

export interface MenuAnimation {
  /** Abre (true) ou fecha (false); resolve quando o tween termina. */
  setOpen(open: boolean): Promise<void>;
  revert(): void;
}

/**
 * Anima o painel do menu mobile. O painel começa com `data-menu-panel` e
 * está fora da tela via CSS (`-translate-y-full`); aqui só controlamos o
 * transform. **Visibilidade é do React** (classe `visible`/`invisible`):
 * depender do tween p/ esconder o painel deixou estado inconsistente quando
 * o rAF é throttlado (janela em background) — fechado = invisible, sempre.
 */
export function createMobileMenuAnimation(panel: HTMLElement): MenuAnimation {
  const context = gsap.context(() => {
    gsap.set(panel, { yPercent: -100 });
    gsap.set(panel.querySelectorAll('[data-menu-item]'), { y: 24, opacity: 0 });
  }, panel);

  let current: gsap.core.Animation | null = null;

  const setOpen = (open: boolean): Promise<void> =>
    new Promise((resolve) => {
      if (prefersReducedMotion()) {
        gsap.set(panel, { yPercent: open ? 0 : -100 });
        resolve();
        return;
      }
      current?.kill();
      const items = panel.querySelectorAll<HTMLElement>('[data-menu-item]');
      const tl = gsap.timeline({ onComplete: resolve });
      if (open) {
        tl.to(panel, { yPercent: 0, duration: 0.55, ease: 'power3.out' }).to(
          items,
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
          '-=0.28',
        );
      } else {
        tl.to(items, { y: 16, opacity: 0, duration: 0.22, ease: 'power1.in' }).to(
          panel,
          { yPercent: -100, duration: 0.4, ease: 'power3.in' },
          '-=0.08',
        );
      }
      current = tl;
    });

  return {
    setOpen,
    revert(): void {
      current?.kill();
      context.revert();
    },
  };
}
