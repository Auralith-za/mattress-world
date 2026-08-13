/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandNavy: {
          50: '#F0F4FA',
          100: '#E1E9F5',
          200: '#C3D3EC',
          500: '#223151',
          600: '#1B2845',
          700: '#141E34',
          800: '#0E1524',
          900: '#080C14',
        },
        brandGold: {
          50: '#FDFCF0',
          100: '#FAF7D6',
          400: '#E8D56A',
          500: '#DECB54',
          600: '#C6B23B',
          700: '#9E8D29',
        },
        surface: {
          50: '#FFFFFF',
          100: '#FAFAFC',
          200: '#F1F5F9',
          300: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
