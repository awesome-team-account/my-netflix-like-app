module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/App.vue', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '4%': '4%',
        '40%': '40%',
      },
      fontFamily: {
        sans: [
          'DM Sans',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [require('tailwindcss-filters')],
}
