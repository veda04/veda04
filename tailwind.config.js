// tailwind.config.js
export default {
  darkMode: 'class', // Automatically switch based on system preference
  content: ['./**/*.php', './**/*.html'], // Add paths to your PHP and HTML templates
  theme: {
    extend: {
      colors: {
          neon: '#7CFF4A',
          'neon-dark': '#5CD425',
          charcoal: '#1a1a1a',
          'charcoal-light': '#2a2a2a'
      },
      fontFamily: {
          display: ['Playfair Display', 'serif'],
          body: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
