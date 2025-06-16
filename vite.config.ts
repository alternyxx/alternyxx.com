import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// trying to get v4 to work with the .css files frustrated me so fucking much

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    esbuild: {
        supported: {
        'top-level-await': true
        },
    },
})
