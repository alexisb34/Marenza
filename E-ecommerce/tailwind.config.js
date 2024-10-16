/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grey': '#e5e7eb'
      },

      transitionProperty: {
        'height': 'height'
      },
      screens: {
        // 'xs': {'max':'640px'},// -> @media (min-width: 280px) up to 640px ('sm')
      }
    },
  },
  plugins: [],
}
