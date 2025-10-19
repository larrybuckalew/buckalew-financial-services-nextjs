import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',  // Most inclusive path
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // Add any additional paths where Tailwind classes might be used
    './next.config.js',
    './postcss.config.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#285A84',
          light: '#C2EF7E',
          dark: '#5EA669',
          accent: '#85C872'
        },
        secondary: {
          DEFAULT: '#34a853',
          light: '#4CAF50',
          dark: '#1B5E20'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config