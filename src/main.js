import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Import components
import Welcome from './components/Welcome.vue'
import Quiz from './components/Quiz.vue'
import Certificate from './components/Certificate.vue'

// Create router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Welcome },
    { path: '/quiz', component: Quiz },
    { path: '/certificate', component: Certificate }
  ]
})

// Create Pinia store
const pinia = createPinia()

// Create and mount app
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app') 