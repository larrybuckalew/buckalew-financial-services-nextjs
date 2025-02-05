/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
<<<<<<< HEAD
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Buckalew Financial primary colors
        primary: {
          DEFAULT: '#0066CC',   // Main brand blue
          50: '#E6F2FF',
          100: '#B3D9FF',
          200: '#80C0FF',
          300: '#4DA6FF',
          400: '#1A8CFF',
          500: '#0066CC',
          600: '#0052A3',
          700: '#003D7A',
          800: '#002951',
          900: '#001428'
        },
        secondary: {
          DEFAULT: '#4A90E2',   // Complementary blue
          50: '#E6F2FF',
          100: '#B3D9FF',
          200: '#80C0FF',
          300: '#4DA6FF',
          400: '#1A8CFF',
          500: '#4A90E2',
          600: '#3A7ABA',
          700: '#2A6492',
          800: '#1A4E6A',
          900: '#0A3842'
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #0066CC, #4A90E2)',
      },
      boxShadow: {
        'brand': '0 4px 6px -1px rgba(0, 102, 204, 0.1), 0 2px 4px -1px rgba(0, 102, 204, 0.06)',
      }
    },
  },
  plugins: [],
}
=======
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
