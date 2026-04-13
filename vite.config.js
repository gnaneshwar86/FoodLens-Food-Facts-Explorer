import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Proxy all /api/* calls to the OpenFoodFacts .net infrastructure
      // (newer, more reliable, more rate-limit friendly than .org for anonymous users)
      '/api': {
        target: 'https://world.openfoodfacts.net',
        changeOrigin: true,
        headers: {
          'User-Agent': 'FoodLens - Food Facts Explorer - Version 1.0 - Open Source',
        }
      },
      // Keep /cgi for legacy search fallback
      '/cgi': {
        target: 'https://world.openfoodfacts.net',
        changeOrigin: true,
        headers: {
          'User-Agent': 'FoodLens - Food Facts Explorer - Version 1.0 - Open Source',
        }
      },
    }
  }
})
