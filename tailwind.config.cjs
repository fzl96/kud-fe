/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Source Sans Pro", "sans-serif"],
      'robotoMono': ['Roboto Mono', 'sans-serif']
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
