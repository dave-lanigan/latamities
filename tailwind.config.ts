import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './data/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sand: {
          50: '#fcf8f0',
          100: '#f6ebd7',
          200: '#eed7b2'
        },
        lagoon: {
          500: '#0f766e',
          600: '#115e59',
          700: '#134e4a'
        },
        coral: {
          400: '#fb7185',
          500: '#f43f5e'
        }
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      },
      boxShadow: {
        panel: '0 30px 80px rgba(15, 23, 42, 0.14)'
      },
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'map-wash': 'radial-gradient(circle at top left, rgba(20, 184, 166, 0.16), transparent 35%), radial-gradient(circle at bottom right, rgba(244, 63, 94, 0.12), transparent 28%)'
      }
    }
  },
  plugins: [animate]
} satisfies Config
