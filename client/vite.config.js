import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    port: process.env.PORT || 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'https://my-restaurant-app-d7f65203a1b2.herokuapp.com/' || 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})