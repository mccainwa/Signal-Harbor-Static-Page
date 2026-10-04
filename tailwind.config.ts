import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0A1628',
        'navy-deep': '#060E1A',
        'navy-panel': '#0F1F36',
        blue: '#00C2FF',
        'off-white': '#F5F7FA',
        ice: '#EFF6FB',
        /* Softer content system (October 2026 recovery): a slate canvas
           instead of broad pure white, a grouping surface, and an off-white
           raised surface for product and offer modules. */
        canvas: '#F4F9FC',
        mist: '#EAF4FA',
        raised: '#FFFFFF',
        /* Accessible link and accent blue on light surfaces. */
        harbor: '#0369A1',
        /* Secondary text on navy (about 10:1 on #0A1628). */
        fog: '#B9C6D4',
        muted: '#6B7686',
        alert: '#FF5A5F',
        warn: '#FFB020',
      },
      fontFamily: {
        sora: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(0, 0, 0, 0.25)',
        glow: '0 0 0 1px rgba(0,194,255,0.25), 0 8px 30px -8px rgba(0,194,255,0.25)',
      },
      borderRadius: {
        xl2: '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
