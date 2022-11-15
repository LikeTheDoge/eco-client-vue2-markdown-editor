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
  },
  server: {
    proxy: ((paths: string[]) => {
      const proxy = {} as any
      paths.forEach(path => {
        proxy[path] = {
          // target: 'http://admineco.dameng.com:9999/',
          target: 'http://192.168.161.10:11080/',
          changeOrigin: true,
        }
      })
      return proxy
    })(['/eco-plat-static-server/','/login/','/file/','/eco-system-server-biz/'])
  }
})
