import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/authentication_token': {
        target: 'http://localhost:3001/authentication_token',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/authentication_token/, '')
      }
    }
  },
  plugins: [react()]
})
