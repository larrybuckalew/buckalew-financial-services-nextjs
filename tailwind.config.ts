import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#285A84',  // Brand Blue
          50: '#E6EAF0',
          100: '#B3C2D1',
          200: '#8099B3',
          300: '#4D7094',
          400: '#1A4775',
          500: '#285A84',
          600: '#204A6E',
          700: '#183B57',
          800: '#102B41',
          900: '#081C2A'
        },
        green: {
          DEFAULT: '#85C872',  // Light Green
          50: '#E6F5E0',
          100: '#B3E3A6',
          200: '#8AD170',
          300: '#61BF3A',
          400: '#3BAD04',
          500: '#85C872',
          600: '#6DAF5E',
          700: '#549645',
          800: '#3C7D2C',
          900: '#246413'
        },
        secondary: {
          DEFAULT: '#85C872',
          soft: '#C2EF7E',
          dark: '#5EA669'
        }
      },
      textColor: {
        brand: {
          primary: '#285A84',
          green: {
            light: '#85C872',
            soft: '#C2EF7E',
            dark: '#5EA669'
          }
        }
      },
      backgroundColor: {
        brand: {
          primary: '#285A84',
          green: {
            light: '#85C872',
            soft: '#C2EF7E',
            dark: '#5EA669'
          }
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #285A84, #85C872)',
        'gradient-secondary': 'linear-gradient(to right, #85C872, #5EA669)'
      }
    },
  },
  plugins: [],
}