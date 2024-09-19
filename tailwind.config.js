/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        roseprimary: '#B55B49',
        verdeprimary: '#304517',
        rosesecundary: '#ECCAC3',
        marromsecundary: '#624836',
        branconeutro: '#EFEFEF',
        pretoneutro: '#292726'
      },
      fontFamily:{
        sans: ['Open Sans', 'sans serif'],
        laisha: ['Laisha', 'sans serif']
      }
    },
  },
  plugins: [],
}