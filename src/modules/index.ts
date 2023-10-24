import type { App } from 'vue'
import { install as installPinia } from './pinia'
import { install as installRouter } from './router'

export function install(app: App<Element> ) {
  installPinia(app)
  installRouter(app)
}