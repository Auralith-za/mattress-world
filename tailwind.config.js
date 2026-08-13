/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['DM Serif Display', 'Georgia', 'serif'],
      },
      colors: {
        navy: {
          900: '#141E34',
          800: '#1B2845',
          700: '#223151',
          600: '#2C3F66',
          500: '#3B4D75',
        },
        gold: {
          300: '#F5E57E',
          400: '#DECB54',
          500: '#C6B23B',
          600: '#B89628',
          700: '#9E8D29',
        },
      },
    },
  },
  plugins: [],
};
