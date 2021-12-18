module.exports = {
  content: ['./index.html', './src/App.vue', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    minWidth: {
      '1/2': '50%',
    },
  },
  plugins: [require('tailwindcss-filters')],
}
