import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/visitor/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true
    }
  }
}) 