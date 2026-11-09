import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import staticSeoPlugin from './vite-plugin-static-seo'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), staticSeoPlugin()],
})
