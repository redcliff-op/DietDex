/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        'background': '#141417',
        'darkgray': '#2D2D36',
        'lightgray': '#656566',
        'primary' : '#bdb3e4'
      }
    },
  },
  plugins: [],
}

