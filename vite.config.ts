import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
// @ts-ignore
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // @ts-ignore
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [Inspect(), vue()],
})
