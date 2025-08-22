import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Import components
import Login from './components/Login.vue'
import Welcome from './components/Welcome.vue'
import Quiz from './components/Quiz.vue'
import Certificate from './components/Certificate.vue'

// Create router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/login', 
      component: Login,
      meta: { requiresAuth: false }
    },
    { 
      path: '/', 
      component: Welcome,
      meta: { requiresAuth: true }
    },
    { 
      path: '/quiz', 
      component: Quiz,
      meta: { requiresAuth: true }
    },
    { 
      path: '/certificate', 
      component: Certificate,
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    // Redirect to login if trying to access protected route
    next('/login')
  } else if (to.path === '/login' && isLoggedIn) {
    // Redirect to welcome if already logged in
    next('/')
  } else {
    next()
  }
})

// Create Pinia store
const pinia = createPinia()

// Create and mount app
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app') 