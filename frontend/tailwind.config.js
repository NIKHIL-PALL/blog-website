/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        'bask' : ["Libre Baskerville", "serif"],
        'mont' : ["Montserrat", "sans-serif"]
      }
    },
  },
  plugins: [],
}

