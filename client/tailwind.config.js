/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nl-green': '#274338', 
        'nl-cream': '#e9eceb', 
        'nl-brown': '#dcb99c', // Warna krem/beige untuk highlight teks
      },
      fontFamily: {
        'teachers': ['"Teachers"', 'sans-serif'],
        'merriweather': ['"Merriweather Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}