import { fileURLToPath, URL } from 'node:url'
import appConfig from './app.config'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${appConfig.baseUrlName}/`,
  plugins: [vue()],
  build: {
    outDir: `./dist/${appConfig.baseUrlName}/`
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
