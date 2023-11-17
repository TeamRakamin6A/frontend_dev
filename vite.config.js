import { defineConfig, searchForWorkspaceRoot } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  fs: {
    allow: [
      // search up for workspace root
      searchForWorkspaceRoot(process.cwd()),
      // your custom rules
      '/home/maulana/Documents/STUDI INDEPENDEN/# Code #/inventory_management'    
    ],
  },

  plugins: [react()],
})
