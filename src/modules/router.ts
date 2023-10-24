import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../page/index.vue')
    }
  ]
})

export function install(app: App<Element> ) {
  app.use(router)
}