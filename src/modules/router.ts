import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import routes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

export const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
})

export function install(app: App<Element> ) {
  app.use(router)
}