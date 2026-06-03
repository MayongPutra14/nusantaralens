/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. WARNA CUSTOM
      colors: {
        inv: {
          bg: 'var(--inv-bg)',
          base: 'var(--inv-base)',
          accent: 'var(--inv-accent)',
          border: 'var(--inv-border)',
        },
        menu: {
          bg: 'var(--menu-bg)',
          inactive: 'var(--menu-inactive)',
          active: 'var(--menu-active)',
        },
        btn: {
          color: 'var(--btn-color)',
        },
        swirl: {
          50: '#f8f7f4', 100: '#eeece6', 200: '#d7d2c6', 300: '#c5bdac', 400: '#ada08a', 500: '#9c8b73', 600: '#8f7c67', 700: '#776657', 800: '#62544a', 900: '#51453d', 950: '#2a2420',
        },
        'barley-corn': {
          50: '#f7f5ef', 100: '#ebe7d7', 200: '#d9d0b2', 300: '#c3b386', 400: '#b09962', 500: '#9a824f', 600: '#856b42', 700: '#695337', 800: '#594632', 900: '#4d3d2f', 950: '#2b2118',
        },
        millbrook: {
          50: '#f8f7ee', 100: '#eeecd3', 200: '#ded9aa', 300: '#cbc079', 400: '#bba954', 500: '#ab9547', 600: '#93793b', 700: '#765c32', 800: '#644c2f', 900: '#5a442e', 950: '#312317',
        },
        'roman-coffee': {
          50: '#f7f5ef', 100: '#ebe5d6', 200: '#d9ccaf', 300: '#c2ac82', 400: '#b0915f', 500: '#a17f51', 600: '#846241', 700: '#6f4f39', 800: '#5f4334', 900: '#523b31', 950: '#2f1e19',
        },
        'ecru-white': {
          50: '#f4f3e9', 100: '#ecead9', 200: '#d7d3b0', 300: '#c2bb87', 400: '#b3a76c', 500: '#a79359', 600: '#937a4c', 700: '#7b6142', 800: '#664f3a', 900: '#554232', 950: '#2f2319',
        },
        bianca: {
          50: '#f5f4eb', 100: '#ecead9', 200: '#d7d3b0', 300: '#c2ba87', 400: '#b3a66c', 500: '#a79259', 600: '#93794c', 700: '#7b6042', 800: '#664f3a', 900: '#554232', 950: '#2f2319',
        },
      },
      // 2. FONT CUSTOM
      fontFamily: {
        base: ['var(--font-base)', 'serif'],
        accent: ['var(--font-accent)', 'serif'],
        latin: ['var(--font-latin)', 'cursive'],
        teachers: ['Teachers', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}