module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/App.vue', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    minWidth: {
      '1/2': '50%',
    },
  },
  plugins: [require('tailwindcss-filters')],
}
