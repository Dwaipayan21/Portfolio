import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite"
import { resolve, dirname } from "path"
import { fileURLToPath } from 'url'

const rootDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(rootDir, 'src'),
      '#components': resolve(rootDir, 'src/components'),
      '#constants': resolve(rootDir, 'src/constants'),
      '#store': resolve(rootDir, 'src/store'),
      '#hoc': resolve(rootDir, 'src/hoc'),
      '#windows': resolve(rootDir, 'src/windows'),
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', 
        changeOrigin: true,
      },
    },
  },
})