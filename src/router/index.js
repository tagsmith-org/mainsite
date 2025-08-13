import { createRouter, createWebHistory } from 'vue-router'
import { getAdminStatus } from '../utils/adminAuth.js'

import Home from '../views/Home.vue'
import Services from '../views/Services.vue'
import Portfolio from '../views/Portfolio.vue'
import Contact from '../views/Contact.vue'
import SiteOrderDescription from '../views/SiteOrderDescription.vue'
import Orders from '../views/Orders.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/services', component: Services },
  { path: '/portfolio', component: Portfolio },
  { path: '/contact', component: Contact },
  { path: '/site-order', component: SiteOrderDescription },
  { 
    path: '/orders', 
    component: Orders,
    beforeEnter: async (to, from, next) => {
      const isAdmin = await getAdminStatus()
      if (isAdmin) {
        next()
      } else {
        next('/')
      }
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router