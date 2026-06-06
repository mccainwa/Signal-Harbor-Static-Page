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
