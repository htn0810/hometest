/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: '300px',
        xs: '480px',
      },
      colors: {
        'overlay': 'rgba(0, 0, 0, 0.75)',
      },
    },
  },
  plugins: [],
}