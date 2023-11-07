// import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import './style.css'
import "./prose.css"
import "./markdown.css"
import 'uno.css'
import 'floating-vue/dist/style.css'
import App from './App.vue'
import autoRoutes from 'pages-generated'
import { ViteSSG } from 'vite-ssg'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat.js'
import { setupRouterScroller } from 'vue-router-better-scroller'
import FloatingVue from 'floating-vue'
console.log(autoRoutes)
const routes = autoRoutes.map((i) => {
  return {
    ...i,
    alias: i.path.endsWith('/')
      ? `${i.path}index.html`
      : `${i.path}.html`,
  }
})
// const app = createApp(App)

// app.mount('#app')


export const createApp = ViteSSG(
  App,
  {
    routes,
  },
  ({ router, app, isClient }) => {
    dayjs.extend(LocalizedFormat)

    app.use(FloatingVue)

    if (isClient) {
      const html = document.querySelector('html')
      setupRouterScroller(router, {
        selectors: {
          html(ctx) {
            // only do the sliding transition when the scroll position is not 0
            if (ctx.savedPosition?.top)
              html.classList.add('no-sliding')
            else
              html.classList.remove('no-sliding')
            return true
          },
        },
        behavior: 'auto',
      })

      // router.beforeEach(() => {
      //   NProgress.start()
      // })
      // router.afterEach(() => {
      //   NProgress.done()
      // })
    }
  },
)

