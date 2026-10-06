/**
 * Header fixo + navegação mobile.
 *
 * - `data-scrolled` é alternado pelo scrollAnimations/transitions (estado
 *   compacto: fundo + backdrop quando longe do topo).
 * - Esconde ao rolar para baixo, mostra ao subir (initHeaderTransition).
 * - Menu mobile: painel full-screen animado por GSAP; `data-menu-open`
 *   no header sinaliza para o transição não recolher com o menu aberto.
 * - Itens `[data-header-reveal]` entram na coreografia de abertura do hero.
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

import {
  createMobileMenuAnimation,
  type MenuAnimation,
} from '../animations/transitions';

interface NavItem {
  readonly label: string;
  readonly href: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Processo', href: '#processo' },
] as const;

export default function Header(): React.JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<MenuAnimation | null>(null);

  /* Cria a animação do painel uma única vez (StrictMode-safe: revert + recria). */
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }
    const animation = createMobileMenuAnimation(panel);
    animationRef.current = animation;
    return () => {
      animation.revert();
      animationRef.current = null;
    };
  }, []);

  /* Estado do menu → body scroll lock + atributos de a11y. */
  useEffect(() => {
    const header = headerRef.current;
    if (menuOpen) {
      header?.setAttribute('data-menu-open', '');
      document.body.style.overflow = 'hidden';
    } else {
      header?.removeAttribute('data-menu-open');
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const openMenu = (): void => {
    setMenuOpen(true);
    void animationRef.current?.setOpen(true);
  };

  const closeMenu = (): void => {
    void animationRef.current?.setOpen(false).then(() => {
      setMenuOpen(false);
    });
  };

  /* Esc fecha o menu (foco já está no painel/trigger). */
  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <header
      ref={headerRef}
      data-header
      className="fixed inset-x-0 top-0 z-header transition-[background-color,border-color,backdrop-blur] duration-300 data-scrolled:border-b data-scrolled:border-line data-scrolled:bg-zinc-950/80 data-scrolled:backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-6 py-4 sm:px-10 md:px-16">
        {/* Marca — item da coreografia do hero */}
        <a
          data-header-reveal
          href="#topo"
          className="group flex items-baseline gap-2"
          aria-label="Antônio Vidros — voltar ao topo"
        >
          <span className="font-display text-lg tracking-[0.14em] text-zinc-50">
            ANTÔNIO
          </span>
          <span className="numerals text-[0.62rem] uppercase tracking-[0.42em] text-brass-400 transition-colors duration-300 group-hover:text-brass-300">
            VIDROS
          </span>
        </a>

        {/* Navegação desktop */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              data-header-reveal
              href={item.href}
              className="text-sm tracking-wide text-zinc-300 transition-colors duration-300 hover:text-brass-300"
            >
              {item.label}
            </a>
          ))}
          <a
            data-header-reveal
            href="#orcamento"
            className="group flex items-center gap-2 rounded border border-brass-400/70 px-4 py-2 text-sm font-semibold text-brass-300 transition-colors duration-300 hover:bg-brass-400 hover:text-zinc-950"
          >
            Orçamento
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </nav>

        {/* Toggle mobile */}
        <button
          type="button"
          data-header-reveal
          onClick={() => (menuOpen ? closeMenu() : openMenu())}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="flex h-10 w-10 items-center justify-center rounded border border-line-strong text-zinc-100 transition-colors duration-300 hover:border-brass-400 hover:text-brass-300 md:hidden"
        >
          {menuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Painel mobile full-screen (GSAP anima translateY) */}
      <div
        id="menu-mobile"
        ref={panelRef}
        data-menu-panel
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="invisible fixed inset-0 z-overlay flex flex-col justify-between bg-zinc-950/97 px-6 pb-10 pt-24 backdrop-blur-lg md:hidden"
      >
        <nav aria-label="Navegação mobile" className="flex flex-col gap-2">
          {[...NAV_ITEMS, { label: 'Orçamento', href: '#orcamento' }].map((item, index) => (
            <a
              key={item.href}
              data-menu-item
              href={item.href}
              onClick={closeMenu}
              className="group flex items-baseline justify-between border-b border-line py-4"
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              <span className="font-display text-display-md font-light text-zinc-50 transition-colors duration-300 group-hover:text-brass-300">
                {item.label}
              </span>
              <span className="numerals text-[0.6rem] text-brass-400">
                0{index + 1}
              </span>
            </a>
          ))}
        </nav>

        <div data-menu-item className="flex items-center justify-between">
          <p className="text-xs leading-relaxed text-zinc-500">
            Vidros sob medida
            <br />
            São Paulo, SP
          </p>
          <a
            href="#orcamento"
            onClick={closeMenu}
            className="flex items-center gap-2 rounded border border-brass-400 px-4 py-2.5 text-sm font-semibold text-brass-300 transition-colors duration-300 hover:bg-brass-400 hover:text-zinc-950"
          >
            Solicitar orçamento
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
