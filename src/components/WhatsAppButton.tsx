/**
 * Botão flutuante de WhatsApp — atalho sempre disponível.
 * Link real via `buildWhatsAppUrl` (fonte única em config/contact).
 * some quando o menu mobile está aberto (não disputa espaço).
 */

import { MessageCircle } from 'lucide-react';

import { buildWhatsAppUrl } from '../config/contact';

export default function WhatsAppButton(): React.JSX.Element {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp agora"
      className="group fixed bottom-5 right-5 z-overlay flex items-center gap-2.5 rounded-full border border-brass-400/70 bg-zinc-950/85 px-4 py-3 shadow-brass backdrop-blur-md transition-[background-color,border-color,transform] duration-300 hover:border-brass-300 hover:bg-brass-400 hover:text-zinc-950 motion-reduce:transform-none"
    >
      <MessageCircle className="h-5 w-5 text-brass-300 transition-colors duration-300 group-hover:text-zinc-950" aria-hidden="true" />
      <span className="hidden text-xs font-semibold tracking-wide sm:inline">
        WhatsApp
      </span>
    </a>
  );
}
