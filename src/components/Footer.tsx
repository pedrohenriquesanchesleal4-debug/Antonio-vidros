/**
 * Footer — encerramento editorial com contato real e navegação.
 * `data-footer` + `[data-footer-reveal]` são o contrato do reveal.
 */

import {
  buildMailtoUrl,
  buildPhoneUrl,
  buildWhatsAppUrl,
  CONTACT,
} from '../config/contact';

const NAV = [
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Orçamento', href: '#orcamento' },
] as const;

/** Valor de página (puro): evita Date() durante o render. */
const CURRENT_YEAR = new Date().getFullYear();

export default function Footer(): React.JSX.Element {
  const year = CURRENT_YEAR;

  return (
    <footer
      data-footer
      className="relative z-10 border-t border-line bg-zinc-950 px-6 pb-10 pt-16 sm:px-10 md:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div
          data-footer-reveal
          className="grid gap-10 border-b border-line pb-12 md:grid-cols-[1.4fr_1fr_1fr]"
        >
          {/* Marca + assinatura */}
          <div>
            <p className="font-display text-xl tracking-[0.14em] text-zinc-50">
              ANTÔNIO <span className="text-brass-400">VIDROS</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              Mais do que vidro. Uma nova forma de ocupar o espaço —
              especificação detalhada, prazo combinado e equipe própria na
              instalação.
            </p>
            <div className="brass-rule mt-6 max-w-[180px]" aria-hidden="true" />
          </div>

          {/* Navegação */}
          <nav aria-label="Navegação do rodapé">
            <p className="numerals mb-4 text-[0.58rem] uppercase tracking-[0.3em] text-zinc-500">
              Navegar
            </p>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-zinc-300 transition-colors duration-300 hover:text-brass-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <p className="numerals mb-4 text-[0.58rem] uppercase tracking-[0.3em] text-zinc-500">
              Contato
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 transition-colors duration-300 hover:text-brass-300"
                >
                  WhatsApp {CONTACT.whatsapp.display}
                </a>
              </li>
              <li>
                <a
                  href={buildPhoneUrl()}
                  className="text-zinc-300 transition-colors duration-300 hover:text-brass-300"
                >
                  Telefone {CONTACT.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={buildMailtoUrl()}
                  className="break-all text-zinc-300 transition-colors duration-300 hover:text-brass-300"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="pt-2 text-xs leading-relaxed text-zinc-500">
                São Paulo, SP — atendimento com visita técnica
                sob agendamento.
              </li>
            </ul>
          </div>
        </div>

        <div
          data-footer-reveal
          className="numerals flex flex-col gap-3 pt-6 text-[0.58rem] uppercase tracking-[0.24em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>© {year} Antônio Vidros — vidros sob medida</p>
          <p>Especificação · Corte · Instalação</p>
        </div>
      </div>
    </footer>
  );
}
