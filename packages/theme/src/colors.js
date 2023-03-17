const colors = {
  ocean: {
    900: '#0E052D', // Same as `Main-bg` at figma
    800: '#0A112D',
    700: '#0C0D36', //Same as chart-ng at figma
    600: '#10183D',
    500: '#0B1640', // Same as block-bg50 at figma
    400: '#082652',
    300: '#3E5389', // Same as "main-dim" at figma
    200: '#6FA0E4', // Same as "Blue" at figma
    100: '#00D1FF', //Same as "buttons" at fimga
  },
  light: {
    600: '#2B4057',
    500: '#6D7B8F',
    400: '#C3CBD9',
    300: '#E1E7F0',
    200: '#E4E4EC',
    100: '#FFFFFF',
  },
  // Colors used on dark theme
  'coal-bright': '#1F2029',
  'dark-bg': '#17181F', //Black/Black BG at figma
  silver: '#797A80',
  coal: '#292A33',

  // Remaining...
  'bright-text': '#CCE1FF',
  buttons: '#00D0FE',
  negative: '#E4364B', //On figma it's called red-500, to avoid conflicts with tailwind, changed to negative
  positive: '#34EDB3', //Same on above one, name on figma: green-400
  // NEW
  dark: {
    'main-bg': '#101219',
    10: '#151720',
    20: '#1D1E28',
    30: '#2F313E',
    accent: '#FFFFFF',
    90: '#F4F4F4',
    'red-(G)': '#FF5A67',
    'green-(G)': '#00C9BD',
  },
  blue: {
    'main-bg': '#0E052D',
    10: '#120F3A',
    20: '#151947',
    30: '#192253',
    accent: '#00D0FE',
    90: '#CCE1FF',
    'red-(B)': '#FF357D',
    'green-(B)': '#00C9BD',
  },
}

module.exports = colors
