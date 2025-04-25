import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/calculator/',
  server: {
    port: 5174,
    host: 'localhost'
  },
  plugins: [react()],
})
