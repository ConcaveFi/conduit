const colors = {
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
