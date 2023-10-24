import { createApp } from 'vue'
import './style/reset.scss'
import { install } from './modules'


import App from './App.vue'

const app = createApp(App)
install(app)
app.mount('#app')
