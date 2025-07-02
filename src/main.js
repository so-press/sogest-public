// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import { useAuthStore } from './stores/auth'
import './style.css'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
// initialize auth store so axios has the correct token
useAuthStore(pinia).init()
app.use(router)
app.mount('#app')
