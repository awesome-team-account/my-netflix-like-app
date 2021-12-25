module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/App.vue', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '4%': '4%',
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
      backgroundSize: {
        'size-200': '200% 200%',
        'size-300': '300% 300%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
        'pos-200': '200% 200%',
      },
    },
  },
  plugins: [require('tailwindcss-filters')],
}
