import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change this to match your GitHub repo name, e.g. '/hifdh-app/'
// If using a custom domain, set to '/'
const BASE_URL = '/hifdh-app/'

export default defineConfig({
  plugins: [react()],
  base: BASE_URL,
})
