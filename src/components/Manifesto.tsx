/**
 * Manifesto editorial — frase-assinatura entre hero e soluções.
 *
 * Palavras pré-divididas em spans estáticos (copy fixa, sem split em
 * runtime): `[data-manifesto-word]` é o contrato do scrub em
 * scrollAnimations — cada palavra sobe de 0.14 → 1 de opacidade.
 */

const WORDS = [
  'Mais',
  'do',
  'que',
  'vidro.',
  'Uma',
  'nova',
  'forma',
  'de',
  'ocupar',
  'o',
  'espaço.',
] as const;

export default function Manifesto(): React.JSX.Element {
  return (
    <section
      data-manifesto
      aria-label="Manifesto"
      className="relative z-10 bg-zinc-950 px-6 py-28 sm:px-10 md:px-16 md:py-40"
    >
      <div className="mx-auto max-w-5xl">
        <p
          className="numerals mb-8 text-[0.62rem] uppercase tracking-[0.36em] text-brass-400"
          aria-hidden="true"
        >
          Manifesto
        </p>

        <blockquote>
          <p className="font-display text-display-lg font-light leading-[1.08] text-zinc-100">
            {WORDS.map((word, index) => (
              <span key={`${word}-${String(index)}`}>
                <span data-manifesto-word className="inline-block">
                  {word}
                </span>
                {index < WORDS.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>
        </blockquote>

        {/* Régua brass que desenha com o scroll */}
        <div data-manifesto-rule className="brass-rule mt-10 max-w-xs" aria-hidden="true" />

        <p className="mt-8 max-w-xl text-sm leading-relaxed text-zinc-400">
          Cada peça sai da fábrica com especificação conferida contra o projeto —
          espessura, tratamento e encaixe — e entra na obra com a data, o nível e
          a regulagem combinados.
        </p>
      </div>
    </section>
  );
}
