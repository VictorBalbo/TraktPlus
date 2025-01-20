import { useTraktStore } from '@/store/TracktStore'
import BrowseView from '@/views/BrowseView.vue'
import LoginReturnView from '@/views/LoginReturnView.vue'
import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Browse',
      component: BrowseView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/login-return',
      name: 'LoginReturn',
      component: LoginReturnView,
      meta: { requiresAuth: false },
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

router.beforeEach(async (to) => {
  const traktStore = useTraktStore()
  if (to.meta.requiresAuth && !traktStore.oAuth) {
    return { name: 'Login' }
  }
})

export default router
