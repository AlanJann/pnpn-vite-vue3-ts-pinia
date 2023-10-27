import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    // https://github.com/vue-macros/vue-macros
    VueMacros({
      plugins: {
        vue: vue({
          include: [/\.vue$/],
        })
      }
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue'],
      include: [/\.vue$/],
      dts: 'src/components.d.ts',
    }),
     // https://github.com/unplugin/unplugin-auto-import
    AutoImport({
       imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          'axios':[['default', 'axios']],
        }
      ],
       dts: 'src/auto-imports.d.ts',
       vueTemplate: true,
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue'],
      dirs: 'src/pages',
    }),
    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
