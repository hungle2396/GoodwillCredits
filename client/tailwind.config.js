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
        'purple-light-2': '#f2d6fa',
        'secondary-blue': '#2388FF',
        'secondary-blue-dark': '#207ae6',
        'secondary-green': '#42CB1A',
        'secopndary-green-dark': '#339e14',
        'secondary-red': '#FF6174',
        'secondary-red-dark': '#D83C56',
        'secondary-grey': '#7C7C7C',
        'secondary-grey-light': '#d9d9d9',
        'secondary-grey-light-2': '#f2f2f2',
        'secondary-coral': '#FF6F61',
        'secondary-emerald': '#009B77',
        'secondary-rose': '#C3447A'
      }
    },
  },
  plugins: [],
}