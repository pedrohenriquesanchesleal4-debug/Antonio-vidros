/**
 * Tailwind CSS v3 — Design tokens do Antônio Vidros.
 *
 * Direção: arquitetura / vidro premium. Base zinc profunda (estrutura),
 * acento brass (metal nobre, quente) + frost (transparência/vidro).
 * Sem gradiente roxo, sem rounded-2xl uniforme, sem Inter.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Acento nobre: latão/metal — quente, pontiagudo, nunca pastel */
        brass: {
          50: '#faf6ee',
          100: '#f2e9d5',
          200: '#e5d3aa',
          300: '#d6b879',
          400: '#c9a055',
          500: '#bc8a41',
          600: '#a26f34',
          700: '#85562d',
          800: '#6d472a',
          900: '#5a3c26',
          950: '#332013',
        },
        /* Vidro/clareza: frio, translúcido — usado em overlays e detalhes */
        frost: {
          50: '#f4f8fa',
          100: '#e8f0f5',
          200: '#ccdee9',
          300: '#a3c5d9',
          400: '#73a4c2',
          500: '#5188ab',
          600: '#3f6f91',
          700: '#355a76',
          800: '#314c63',
          900: '#2c4154',
          950: '#1d2a37',
        },
        /* Superfícies: zinc já cobre 50–950; aliases semânticos abaixo */
        surface: {
          DEFAULT: '#09090b' /* zinc-950 */,
          raised: '#18181b' /* zinc-900 */,
          overlay: '#27272a' /* zinc-800 */,
        },
        line: {
          DEFAULT: 'rgba(244, 244, 245, 0.08)' /* zinc-100/8% */,
          strong: 'rgba(244, 244, 245, 0.16)',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        /* Escala tipográfica editorial (não a default do Tailwind) */
        'display-2xl': ['clamp(3rem, 8vw, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-xl': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 2.5vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        /* Assimetria deliberada — nada de rounded-2xl uniforme */
        none: '0',
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        full: '9999px',
      },
      boxShadow: {
        glass: 'inset 0 1px 0 0 rgba(244, 244, 245, 0.06), 0 24px 48px -24px rgba(0, 0, 0, 0.7)',
        'glass-sm': 'inset 0 1px 0 0 rgba(244, 244, 245, 0.05), 0 8px 20px -12px rgba(0, 0, 0, 0.6)',
        brass: '0 24px 60px -30px rgba(188, 138, 65, 0.45)',
      },
      backgroundImage: {
        /* Transparências elegantes — brilho de borda de vidro, não gradiente roxo */
        'glass-sheen':
          'linear-gradient(135deg, rgba(244,244,245,0.06) 0%, rgba(244,244,245,0) 42%, rgba(115,164,194,0.08) 100%)',
        'brass-rule': 'linear-gradient(90deg, #bc8a41 0%, rgba(188,138,65,0) 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 24px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'line-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.6s ease both',
        'line-grow': 'line-grow 1.1s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      zIndex: {
        header: '50',
        overlay: '60',
        modal: '70',
      },
    },
  },
  plugins: [],
};
