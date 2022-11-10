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
          'linear-gradient(135deg, hsla(116, 72%, 79%, 1) 0%, hsla(157, 31%, 48%, 1) 100%)',
        'red-gradient':
          'linear-gradient(90deg, hsla(0, 85%, 61%, 1) 0%, hsla(29, 97%, 75%, 1) 100%)',
      },
    },
  },
  plugins: [],
}
// dark: '#131820',
