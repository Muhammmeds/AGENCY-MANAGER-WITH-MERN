/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: { 
      colors: {
      customColor: '#15A31F',
      customColor2 : '#d3d3d3',
    },
    fontFamily: {
      customFont: ['Roboto', 'sans-serif'],
    },
  },
  },
  plugins: [],
}

