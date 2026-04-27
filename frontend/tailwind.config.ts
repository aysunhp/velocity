import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — velocity.txt
        midnight: { DEFAULT: '#050608', 900: '#050608', 800: '#0A0C10', 700: '#11141A' },
        rich: { DEFAULT: '#0D0D0D', 950: '#070707', 900: '#0D0D0D' },
        gold: { DEFAULT: '#D4AF37', 400: '#E6C158', 300: '#F5D27A', 600: '#A98A24' },
        cream: '#F5F1E8',
        platinum: '#C9CCD1',
        marble: '#FAFAFA',
        electric: '#00B4D8',
        coral: '#FF6B35',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Playfair Display', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        accent: ['var(--font-accent)', 'Bebas Neue', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #050608 0%, #11141A 100%)',
        'gold-gradient': 'linear-gradient(45deg, #D4AF37, #F5D27A)',
        'btn-gradient': 'linear-gradient(90deg, #00B4D8, #0077B6)',
      },
      boxShadow: {
        gold: '0 0 30px rgba(212, 175, 55, 0.35)',
        glow: '0 0 40px rgba(0, 180, 216, 0.45)',
        elev: '0 20px 60px -20px rgba(10, 22, 40, 0.6)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(212,175,55,0.45)' },
          '50%': { boxShadow: '0 0 0 18px rgba(212,175,55,0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        shimmer: 'shimmer 2.2s linear infinite',
        'pulse-glow': 'pulseGlow 2.4s ease-out infinite',
        float: 'float 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
