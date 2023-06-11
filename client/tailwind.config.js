/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-purple': '#BD33E5',
        'primary-purple-light': '#c447e8',
        'primary-purple-dark': '#aa2ece',
        'purple-light-1': '#f8ebfc',
        'purple-light-2': '#f2d6fa'
      }
    },
  },
  plugins: [],
}

