/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,scss,ts}"],
  theme: {
    fontFamily: {
      montserrat: ['Montserrat'],
      abril: ['Abril Fatface']
    },
    extend: {
      colors: {
        darknavy: '#0F044C',
        lighternavy: '#141E61',
        customgrey: '#787A91',
        dirtywhite: '#EEEEEE',
        rockmet:'#8A7F8D',
        pinkgray:'#E7DADA',
        purplegray:'#A7A6BA',
        rhythm:'#777696',
      }

    },
  },
  plugins: [],
}
