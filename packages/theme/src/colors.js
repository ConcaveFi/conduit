const colors = {
  ocean: {
    900: '#0E052D', // Same as `Main-bg` at figma
    800: '#0A112D',
    700: '#0C0D36',
    600: '#10183D',
    500: '#0B1640',
    400: '#082652',
    300: '#3E5389',
    200: '#6FA0E4', // Same as `Blue` on figma
    100: '#00D1FF',
  },
  light: {
    600: '#2B4057',
    500: '#6D7B8F',
    400: '#C3CBD9',
    300: '#E1E7F0',
    200: '#E4E4EC',
    100: '#FFFFFF',
  },
  'bright-text': '#CCE1FF',
  buttons: '#00D0FE',
  negative: '#E4364B', //On figma it's called red-500, to avoid conflicts with tailwind, changed to negative
  positive: '#34EDB3', //Same on above one, name on figma: green-400
}

module.exports = colors
