import { defineConfig } from 'vite'
import { basename, dirname, resolve } from 'node:path'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'

import Pages from 'vite-plugin-pages'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  UnoCSS(),
  AutoImport({
    imports: [
      'vue',
      'vue-router',
      '@vueuse/core',
      '@vueuse/head',
    ],
  }),
  Components({
    extensions: ['vue', 'md'],
    dts: true,
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    resolvers: [
      IconsResolver({
        componentPrefix: '',
      }),
    ],
  }),
  Icons({
    defaultClass: 'inline',
    defaultStyle: 'vertical-align: sub;',
  }),
  Pages({
    extensions: ['vue', 'md'],
    dirs: 'pages',
    extendRoute(route) {
      const path = resolve(__dirname, route.component.slice(1))

      if (!path.includes('projects.md') && path.endsWith('.md')) {
        const md = fs.readFileSync(path, 'utf-8')
        const { data } = matter(md)
        route.meta = Object.assign(route.meta || {}, { frontmatter: data })
      }

      return route
    },
  })],
  resolve: {
    alias: [
      { find: '~/', replacement: `${resolve(__dirname, 'src')}/` },
    ],
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'dayjs',
      'dayjs/plugin/localizedFormat',
    ],
  },
})
