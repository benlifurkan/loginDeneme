import { createRouter, createWebHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
})

export default router
