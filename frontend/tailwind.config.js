/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#0F1219',
        'dark-900': '#21252F',
        'dark-800': '#2A2F3B',
        'dark-700': '#343A49',
      },
      fontFamily: {
        mont: 'Montserrat',
        nunito: 'Nunito',
        inter: 'Inter',
        urbanist: 'Urbanist',
      },
      backgroundImage: {
        'green-gradient':
          'linear-gradient(135deg, hsla(149, 100%, 75%, 1) 24%, hsla(167, 50%, 58%, 1) 80%)',
      },
    },
  },
  plugins: [],
}
// dark: '#131820',
