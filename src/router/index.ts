import {
  RouteRecordRaw,
  createWebHistory,
  createRouter,
  RouteLocationNormalized,
} from 'vue-router'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home, meta: { title: 'Home' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const APP_TITLE = 'My Netflix-Like App'

const setTitle = (to: RouteLocationNormalized) => {
  const title = to.meta?.title
  document.title = title ? `${title} — ${APP_TITLE}` : APP_TITLE
}

router.afterEach((to: RouteLocationNormalized, from, failure) => {
  if (!failure) setTitle(to)
})

export default router
