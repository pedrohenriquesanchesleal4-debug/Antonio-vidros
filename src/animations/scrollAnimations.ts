/**
 * Scroll choreography — todas as seções abaixo do Hero.
 *
 * Regras:
 * - Nenhum estado inicial escondido no CSS: tudo que anima começa visível
 *   no DOM e só recebe `gsap.set` dentro do matchMedia de movimento permitido.
 *   Sem JS (ou com reduced-motion) a página é 100% legível.
 * - Um único `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`
 *   governa todos os triggers; `cleanup()` mata tudo no unmount.
 * - Cada bloco abaixo é auto-contido por seção: `[data-*]` declarado no JSX
 *   correspondente.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Revela filhos com stagger quando o contêiner entra na viewport. */
function revealGroup(
  scope: HTMLElement,
  selector: string,
  options: { readonly stagger?: number; readonly y?: number; readonly start?: string } = {},
): void {
  const items = gsap.utils.toArray<HTMLElement>(selector, scope);
  if (items.length === 0) {
    return;
  }
  gsap.set(items, { y: options.y ?? 44, opacity: 0 });
  gsap.to(items, {
    y: 0,
    opacity: 1,
    duration: 0.95,
    stagger: options.stagger ?? 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: scope,
      start: options.start ?? 'top 78%',
      once: true,
    },
  });
}

/** Parallax interno de mídia dentro de um card (scrub suave). */
function parallaxMedia(trigger: HTMLElement, media: HTMLElement): void {
  gsap.fromTo(
    media,
    { yPercent: -7 },
    {
      yPercent: 7,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    },
  );
}

/**
 * Inicializa toda a coreografia de scroll sob `root`.
 * Retorna função de cleanup (kill de matchMedia + refresh final).
 */
export function initScrollAnimations(root: HTMLElement): () => void {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    /* ── Hero exit: mídia escurece enquanto a seção seguinte sobe.
       O zoom é exclusivo da intro (mesma prop = conflito de tweens);
       aqui só filtro/overlay, que a intro nunca toca. ── */
    const hero = root.querySelector<HTMLElement>('[data-hero]');
    const heroMedia = root.querySelector<HTMLElement>('[data-hero-media]');
    const heroOverlay = root.querySelector<HTMLElement>('[data-hero-overlay]');
    if (hero && heroMedia) {
      gsap.fromTo(
        heroMedia,
        { filter: 'brightness(1)' },
        {
          filter: 'brightness(0.3)',
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
      if (heroOverlay) {
        gsap.to(heroOverlay, {
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: '30% top', end: 'bottom top', scrub: true },
        });
      }
    }

    /* ── Manifesto: palavras entram uma a uma (divisão feita no JSX) ── */
    const manifesto = root.querySelector<HTMLElement>('[data-manifesto]');
    if (manifesto) {
      const words = gsap.utils.toArray<HTMLElement>('[data-manifesto-word]', manifesto);
      if (words.length > 0) {
        gsap.set(words, { opacity: 0.14, y: '0.35em' });
        gsap.to(words, {
          opacity: 1,
          y: '0em',
          ease: 'none',
          stagger: 0.06,
          scrollTrigger: {
            trigger: manifesto,
            start: 'top 74%',
            end: 'bottom 52%',
            scrub: 0.6,
          },
        });
      }
      const rule = manifesto.querySelector<HTMLElement>('[data-manifesto-rule]');
      if (rule) {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: manifesto,
              start: 'top 80%',
              end: 'top 40%',
              scrub: true,
            },
          },
        );
      }
    }

    /* ── Solutions: intro editorial + cards em cascata ── */
    const solutions = root.querySelector<HTMLElement>('[data-solutions]');
    if (solutions) {
      revealGroup(solutions, '[data-solutions-intro]', { y: 36 });
      const cards = gsap.utils.toArray<HTMLElement>('[data-solution-card]', solutions);
      cards.forEach((card, index) => {
        gsap.set(card, { y: 56, opacity: 0 });
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: (index % 2) * 0.08,
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        });
        const icon = card.querySelector<HTMLElement>('[data-solution-icon]');
        if (icon) {
          gsap.fromTo(
            icon,
            { rotate: -8, scale: 0.92 },
            {
              rotate: 0,
              scale: 1,
              duration: 0.9,
              ease: 'back.out(1.6)',
              scrollTrigger: { trigger: card, start: 'top 86%', once: true },
            },
          );
        }
      });
    }

    /* ── Projects: revelação dos cards + parallax da imagem ── */
    const projects = root.querySelector<HTMLElement>('[data-projects]');
    if (projects) {
      revealGroup(projects, '[data-projects-intro]', { y: 36 });
      gsap.utils.toArray<HTMLElement>('[data-project-card]', projects).forEach((card) => {
        gsap.set(card, { y: 64, opacity: 0 });
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        });
        const media = card.querySelector<HTMLElement>('[data-project-media]');
        if (media) {
          parallaxMedia(card, media);
        }
      });
    }

    /* ── Process: trilho vertical desenha + etapas entram em sequência ── */
    const process = root.querySelector<HTMLElement>('[data-process]');
    if (process) {
      revealGroup(process, '[data-process-intro]', { y: 36 });
      const rail = process.querySelector<HTMLElement>('[data-process-rail]');
      if (rail) {
        gsap.fromTo(
          rail,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: process.querySelector('[data-process-steps]') ?? process,
              start: 'top 70%',
              end: 'bottom 72%',
              scrub: 0.5,
            },
          },
        );
      }
      const steps = gsap.utils.toArray<HTMLElement>('[data-process-step]', process);
      steps.forEach((step) => {
        gsap.set(step, { x: 36, opacity: 0 });
        gsap.to(step, {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 86%', once: true },
        });
        const number = step.querySelector<HTMLElement>('[data-process-number]');
        if (number) {
          gsap.fromTo(
            number,
            { y: '0.4em', opacity: 0 },
            {
              y: '0em',
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: { trigger: step, start: 'top 84%', once: true },
            },
          );
        }
      });
    }

    /* ── Quote: bloco final sobe como painel único ── */
    const quote = root.querySelector<HTMLElement>('[data-quote]');
    if (quote) {
      revealGroup(quote, '[data-quote-reveal]', { y: 40, stagger: 0.14, start: 'top 80%' });
    }

    /* ── Footer: conteúdo aparece sem saltos ── */
    const footer = root.querySelector<HTMLElement>('[data-footer]');
    if (footer) {
      revealGroup(footer, '[data-footer-reveal]', { y: 24, stagger: 0.08, start: 'top 92%' });
    }

    /* Layout pode mudar com fontes/mídia: recalcula posições. */
    ScrollTrigger.refresh();

    return () => {
      /* cleanup individual é feito pelo mm.revert() */
    };
  });

  return () => {
    mm.revert();
  };
}
