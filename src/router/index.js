import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/login', component: LoginView },
  {
    path: '/',
    component: HomeView,
    meta: { requiresAuth: true }, // ← protected route
    children: [
      { path: '', component: DashboardView },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    if (to.path !== '/login') {
      next({ path: '/login', query: { redirect: to.fullPath } })
    } else {
      next() // already on login page, no redirect
    }
  } else {
    next()
  }
})


export default router
