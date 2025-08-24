import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from './layout/Layout.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Cart from './views/Cart.vue'
import Product from './views/Product.vue'
import NotFound from './views/NotFound.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'about', name: 'About', component: About },
      { path: 'cart', name: 'Cart', component: Cart },
      { path: 'product/:id', name: 'Product', component: Product, props: true },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
